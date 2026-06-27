/**
 * Миграция локальных данных data/storage → Upstash Redis
 * Запуск: node scripts/migrate-to-upstash.mjs
 */
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const KV_URL = process.env.KV_REST_API_URL?.replace(/^"(.*)"$/, '$1')
const KV_TOKEN = process.env.KV_REST_API_TOKEN?.replace(/^"(.*)"$/, '$1')

if (!KV_URL || !KV_TOKEN) {
  console.error('❌ Нет KV_REST_API_URL или KV_REST_API_TOKEN в .env')
  process.exit(1)
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const STORAGE_DIR = join(__dirname, '..', 'data', 'storage')

/** Рекурсивно собираем все файлы */
function collectFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      collectFiles(full, files)
    } else {
      files.push(full)
    }
  }
  return files
}

/**
 * Nitro использует путь файла как ключ Redis.
 * data/storage/cms/site → ключ: cms:site
 * data/storage/cms/page-hero/matovye → ключ: cms:page-hero:matovye
 */
function pathToKey(filePath) {
  const rel = relative(STORAGE_DIR, filePath).replace(/\\/g, '/')
  return rel.replace(/\//g, ':')
}

async function setKey(key, value) {
  const res = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${text}`)
  }
  return res.json()
}

async function main() {
  let files
  try {
    files = collectFiles(STORAGE_DIR)
  } catch {
    console.error(`❌ Не найдена папка ${STORAGE_DIR}`)
    process.exit(1)
  }

  console.log(`📦 Найдено файлов: ${files.length}`)

  let ok = 0
  let fail = 0

  for (const file of files) {
    const key = pathToKey(file)
    const raw = readFileSync(file, 'utf-8')

    let value
    try {
      value = JSON.parse(raw)
    } catch {
      value = raw
    }

    try {
      await setKey(key, value)
      console.log(`  ✅ ${key}`)
      ok++
    } catch (e) {
      console.error(`  ❌ ${key}: ${e.message}`)
      fail++
    }
  }

  console.log(`\nГотово: ${ok} загружено, ${fail} ошибок`)
}

main()

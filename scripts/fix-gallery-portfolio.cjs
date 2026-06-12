const fs = require('fs')
const path = require('path')

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const orig = content

  // Extract the slug from the usePageGallery call
  const galleryMatch = content.match(/const gallery = ref\(await usePageGallery\('([^']+)'\)\)/)
  if (!galleryMatch) return false
  const slug = galleryMatch[1]

  // 1. Add usePagePortfolio to import if not already there
  content = content.replace(
    /import \{ usePageContent, usePageGallery \} from '~\/composables\/usePageContent'/,
    "import { usePageContent, usePageGallery, usePagePortfolio } from '~/composables/usePageContent'"
  )

  // 2. After the gallery line, add portfolio line (if not already there)
  if (!content.includes('usePagePortfolio')) {
    // fallback: already replaced import but couldn't add portfolio
    return false
  }

  // Insert portfolio line after gallery line
  const galleryLine = `const gallery = ref(await usePageGallery('${slug}'))`
  const portfolioLine = `const portfolio = ref(await usePagePortfolio('${slug}'))`
  if (!content.includes(portfolioLine)) {
    content = content.replace(galleryLine, galleryLine + '\n' + portfolioLine)
  }

  // 3. Change worksWithPrice to use portfolio.value instead of gallery.value
  content = content.replace(
    /const worksWithPrice = gallery\.value\.filter\(g => g\.price\)/g,
    'const worksWithPrice = portfolio.value.filter(g => g.price)'
  )

  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8')
    return true
  }
  return false
}

function walk(dir) {
  let updated = 0
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) {
      updated += walk(full)
    } else if (entry.endsWith('.vue')) {
      if (processFile(full)) {
        console.log('Updated:', full)
        updated++
      }
    }
  }
  return updated
}

const total = walk(path.join(__dirname, '../app/pages/catalog'))
console.log(`\nDone. Updated ${total} files.`)

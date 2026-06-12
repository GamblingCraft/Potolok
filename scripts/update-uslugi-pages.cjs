const fs = require('fs'), path = require('path');

const dir = 'app/pages/uslugi';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.vue') && f !== 'index.vue');

let updated = 0, skipped = 0;

for (const file of files) {
  const slug = file.replace('.vue', '');
  const fp = path.join(dir, file);
  let content = fs.readFileSync(fp, 'utf8');

  if (content.includes('usePageContent')) { skipped++; continue; }

  const scriptMatch = content.match(/(<script setup[^>]*>)([\s\S]*?)(<\/script>)/);
  if (!scriptMatch) { skipped++; continue; }

  const [fullScript, openTag, scriptBody, closeTag] = scriptMatch;
  let newBody = scriptBody;

  // Remove hardcoded faqItems
  newBody = newBody.replace(/^const faqItems\s*(?::[^=]*)?\s*=\s*\[[\s\S]*?\n\]\s*\r?\n/m, '');
  newBody = newBody.replace(/^const faqItems\s*(?::[^=]*)?\s*=\s*\[.*?\]\s*\r?\n/m, '');

  // Remove hardcoded seoLinks
  newBody = newBody.replace(/^const seoLinks\s*(?::[^=]*)?\s*=\s*\[[\s\S]*?\n\]\s*\r?\n/m, '');
  newBody = newBody.replace(/^const seoLinks\s*(?::[^=]*)?\s*=\s*\[.*?\]\s*\r?\n/m, '');

  // Add import after last import line
  const composableImport = `import { usePageContent } from '~/composables/usePageContent'\n`;
  const lastImportMatch = [...newBody.matchAll(/^import .+\r?\n/gm)];
  if (lastImportMatch.length > 0) {
    const last = lastImportMatch[lastImportMatch.length - 1];
    const insertPos = last.index + last[0].length;
    newBody = newBody.substring(0, insertPos) + composableImport + newBody.substring(insertPos);
  } else {
    newBody = composableImport + newBody;
  }

  // Add composable calls after definePageMeta
  const composableCalls = `
// Данные страницы из pagesInfo.ts + перезаписи из админки
const _content = await usePageContent('${slug}')
const faqItems = ref(_content.faqItems ?? [])
const seoLinks = ref(_content.seoLinks ?? [])
`;

  const dpmIdx = newBody.indexOf('definePageMeta(');
  if (dpmIdx !== -1) {
    let depth = 0, i = dpmIdx;
    while (i < newBody.length) {
      if (newBody[i] === '(') depth++;
      else if (newBody[i] === ')') { depth--; if (depth === 0) break; }
      i++;
    }
    let insertPos = i + 1;
    if (newBody[insertPos] === '\r') insertPos++;
    if (newBody[insertPos] === '\n') insertPos++;
    newBody = newBody.substring(0, insertPos) + composableCalls + newBody.substring(insertPos);
  }

  const newContent = content.replace(fullScript, openTag + newBody + closeTag);
  fs.writeFileSync(fp, newContent);
  updated++;
  console.log('Updated:', fp);
}

console.log('\nDone! Updated:', updated, '| Skipped:', skipped);

const fs = require('fs'), path = require('path');

const dirs = [
  'app/pages/catalog/faktury',
  'app/pages/catalog/vidy',
  'app/pages/catalog/brendy',
  'app/pages/catalog/tsveta',
  'app/pages/catalog/po-pomescheniyu',
];

let updated = 0, skipped = 0, failed = [];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.vue') && f !== 'index.vue');

  for (const file of files) {
    const slug = file.replace('.vue', '');
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');

    // Skip if already using composable
    if (content.includes('usePageContent') || content.includes('usePageGallery')) {
      skipped++;
      continue;
    }

    const scriptMatch = content.match(/(<script setup[^>]*>)([\s\S]*?)(<\/script>)/);
    if (!scriptMatch) { skipped++; continue; }

    const [fullScript, openTag, scriptBody, closeTag] = scriptMatch;
    let newBody = scriptBody;

    // 1. Remove catalogGallery import line (keep GalleryItem if present separately)
    newBody = newBody.replace(/^import \{ catalogGallery(?:,\s*type\s+GalleryItem)? \} from '~\/data\/gallery'\r?\n/m, "import type { GalleryItem } from '~/data/gallery'\n");
    newBody = newBody.replace(/^import \{ (?:type\s+GalleryItem,\s*)?catalogGallery \} from '~\/data\/gallery'\r?\n/m, "import type { GalleryItem } from '~/data/gallery'\n");
    // If only catalogGallery (no GalleryItem), just remove
    newBody = newBody.replace(/^import \{ catalogGallery \} from '~\/data\/gallery'\r?\n/m, '');

    // 2. Remove hardcoded faqItems array
    newBody = newBody.replace(/^const faqItems\s*(?::[^=]*)?\s*=\s*\[[\s\S]*?\n\]\s*\r?\n/m, '');
    // single-line
    newBody = newBody.replace(/^const faqItems\s*(?::[^=]*)?\s*=\s*\[.*?\]\s*\r?\n/m, '');

    // 3. Remove hardcoded advantages array
    newBody = newBody.replace(/^const advantages\s*(?::[^=]*)?\s*=\s*\[[\s\S]*?\n\]\s*\r?\n/m, '');
    newBody = newBody.replace(/^const advantages\s*(?::[^=]*)?\s*=\s*\[.*?\]\s*\r?\n/m, '');

    // 4. Remove hardcoded seoLinks array
    newBody = newBody.replace(/^const seoLinks\s*(?::[^=]*)?\s*=\s*\[[\s\S]*?\n\]\s*\r?\n/m, '');
    newBody = newBody.replace(/^const seoLinks\s*(?::[^=]*)?\s*=\s*\[.*?\]\s*\r?\n/m, '');

    // 5. Remove catalogGallery usage for gallery
    const escapedSlug = slug.replace(/[-]/g, '\\-');
    newBody = newBody.replace(
      new RegExp(`const gallery\\s*=\\s*catalogGallery\\['${escapedSlug}'\\](?:\\s*\\?\\?\\s*\\[\\])?\\s*\\r?\\n`, 'm'),
      ''
    );
    newBody = newBody.replace(/const gallery\s*=\s*catalogGallery\[route\.path\.split\('\/'\)\.pop\(\)[^\n]*\]\s*(?:\?\?\s*\[\])?\s*\r?\n/m, '');

    // 6. Add composable import after existing imports block (before first non-import line)
    const composableImport = `import { usePageContent, usePageGallery } from '~/composables/usePageContent'\n`;
    if (!newBody.includes('usePageContent')) {
      // Insert after last import line
      const lastImportMatch = [...newBody.matchAll(/^import .+\r?\n/gm)];
      if (lastImportMatch.length > 0) {
        const lastImport = lastImportMatch[lastImportMatch.length - 1];
        const insertPos = lastImport.index + lastImport[0].length;
        newBody = newBody.substring(0, insertPos) + composableImport + newBody.substring(insertPos);
      } else {
        newBody = composableImport + newBody;
      }
    }

    // 7. Add composable calls after definePageMeta block
    const composableCalls = `
// Данные страницы из pagesInfo.ts + перезаписи из админки
const _content = await usePageContent('${slug}')
const faqItems = ref(_content.faqItems ?? [])
const advantages = ref(_content.advantages ?? [])
const seoLinks = ref(_content.seoLinks ?? [])

// Галерея из админки (дополнительные фото)
const gallery = ref(await usePageGallery('${slug}'))
`;

    // Find definePageMeta end
    const dpmIdx = newBody.indexOf('definePageMeta(');
    if (dpmIdx !== -1) {
      // Find matching closing paren
      let depth = 0, i = dpmIdx;
      while (i < newBody.length) {
        if (newBody[i] === '(') depth++;
        else if (newBody[i] === ')') { depth--; if (depth === 0) break; }
        i++;
      }
      // Skip newline after )
      let insertPos = i + 1;
      if (newBody[insertPos] === '\r') insertPos++;
      if (newBody[insertPos] === '\n') insertPos++;
      newBody = newBody.substring(0, insertPos) + composableCalls + newBody.substring(insertPos);
    } else {
      // No definePageMeta, insert after imports
      const lastImportMatch2 = [...newBody.matchAll(/^import .+\r?\n/gm)];
      if (lastImportMatch2.length > 0) {
        const lastImport = lastImportMatch2[lastImportMatch2.length - 1];
        const insertPos = lastImport.index + lastImport[0].length;
        newBody = newBody.substring(0, insertPos) + composableCalls + newBody.substring(insertPos);
      }
    }

    const newContent = content.replace(fullScript, openTag + newBody + closeTag);
    fs.writeFileSync(fp, newContent);
    updated++;
    console.log('Updated:', fp);
  }
}

console.log('\nDone! Updated:', updated, '| Skipped:', skipped, '| Failed:', failed.length);

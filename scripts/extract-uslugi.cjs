const fs = require('fs'), path = require('path');

const dir = 'app/pages/uslugi';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.vue') && f !== 'index.vue');

function extractArray(content, varName) {
  const start = content.indexOf(`const ${varName} = [`);
  if (start === -1) return null;
  const arrStart = content.indexOf('[', start);
  let depth = 0, i = arrStart;
  while (i < content.length) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') { depth--; if (depth === 0) break; }
    i++;
  }
  return content.substring(arrStart, i + 1);
}

const results = {};
for (const file of files) {
  const slug = file.replace('.vue', '');
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const faq = extractArray(content, 'faqItems');
  const seo = extractArray(content, 'seoLinks');
  if (faq || seo) {
    results[slug] = { faq, seo };
  }
}

let output = '';
for (const [slug, { faq, seo }] of Object.entries(results)) {
  output += `  '${slug}': {\n`;
  if (faq) output += `    faqItems: ${faq},\n`;
  if (seo) output += `    seoLinks: ${seo},\n`;
  output += `  },\n`;
}

fs.writeFileSync('scripts/_uslugi_extracted.txt', output);
console.log('Extracted', Object.keys(results).length, 'pages');
console.log(output.substring(0, 500));

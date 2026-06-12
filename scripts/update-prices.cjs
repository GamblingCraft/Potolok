const fs = require('fs'), path = require('path');

const VIDY_DEFAULTS = {
  paryashchie: 350, podsvetka: 320, dvuhuroven: 450,
  linii: 380, fotopechat: 550, zvezdnoe: 650,
  tenevye: 300, konturnye: 420, krivolinejnye: 540, mnogourovenye: 600,
};

const slugMap = {
  'matovye-natyazhnye-potolki':         { key: 'matovye',         cat: 'faktury' },
  'glyancevye-natyazhnye-potolki':      { key: 'glyancevye',      cat: 'faktury' },
  'satinovye-natyazhnye-potolki':       { key: 'satinovye',       cat: 'faktury' },
  'tkanevye-natyazhnye-potolki':        { key: 'tkanevye',        cat: 'faktury' },
  'fakturnye-natyazhnye-potolki':       { key: 'fakturnye',       cat: 'faktury' },
  'besshovnye-natyazhnye-potolki':      { key: 'besshovnye',      cat: 'faktury' },
  'gipoallergennye-natyazhnye-potolki': { key: 'gipoallergennye', cat: 'faktury' },
  'negoryuchie-natyazhnye-potolki':     { key: 'negoryuchie',     cat: 'faktury' },
  'paryashchie-natyazhnye-potolki':              { key: 'paryashchie',   cat: 'vidy' },
  'natyazhnye-potolki-s-podsvetkoy':             { key: 'podsvetka',     cat: 'vidy' },
  'dvuhurovnevye-natyazhnye-potolki':            { key: 'dvuhuroven',    cat: 'vidy' },
  'natyazhnye-potolki-so-svetovymi-liniyami':    { key: 'linii',         cat: 'vidy' },
  'natyazhnye-potolki-s-fotopechatyu':           { key: 'fotopechat',    cat: 'vidy' },
  'natyazhnye-potolki-zvezdnoe-nebo':            { key: 'zvezdnoe',      cat: 'vidy' },
  'tenevye-natyazhnye-potolki':                  { key: 'tenevye',       cat: 'vidy' },
  'konturnye-natyazhnye-potolki':                { key: 'konturnye',     cat: 'vidy' },
  'krivolinejnye-natyazhnye-potolki':            { key: 'krivolinejnye', cat: 'vidy' },
  'mnogourovenye-natyazhnye-potolki':            { key: 'mnogourovenye', cat: 'vidy' },
  'belye-natyazhnye-potolki':      { key: 'base', cat: 'simple' },
  'bezhevye-natyazhnye-potolki':   { key: 'base', cat: 'simple' },
  'chernye-natyazhnye-potolki':    { key: 'base', cat: 'simple' },
  'cvetnye-natyazhnye-potolki':    { key: 'base', cat: 'simple' },
  'golubye-natyazhnye-potolki':    { key: 'base', cat: 'simple' },
  'korichnevye-natyazhnye-potolki':{ key: 'base', cat: 'simple' },
  'serye-natyazhnye-potolki':      { key: 'base', cat: 'simple' },
  'zolotye-natyazhnye-potolki':    { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-na-balkone':      { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-na-dache':        { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-na-kuhne':        { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-chastnom-dome': { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-detskoy':       { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-gostinoy':      { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-kvartire':      { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-ofise':         { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-prihozhey':     { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-spalne':        { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-tualete':       { key: 'base', cat: 'simple' },
  'natyazhnye-potolki-v-vannoy':        { key: 'base', cat: 'simple' },
};

const dirs = [
  'app/pages/catalog/faktury',
  'app/pages/catalog/vidy',
  'app/pages/catalog/tsveta',
  'app/pages/catalog/po-pomescheniyu',
];

let updated = 0, skipped = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.vue') && f !== 'index.vue');

  for (const file of files) {
    const slug = file.replace('.vue', '');
    const info = slugMap[slug];
    if (!info) { console.log('No mapping for:', slug); skipped++; continue; }

    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');

    if (content.includes('useCatalogPrices')) { skipped++; continue; }

    const scriptMatch = content.match(/(<script setup[^>]*>)([\s\S]*?)(<\/script>)/);
    if (!scriptMatch) { skipped++; continue; }

    const [fullScript, openTag, scriptBody, closeTag] = scriptMatch;
    let newBody = scriptBody;

    // --- Add import ---
    const composableImport = `import { useCatalogPrices } from '~/composables/useCatalogPrices'\n`;
    const lastImports = [...newBody.matchAll(/^import .+\r?\n/gm)];
    if (lastImports.length > 0) {
      const last = lastImports[lastImports.length - 1];
      newBody = newBody.substring(0, last.index + last[0].length) + composableImport + newBody.substring(last.index + last[0].length);
    }

    // --- Add composable call + computed ---
    const { key, cat } = info;
    let priceCode = `const _prices = await useCatalogPrices()\n`;

    if (cat === 'vidy') {
      const def = VIDY_DEFAULTS[key] ?? 339;
      priceCode += `const price = computed(() => _prices.value?.['${key}'] ?? ${def})\n`;
      priceCode += `const priceExtra = computed(() => price.value - (_prices.value?.['base'] ?? 159))\n`;
    } else {
      // faktury and simple (tsveta, po-pomescheniyu)
      priceCode += `const price = computed(() => _prices.value?.['${key}'] ?? item.price)\n`;
    }

    // Insert after the last gallery/portfolio composable line, or after _content line
    const insertAnchor = newBody.lastIndexOf('const gallery = ref(await usePageGallery(');
    if (insertAnchor !== -1) {
      const lineEnd = newBody.indexOf('\n', insertAnchor) + 1;
      newBody = newBody.substring(0, lineEnd) + priceCode + newBody.substring(lineEnd);
    } else {
      const contentAnchor = newBody.lastIndexOf('const _content = await usePageContent(');
      if (contentAnchor !== -1) {
        const lineEnd = newBody.indexOf('\n', contentAnchor) + 1;
        newBody = newBody.substring(0, lineEnd) + priceCode + newBody.substring(lineEnd);
      }
    }

    // --- Update template price references ---
    content = content.replace(fullScript, openTag + newBody + closeTag);
    const scriptStart = content.indexOf('<script setup');
    let tmpl = content.substring(0, scriptStart);
    const scr = content.substring(scriptStart);

    if (cat === 'vidy') {
      tmpl = tmpl
        .replace(/\{\{\s*159\s*\+\s*item\.extra\s*\}\}/g, '{{ price }}')
        .replace(/:content="String\(159\s*\+\s*item\.extra\)"/g, ':content="String(price)"')
        .replace(/\{\{\s*item\.extra\s*\}\}/g, '{{ priceExtra }}');
    } else {
      tmpl = tmpl
        .replace(/\{\{\s*item\.price\s*\}\}/g, '{{ price }}')
        .replace(/:content="String\(item\.price\)"/g, ':content="String(price)"')
        .replace(/item\.price\b/g, 'price');
    }

    content = tmpl + scr;
    fs.writeFileSync(fp, content);
    updated++;
    console.log('Updated:', fp);
  }
}

console.log('\nDone! Updated:', updated, '| Skipped:', skipped);

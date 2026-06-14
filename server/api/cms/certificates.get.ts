const defaultCerts = [
  { id: 1, title: 'Сертификат пожарной безопасности', desc: 'Полотна соответствуют требованиям пожарной безопасности РФ. Класс горючести Г1.', num: 'C-RU.ПБ01.В.00001', badge: 'Обязательный', icon: 'lucide:flame', img: 'https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=600&q=80' },
  { id: 2, title: 'Гигиеническое заключение', desc: 'Санитарно-эпидемиологическое заключение Роспотребнадзора. Нетоксичны, без запаха.', num: '77.99.02.243.Д.017', badge: 'Обязательный', icon: 'lucide:shield-check', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80' },
  { id: 3, title: 'Сертификат соответствия ГОСТ', desc: 'Соответствие ГОСТ Р 57958-2017 «Натяжные потолки. Технические условия».', num: 'РОСС RU.АЯ46.Н00100', badge: null, icon: 'lucide:badge-check', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80' },
  { id: 4, title: 'Экологический сертификат', desc: 'Полотна прошли проверку на экологическую безопасность. Допущены к применению в детских учреждениях.', num: 'ЭКО.23.00234', badge: null, icon: 'lucide:leaf', img: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80' },
  { id: 5, title: 'Декларация о соответствии MSD', desc: 'Официальная декларация производителя MSD (Испания) о соответствии европейским стандартам.', num: 'EU-CE-2024-MSD', badge: 'MSD', icon: 'lucide:globe', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80' },
  { id: 6, title: 'Сертификат Bauf Германия', desc: 'Тканевые полотна Bauf сертифицированы по европейскому стандарту EN 13561.', num: 'DE-2024-BAUF-001', badge: 'Bauf', icon: 'lucide:award', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80' },
]

export default defineEventHandler(async () => {
  const stored = await useStorage('data').getItem<typeof defaultCerts>('cms:certificates')
  return stored ?? defaultCerts
})

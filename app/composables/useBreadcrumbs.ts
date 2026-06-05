/**
 * Автоматически строит хлебные крошки из текущего маршрута.
 * Добавить новые сегменты сюда — появятся везде автоматически.
 */

const segmentTitles: Record<string, string> = {
  // Верхний уровень
  'catalog':          'Каталог',
  'kalkulyator':      'Калькулятор',
  'portfolio':        'Наши работы',
  'ceny':             'Цены',
  'akczii':           'Акции и скидки',
  'otzyvy':           'Отзывы',
  'uslugi':           'Услуги',
  'kontakty':         'Контакты',
  'garantiya':        'Гарантия',
  'o-kompanii':       'О компании',
  'voprosy-otvety':   'Вопросы и ответы',
  'rassrochka-i-oplata': 'Оплата',
  'politika-konfidentsialnosti': 'Политика конфиденциальности',

  // Каталог — группы
  'faktury':          'Фактуры',
  'vidy':             'Виды',
  'tsveta':           'Цвета',
  'po-pomescheniyu':  'По помещению',
  'osveshchenie':     'Освещение',

  // Фактуры
  'matovye-natyazhnye-potolki':          'Матовые',
  'glyancevye-natyazhnye-potolki':       'Глянцевые',
  'satinovye-natyazhnye-potolki':        'Сатиновые',
  'tkanevye-natyazhnye-potolki':         'Тканевые',
  'fakturnye-natyazhnye-potolki':        'Фактурные',
  'besshovnye-natyazhnye-potolki':       'Бесшовные',
  'gipoallergennye-natyazhnye-potolki':  'Гипоаллергенные',
  'negoryuchie-natyazhnye-potolki':      'Негорючие',

  // Виды
  'paryashchie-natyazhnye-potolki':              'Парящие',
  'natyazhnye-potolki-s-podsvetkoy':             'С подсветкой',
  'dvuhurovnevye-natyazhnye-potolki':            'Двухуровневые',
  'natyazhnye-potolki-s-fotopechatyu':           'Фотопечать',
  'natyazhnye-potolki-zvezdnoe-nebo':            'Звёздное небо',
  'natyazhnye-potolki-so-svetovymi-liniyami':    'Световые линии',
  'tenevye-natyazhnye-potolki':                  'Теневые',
  'natyazhnye-potolki-3d':                       '3D потолки',
  'mnogourovenye-natyazhnye-potolki':            'Многоуровневые',
  'konturnye-natyazhnye-potolki':                'Контурные',
  'krivolinejnye-natyazhnye-potolki':            'Криволинейные',
  'besshchelevye-natyazhnye-potolki':            'Бесщелевые',

  // Цвета
  'belye-natyazhnye-potolki':       'Белые',
  'chernye-natyazhnye-potolki':     'Чёрные',
  'serye-natyazhnye-potolki':       'Серые',
  'bezhevye-natyazhnye-potolki':    'Бежевые',
  'cvetnye-natyazhnye-potolki':     'Цветные',
  'zolotye-natyazhnye-potolki':     'Золотые',
  'golubye-natyazhnye-potolki':     'Голубые',
  'korichnevye-natyazhnye-potolki': 'Коричневые',

  // По помещению
  'natyazhnye-potolki-v-gostinoy':      'В гостиной',
  'natyazhnye-potolki-v-spalne':        'В спальне',
  'natyazhnye-potolki-na-kuhne':        'На кухне',
  'natyazhnye-potolki-v-vannoy':        'В ванной',
  'natyazhnye-potolki-v-detskoy':       'В детской',
  'natyazhnye-potolki-v-prihozhey':     'В прихожей',
  'natyazhnye-potolki-v-kvartire':      'В квартире',
  'natyazhnye-potolki-v-chastnom-dome': 'В частном доме',
  'natyazhnye-potolki-v-tualete':       'В туалете',
  'natyazhnye-potolki-v-ofise':         'В офисе',
  'natyazhnye-potolki-na-balkone':      'На балконе',
  'natyazhnye-potolki-na-dache':        'На даче',

  // Услуги
  'montazh-natyazhnyh-potolkov':   'Монтаж',
  'vyezd-zamershchika':            'Бесплатный замер',
  'srochnyj-montazh-24-chasa':     'Срочный монтаж',
  'sliv-vody-s-natyazhnogo-potolka': 'Слив воды с потолка',
  'demontazh-natyazhnogo-potolka': 'Демонтаж',
  'remont-natyazhnogo-potolka':    'Ремонт потолка',
  'zamena-polotna':                'Замена полотна',
  'peretyazhka-potolka':           'Перетяжка',
  'ustanovka-svetilnikov':         'Установка светильников',

  // Иркутск — районы
  'irkutsk':             'Иркутск',
  'oktyabrskiy-okrug':   'Октябрьский округ',
  'pravoberezhnyy-okrug':'Правобережный округ',
  'sverdlovskiy-okrug':  'Свердловский округ',
  'leninskiy-okrug':     'Ленинский округ',
}

export function useBreadcrumbs() {
  const route = useRoute()

  const crumbs = computed(() => {
    const segments = route.path.split('/').filter(Boolean)
    if (segments.length === 0) return []

    return segments.map((seg, i) => {
      const to = '/' + segments.slice(0, i + 1).join('/')
      const title = segmentTitles[seg] ?? seg.replace(/-/g, ' ')
      const isLast = i === segments.length - 1
      return { title, to: isLast ? undefined : to }
    })
  })

  return { crumbs }
}

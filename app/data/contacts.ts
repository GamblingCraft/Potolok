/**
 * Контактные данные компании
 * Когда появится API/админка → заменить на $fetch('/api/contacts')
 */

export const company = {
  name:        'ПроПотолок',
  fullName:    'ООО «ПроПотолок»',
  inn:         '3811123456',
  ogrn:        '1193850012345',
  city:        'Иркутск',

  phone:       '+7 (395) 200-00-00',
  phoneTel:    '+73952000000',
  phoneAlt:    '+7 (395) 200-00-01',  // второй номер
  phoneAltTel: '+73952000001',

  email:       'info@propopotolok.ru',
  emailSales:  'zakaz@propopotolok.ru',

  address:     'г. Иркутск, ул. Байкальская, 253А, офис 12',
  addressShort:'ул. Байкальская, 253А',

  hours: [
    { days: 'Понедельник — пятница', time: '9:00 — 20:00' },
    { days: 'Суббота',               time: '10:00 — 18:00' },
    { days: 'Воскресенье',           time: 'По заявкам' },
  ],

  social: {
    telegram: 'https://t.me/propopotolok',
    vk:       'https://vk.com/propopotolok',
    whatsapp: 'https://wa.me/73952000000',
  },

  // Координаты для карты (Иркутск, заменить на реальные)
  mapLat:  52.2978,
  mapLng:  104.2964,
  // Embed-ссылка Яндекс.Карты (заменить на реальную)
  mapEmbed: 'https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructor&width=100%25&height=100%25',
}

export const districts = [
  'Октябрьский округ',
  'Правобережный округ',
  'Свердловский округ',
  'Ленинский округ',
  'Ангарск',
  'Шелехов',
]

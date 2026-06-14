const defaultTeam = [
  { id: 1, name: 'Александр', role: 'Старший замерщик', exp: '12 лет', photo: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=300&h=300&fit=crop&q=80', skills: ['Сложные помещения', 'Дизайн-консультация', 'Коммерческие объекты'] },
  { id: 2, name: 'Дмитрий', role: 'Ведущий монтажник', exp: '10 лет', photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&q=80', skills: ['Многоуровневые потолки', 'Световые линии', 'Парящие ниши'] },
  { id: 3, name: 'Михаил', role: 'Монтажник', exp: '7 лет', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&q=80', skills: ['Стандартный монтаж', 'Ванные и кухни', 'Срочные заказы'] },
  { id: 4, name: 'Ирина', role: 'Менеджер по заказам', exp: '6 лет', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80', skills: ['Консультации клиентов', 'Подбор материалов', 'Оформление договоров'] },
]

export default defineEventHandler(async () => {
  const stored = await useStorage('data').getItem<typeof defaultTeam>('cms:team')
  return stored ?? defaultTeam
})

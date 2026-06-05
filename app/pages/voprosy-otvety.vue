<template>
  <div>

    <section class="fq-hero">
      <div class="container fq-hero__inner">
        <div>
          <div class="fq-pretitle">Помогаем разобраться</div>
          <h1 class="fq-hero__title">Вопросы и ответы</h1>
          <p class="fq-hero__desc">Собрали ответы на самые частые вопросы о натяжных потолках, монтаже, ценах и гарантии</p>
        </div>
        <!-- Поиск -->
        <div class="fq-search-wrap">
          <Icon name="lucide:search" size="18" class="fq-search-icon"/>
          <input v-model="search" class="fq-search" type="text" placeholder="Поиск по вопросам..."/>
          <button v-if="search" class="fq-search-clear" @click="search = ''">
            <Icon name="lucide:x" size="16"/>
          </button>
        </div>
      </div>
    </section>

    <!-- Результаты поиска -->
    <section v-if="search.trim()" class="fq-section fq-section--white">
      <div class="container">
        <div class="fq-head">
          <h2 class="fq-title">Результаты поиска: «{{ search }}»</h2>
          <div class="fq-count">Найдено: {{ searchResults.length }}</div>
        </div>
        <div v-if="searchResults.length" class="fq-list">
          <div class="fq-item" v-for="q in searchResults" :key="q.q + q.cat" :class="{ open: openItems.has(q.q) }" @click="toggle(q.q)">
            <div class="fq-item__q">{{ q.q }}<Icon :name="openItems.has(q.q) ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="fq-arrow"/></div>
            <div class="fq-item__a">{{ q.a }}</div>
          </div>
        </div>
        <div v-else class="fq-empty">
          <Icon name="lucide:search-x" size="32" class="fq-empty__icon"/>
          <div class="fq-empty__text">По запросу «{{ search }}» ничего не найдено. Попробуйте другие слова или <button class="fq-empty__reset" @click="search = ''">сбросьте поиск</button></div>
        </div>
      </div>
    </section>

    <!-- Блоки по категориям -->
    <template v-else>
      <section
        v-for="(cat, idx) in categories" :key="cat.id"
        class="fq-section"
        :class="idx % 2 === 0 ? 'fq-section--white' : 'fq-section--gray'"
      >
        <div class="container">
          <div class="fq-cat-head">
            <div class="fq-cat-icon"><Icon :name="cat.icon" size="22"/></div>
            <div>
              <div class="fq-pretitle fq-pretitle--dark">{{ cat.label }}</div>
              <h2 class="fq-title">{{ cat.title }}</h2>
            </div>
          </div>
          <div class="fq-list">
            <div
              class="fq-item"
              v-for="q in cat.items" :key="q.q"
              :class="{ open: openItems.has(q.q) }"
              @click="toggle(q.q)"
              itemscope itemtype="https://schema.org/Question"
            >
              <div class="fq-item__q" itemprop="name">
                {{ q.q }}
                <Icon :name="openItems.has(q.q) ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="fq-arrow"/>
              </div>
              <div class="fq-item__a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                <div itemprop="text">{{ q.a }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- CTA -->
    <section class="fq-cta">
      <div class="container fq-cta__inner">
        <div>
          <h2 class="fq-cta__title">Не нашли ответ на свой вопрос?</h2>
          <p class="fq-cta__desc">Позвоните или напишите нам — ответим на любой вопрос и бесплатно приедем на замер</p>
        </div>
        <div class="fq-cta__btns">
          <a :href="'tel:' + site.phoneRaw" class="nav-btn fq-btn"><Icon name="lucide:phone-call" size="16"/>Позвонить</a>
          <a :href="site.emailHref" class="fq-btn-outline"><Icon name="lucide:mail" size="16"/>Написать</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
useHead({
  title: 'Вопросы и ответы о натяжных потолках — ПроПотолок Иркутск',
  meta: [{ name: 'description', content: 'Ответы на частые вопросы о натяжных потолках: цены, монтаж, уход, гарантия, сравнение материалов. Иркутск.' }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage' }) }],
})

const search    = ref('')
const openItems = reactive(new Set<string>())

function toggle(q: string) {
  openItems.has(q) ? openItems.delete(q) : openItems.add(q)
}

const categories = [
  {
    id: 'obshchie', label: 'Общие вопросы', title: 'Общие вопросы о натяжных потолках', icon: 'lucide:help-circle',
    items: [
      { q: 'Что такое натяжной потолок?', a: 'Натяжной потолок — это конструкция из полотна (ПВХ-плёнки или тканевого материала), которое натягивается на профиль (багет), закреплённый по периметру комнаты. Потолок скрывает неровности базового перекрытия, коммуникации и создаёт идеально ровную поверхность.' },
      { q: 'Какой срок службы у натяжного потолка?', a: 'Срок службы качественного натяжного потолка — 25–30 лет при соблюдении условий эксплуатации. Мы даём письменную гарантию на 12 лет. Европейские полотна MSD, Bauf и Descor рассчитаны на 25+ лет.' },
      { q: 'Натяжные потолки вредны для здоровья?', a: 'Нет. Все используемые нами полотна прошли гигиеническую проверку Роспотребнадзора, имеют санитарно-эпидемиологическое заключение и нетоксичны. Потолки используются в детских садах, школах и медицинских учреждениях.' },
      { q: 'На сколько натяжной потолок уменьшает высоту комнаты?', a: 'Одноуровневый натяжной потолок забирает 3–5 см от высоты помещения. Двухуровневая конструкция — 10–15 см. При стандартной высоте потолков 2,7 м это практически незаметно.' },
    ],
  },
  {
    id: 'montazh', label: 'Монтаж', title: 'Вопросы о монтаже потолков', icon: 'lucide:hammer',
    items: [
      { q: 'Нужно ли выравнивать потолок перед монтажом?', a: 'Нет. Натяжной потолок скрывает любые неровности базового перекрытия. Единственное условие — отсутствие сильно осыпающейся штукатурки и больших трещин (шире 5 мм). Всё остальное мастер устранит при подготовке.' },
      { q: 'Нужно ли выносить мебель?', a: 'Нет. Мы работаем методом холодного натяжения без тепловой пушки. Мастера укроют мебель защитной плёнкой и снимут её после работы. Выносить вещи не нужно.' },
      { q: 'Сколько времени занимает монтаж?', a: 'Стандартная комната (15–20 м²) — 2–3 часа. Двухкомнатная квартира — 4–6 часов, трёхкомнатная — 1 день. Сложные многоуровневые конструкции с подсветкой — 1–2 дня в зависимости от объёма.' },
      { q: 'Будет ли запах после монтажа?', a: 'Нет. Метод холодного натяжения не предполагает нагрева. Полотна из нетоксичного ПВХ не имеют запаха. В первые 1–2 дня возможен лёгкий запах пластика, который исчезает после проветривания.' },
      { q: 'В какую температуру можно монтировать потолок?', a: 'Монтаж возможен при температуре в помещении от +10°C. Это позволяет устанавливать потолки в новостройках до завершения отопительного сезона или в неотапливаемых помещениях.' },
    ],
  },
  {
    id: 'materialy', label: 'Материалы', title: 'Виды полотен и материалов', icon: 'lucide:layers',
    items: [
      { q: 'Чем отличается матовый потолок от глянцевого?', a: 'Матовый потолок рассеивает свет, создаёт мягкое равномерное освещение, скрывает небольшие дефекты и не даёт бликов. Глянцевый — зеркально отражает всё вокруг, визуально увеличивает пространство и усиливает яркость, но требует более тщательной чистки.' },
      { q: 'Что такое тканевый натяжной потолок?', a: 'Тканевый потолок делается из полиэстеровой ткани с полиуретановым покрытием. Он не содержит ПВХ, «дышит», пропускает пар, монтируется без нагрева. Отлично подходит для детских комнат и спален. Единственный минус — не является водонепроницаемым.' },
      { q: 'Можно ли установить натяжной потолок в ванной?', a: 'Да. ПВХ-полотна водонепроницаемы и идеально подходят для ванной, санузла и кухни. Они не боятся влаги, пара и перепадов температур. Тканевые потолки для влажных помещений не рекомендуются.' },
      { q: 'Какие производители самые надёжные?', a: 'Мы работаем с тремя проверенными брендами: MSD (Испания) — широкая палитра ПВХ-полотен премиум-класса; Bauf (Германия) — тканевые потолки, гипоаллергенные; Teqtum (Россия) — полотна с противопожарными и антибактериальными свойствами.' },
      { q: 'Сколько цветов доступно?', a: 'В нашем каталоге более 100 цветов и оттенков в каждой фактуре. Замерщик привозит полную коллекцию образцов, чтобы вы могли оценить цвет в своём интерьере при вашем освещении.' },
    ],
  },
  {
    id: 'osveshchenie', label: 'Освещение', title: 'Вопросы об освещении и подсветке', icon: 'lucide:lightbulb',
    items: [
      { q: 'Нужны ли термокольца для светильников?', a: 'Для ПВХ-полотен — да, обязательно. Термокольцо защищает полотно от теплового воздействия лампочки. Без термоколец полотно деформируется вокруг отверстия, гарантия аннулируется. Термокольца входят в нашу стоимость.' },
      { q: 'Какой мощности можно использовать лампочки?', a: 'Для ПВХ-потолков: светодиодные до 40 Вт, галогеновые до 50 Вт. Для тканевых потолков: только светодиодные. Лампы накаливания не рекомендуются из-за высокой температуры нагрева.' },
      { q: 'Можно ли установить световые линии или парящий потолок?', a: 'Да. Световые линии и парящий потолок — одни из самых популярных технологий. Световые линии встраиваются прямо в полотно или монтируются в багет. Парящий эффект создаётся с помощью скрытой LED-подсветки в нише между полотном и стеной.' },
      { q: 'Можно ли добавить светильники в уже смонтированный потолок?', a: 'Да. Мастер приедет, разметит места, аккуратно прорежет отверстия и установит светильники. Демонтаж потолка не требуется. Стоимость установки — от 300 ₽ за точку.' },
    ],
  },
  {
    id: 'ceny', label: 'Цены', title: 'Вопросы о ценах и оплате', icon: 'lucide:banknote',
    items: [
      { q: 'Сколько стоит натяжной потолок в Иркутске?', a: 'Стоимость зависит от площади, фактуры и конфигурации. Матовый или глянцевый потолок — от 159 ₽/м². Цена включает полотно, монтаж, расходники и уборку. Точную стоимость назовём после бесплатного замера.' },
      { q: 'Монтаж входит в стоимость?', a: 'Да. Цена за м² включает полотно, монтаж, профиль, маскировочную ленту и уборку после работы. Дополнительно оплачиваются только специальные конструкции: многоуровневые, световые линии, парящие ниши.' },
      { q: 'Нужна ли предоплата?', a: 'Нет. Мы работаем без предоплаты. Оплата производится только после завершения монтажа и вашей приёмки работы. Принимаем наличные, банковские карты и безналичный перевод.' },
      { q: 'Есть ли рассрочка?', a: 'Да. По запросу оформим рассрочку без процентов. Условия уточняйте у менеджера при оформлении заказа.' },
    ],
  },
  {
    id: 'uhod', label: 'Уход', title: 'Уход и эксплуатация потолков', icon: 'lucide:sparkles',
    items: [
      { q: 'Как правильно чистить натяжной потолок?', a: 'Мягкой слегка влажной тряпкой или микрофиброй без абразивных средств. Нельзя использовать растворители, ацетон, хлорсодержащие средства. Не допускайте контакта с острыми предметами.' },
      { q: 'Что делать если залили соседи сверху?', a: 'Не паникуйте и не прокалывайте потолок самостоятельно. Немедленно звоните нам. ПВХ-потолок удерживает до 100 л/м² воды. Мастер приедет и аккуратно сольёт воду через технологический клапан — полотно восстановит форму полностью.' },
      { q: 'Можно ли снять и повторно установить натяжной потолок?', a: 'ПВХ-полотно при демонтаже растягивается и восстановить его для повторной установки сложно. Обычно при перемонтаже полотно меняют на новое. Профиль (багет) можно сохранить.' },
      { q: 'Натяжной потолок реагирует на изменения температуры?', a: 'Незначительно. При резких перепадах температуры (например, при открытых окнах зимой) полотно может слегка провиснуть, но при нормализации температуры вернётся в исходное положение.' },
    ],
  },
]

const searchResults = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return []
  return categories.flatMap(cat =>
    cat.items
      .filter(item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
      .map(item => ({ ...item, cat: cat.id }))
  )
})
</script>

<style scoped>
.fq-pretitle { display: inline-block; background: var(--accent); color: #141414; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: .5px; }
.fq-pretitle--dark { color: var(--dark); }
.fq-head { margin-bottom: 28px; }
.fq-title { font-size: 28px; font-weight: 800; color: var(--dark); line-height: 1.2; }
.fq-count { font-size: 14px; color: var(--gray); margin-top: 6px; }
.fq-section { padding: 56px 0; }
.fq-section--white { background: #fff; }
.fq-section--gray  { background: #f7f7f7; }

.fq-hero { background: #141414; padding: 48px 0; }
.fq-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.fq-hero__title { font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 10px; }
.fq-hero__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; line-height: 1.6; }
.fq-search-wrap { position: relative; flex-shrink: 0; }
.fq-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,.3); pointer-events: none; }
.fq-search { width: 340px; padding: 14px 44px 14px 46px; background: rgba(255,255,255,.08); border: 1.5px solid rgba(255,255,255,.15); border-radius: 50px; font-size: 15px; font-family: var(--font); color: #fff; outline: none; transition: border-color .15s; }
.fq-search::placeholder { color: rgba(255,255,255,.3); }
.fq-search:focus { border-color: var(--accent); }
.fq-search-clear { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: rgba(255,255,255,.4); display: flex; transition: color .15s; }
.fq-search-clear:hover { color: #fff; }

.fq-cat-head { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
.fq-cat-icon { width: 52px; height: 52px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); flex-shrink: 0; }

.fq-list { display: flex; flex-direction: column; gap: 10px; max-width: 900px; }
.fq-item { background: #fff; border-radius: 12px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.fq-section--gray .fq-item { background: #fff; }
.fq-section--white .fq-item { background: #f7f7f7; border-color: #ebebeb; }
.fq-item.open { border-color: var(--accent); }
.fq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; line-height: 1.3; }
.fq-arrow { flex-shrink: 0; color: var(--gray); }
.fq-item.open .fq-arrow { color: var(--accent); }
.fq-item__a { max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 20px; }
.fq-item.open .fq-item__a { max-height: 300px; padding: 0 20px 16px; }

.fq-empty { text-align: center; padding: 48px 20px; }
.fq-empty__icon { color: var(--gray); margin: 0 auto 14px; display: block; }
.fq-empty__text { font-size: 15px; color: var(--gray); }
.fq-empty__reset { background: none; border: none; cursor: pointer; color: var(--accent); font-size: 15px; font-family: var(--font); text-decoration: underline; }

.fq-cta { background: #141414; padding: 52px 0; }
.fq-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.fq-cta__title { font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.fq-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); }
.fq-cta__btns  { display: flex; gap: 12px; flex-wrap: wrap; }
.fq-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; font-size: 14px; }
.fq-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; font-size: 14px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 50px; color: #fff; cursor: pointer; text-decoration: none; transition: border-color .15s, color .15s; }
.fq-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 860px) { .fq-hero__inner { flex-direction: column; align-items: flex-start; } .fq-search { width: 100%; } .fq-search-wrap { width: 100%; } }
@media (max-width: 640px) { .fq-hero__title { font-size: 28px; } .fq-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>

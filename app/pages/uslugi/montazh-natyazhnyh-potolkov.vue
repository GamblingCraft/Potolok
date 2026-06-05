<template>
  <div itemscope itemtype="https://schema.org/Service">

    <!-- ══════════════════════════════════════
         HERO
    ══════════════════════════════════════ -->
    <section class="ms-hero">
      <div class="ms-hero__bg" :style="{ backgroundImage: `url('${service.img}')` }"></div>
      <div class="ms-hero__overlay"></div>
      <div class="container ms-hero__inner">
        <div class="ms-hero__content">
          <div class="ms-pretitle">Услуга под ключ</div>
          <h1 class="ms-hero__title" itemprop="name">
            Монтаж натяжных&nbsp;потолков в&nbsp;Иркутске
          </h1>
          <p class="ms-hero__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="price" content="159"/>
            <meta itemprop="priceCurrency" content="RUB"/>
            <meta itemprop="availability" content="https://schema.org/InStock"/>
            <strong>{{ service.price }}</strong> — монтаж включён
          </p>
          <p class="ms-hero__desc" itemprop="description">{{ service.description }}</p>
          <div class="ms-hero__facts">
            <div class="ms-fact" v-for="f in heroFacts" :key="f.text">
              <Icon :name="f.icon" size="15" class="ms-fact__icon"/>
              {{ f.text }}
            </div>
          </div>
          <form class="ms-hero__form" @submit.prevent="submitHero">
            <input v-model="formName" class="ms-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="ms-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn ms-hero__btn">
              <Icon name="lucide:calculator" size="16"/>
              Рассчитать стоимость
            </button>
          </form>
          <p class="ms-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>

        <div class="ms-hero__nums">
          <div class="ms-num" v-for="n in heroNums" :key="n.label">
            <div class="ms-num__val">{{ n.val }}</div>
            <div class="ms-num__label">{{ n.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         ЦЕНЫ
    ══════════════════════════════════════ -->
    <section class="ms-section ms-prices">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Прозрачное ценообразование</div>
          <h2 class="ms-title">Стоимость монтажа натяжных потолков</h2>
          <p class="ms-desc">Цена включает полотно, монтаж, расходники и вывоз мусора. Точная стоимость — после бесплатного замера.</p>
        </div>
        <div class="ms-price-grid">
          <div class="ms-price-card" v-for="p in priceList" :key="p.title" :class="{ 'ms-price-card--hit': p.hit }">
            <div class="ms-price-card__badge" v-if="p.hit">{{ p.hit }}</div>
            <div class="ms-price-card__icon"><Icon :name="p.icon" size="22"/></div>
            <div class="ms-price-card__title">{{ p.title }}</div>
            <div class="ms-price-card__price">от {{ p.price }} <span>₽/м²</span></div>
            <ul class="ms-price-card__list">
              <li v-for="f in p.features" :key="f">
                <Icon name="lucide:check" size="12" class="ms-check"/>{{ f }}
              </li>
            </ul>
            <button class="ms-price-card__btn" @click="callbackOpen = true">Заказать</button>
          </div>
        </div>
        <div class="ms-price-note">
          <Icon name="lucide:info" size="14"/>
          Монтаж многоуровневых конструкций, парящих ниш и световых линий рассчитывается индивидуально. Вызовите замерщика — это бесплатно.
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         ЧТО ВХОДИТ В МОНТАЖ
    ══════════════════════════════════════ -->
    <section class="ms-section ms-included">
      <div class="container">
        <div class="ms-two-col">
          <div class="ms-two-col__text">
            <div class="ms-pretitle ms-pretitle--dark">Всё включено</div>
            <h2 class="ms-title ms-title--left">Что входит в стоимость монтажа</h2>
            <p class="ms-body-text">Никаких скрытых платежей — цена, которую вы видите в договоре, совпадает с итоговым чеком. Весь комплекс работ выполняется нашими мастерами без привлечения субподрядчиков.</p>
            <div class="ms-include-grid">
              <div class="ms-include-item" v-for="item in includedItems" :key="item.title">
                <div class="ms-include-item__icon"><Icon :name="item.icon" size="20"/></div>
                <div>
                  <div class="ms-include-item__title">{{ item.title }}</div>
                  <div class="ms-include-item__desc">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-two-col__aside">
            <div class="ms-aside-card">
              <div class="ms-aside-card__title">Вызвать замерщика</div>
              <p class="ms-aside-card__desc">Замерщик приедет бесплатно, покажет образцы, рассчитает стоимость и оформит договор</p>
              <ul class="ms-aside-list">
                <li v-for="i in asideItems" :key="i"><Icon name="lucide:check-circle" size="14" class="ms-check"/>{{ i }}</li>
              </ul>
              <button class="nav-btn ms-aside-card__btn" @click="callbackOpen = true">
                <Icon name="lucide:phone-call" size="15"/>
                Заказать звонок
              </button>
              <NuxtLink to="/kalkulyator" class="ms-aside-card__calc">
                <Icon name="lucide:calculator" size="14"/>
                Рассчитать онлайн
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         ЭТАПЫ МОНТАЖА — HowTo schema
    ══════════════════════════════════════ -->
    <section class="ms-section ms-steps" itemscope itemtype="https://schema.org/HowTo">
      <meta itemprop="name" content="Этапы монтажа натяжных потолков в Иркутске"/>
      <meta itemprop="description" content="Пошаговый процесс монтажа натяжного потолка от вызова замерщика до финального осмотра"/>
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--light">Процесс работы</div>
          <h2 class="ms-title ms-title--light">Этапы монтажа натяжного потолка</h2>
          <p class="ms-desc ms-desc--light">От звонка до готового потолка — прозрачно, чётко, по договору</p>
        </div>
        <div class="ms-steps-grid">
          <div
            class="ms-step"
            v-for="(step, i) in steps" :key="step.title"
            itemprop="step" itemscope itemtype="https://schema.org/HowToStep"
          >
            <meta itemprop="position" :content="String(i + 1)"/>
            <meta itemprop="name" :content="step.title"/>
            <meta itemprop="text" :content="step.desc"/>
            <div class="ms-step__num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="ms-step__icon"><Icon :name="step.icon" size="24"/></div>
            <div class="ms-step__title" itemprop="name">{{ step.title }}</div>
            <div class="ms-step__desc">{{ step.desc }}</div>
            <div class="ms-step__time" v-if="step.time">
              <Icon name="lucide:clock" size="12"/>{{ step.time }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         ПОЧЕМУ МЫ
    ══════════════════════════════════════ -->
    <section class="ms-section ms-why">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Наши преимущества</div>
          <h2 class="ms-title">Почему иркутяне выбирают ПроПотолок</h2>
        </div>
        <div class="ms-why-grid">
          <div class="ms-why-card" v-for="w in whyCards" :key="w.title">
            <div class="ms-why-card__icon"><Icon :name="w.icon" size="22"/></div>
            <div class="ms-why-card__title">{{ w.title }}</div>
            <div class="ms-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         КАЛЬКУЛЯТОР
    ══════════════════════════════════════ -->
    <!-- ══════════════════════════════════════
         CTA (перед FAQ)
    ══════════════════════════════════════ -->
    <section class="ms-cta ms-cta--mid">
      <div class="container ms-cta__inner">
        <div>
          <h2 class="ms-cta__title">Готовы заказать монтаж?</h2>
          <p class="ms-cta__desc">Позвоните или оставьте заявку — выезд замерщика бесплатно в любой район Иркутска</p>
        </div>
        <div class="ms-cta__btns">
          <button class="nav-btn ms-cta__btn" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>
            Заказать звонок
          </button>
          <NuxtLink to="/kalkulyator" class="ms-cta__outline">
            <Icon name="lucide:calculator" size="16"/>
            Калькулятор
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         FAQ — FAQPage schema
    ══════════════════════════════════════ -->
    <section class="ms-section ms-faq" itemscope itemtype="https://schema.org/FAQPage">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Вопросы и ответы</div>
          <h2 class="ms-title">Часто задаваемые вопросы о монтаже</h2>
        </div>
        <div class="ms-faq-list">
          <div
            class="ms-faq-item"
            v-for="(q, i) in faqItems" :key="q.q"
            itemprop="mainEntity" itemscope itemtype="https://schema.org/Question"
            :class="{ open: faqOpen === i }"
            @click="faqOpen = faqOpen === i ? -1 : i"
          >
            <div class="ms-faq-item__q" itemprop="name">
              {{ q.q }}
              <Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="ms-faq-item__arrow"/>
            </div>
            <div class="ms-faq-item__a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
              <div itemprop="text">{{ q.a }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SEO-ТЕКСТ
    ══════════════════════════════════════ -->
    <section class="ms-section ms-seo">
      <div class="container">
        <div class="ms-seo-inner">
          <div class="ms-seo-content">
            <h2>Монтаж натяжных потолков в Иркутске — профессионально и под ключ</h2>
            <p>Компания <strong>ПроПотолок</strong> выполняет монтаж натяжных потолков в Иркутске с 2009 года. За это время мы реализовали более 4 000 проектов — от простых однокомнатных квартир до сложных многоуровневых конструкций в офисах и торговых центрах.</p>
            <h3>Технология монтажа в 2026 году</h3>
            <p>Современные натяжные потолки монтируются методом холодного натяжения — без нагрева тепловой пушкой. Это позволяет работать в жилых помещениях без выноса мебели. Полотна европейских производителей (MSD, Bauf, Descor) соответствуют ГОСТ Р 57958-2017 и имеют санитарно-эпидемиологическое заключение.</p>
            <h3>Монтаж за 1 день</h3>
            <p>Стандартная квартира (2–3 комнаты) монтируется за 4–6 часов. Мастера работают аккуратно: застилают мебель плёнкой, убирают за собой рабочее место. После завершения вы получаете готовый потолок и подписываете акт выполненных работ.</p>
            <h3>Гарантия по договору</h3>
            <p>На все работы и материалы выдаётся письменная гарантия сроком 12 лет. В случае обнаружения дефектов — устраним бесплатно в течение 3 рабочих дней. Полотна сертифицированы и рассчитаны на срок службы 25+ лет при соблюдении условий эксплуатации.</p>
            <h3>Районы обслуживания</h3>
            <p>Работаем во всех районах Иркутска: Свердловский, Октябрьский, Правобережный, Ленинский округа. Выезжаем в пригород: Шелехов, Ангарск, Усолье-Сибирское. Стоимость выезда за пределы города обсуждается индивидуально.</p>
          </div>
          <div class="ms-seo-links">
            <div class="ms-seo-links__title">Другие наши услуги</div>
            <nav>
              <NuxtLink v-for="l in seoLinks" :key="l.to" :to="l.to" class="ms-seo-link">
                <Icon name="lucide:arrow-right" size="13"/>{{ l.label }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen"/>

  </div>
</template>

<script setup lang="ts">
import { services } from '~/data/services'

const service = services.find(s => s.slug === 'montazh-natyazhnyh-potolkov')!

useHead({
  title: 'Монтаж натяжных потолков в Иркутске — от 159 ₽/м² под ключ | ПроПотолок',
  meta: [
    { name: 'description', content: 'Профессиональный монтаж натяжных потолков в Иркутске от 159 ₽/м². Монтаж за 1 день, без предоплаты, гарантия 12 лет по договору. Бесплатный замер в день обращения.' },
    { property: 'og:title', content: 'Монтаж натяжных потолков в Иркутске — от 159 ₽/м² | ПроПотолок' },
    { property: 'og:description', content: 'Монтаж натяжных потолков за 1 день. Цена от 159 ₽/м², гарантия 12 лет, бесплатный замер.' },
    { property: 'og:type', content: 'website' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Монтаж натяжных потолков',
        description: 'Профессиональный монтаж натяжных потолков в Иркутске. Все виды: одноуровневые, многоуровневые, парящие, с подсветкой.',
        provider: {
          '@type': 'LocalBusiness',
          name: 'ПроПотолок',
          address: { '@type': 'PostalAddress', addressLocality: 'Иркутск', addressRegion: 'Иркутская область', addressCountry: 'RU' },
          telephone: '+73952000000',
          url: 'https://прopotolok.ru',
          priceRange: '₽₽',
        },
        areaServed: { '@type': 'City', name: 'Иркутск' },
        offers: { '@type': 'Offer', price: '159', priceCurrency: 'RUB', availability: 'https://schema.org/InStock' },
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Виды монтажа натяжных потолков' },
      }),
    },
  ],
})

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')

const heroFacts = [
  { icon: 'lucide:shield-check',  text: 'Гарантия 12 лет' },
  { icon: 'lucide:clock',         text: 'Монтаж за 1 день' },
  { icon: 'lucide:banknote',      text: 'Без предоплаты' },
  { icon: 'lucide:ruler',         text: 'Замер бесплатно' },
  { icon: 'lucide:leaf',          text: 'Без запаха' },
]

const heroNums = [
  { val: '4 000+', label: 'объектов сдано' },
  { val: '12 лет', label: 'гарантия' },
  { val: '1 день', label: 'монтаж' },
  { val: '15 лет', label: 'опыт работы' },
]

const priceList = [
  {
    title: 'Матовый / Глянцевый',
    price: 159,
    icon: 'lucide:square',
    hit: 'Хит',
    features: ['Одноуровневый', 'ПВХ-полотно', 'Монтаж включён', 'Маскировочная лента'],
  },
  {
    title: 'Сатиновый',
    price: 189,
    icon: 'lucide:sparkles',
    hit: null,
    features: ['Шелковистая фактура', 'Без бликов', 'Монтаж включён', 'Маскировочная лента'],
  },
  {
    title: 'Тканевый',
    price: 319,
    icon: 'lucide:layers',
    hit: null,
    features: ['Без нагрева', 'Дышащий материал', 'Монтаж включён', 'Маскировочная лента'],
  },
  {
    title: 'Парящий потолок',
    price: 350,
    icon: 'lucide:lamp-ceiling',
    hit: 'Тренд',
    features: ['Световая ниша', 'Скрытая подсветка', 'Монтаж включён', 'Профиль в подарок'],
  },
  {
    title: 'Двухуровневый',
    price: 450,
    icon: 'lucide:layout-panel-top',
    hit: null,
    features: ['Любая конфигурация', 'Подсветка опционально', 'Монтаж включён', 'Договор'],
  },
  {
    title: 'С фотопечатью',
    price: 550,
    icon: 'lucide:image',
    hit: null,
    features: ['УФ-печать', 'Любой рисунок', 'Монтаж включён', 'Индивидуальный дизайн'],
  },
]

const includedItems = [
  { icon: 'lucide:ruler',          title: 'Замер',                 desc: 'Точные обмеры помещения специалистом, составление технического плана' },
  { icon: 'lucide:file-text',      title: 'Договор',               desc: 'Письменный договор с фиксированной ценой и сроками — без доплат' },
  { icon: 'lucide:truck',          title: 'Доставка материалов',   desc: 'Полотно, профиль, расходники — всё привозим в день монтажа' },
  { icon: 'lucide:hammer',         title: 'Монтаж полотна',        desc: 'Установка багета, натяжка полотна, заправка, прорезка отверстий' },
  { icon: 'lucide:zap',            title: 'Установка светильников', desc: 'Устанавливаем точечные светильники и люстры — входит в стоимость' },
  { icon: 'lucide:trash-2',        title: 'Уборка',                desc: 'Убираем строительный мусор, застилаем и снимаем защитную плёнку' },
]

const asideItems = [
  'Выезд замерщика бесплатно',
  'Монтаж в удобное время',
  'Работаем в выходные',
  'Оплата после приёмки',
  'Гарантия 12 лет',
]

const steps = [
  { icon: 'lucide:phone-call',      title: 'Заявка',              desc: 'Оставьте заявку на сайте или позвоните. Согласуем удобное время для выезда замерщика — в тот же день.',              time: '5 минут' },
  { icon: 'lucide:ruler',           title: 'Бесплатный замер',    desc: 'Специалист приедет, произведёт точные обмеры, покажет образцы полотен, поможет выбрать цвет и фактуру.',             time: 'В день обращения' },
  { icon: 'lucide:file-signature',  title: 'Договор',             desc: 'Фиксируем стоимость, материалы и сроки в договоре. Никакой предоплаты — только после завершения работ.',            time: 'На месте' },
  { icon: 'lucide:package',         title: 'Изготовление полотна', desc: 'Полотно изготавливается точно по вашим размерам. Доставляем на объект в согласованный день монтажа.',               time: '1–3 дня' },
  { icon: 'lucide:hammer',          title: 'Монтаж',              desc: 'Мастера устанавливают потолок аккуратно и быстро. Средний срок монтажа квартиры — 4–6 часов.',                        time: '1 день' },
  { icon: 'lucide:clipboard-check', title: 'Приёмка и оплата',   desc: 'Вы осматриваете готовую работу, подписываете акт и производите оплату. Выдаём гарантийный талон.',                   time: 'После монтажа' },
]

const whyCards = [
  { icon: 'lucide:badge-check',   title: 'Сертифицированные материалы', desc: 'Работаем только с европейскими полотнами MSD, Bauf, Descor — все сертификаты в наличии, соответствие ГОСТ.' },
  { icon: 'lucide:users',         title: 'Опытные мастера',              desc: 'Монтажники с опытом от 5 лет, прошедшие обучение у производителей. Работаем без субподрядчиков.' },
  { icon: 'lucide:clock',         title: 'Монтаж за 1 день',             desc: 'Стандартную квартиру монтируем за 4–6 часов. Выезжаем в удобное для вас время, включая выходные.' },
  { icon: 'lucide:shield',        title: 'Гарантия 12 лет',              desc: 'Письменная гарантия на полотно и монтажные работы. Все обязательства зафиксированы в договоре.' },
  { icon: 'lucide:leaf',          title: 'Чистая работа',                desc: 'Монтаж без запаха — метод холодного натяжения. Не нужно выносить мебель. Убираем за собой.' },
  { icon: 'lucide:credit-card',   title: 'Оплата после',                 desc: 'Никакой предоплаты. Платите только после приёмки готовой работы: наличными, картой или переводом.' },
]

const faqItems = [
  { q: 'Сколько стоит монтаж натяжного потолка в Иркутске?', a: 'Стоимость монтажа натяжного потолка в Иркутске начинается от 159 ₽/м² — цена включает полотно, монтаж, расходники и уборку. Точная стоимость рассчитывается после бесплатного замера с учётом площади, сложности конструкции, фактуры и цвета полотна.' },
  { q: 'Сколько времени занимает монтаж?', a: 'Монтаж стандартной комнаты 15–20 м² занимает 2–3 часа. Квартира из 3 комнат — 4–6 часов. Многоуровневые конструкции и парящие потолки монтируются за 1–2 дня в зависимости от сложности.' },
  { q: 'Нужно ли выносить мебель перед монтажем?', a: 'Нет. Мы работаем методом холодного натяжения без тепловой пушки, поэтому мебель двигать не нужно. Мастера накроют её защитной плёнкой и снимут после завершения работ.' },
  { q: 'Какая гарантия на натяжной потолок?', a: 'Мы выдаём письменную гарантию на полотно и монтажные работы сроком 12 лет. Европейские полотна рассчитаны на срок службы 25+ лет. При обнаружении дефекта — устраним бесплатно в течение 3 рабочих дней.' },
  { q: 'Можно ли монтировать натяжной потолок в ванной и на кухне?', a: 'Да. Натяжные потолки — влагостойкие и подходят для кухни, ванной и санузла. При затоплении полотно удерживает воду (до 100 л/м²) и после её слива принимает первоначальную форму без следов.' },
  { q: 'Работаете ли вы в пригороде Иркутска?', a: 'Да. Выезжаем в Шелехов, Ангарск, Усолье-Сибирское, Иркутский район. Стоимость выезда за пределы города обсуждается при оформлении заявки.' },
  { q: 'Как проходит оплата?', a: 'Предоплата не требуется. Оплата производится после завершения всех работ и вашей приёмки. Принимаем наличные, банковские карты и безналичный перевод для юридических лиц.' },
]

const seoLinks = [
  { to: '/uslugi/vyezd-zamershchika',             label: 'Бесплатный замер' },
  { to: '/uslugi/demontazh-natyazhnogo-potolka',  label: 'Демонтаж натяжного потолка' },
  { to: '/uslugi/remont-natyazhnogo-potolka',     label: 'Ремонт натяжного потолка' },
  { to: '/uslugi/sliv-vody-s-natyazhnogo-potolka', label: 'Слив воды с потолка' },
  { to: '/uslugi/zamena-polotna',                 label: 'Замена полотна' },
  { to: '/uslugi/ustanovka-svetilnikov',          label: 'Установка светильников' },
  { to: '/uslugi/srochnyj-montazh-24-chasa',      label: 'Срочный монтаж 24 часа' },
]

function maskPhone(e: Event) {
  const input = e.target as HTMLInputElement
  let val = input.value.replace(/\D/g, '')
  if (val.startsWith('7') || val.startsWith('8')) val = val.slice(1)
  val = '7' + val.slice(0, 10)
  let r = '+7'
  if (val.length > 1) r += ' (' + val.slice(1, 4)
  if (val.length >= 4) r += ') ' + val.slice(4, 7)
  if (val.length >= 7) r += '-' + val.slice(7, 9)
  if (val.length >= 9) r += '-' + val.slice(9, 11)
  input.value = r; return r
}

function submitHero() {
  callbackOpen.value = true
}
</script>

<style scoped>
/* ═══ Переменные и утилиты ═══ */
.ms-pretitle {
  display: inline-block;
  font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 14px;
  text-transform: uppercase; letter-spacing: .5px;
}
.ms-pretitle--dark  { background: var(--accent); color: var(--dark); }
.ms-pretitle--light { background: rgba(245,200,0,.15); color: var(--accent); }

.ms-head { text-align: center; margin-bottom: 44px; }
.ms-title { font-size: 34px; font-weight: 800; color: var(--dark); margin: 0 0 12px; line-height: 1.2; }
.ms-title--left  { text-align: left; }
.ms-title--light { color: #fff; }
.ms-desc  { font-size: 16px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }
.ms-desc--light { color: rgba(255,255,255,.5); }
.ms-check { color: var(--accent); flex-shrink: 0; }
.ms-body-text { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 24px; }

.ms-section { padding: 72px 0; }

/* ═══ HERO ═══ */
.ms-hero {
  position: relative;
  min-height: 520px;
  display: flex; align-items: center;
}
.ms-hero__bg {
  position: absolute; inset: 0;
  background-image: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80');
  background-size: cover; background-position: center;
  z-index: 0;
}
.ms-hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.3) 100%);
  z-index: 1;
}
.ms-hero__inner {
  position: relative; z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px; align-items: center;
  padding-top: 60px; padding-bottom: 60px;
}
.ms-hero__content { max-width: 620px; }
.ms-hero__title {
  font-size: 44px; font-weight: 900; color: #fff;
  line-height: 1.15; margin-bottom: 10px;
}
.ms-hero__price {
  font-size: 20px; color: rgba(255,255,255,.7);
  margin-bottom: 16px; line-height: 1.4;
}
.ms-hero__price strong { color: var(--accent); }
.ms-hero__desc {
  font-size: 16px; color: rgba(255,255,255,.65);
  line-height: 1.65; margin-bottom: 24px;
}

.ms-hero__facts { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
.ms-fact { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.6); }
.ms-fact__icon { color: var(--accent); }

.ms-hero__form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.ms-inp {
  flex: 1; min-width: 160px;
  padding: 13px 16px; border: none; border-radius: 10px;
  font-size: 15px; font-family: var(--font); color: var(--dark);
  outline: none; background: rgba(255,255,255,.95);
}
.ms-inp:focus { background: #fff; }
.ms-hero__btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; font-size: 15px; border-radius: 10px; white-space: nowrap;
}
.ms-policy { font-size: 11px; color: rgba(255,255,255,.35); margin: 0; }

.ms-hero__nums { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ms-num {
  background: rgba(255,255,255,.08); backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 14px; padding: 18px 20px; text-align: center; min-width: 130px;
}
.ms-num__val   { font-size: 26px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 5px; }
.ms-num__label { font-size: 12px; color: rgba(255,255,255,.45); line-height: 1.3; }

/* ═══ ЦЕНЫ ═══ */
.ms-prices { background: #f7f7f7; }
.ms-price-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.ms-price-card {
  background: #fff; border-radius: 18px;
  padding: 26px 22px;
  border: 2px solid transparent;
  position: relative;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.ms-price-card:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 28px rgba(245,200,0,.15);
  transform: translateY(-3px);
}
.ms-price-card--hit { border-color: var(--accent); }
.ms-price-card__badge {
  position: absolute; top: -10px; left: 22px;
  background: var(--accent); color: var(--dark);
  font-size: 10px; font-weight: 800;
  padding: 3px 10px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: .5px;
}
.ms-price-card__icon {
  width: 48px; height: 48px;
  background: rgba(245,200,0,.12); border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark); margin-bottom: 14px;
  transition: background .2s;
}
.ms-price-card:hover .ms-price-card__icon { background: var(--accent); }
.ms-price-card__title { font-size: 17px; font-weight: 800; color: var(--dark); margin-bottom: 6px; }
.ms-price-card__price {
  font-size: 28px; font-weight: 900; color: var(--dark);
  margin-bottom: 16px; font-family: 'Gilroy', sans-serif;
}
.ms-price-card__price span { font-size: 16px; font-weight: 600; color: var(--gray); }
.ms-price-card__list {
  list-style: none; padding: 0; margin: 0 0 20px;
  display: flex; flex-direction: column; gap: 7px;
}
.ms-price-card__list li { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #555; }
.ms-price-card__btn {
  display: block; width: 100%;
  padding: 11px; border-radius: 10px;
  font-size: 14px; font-weight: 700; font-family: var(--font);
  background: var(--accent); border: none; cursor: pointer; color: var(--dark);
  transition: background .15s;
}
.ms-price-card__btn:hover { background: var(--accent-hover); }
.ms-price-note {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--gray);
  background: #fff; border-radius: 10px;
  padding: 14px 18px; border: 1px solid #eee;
}

/* ═══ ЧТО ВХОДИТ ═══ */
.ms-included { background: #fff; }
.ms-two-col {
  display: grid; grid-template-columns: 1fr 300px;
  gap: 56px; align-items: start;
}
.ms-include-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.ms-include-item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 18px;
  background: #f7f7f7; border-radius: 14px;
  border: 1.5px solid transparent;
  transition: border-color .15s;
}
.ms-include-item:hover { border-color: var(--accent); }
.ms-include-item__icon {
  width: 42px; height: 42px; flex-shrink: 0;
  background: var(--accent); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark);
}
.ms-include-item__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.ms-include-item__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }

.ms-aside-card {
  background: #f7f7f7; border-radius: 18px;
  padding: 26px; border: 1.5px solid #ececec;
  position: sticky; top: 100px;
}
.ms-aside-card__title { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.ms-aside-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.55; margin-bottom: 18px; }
.ms-aside-list {
  list-style: none; padding: 0; margin: 0 0 20px;
  display: flex; flex-direction: column; gap: 9px;
}
.ms-aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: #444; }
.ms-aside-card__btn {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; width: 100%; padding: 13px; font-size: 14px; margin-bottom: 10px;
}
.ms-aside-card__calc {
  display: flex; align-items: center; justify-content: center;
  gap: 7px; font-size: 14px; font-weight: 600; color: var(--gray);
  text-decoration: none; transition: color .15s;
}
.ms-aside-card__calc:hover { color: var(--dark); }

/* ═══ ЭТАПЫ ═══ */
.ms-steps { background: #141414; }
.ms-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ms-step {
  background: #1e1e1e; border: 1px solid #2a2a2a;
  border-radius: 18px; padding: 26px 22px;
  position: relative;
  transition: border-color .2s;
}
.ms-step:hover { border-color: var(--accent); }
.ms-step__num {
  position: absolute; top: 18px; right: 18px;
  font-size: 36px; font-weight: 900;
  color: rgba(245,200,0,.08);
  font-family: 'Gilroy', sans-serif;
  line-height: 1;
}
.ms-step__icon {
  width: 50px; height: 50px;
  background: rgba(245,200,0,.12); border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); margin-bottom: 16px;
  transition: background .2s;
}
.ms-step:hover .ms-step__icon { background: var(--accent); color: var(--dark); }
.ms-step__title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.ms-step__desc  { font-size: 13px; color: rgba(255,255,255,.45); line-height: 1.6; margin-bottom: 12px; }
.ms-step__time {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 700;
  color: var(--accent);
  background: rgba(245,200,0,.1);
  padding: 3px 10px; border-radius: 20px;
}

/* ═══ ПОЧЕМУ МЫ ═══ */
.ms-why { background: #fff; }
.ms-why-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ms-why-card {
  background: #f7f7f7; border-radius: 16px; padding: 26px 22px;
  border: 1.5px solid transparent;
  transition: border-color .15s, box-shadow .15s;
}
.ms-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.ms-why-card__icon {
  width: 50px; height: 50px; background: var(--accent);
  border-radius: 14px; display: flex; align-items: center; justify-content: center;
  color: var(--dark); margin-bottom: 14px;
}
.ms-why-card__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.ms-why-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

/* ═══ FAQ ═══ */
.ms-faq { background: #f7f7f7; }
.ms-faq-list { display: flex; flex-direction: column; gap: 10px; max-width: 860px; margin: 0 auto; }
.ms-faq-item {
  background: #fff; border-radius: 14px;
  border: 1.5px solid #eee;
  overflow: hidden; cursor: pointer;
  transition: border-color .15s;
}
.ms-faq-item.open { border-color: var(--accent); }
.ms-faq-item__q {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
  font-size: 15px; font-weight: 700; color: var(--dark);
  user-select: none;
}
.ms-faq-item__arrow { flex-shrink: 0; color: var(--gray); transition: transform .2s; }
.ms-faq-item.open .ms-faq-item__arrow { color: var(--accent); }
.ms-faq-item__a {
  max-height: 0; overflow: hidden;
  transition: max-height .3s ease, padding .3s;
  font-size: 14px; color: #555; line-height: 1.7;
  padding: 0 22px;
}
.ms-faq-item.open .ms-faq-item__a {
  max-height: 300px;
  padding: 0 22px 18px;
}

/* ═══ SEO ТЕКСТ ═══ */
.ms-seo { background: #fff; }
.ms-seo-inner { display: grid; grid-template-columns: 1fr 240px; gap: 56px; align-items: start; }
.ms-seo-content h2 { font-size: 22px; font-weight: 800; color: var(--dark); margin: 0 0 14px; }
.ms-seo-content h3 { font-size: 16px; font-weight: 700; color: var(--dark); margin: 20px 0 8px; }
.ms-seo-content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.ms-seo-content strong { color: var(--dark); }
.ms-seo-links { position: sticky; top: 100px; }
.ms-seo-links__title { font-size: 14px; font-weight: 800; color: var(--dark); margin-bottom: 14px; text-transform: uppercase; letter-spacing: .4px; }
.ms-seo-link {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 0;
  font-size: 14px; font-weight: 500; color: var(--gray);
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  transition: color .15s, padding-left .15s;
}
.ms-seo-link:hover { color: var(--dark); padding-left: 4px; }

/* ═══ CTA ═══ */
.ms-cta { background: #141414; padding: 64px 0; }
.ms-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ms-cta__title { font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.ms-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; }
.ms-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.ms-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.ms-cta__outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; font-size: 15px; font-weight: 700; font-family: var(--font);
  background: none; border: 2px solid rgba(255,255,255,.2);
  border-radius: 10px; color: #fff; cursor: pointer;
  text-decoration: none; transition: border-color .15s, color .15s;
}
.ms-cta__outline:hover { border-color: var(--accent); color: var(--accent); }

/* ═══ Responsive ═══ */
@media (max-width: 1100px) {
  .ms-hero__inner { grid-template-columns: 1fr; }
  .ms-hero__nums  { grid-template-columns: repeat(4, 1fr); }
  .ms-price-grid  { grid-template-columns: repeat(2, 1fr); }
  .ms-steps-grid  { grid-template-columns: repeat(2, 1fr); }
  .ms-why-grid    { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 860px) {
  .ms-two-col    { grid-template-columns: 1fr; }
  .ms-aside-card { position: static; }
  .ms-seo-inner  { grid-template-columns: 1fr; }
  .ms-seo-links  { position: static; }
}
@media (max-width: 640px) {
  .ms-hero__title { font-size: 30px; }
  .ms-hero__nums  { grid-template-columns: repeat(2, 1fr); }
  .ms-hero__form  { flex-direction: column; }
  .ms-inp, .ms-hero__btn { width: 100%; }
  .ms-price-grid  { grid-template-columns: 1fr; }
  .ms-include-grid { grid-template-columns: 1fr; }
  .ms-steps-grid  { grid-template-columns: 1fr; }
  .ms-why-grid    { grid-template-columns: 1fr; }
  .ms-title       { font-size: 26px; }
  .ms-cta__inner  { flex-direction: column; align-items: flex-start; }
}
</style>

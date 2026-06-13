<template>
  <div>

    <!-- ═══ HERO ═══ -->
    <section class="ab-hero">
      <div class="container ab-hero__inner">
        <div class="ab-hero__content">
          <div class="ab-pretitle">О нас</div>
          <h1 class="ab-hero__title">ПроПотолок — натяжные потолки полного цикла в Иркутске</h1>
          <p class="ab-hero__desc">
            Берём на себя всё: консультация, замер, подбор материала, монтаж и гарантия. Вы просто выбираете потолок — мы делаем остальное.
          </p>
          <div class="ab-hero__cta">
            <NuxtLink to="/kalkulyator" class="nav-btn ab-hero__btn">
              <Icon name="lucide:calculator" size="16"/>
              Рассчитать стоимость
            </NuxtLink>
            <button class="ab-hero__btn-ghost" @click="callbackOpen = true">
              <Icon name="lucide:phone-call" size="16"/>
              Заказать звонок
            </button>
          </div>
        </div>
        <div class="ab-hero__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
            alt="Натяжные потолки ПроПотолок Иркутск"
            class="ab-hero__img"
          />
          <div class="ab-hero__img-badge">
            <div class="ab-hero__img-badge-val">15+</div>
            <div class="ab-hero__img-badge-label">лет на рынке</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ЦИФРЫ ═══ -->
    <section class="ab-stats">
      <div class="container ab-stats__grid">
        <div v-for="s in stats" :key="s.val" class="ab-stat">
          <div class="ab-stat__icon"><Icon :name="s.icon" size="22"/></div>
          <div class="ab-stat__val">{{ s.val }}</div>
          <div class="ab-stat__label">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- ═══ О КОМПАНИИ ═══ -->
    <section class="ab-section ab-section--white">
      <div class="container ab-about">
        <div class="ab-about__content">
          <div class="ab-section-pretitle">Кто мы</div>
          <h2 class="ab-section-title">Профессиональная установка натяжных потолков с 2009 года</h2>

          <p>Мы начали работу в Иркутске в 2009 году с небольшой команды из трёх мастеров. Сегодня ПроПотолок — это слаженная команда специалистов, которые ежегодно устанавливают сотни потолков в квартирах, домах и офисах города.</p>

          <p>Работаем по принципу полного цикла: один звонок — и мы берём на себя всё. Бесплатный выезд замерщика с образцами, расчёт стоимости на месте, заключение договора с фиксированной ценой, монтаж в согласованный день и гарантия на 12 лет.</p>

          <p>За 15 лет мы установили потолки более чем в 4 000 помещениях. Среди наших клиентов — жильцы типовых квартир, владельцы частных домов, офисы и коммерческие объекты. Каждый проект — от простого матового потолка до многоуровневой конструкции с дизайнерской подсветкой — выполняется с одинаковым вниманием к деталям.</p>

          <div class="ab-about__highlights">
            <div class="ab-highlight" v-for="h in highlights" :key="h.text">
              <Icon name="lucide:check-circle" size="16" class="ab-highlight__icon"/>
              {{ h.text }}
            </div>
          </div>
        </div>

        <div class="ab-about__aside">
          <!-- Таймлайн -->
          <div class="ab-timeline">
            <div class="ab-timeline__title">Наш путь</div>
            <div v-for="item in timeline" :key="item.year" class="ab-timeline__item">
              <div class="ab-timeline__year">{{ item.year }}</div>
              <div class="ab-timeline__text">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ПРЕИМУЩЕСТВА ═══ -->
    <section class="ab-section ab-section--gray">
      <div class="container">
        <div class="ab-section-head">
          <div class="ab-section-pretitle ab-section-pretitle--dark">Почему выбирают нас</div>
          <h2 class="ab-section-title">6 причин доверить нам свой потолок</h2>
        </div>
        <div class="ab-why-grid">
          <div v-for="w in why" :key="w.title" class="ab-why-card">
            <div class="ab-why-card__icon">
              <Icon :name="w.icon" size="24"/>
            </div>
            <h3 class="ab-why-card__title">{{ w.title }}</h3>
            <p class="ab-why-card__desc">{{ w.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ КАК МЫ РАБОТАЕМ ═══ -->
    <section class="ab-section ab-section--dark">
      <div class="container">
        <div class="ab-section-head">
          <div class="ab-section-pretitle">Процесс работы</div>
          <h2 class="ab-section-title ab-section-title--light">От заявки до готового потолка</h2>
          <p class="ab-section-desc ab-section-desc--light">Прозрачный процесс — вы знаете каждый шаг</p>
        </div>
        <div class="ab-steps">
          <div v-for="(step, i) in steps" :key="step.title" class="ab-step">
            <div class="ab-step__num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="ab-step__icon"><Icon :name="step.icon" size="26"/></div>
            <div class="ab-step__title">{{ step.title }}</div>
            <div class="ab-step__desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ КОМАНДА ═══ -->
    <section class="ab-section ab-section--white">
      <div class="container">
        <div class="ab-section-head">
          <div class="ab-section-pretitle ab-section-pretitle--dark">Наши специалисты</div>
          <h2 class="ab-section-title">Команда профессионалов</h2>
          <p class="ab-section-desc">Минимальный опыт каждого специалиста — 5 лет в монтаже натяжных потолков</p>
        </div>
        <div class="ab-team">
          <div v-for="member in team" :key="member.name" class="ab-team-card">
            <div class="ab-team-card__avatar-wrap">
              <img :src="member.photo" :alt="member.name" class="ab-team-card__photo"/>
            </div>
            <div class="ab-team-card__name">{{ member.name }}</div>
            <div class="ab-team-card__role">{{ member.role }}</div>
            <div class="ab-team-card__exp">Опыт: {{ member.exp }}</div>
            <ul class="ab-team-card__skills">
              <li v-for="s in member.skills" :key="s">{{ s }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ПАРТНЁРЫ ═══ -->
    <section class="ab-section ab-section--gray">
      <div class="container">
        <div class="ab-section-head">
          <div class="ab-section-pretitle ab-section-pretitle--dark">Материалы</div>
          <h2 class="ab-section-title">Работаем только с проверенными брендами</h2>
          <p class="ab-section-desc">Используем европейские полотна с сертификатами качества и безопасности</p>
        </div>
        <div class="ab-brands">
          <div v-for="brand in brands" :key="brand.name" class="ab-brand">
            <div class="ab-brand__name">{{ brand.name }}</div>
            <div class="ab-brand__origin">{{ brand.origin }}</div>
            <div class="ab-brand__desc">{{ brand.desc }}</div>
          </div>
        </div>
        <div class="ab-certs">
          <div v-for="cert in certs" :key="cert" class="ab-cert">
            <Icon name="lucide:shield-check" size="14" class="ab-cert__icon"/>
            {{ cert }}
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ГАРАНТИЯ ═══ -->
    <section class="ab-section ab-section--accent">
      <div class="container ab-guarantee">
        <div class="ab-guarantee__left">
          <div class="ab-guarantee__badge">
            <Icon name="lucide:shield-check" size="36"/>
            <div>
              <div class="ab-guarantee__badge-val">12 лет</div>
              <div class="ab-guarantee__badge-label">гарантия</div>
            </div>
          </div>
          <h2 class="ab-guarantee__title">Гарантия по договору — не обещание, а обязательство</h2>
          <p class="ab-guarantee__desc">Мы фиксируем гарантийные условия в договоре. Если в течение 12 лет возникнет дефект по нашей вине — устраним бесплатно.</p>
        </div>
        <div class="ab-guarantee__items">
          <div v-for="g in guaranteeItems" :key="g.text" class="ab-guarantee__item">
            <Icon :name="g.icon" size="18" class="ab-guarantee__item-icon"/>
            <div>
              <div class="ab-guarantee__item-title">{{ g.title }}</div>
              <div class="ab-guarantee__item-text">{{ g.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="ab-cta">
      <div class="container ab-cta__inner">
        <div>
          <h2 class="ab-cta__title">Готовы обсудить ваш проект?</h2>
          <p class="ab-cta__desc">Вызовите замерщика — бесплатно приедем, покажем образцы и рассчитаем стоимость</p>
        </div>
        <div class="ab-cta__btns">
          <NuxtLink to="/portfolio" class="ab-cta__btn-outline">
            <Icon name="lucide:images" size="16"/>
            Наши работы
          </NuxtLink>
          <button class="nav-btn ab-cta__btn" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>
            Бесплатный замер
          </button>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen"/>

    <!-- Schema.org Organization -->
    <Head>
      <Script type="application/ld+json">{{ schemaOrg }}</Script>
    </Head>

  </div>
</template>

<script setup lang="ts">
usePageSeoMeta('o-kompanii')

const callbackOpen = ref(false)

const stats = [
  { icon: 'lucide:calendar',      val: '15+ лет',   label: 'на рынке Иркутска' },
  { icon: 'lucide:home',          val: '4 000+',     label: 'установленных потолков' },
  { icon: 'lucide:users',         val: '12 мастеров',label: 'в нашей команде' },
  { icon: 'lucide:shield-check',  val: '12 лет',     label: 'гарантия по договору' },
  { icon: 'lucide:star',          val: '4.9 / 5',    label: 'средний рейтинг' },
  { icon: 'lucide:clock',         val: '1 день',     label: 'срок монтажа' },
]

const highlights = [
  { text: 'Монтаж любой сложности — от простого до многоуровневого' },
  { text: 'Работаем с жилыми, коммерческими и производственными объектами' },
  { text: 'Собственные мастера в штате — не субподрядчики' },
  { text: 'Договор с фиксированной ценой до начала работ' },
]

const timeline = [
  { year: '2009', text: 'Открытие компании. Первые заказы в Иркутске.' },
  { year: '2012', text: 'Расширение команды до 5 мастеров. Выход на коммерческие объекты.' },
  { year: '2016', text: 'Партнёрство с европейскими производителями MSD, Bauf, Teqtum.' },
  { year: '2019', text: '2 000 выполненных проектов. Запуск гарантийного обслуживания.' },
  { year: '2022', text: 'Освоение технологии парящих ниш и световых линий SLOTT.' },
  { year: '2024', text: 'Более 4 000 проектов. Рейтинг 4.9 на Яндекс Картах и 2ГИС.' },
]

const why = [
  {
    icon: 'lucide:badge-check',
    title: 'Полный цикл без посредников',
    desc: 'Замерщик, менеджер и монтажники — всё в одной компании. Никаких субподрядчиков. Контролируем качество на каждом этапе.',
  },
  {
    icon: 'lucide:file-text',
    title: 'Договор с фиксированной ценой',
    desc: 'Стоимость согласовывается до начала работ и вписывается в договор. После подписания цена не меняется — никаких доплат.',
  },
  {
    icon: 'lucide:ruler',
    title: 'Бесплатный замер с образцами',
    desc: 'Замерщик приедет в удобное время с образцами всех фактур и цветов. Поможет выбрать — без давления и навязывания.',
  },
  {
    icon: 'lucide:zap',
    title: 'Монтаж за 1 день',
    desc: 'Стандартная квартира — один рабочий день. Работаем чисто: укрываем мебель, убираем за собой, не мешаем соседям.',
  },
  {
    icon: 'lucide:shield',
    title: 'Гарантия 12 лет',
    desc: 'Письменная гарантия на полотно и монтаж. Европейские материалы служат 25–30 лет. Любой гарантийный случай — за наш счёт.',
  },
  {
    icon: 'lucide:banknote',
    title: 'Оплата после монтажа',
    desc: 'Принимаем оплату только после завершения работ и вашей приёмки. Наличные, карта, безналичный расчёт.',
  },
]

const steps = [
  { icon: 'lucide:phone-call',    title: 'Заявка',        desc: 'Оставьте заявку на сайте или позвоните. Перезвоним в течение 15 минут.' },
  { icon: 'lucide:ruler',         title: 'Замер',         desc: 'Бесплатный выезд замерщика с образцами. Точные размеры, выбор материала, расчёт стоимости.' },
  { icon: 'lucide:file-check',    title: 'Договор',       desc: 'Фиксируем стоимость, сроки и гарантийные условия. Никаких устных договорённостей.' },
  { icon: 'lucide:hammer',        title: 'Монтаж',        desc: 'Выезд мастеров в согласованный день. Установка за 1 день, без пыли и мусора.' },
  { icon: 'lucide:check-circle',  title: 'Сдача',         desc: 'Принимаете работу — оплачиваете. Получаете гарантийный талон на 12 лет.' },
]

const team = [
  {
    name: 'Александр',
    role: 'Старший замерщик',
    exp: '12 лет',
    photo: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=300&h=300&fit=crop&q=80',
    skills: ['Сложные помещения', 'Дизайн-консультация', 'Коммерческие объекты'],
  },
  {
    name: 'Дмитрий',
    role: 'Ведущий монтажник',
    exp: '10 лет',
    photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&q=80',
    skills: ['Многоуровневые потолки', 'Световые линии', 'Парящие ниши'],
  },
  {
    name: 'Михаил',
    role: 'Монтажник',
    exp: '7 лет',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&q=80',
    skills: ['Стандартный монтаж', 'Ванные и кухни', 'Срочные заказы'],
  },
  {
    name: 'Ирина',
    role: 'Менеджер по заказам',
    exp: '6 лет',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80',
    skills: ['Консультации клиентов', 'Подбор материалов', 'Оформление договоров'],
  },
]

const brands = [
  { name: 'MSD',    origin: 'Испания',  desc: 'Премиальные ПВХ-полотна. Широкая цветовая палитра, высокая прочность.' },
  { name: 'Bauf',   origin: 'Германия', desc: 'Тканевые потолки без ПВХ. Гипоаллергенны, рекомендованы для детских.' },
  { name: 'Teqtum', origin: 'Россия',   desc: 'Полотна с огнестойкими и антибактериальными свойствами.' },
]

const certs = [
  'Сертификаты пожарной безопасности',
  'Гигиенические заключения',
  'Сертификаты соответствия ГОСТ',
  'Экологическая безопасность',
]

const guaranteeItems = [
  { icon: 'lucide:file-text',  title: 'Письменный договор',    text: 'Гарантийные обязательства зафиксированы документально' },
  { icon: 'lucide:tool',       title: 'Бесплатный ремонт',     text: 'Любой дефект по нашей вине устраняем за свой счёт' },
  { icon: 'lucide:phone',      title: 'Выезд в течение 24ч',   text: 'По гарантийному обращению приедем на следующий день' },
  { icon: 'lucide:layers',     title: 'На полотно и монтаж',   text: 'Гарантия распространяется на материал и работу' },
]

const schemaOrg = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ПроПотолок',
  description: 'Профессиональная установка натяжных потолков в Иркутске с 2009 года',
  foundingDate: '2009',
  url: 'https://propopotolok.ru',
  logo: 'https://propopotolok.ru/img/logo.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Иркутск',
    addressRegion: 'Иркутская область',
    addressCountry: 'RU',
  },
  areaServed: { '@type': 'City', name: 'Иркутск' },
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 12 },
  slogan: 'Натяжные потолки полного цикла',
  knowsAbout: ['Натяжные потолки', 'Монтаж потолков', 'Парящие потолки', 'Дизайн интерьера'],
}))
</script>

<style scoped>
/* ═══ Общие ═══ */
.ab-pretitle,
.ab-section-pretitle {
  display: inline-block; background: var(--accent); color: #141414;
  font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px;
  margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px;
}
.ab-section-pretitle--dark { background: var(--accent); color: var(--dark); }
.ab-section { padding: 64px 0; }
.ab-section--white  { background: #fff; }
.ab-section--gray   { background: #f7f7f7; }
.ab-section--dark   { background: #141414; }
.ab-section--accent { background: var(--dark); }

.ab-section-head   { text-align: center; margin-bottom: 44px; }
.ab-section-title  { font-size: 32px; font-weight: 800; color: var(--dark); margin: 0 0 10px; line-height: 1.2; }
.ab-section-title--light { color: #fff; }
.ab-section-desc   { font-size: 15px; color: var(--gray); max-width: 520px; margin: 0 auto; line-height: 1.6; }
.ab-section-desc--light  { color: rgba(255,255,255,.4); }

/* ═══ Hero ═══ */
.ab-hero { background: #141414; padding: 52px 0 0; overflow: hidden; }
.ab-hero__inner {
  display: grid; grid-template-columns: 1fr 480px;
  gap: 48px; align-items: end;
}
.ab-hero__content { padding-bottom: 52px; }
.ab-hero__title { font-size: 38px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 14px; }
.ab-hero__desc  { font-size: 17px; color: rgba(255,255,255,.5); max-width: 520px; line-height: 1.65; margin-bottom: 28px; }
.ab-hero__cta   { display: flex; gap: 12px; flex-wrap: wrap; }
.ab-hero__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.ab-hero__btn:hover { color: var(--dark); }
.ab-hero__btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; font-size: 15px; font-weight: 700;
  font-family: 'Gilroy', sans-serif; background: none;
  border: 2px solid rgba(255,255,255,.15); border-radius: 10px;
  color: rgba(255,255,255,.7); cursor: pointer; transition: all .15s;
}
.ab-hero__btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

.ab-hero__img-wrap { position: relative; align-self: end; }
.ab-hero__img { width: 100%; display: block; border-radius: 20px 20px 0 0; object-fit: cover; height: 420px; }
.ab-hero__img-badge {
  position: absolute; top: 20px; left: -20px;
  background: var(--accent); border-radius: 14px; padding: 14px 18px;
  text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,.3);
}
.ab-hero__img-badge-val   { font-size: 32px; font-weight: 900; color: var(--dark); font-family: 'Gilroy', sans-serif; line-height: 1; }
.ab-hero__img-badge-label { font-size: 12px; font-weight: 700; color: rgba(0,0,0,.6); }

/* ═══ Статистика ═══ */
.ab-stats { background: #1e1e1e; padding: 0; }
.ab-stats__grid {
  display: grid; grid-template-columns: repeat(6, 1fr);
  border-top: 1px solid #2a2a2a;
}
.ab-stat {
  padding: 28px 20px; text-align: center;
  border-right: 1px solid #2a2a2a;
}
.ab-stat:last-child { border-right: none; }
.ab-stat__icon { color: var(--accent); margin-bottom: 10px; display: flex; justify-content: center; }
.ab-stat__val   { font-size: 22px; font-weight: 900; color: #fff; font-family: 'Gilroy', sans-serif; line-height: 1; margin-bottom: 5px; }
.ab-stat__label { font-size: 12px; color: rgba(255,255,255,.35); line-height: 1.3; }

/* ═══ О компании ═══ */
.ab-about { display: grid; grid-template-columns: 1fr 320px; gap: 56px; align-items: start; }
.ab-about__content p { font-size: 15px; color: #555; line-height: 1.8; margin-bottom: 14px; }
.ab-about__highlights { display: flex; flex-direction: column; gap: 9px; margin-top: 24px; }
.ab-highlight { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; color: var(--dark); }
.ab-highlight__icon { color: var(--accent); flex-shrink: 0; }

/* Таймлайн */
.ab-timeline { background: #f7f7f7; border-radius: 16px; padding: 24px; position: sticky; top: 100px; }
.ab-timeline__title { font-size: 14px; font-weight: 800; color: var(--gray); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 20px; }
.ab-timeline__item { display: flex; gap: 16px; padding: 12px 0; border-bottom: 1px solid #ececec; position: relative; }
.ab-timeline__item:last-child { border-bottom: none; }
.ab-timeline__year { font-size: 15px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; min-width: 40px; }
.ab-timeline__text { font-size: 13px; color: var(--gray); line-height: 1.5; }

/* ═══ Преимущества ═══ */
.ab-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ab-why-card {
  background: #fff; border-radius: 16px; padding: 26px 24px;
  border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s;
}
.ab-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.ab-why-card__icon {
  width: 52px; height: 52px; background: var(--accent); border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark); margin-bottom: 16px;
}
.ab-why-card__title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
.ab-why-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.6; }

/* ═══ Шаги ═══ */
.ab-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; }
.ab-step {
  padding: 28px 24px; border-right: 1px solid #2a2a2a;
  position: relative;
}
.ab-step:last-child { border-right: none; }
.ab-step__num { font-size: 48px; font-weight: 900; color: rgba(255,255,255,.04); font-family: 'Gilroy', sans-serif; line-height: 1; margin-bottom: 14px; }
.ab-step__icon { color: var(--accent); margin-bottom: 12px; }
.ab-step__title { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.ab-step__desc  { font-size: 13px; color: rgba(255,255,255,.4); line-height: 1.6; }

/* ═══ Команда ═══ */
.ab-team { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 16px; }
.ab-team-card {
  background: #f7f7f7; border-radius: 16px; padding: 24px;
  border: 1.5px solid #ececec; text-align: center;
  transition: border-color .15s;
}
.ab-team-card:hover { border-color: var(--accent); }
.ab-team-card__avatar-wrap {
  width: 90px; height: 90px; border-radius: 50%;
  margin: 0 auto 16px;
  overflow: hidden;
  border: 3px solid var(--accent);
  box-shadow: 0 4px 16px rgba(0,0,0,.1);
}
.ab-team-card__photo {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.ab-team-card__name { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 4px; }
.ab-team-card__role { font-size: 13px; color: var(--gray); margin-bottom: 4px; }
.ab-team-card__exp  { font-size: 12px; font-weight: 700; color: var(--accent); margin-bottom: 12px; }
.ab-team-card__skills { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
.ab-team-card__skills li { font-size: 12px; color: var(--gray); }
.ab-team-note { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--gray); }

/* ═══ Бренды ═══ */
.ab-brands { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
.ab-brand {
  background: #fff; border-radius: 14px; padding: 24px;
  border: 1.5px solid #e8e8e8; transition: border-color .15s;
}
.ab-brand:hover { border-color: var(--accent); }
.ab-brand__name   { font-size: 24px; font-weight: 900; color: var(--dark); margin-bottom: 4px; font-family: 'Gilroy', sans-serif; }
.ab-brand__origin { font-size: 12px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 8px; }
.ab-brand__desc   { font-size: 14px; color: var(--gray); line-height: 1.55; }
.ab-certs { display: flex; flex-wrap: wrap; gap: 8px; }
.ab-cert {
  display: flex; align-items: center; gap: 6px;
  background: #fff; border: 1px solid #e8e8e8;
  border-radius: 20px; padding: 6px 14px;
  font-size: 13px; font-weight: 600; color: var(--dark);
}
.ab-cert__icon { color: var(--accent); flex-shrink: 0; }

/* ═══ Гарантия ═══ */
.ab-guarantee { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.ab-guarantee__badge { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
.ab-guarantee__badge .icon { color: var(--accent); }
.ab-guarantee__badge-val   { font-size: 40px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; line-height: 1; }
.ab-guarantee__badge-label { font-size: 14px; color: rgba(255,255,255,.4); }
.ab-guarantee__title { font-size: 26px; font-weight: 800; color: #fff; line-height: 1.25; margin-bottom: 14px; }
.ab-guarantee__desc  { font-size: 15px; color: rgba(255,255,255,.5); line-height: 1.7; }
.ab-guarantee__items { display: flex; flex-direction: column; gap: 14px; }
.ab-guarantee__item  { display: flex; align-items: flex-start; gap: 14px; }
.ab-guarantee__item-icon  { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.ab-guarantee__item-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 3px; }
.ab-guarantee__item-text  { font-size: 13px; color: rgba(255,255,255,.4); line-height: 1.5; }

/* ═══ CTA ═══ */
.ab-cta { background: var(--accent); padding: 52px 0; }
.ab-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.ab-cta__title { font-size: 28px; font-weight: 900; color: var(--dark); margin-bottom: 8px; }
.ab-cta__desc  { font-size: 15px; color: rgba(0,0,0,.55); max-width: 440px; }
.ab-cta__btns  { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.ab-cta__btn   { padding: 14px 28px; font-size: 15px; display: inline-flex; align-items: center; gap: 8px; background: var(--dark); color: #fff; }
.ab-cta__btn:hover { background: #1a1a1a; color: #fff; }
.ab-cta__btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; font-size: 15px; font-weight: 700;
  font-family: 'Gilroy', sans-serif; background: none;
  border: 2px solid rgba(0,0,0,.2); border-radius: 10px;
  color: var(--dark); text-decoration: none; cursor: pointer;
  transition: border-color .15s, background .15s;
}
.ab-cta__btn-outline:hover { border-color: var(--dark); background: rgba(0,0,0,.06); }

/* ═══ Responsive ═══ */
@media (max-width: 1200px) {
  .ab-steps  { grid-template-columns: repeat(3, 1fr); }
  .ab-stats__grid { grid-template-columns: repeat(3, 1fr); }
  .ab-stat { border-bottom: 1px solid #2a2a2a; }
}
@media (max-width: 1024px) {
  .ab-hero__inner  { grid-template-columns: 1fr; }
  .ab-hero__img-wrap { display: none; }
  .ab-hero__content { padding-bottom: 52px; }
  .ab-about  { grid-template-columns: 1fr; }
  .ab-timeline { position: static; }
  .ab-guarantee { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .ab-why-grid  { grid-template-columns: 1fr 1fr; }
  .ab-team      { grid-template-columns: 1fr 1fr; }
  .ab-brands    { grid-template-columns: 1fr; }
  .ab-steps     { grid-template-columns: 1fr 1fr; }
  .ab-hero__title { font-size: 28px; }
  .ab-section-title { font-size: 26px; }
  .ab-cta__inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .ab-stats__grid { grid-template-columns: repeat(2, 1fr); }
  .ab-why-grid    { grid-template-columns: 1fr; }
  .ab-team        { grid-template-columns: 1fr; }
  .ab-steps       { grid-template-columns: 1fr; }
  .ab-step        { border-right: none; border-bottom: 1px solid #2a2a2a; }
}
</style>

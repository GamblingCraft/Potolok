<template>
  <div itemscope itemtype="https://schema.org/Product">
    <section class="cp-hero">
      <div class="cp-hero__bg" :style="{ backgroundImage: `url('${item.img}')` }"></div>
      <div class="cp-hero__overlay"></div>
      <div class="container cp-hero__inner">
        <div class="cp-hero__content">
          <div class="cp-pretitle">Производитель полотен</div>
          <h1 class="cp-hero__title" itemprop="name">Натяжные потолки Clipso в&nbsp;Иркутске</h1>
          <p class="cp-hero__price">Акция: <span>3-й потолок в подарок!</span> Гарантия 12 лет.<br>Монтаж за 1 день. Без предоплаты.</p>
          <div class="cp-hero__price-badge" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="RUB"/><meta itemprop="price" :content="String(item.price)"/>
            от <strong>{{ item.price }} ₽/м²</strong> — монтаж включён
          </div>
          <form class="cp-hero__form" @submit.prevent="callbackOpen = true">
            <input v-model="formName" class="cp-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="cp-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn cp-hero__btn"><Icon name="lucide:calculator" size="16"/>Рассчитать стоимость</button>
          </form>
          <p class="cp-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>
      </div>
    </section>

    <section class="cp-section cp-about">
      <div class="container">
        <div class="cp-two-col">
          <div class="cp-main">
            <h2 class="cp-h2">Натяжные потолки Clipso — французское тканевое полотно</h2>
            <div class="cp-text" itemprop="description">
              <p>Clipso — французский бренд тканевых натяжных потолков, известный уникальной технологией <strong>холодного монтажа</strong>. В отличие от ПВХ-полотен, которые натягиваются с помощью тепловой пушки, Clipso монтируется без нагрева — это безопасно для мебели, обоев и отделки.</p>
              <p>Тканевое полотно Clipso дышит — оно пропускает воздух, что исключает образование конденсата. Доступны акустические варианты для офисов и кинотеатров, а также цветные полотна с натуральными красителями. Соответствует европейским противопожарным и экологическим стандартам.</p>
              <h3>Особенности полотен Clipso</h3>
              <ul class="cp-list">
                <li><strong>Холодный монтаж.</strong> Установка без тепловой пушки — безопасно для помещения, мебели и отделки.</li>
                <li><strong>Дышащее полотно.</strong> Пропускает воздух — нет конденсата, нет сырости под потолком.</li>
                <li><strong>Акустические варианты.</strong> Специальные полотна с шумопоглощающими свойствами для офисов, переговорных, кинотеатров.</li>
                <li><strong>Натуральные красители.</strong> Цветные полотна окрашены натуральными красителями — без токсичных пигментов.</li>
              </ul>
              <h3>Преимущества Clipso</h3>
              <ul class="cp-list">
                <li v-for="adv in advantages" :key="adv.title"><strong>{{ adv.title }}.</strong> {{ adv.desc }}</li>
              </ul>
            </div>
          </div>
          <aside class="cp-aside">
            <div class="cp-aside-card">
              <div class="cp-aside-card__title">Вызвать замерщика</div>
              <p class="cp-aside-card__desc">Бесплатно привезём образцы Clipso, рассчитаем стоимость и оформим договор</p>
              <div class="cp-aside-price">от <strong>{{ item.price }} ₽</strong><span>/м²</span></div>
              <ul class="cp-aside-list">
                <li v-for="i in asideItems" :key="i"><Icon name="lucide:check-circle" size="14" class="cp-check"/>{{ i }}</li>
              </ul>
              <button class="nav-btn cp-aside-btn" @click="callbackOpen = true"><Icon name="lucide:phone-call" size="15"/>Заказать звонок</button>
              <NuxtLink to="/kalkulyator" class="cp-aside-calc"><Icon name="lucide:calculator" size="14"/>Рассчитать онлайн</NuxtLink>
            </div>
            <div class="cp-aside-nav">
              <div class="cp-aside-nav__title">Другие бренды</div>
              <nav>
                <NuxtLink v-for="b in otherBrendy" :key="b.slug" :to="b.slug" class="cp-aside-nav__link" :class="{ active: b.id === item.id }">
                  <Icon name="lucide:arrow-right" size="13"/>{{ b.title }}
                </NuxtLink>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="cp-calc-cta">
      <div class="container cp-calc-cta__inner">
        <div class="cp-calc-cta__icon"><Icon name="lucide:calculator" size="28"/></div>
        <div>
          <div class="cp-calc-cta__title">Рассчитайте стоимость потолка Clipso онлайн</div>
          <p class="cp-calc-cta__desc">Укажите площадь, фактуру и дополнительные работы — калькулятор покажет цену за минуту</p>
        </div>
        <NuxtLink to="/kalkulyator" class="nav-btn cp-calc-cta__btn"><Icon name="lucide:arrow-right" size="16"/>Открыть калькулятор</NuxtLink>
      </div>
    </section>

    <section class="cp-section cp-why">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Холодный монтаж — французские технологии</div>
          <h2 class="cp-h2 cp-h2--center">Гарантия на потолки Clipso — 12 лет</h2>
        </div>
        <div class="cp-why-grid">
          <div class="cp-why-card" v-for="w in whyCards" :key="w.title">
            <div class="cp-why-card__icon"><Icon :name="w.icon" size="22"/></div>
            <div class="cp-why-card__title">{{ w.title }}</div>
            <div class="cp-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ ГАЛЕРЕЯ ══ -->
    <section class="cp-section cp-gallery" v-if="gallery.length">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Наши работы</div>
          <h2 class="cp-h2 cp-h2--center">Фото потолков Clipso</h2>
          <p class="cp-section-desc">Реальные работы наших мастеров в Иркутске — нажмите на фото для просмотра</p>
        </div>
        <div class="cp-gallery-grid">
          <div
            v-for="photo in gallery" :key="'g-'+photo.id"
            class="cp-gallery-item"
            @click="openLightbox(photo.img, photo.title)"
          >
            <img :src="photo.img" :alt="photo.title" loading="lazy" class="cp-gallery-img"/>
            <div class="cp-gallery-overlay">
              <Icon name="lucide:zoom-in" size="22"/>
              <div class="cp-gallery-caption" v-if="photo.room || photo.area">
                <span v-if="photo.room" class="cp-gallery-room">{{ photo.room }}</span>
                <span v-if="photo.area" class="cp-gallery-area">{{ photo.area }} м²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cp-section cp-faq" itemscope itemtype="https://schema.org/FAQPage">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Вопросы и ответы</div>
          <h2 class="cp-h2 cp-h2--center">Частые вопросы про потолки Clipso</h2>
        </div>
        <div class="cp-faq-list">
          <div class="cp-faq-item" v-for="(q, i) in faqItems" :key="q.q"
            itemprop="mainEntity" itemscope itemtype="https://schema.org/Question"
            :class="{ open: faqOpen === i }" @click="faqOpen = faqOpen === i ? -1 : i">
            <div class="cp-faq-item__q" itemprop="name">{{ q.q }}
              <Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="cp-faq-item__arrow"/>
            </div>
            <div class="cp-faq-item__a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
              <div itemprop="text">{{ q.a }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cp-section cp-seo">
      <div class="container">
        <div class="cp-seo-inner">
          <div class="cp-seo-content">
            <h2>Натяжные потолки Clipso в Иркутске — от 389 ₽/м² с установкой</h2>
            <p>Компания <strong>ПроПотолок</strong> предлагает монтаж тканевых натяжных потолков Clipso под ключ. Французское качество, холодный монтаж, дышащее полотно — идеально для современных интерьеров.</p>
            <h3>Почему Clipso популярен в Иркутске</h3>
            <p>Clipso выбирают за уникальный холодный монтаж, экологичность и возможность акустических решений. Это потолок для тех, кто ценит французский подход к качеству и не хочет лишнего нагрева в помещении при установке.</p>
            <h3>Монтаж Clipso в Иркутске</h3>
            <p>Устанавливаем потолки Clipso по всему Иркутску. Замер бесплатный. Монтаж комнаты до 20 м² — 2–4 часа. Оплата после приёмки работ. Гарантия 12 лет по договору.</p>
          </div>
          <div class="cp-seo-links">
            <div class="cp-seo-links__title">Смотрите также</div>
            <nav>
              <NuxtLink v-for="l in seoLinks" :key="l.to" :to="l.to" class="cp-seo-link">
                <Icon name="lucide:arrow-right" size="13"/>{{ l.label }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <section class="cp-cta">
      <div class="container cp-cta__inner">
        <div>
          <h2 class="cp-cta__title">Хотите потолок Clipso?</h2>
          <p class="cp-cta__desc">Вызовите замерщика — приедет бесплатно, привезёт образцы и рассчитает стоимость на месте</p>
        </div>
        <div class="cp-cta__btns">
          <button class="nav-btn cp-cta__btn" @click="callbackOpen = true"><Icon name="lucide:phone-call" size="16"/>Заказать звонок</button>
          <NuxtLink to="/kalkulyator" class="cp-cta__outline"><Icon name="lucide:calculator" size="16"/>Калькулятор</NuxtLink>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="lb">
        <div v-if="lightbox.open" class="cp-lightbox" @click.self="lightbox.open = false">
          <div class="cp-lightbox__box">
            <button class="cp-lightbox__close" @click="lightbox.open = false">
              <Icon name="lucide:x" size="22"/>
            </button>
            <img :src="lightbox.img" :alt="lightbox.title" class="cp-lightbox__img"/>
            <div class="cp-lightbox__title" v-if="lightbox.title">{{ lightbox.title }}</div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <ModalCallback v-model="callbackOpen"/>
  </div>
</template>

<script setup lang="ts">
import { brendy } from '~/data/catalog'
import { catalogGallery } from '~/data/gallery'
const item = brendy.find(b => b.id === 'clipso')!
const otherBrendy = brendy.map(b => ({ id: b.id, slug: b.slug, title: b.title }))
const gallery = catalogGallery['natyazhnye-potolki-clipso'] ?? []
const worksWithPrice = gallery.filter(g => g.price)
const visibleWorksCount = ref(4)
const visibleWorks = computed(() => worksWithPrice.slice(0, visibleWorksCount.value))
function fmt(n: number) { return n.toLocaleString('ru-RU') }
const lightbox = reactive({ open: false, img: '', title: '' })
function openLightbox(img: string, title: string) {
  lightbox.img = img; lightbox.title = title; lightbox.open = true
}
onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') lightbox.open = false }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})
useHead({
  title: 'Натяжные потолки Clipso (Клипсо) в Иркутске — от 389 ₽/м² | ПроПотолок',
  meta: [{ name: 'description', content: 'Натяжные потолки Clipso в Иркутске от 389 ₽/м². Французское тканевое полотно, холодный монтаж, дышащее, акустические варианты. Гарантия 12 лет.' }, { property: 'og:image', content: item.img }],
})
const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')
const asideItems = ['Бесплатный замер на дому', 'Монтаж включён в цену', 'Гарантия 12 лет по договору', 'Оплата после монтажа', 'Работаем в выходные']
const advantages = [
  { title: 'Монтаж без нагрева', desc: 'Холодная технология установки — не нужна тепловая пушка, безопасно для мебели и отделки.' },
  { title: 'Дышащее полотно (нет конденсата)', desc: 'Ткань пропускает воздух — исключает образование конденсата и сырости под потолком.' },
  { title: 'Акустические варианты', desc: 'Специальные полотна с шумопоглощением для офисов, переговорных, домашних кинотеатров.' },
  { title: 'Цветные с натуральными красителями', desc: 'Цветная гамма на основе натуральных красителей — без токсичных синтетических пигментов.' },
  { title: 'Противопожарные стандарты', desc: 'Соответствует европейским и российским нормам пожарной безопасности.' },
  { title: 'Франция — европейское качество', desc: 'Французское производство с многолетней историей и строгим контролем каждой партии.' },
]
const whyCards = [
  { icon: 'lucide:thermometer', title: 'Холодный монтаж', desc: 'Установка без тепловой пушки — не нагревает помещение, безопасно для всех типов отделки.' },
  { icon: 'lucide:wind', title: 'Дышащее полотно', desc: 'Пропускает воздух — нет конденсата, нет сырости, нет плесени под потолком.' },
  { icon: 'lucide:shield-check', title: 'Гарантия 12 лет', desc: 'Письменная гарантия по договору на полотно и монтаж. Без ограничений.' },
  { icon: 'lucide:volume-2', title: 'Акустика', desc: 'Шумопоглощающие варианты для офисов, кинотеатров и переговорных комнат.' },
  { icon: 'lucide:banknote', title: 'Без предоплаты', desc: 'Оплата после монтажа и вашей приёмки. Наличными, картой или безналом.' },
  { icon: 'lucide:flag', title: 'Франция', desc: 'Французские технологии и производство — европейское качество в каждом изделии.' },
]
const faqItems = [
  { q: 'Что такое холодный монтаж Clipso?', a: 'Холодный монтаж — это технология установки тканевого полотна без разогрева тепловой пушкой. Стандартные ПВХ-потолки требуют нагрева помещения до 60–70°C. Clipso натягивается механически при комнатной температуре — это быстрее, безопаснее и не создаёт неприятного запаха.' },
  { q: 'Почему под потолком Clipso нет конденсата?', a: 'Тканевое полотно Clipso дышит — оно пропускает воздух. Разница температур между полотном и перекрытием не создаёт "парникового эффекта". Конденсат не образуется даже в помещениях с повышенной влажностью при наличии нормальной вентиляции.' },
  { q: 'Как работают акустические потолки Clipso?', a: 'Акустические варианты Clipso имеют специальную структуру ткани с повышенным коэффициентом звукопоглощения. Они снижают уровень реверберации в помещении — эхо и шум становятся тише. Используются в офисах, переговорных, домашних кинотеатрах и ресторанах.' },
  { q: 'Можно ли заказать цветной потолок Clipso?', a: 'Да, Clipso предлагает широкую цветовую палитру. Полотна окрашены натуральными красителями без токсичных синтетических пигментов. Возможна печать изображений и орнаментов. Точный выбор цвета уточняйте у замерщика — он привезёт актуальные образцы.' },
  { q: 'Сколько стоит установка Clipso в Иркутске?', a: 'Цена начинается от 389 ₽/м² с монтажом. Итоговая стоимость зависит от площади, варианта полотна (стандарт, акустика, цветное) и дополнительных работ. Точный расчёт делает замерщик при бесплатном выезде на дом.' },
]
const seoLinks = [
  { to: '/catalog/brendy/natyazhnye-potolki-cerutti', label: 'Потолки Cerutti (Швейцария)' },
  { to: '/catalog/brendy/natyazhnye-potolki-descor', label: 'Потолки Descor (Германия)' },
  { to: '/catalog/faktury/tkanevye-natyazhnye-potolki', label: 'Тканевые натяжные потолки' },
  { to: '/catalog/brendy', label: 'Все бренды' },
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
</script>

<style scoped>
.cp-pretitle { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; background: var(--accent); color: var(--dark); }
.cp-pretitle--dark { background: var(--accent); color: var(--dark); }
.cp-check { color: var(--accent); flex-shrink: 0; }
.cp-section { padding: 64px 0; }
.cp-section-head { text-align: center; margin-bottom: 40px; }
.cp-h2 { font-size: 30px; font-weight: 800; color: var(--dark); margin: 0 0 10px; line-height: 1.2; }
.cp-h2--center { text-align: center; }
.cp-hero { position: relative; min-height: 480px; display: flex; align-items: center; }
.cp-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; }
.cp-hero__overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.55) 55%, rgba(0,0,0,.2) 100%); z-index: 1; }
.cp-hero__inner { position: relative; z-index: 2; padding-top: 56px; padding-bottom: 56px; }
.cp-hero__content { max-width: 620px; }
.cp-hero__title { font-size: 42px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 14px; }
.cp-hero__price { font-size: 16px; color: rgba(255,255,255,.65); line-height: 1.7; margin-bottom: 10px; }
.cp-hero__price span { color: var(--accent); font-weight: 700; }
.cp-hero__price-badge { font-size: 20px; color: rgba(255,255,255,.8); margin-bottom: 26px; }
.cp-hero__price-badge strong { color: var(--accent); font-weight: 900; }
.cp-hero__form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.cp-inp { flex: 1; min-width: 160px; padding: 13px 16px; border: none; border-radius: 10px; font-size: 15px; font-family: var(--font); color: var(--dark); outline: none; background: rgba(255,255,255,.95); }
.cp-inp:focus { background: #fff; }
.cp-hero__btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 15px; border-radius: 10px; white-space: nowrap; }
.cp-policy { font-size: 11px; color: rgba(255,255,255,.35); margin: 0; }
.cp-about { background: #fff; }
.cp-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.cp-main .cp-h2 { margin-bottom: 20px; }
.cp-text h3 { font-size: 17px; font-weight: 700; color: var(--dark); margin: 22px 0 8px; }
.cp-text p { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.cp-text strong { color: var(--dark); }
.cp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.cp-list li { font-size: 14px; color: #555; line-height: 1.6; padding-left: 16px; position: relative; }
.cp-list li::before { content: '—'; position: absolute; left: 0; color: var(--accent); font-weight: 700; }
.cp-aside { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 20px; }
.cp-aside-card { background: #f7f7f7; border-radius: 18px; padding: 24px; border: 1.5px solid #ececec; }
.cp-aside-card__title { font-size: 17px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
.cp-aside-card__desc { font-size: 13px; color: var(--gray); line-height: 1.55; margin-bottom: 14px; }
.cp-aside-price { font-size: 28px; font-weight: 900; color: var(--dark); margin-bottom: 2px; }
.cp-aside-price strong { color: var(--accent); }
.cp-aside-price span { font-size: 16px; font-weight: 500; color: var(--gray); }
.cp-aside-list { list-style: none; padding: 0; margin: 14px 0 18px; display: flex; flex-direction: column; gap: 8px; }
.cp-aside-list li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #444; }
.cp-aside-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; font-size: 14px; margin-bottom: 10px; }
.cp-aside-calc { display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--gray); text-decoration: none; transition: color .15s; }
.cp-aside-calc:hover { color: var(--dark); }
.cp-aside-nav { background: #fff; border-radius: 14px; padding: 20px; border: 1.5px solid #eee; }
.cp-aside-nav__title { font-size: 12px; font-weight: 800; color: var(--dark); margin-bottom: 12px; text-transform: uppercase; letter-spacing: .4px; }
.cp-aside-nav__link { display: flex; align-items: center; gap: 6px; padding: 7px 0; font-size: 13px; font-weight: 500; color: var(--gray); text-decoration: none; border-bottom: 1px solid #f5f5f5; transition: color .15s; }
.cp-aside-nav__link:last-child { border-bottom: none; }
.cp-aside-nav__link:hover, .cp-aside-nav__link.active { color: var(--dark); font-weight: 700; }
.cp-calc-cta { background: #141414; padding: 32px 0; }
.cp-calc-cta__inner { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.cp-calc-cta__icon { width: 56px; height: 56px; flex-shrink: 0; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); }
.cp-calc-cta__title { font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.cp-calc-cta__desc { font-size: 13px; color: rgba(255,255,255,.4); line-height: 1.5; }
.cp-calc-cta__btn { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; font-size: 14px; white-space: nowrap; flex-shrink: 0; }
.cp-why { background: #f7f7f7; }
.cp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cp-why-card { background: #fff; border-radius: 16px; padding: 24px 20px; border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s; }
.cp-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.cp-why-card__icon { width: 48px; height: 48px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 12px; }
.cp-why-card__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
.cp-why-card__desc { font-size: 13px; color: var(--gray); line-height: 1.6; }
.cp-faq { background: #fff; }
.cp-faq-list { display: flex; flex-direction: column; gap: 10px; max-width: 860px; margin: 0 auto; }
.cp-faq-item { background: #f7f7f7; border-radius: 12px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.cp-faq-item.open { border-color: var(--accent); }
.cp-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; }
.cp-faq-item__arrow { flex-shrink: 0; color: var(--gray); }
.cp-faq-item.open .cp-faq-item__arrow { color: var(--accent); }
.cp-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 20px; }
.cp-faq-item.open .cp-faq-item__a { max-height: 300px; padding: 0 20px 16px; }
.cp-seo { background: #f7f7f7; }
.cp-seo-inner { display: grid; grid-template-columns: 1fr 240px; gap: 56px; align-items: start; }
.cp-seo-content h2 { font-size: 20px; font-weight: 800; color: var(--dark); margin: 0 0 14px; }
.cp-seo-content h3 { font-size: 15px; font-weight: 700; color: var(--dark); margin: 18px 0 7px; }
.cp-seo-content p { font-size: 14px; color: #555; line-height: 1.75; margin-bottom: 8px; }
.cp-seo-content strong { color: var(--dark); }
.cp-seo-links { position: sticky; top: 100px; }
.cp-seo-links__title { font-size: 12px; font-weight: 800; color: var(--dark); margin-bottom: 12px; text-transform: uppercase; letter-spacing: .4px; }
.cp-seo-link { display: flex; align-items: center; gap: 6px; padding: 8px 0; font-size: 13px; font-weight: 500; color: var(--gray); text-decoration: none; border-bottom: 1px solid #eee; transition: color .15s, padding-left .15s; }
.cp-seo-link:hover { color: var(--dark); padding-left: 4px; }
.cp-cta { background: #141414; padding: 60px 0; }
.cp-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.cp-cta__title { font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.cp-cta__desc { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; }
.cp-cta__btns { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.cp-cta__btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.cp-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; font-size: 15px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 10px; color: #fff; cursor: pointer; text-decoration: none; transition: border-color .15s, color .15s; }
.cp-cta__outline:hover { border-color: var(--accent); color: var(--accent); }
@media (max-width: 860px) { .cp-two-col { grid-template-columns: 1fr; } .cp-aside { position: static; } .cp-seo-inner { grid-template-columns: 1fr; } .cp-seo-links { position: static; } }
@media (max-width: 768px) { .cp-why-grid { grid-template-columns: repeat(2, 1fr); } .cp-hero__title { font-size: 32px; } }
.cp-gallery { background: #fff; }
.cp-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.cp-gallery-item { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; cursor: pointer; background: #f0f0f0; }
.cp-gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.cp-gallery-item:hover .cp-gallery-img { transform: scale(1.07); }
.cp-gallery-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.45); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #fff; opacity: 0; transition: opacity .2s; }
.cp-gallery-item:hover .cp-gallery-overlay { opacity: 1; }
.cp-gallery-caption { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 4px; }
.cp-gallery-room  { font-size: 12px; background: rgba(255,255,255,.2); padding: 2px 8px; border-radius: 10px; }
.cp-gallery-area  { font-size: 12px; background: rgba(255,255,255,.2); padding: 2px 8px; border-radius: 10px; }
.cp-gallery-price { font-size: 13px; font-weight: 700; color: var(--accent); background: rgba(0,0,0,.3); padding: 2px 10px; border-radius: 10px; }
.cp-lightbox { position: fixed; inset: 0; z-index: 600; background: rgba(0,0,0,.85); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
.cp-lightbox__box { position: relative; max-width: 1000px; width: 100%; max-height: 90vh; display: flex; flex-direction: column; }
.cp-lightbox__close { position: absolute; top: -44px; right: 0; background: rgba(255,255,255,.15); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; transition: background .15s; }
.cp-lightbox__close:hover { background: rgba(255,255,255,.25); }
.cp-lightbox__img { width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 10px; display: block; }
.cp-lightbox__title { text-align: center; color: rgba(255,255,255,.7); font-size: 14px; margin-top: 12px; }
.lb-enter-active { transition: opacity .2s ease, transform .2s ease; }
.lb-leave-active { transition: opacity .15s ease; }
.lb-enter-from { opacity: 0; transform: scale(.97); }
.lb-leave-to { opacity: 0; }
@media (max-width: 1100px) { .cp-gallery-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .cp-gallery-grid { grid-template-columns: repeat(2, 1fr); } }
.cp-works { background: #f7f7f7; }
.cp-works-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.cp-work-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.06); border: 1.5px solid transparent; transition: border-color .2s, box-shadow .2s; }
.cp-work-card:hover { border-color: var(--accent); box-shadow: 0 6px 24px rgba(0,0,0,.1); }
.cp-work-card__img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; cursor: pointer; }
.cp-work-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.cp-work-card:hover .cp-work-card__img { transform: scale(1.06); }
.cp-work-card__zoom { position: absolute; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; color: #fff; opacity: 0; transition: opacity .2s; }
.cp-work-card__img-wrap:hover .cp-work-card__zoom { opacity: 1; }
.cp-work-card__body { padding: 14px 14px 12px; }
.cp-work-card__title { font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 8px; line-height: 1.3; }
.cp-work-card__details { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
.cp-work-card__detail { font-size: 11px; color: var(--gray); background: #f7f7f7; border-radius: 5px; padding: 2px 7px; }
.cp-work-card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid #f0f0f0; }
.cp-work-card__area { font-size: 12px; color: var(--gray); }
.cp-work-card__price { font-size: 14px; font-weight: 800; color: var(--dark); }
.cp-works-more { text-align: center; }
.cp-more-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 32px; font-size: 14px; font-weight: 700; font-family: var(--font); background: #fff; border: 1.5px solid #ddd; border-radius: 50px; cursor: pointer; color: var(--gray); transition: border-color .15s, color .15s; }
.cp-more-btn:hover { border-color: var(--accent); color: var(--dark); }
@media (max-width: 1100px) { .cp-works-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .cp-works-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .cp-hero__title { font-size: 26px; } .cp-hero__form { flex-direction: column; } .cp-inp, .cp-hero__btn { width: 100%; } .cp-works-grid { grid-template-columns: repeat(2, 1fr); } .cp-why-grid { grid-template-columns: 1fr; } .cp-h2 { font-size: 24px; } .cp-cta__inner { flex-direction: column; align-items: flex-start; } .cp-calc-cta__btn { margin-left: 0; width: 100%; justify-content: center; } }

@media (max-width: 768px) { .cp-aside-nav { display: none; } }
</style>

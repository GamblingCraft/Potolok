<template>
  <section class="hero">
      <div class="hero__bg-placeholder"></div>
      <div class="hero__overlay"></div>
      <div class="container hero__container">

        <div class="hero__content">
          <div class="hero__pretitle">Натяжные потолки в Иркутске</div>
          <h1 class="hero__title">Европейские натяжные&nbsp;потолки — от&nbsp;<span class="hero__title-price">159&nbsp;руб./м²</span></h1>
          <p class="hero__text">
            Акция: <span class="hero__text-accent">3-й потолок в подарок!</span><br>
            Гарантия по договору 12 лет. Монтаж за 1 день.<br>
            Потолки без запаха. Чистый монтаж.
          </p>

          <form class="hero__form" @submit.prevent="submitForm">
            <input v-model="formName" class="hero__input" type="text" placeholder="Ваше имя" />
            <input :value="formPhone" class="hero__input" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)" />
            <button type="submit" class="nav-btn hero__submit">
              <Icon name="lucide:calculator" size="17" />
              Рассчитать стоимость
            </button>
          </form>
          <p class="hero__policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>

        <div class="hero__badge">
          <div class="hero__badge-inner">
            <div class="hero__badge-top">Акция</div>
            <div class="hero__badge-num">10%</div>
            <div class="hero__badge-bot">при заказе сегодня</div>
          </div>
        </div>

      </div>

      <div class="hero__facts container">
        <div class="hero__fact">
          <Icon name="lucide:shield-check" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">12 лет</div>
            <div class="hero__fact-label">гарантия</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:clock" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">1 день</div>
            <div class="hero__fact-label">монтаж</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:ruler" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">Бесплатно</div>
            <div class="hero__fact-label">замер на дому</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:banknote" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">Без предоплаты</div>
            <div class="hero__fact-label">оплата после монтажа</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:star" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">15+ лет</div>
            <div class="hero__fact-label">опыт работы</div>
          </div>
        </div>
      </div>
  </section>

  <!-- КАТАЛОГ -->
  <section class="section catalog-section">
    <div class="container">

      <div class="section-head">
        <div class="section-pretitle">Виды потолков</div>
        <h2 class="section-title">Каталог натяжных потолков</h2>
        <p class="section-desc">Европейские полотна премиум-класса — матовые, глянцевые, сатиновые и тканевые фактуры на любой вкус</p>
      </div>

      <div class="catalog-grid">
        <NuxtLink
          v-for="item in catalog"
          :key="item.slug"
          :to="item.slug"
          class="cat-card"
        >
          <div class="cat-card__img" :style="{ backgroundImage: `url('${item.img}')` }"></div>
          <div class="cat-card__overlay"></div>
          <div class="cat-card__body">
            <div class="cat-card__badge" v-if="item.badge">{{ item.badge }}</div>
            <div class="cat-card__title">{{ item.title }}</div>
            <div class="cat-card__price">от {{ item.price }}&nbsp;руб/м²</div>
          </div>
          <div class="cat-card__arrow">
            <Icon name="lucide:arrow-right" size="18" />
          </div>
        </NuxtLink>
      </div>

      <!-- По помещению -->
      <div class="cat-subgroup">
        <div class="cat-subgroup__head">
          <h3 class="cat-subgroup__title">По помещению</h3>
          <NuxtLink to="/catalog/po-pomescheniyu" class="cat-subgroup__all">Все помещения <Icon name="lucide:arrow-right" size="14"/></NuxtLink>
        </div>
        <div class="catalog-grid catalog-grid--sm">
          <NuxtLink v-for="item in roomCards" :key="item.to" :to="item.to" class="cat-card cat-card--sm">
            <div class="cat-card__img" :style="{ backgroundImage: `url('${item.img}')` }"></div>
            <div class="cat-card__overlay"></div>
            <div class="cat-card__body">
              <div class="cat-card__title">{{ item.title }}</div>
            </div>
            <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>
      </div>

      <!-- По цвету -->
      <div class="cat-subgroup">
        <div class="cat-subgroup__head">
          <h3 class="cat-subgroup__title">По цвету</h3>
          <NuxtLink to="/catalog/tsveta" class="cat-subgroup__all">Все цвета <Icon name="lucide:arrow-right" size="14"/></NuxtLink>
        </div>
        <div class="catalog-grid catalog-grid--sm">
          <NuxtLink v-for="item in colorCards" :key="item.to" :to="item.to" class="cat-card cat-card--sm">
            <div class="cat-card__img" :style="{ backgroundImage: `url('${item.img}')` }"></div>
            <div class="cat-card__overlay"></div>
            <div class="cat-card__body">
              <div class="cat-card__title">{{ item.title }}</div>
            </div>
            <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>
      </div>

      <!-- По виду -->
      <div class="cat-subgroup">
        <div class="cat-subgroup__head">
          <h3 class="cat-subgroup__title">По виду</h3>
          <NuxtLink to="/catalog/vidy" class="cat-subgroup__all">Все виды <Icon name="lucide:arrow-right" size="14"/></NuxtLink>
        </div>
        <div class="catalog-grid">
          <NuxtLink v-for="item in typeCards" :key="item.to" :to="item.to" class="cat-card">
            <div class="cat-card__img" :style="{ backgroundImage: `url('${item.img}')` }"></div>
            <div class="cat-card__overlay"></div>
            <div class="cat-card__body">
              <div class="cat-card__title">{{ item.title }}</div>
              <div class="cat-card__price">от {{ item.price }}&nbsp;руб/м²</div>
            </div>
            <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>
      </div>

      <div class="catalog-cta">
        <NuxtLink to="/catalog" class="nav-btn catalog-cta__btn">
          <Icon name="lucide:layout-grid" size="18" />
          Перейти в каталог
        </NuxtLink>
      </div>

    </div>
  </section>

  <CalcWidget />
</template>

<script setup lang="ts">
const formName = ref('')
const formPhone = ref('')

const catalog = [
  { slug: '/catalog/faktury/matovye-natyazhnye-potolki',           title: 'Матовые',         price: 159, badge: 'Хит',   img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75' },
  { slug: '/catalog/faktury/glyancevye-natyazhnye-potolki',        title: 'Глянцевые',       price: 189, badge: null,    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75' },
  { slug: '/catalog/faktury/satinovye-natyazhnye-potolki',         title: 'Сатиновые',       price: 179, badge: null,    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75' },
  { slug: '/catalog/faktury/tkanevye-natyazhnye-potolki',          title: 'Тканевые',        price: 299, badge: null,    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75' },
  { slug: '/catalog/vidy/paryashchie-natyazhnye-potolki',          title: 'Парящий потолок', price: 350, badge: 'Тренд', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=75' },
  { slug: '/catalog/vidy/natyazhnye-potolki-s-podsvetkoy',         title: 'С подсветкой',    price: 320, badge: null,    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75' },
  { slug: '/catalog/vidy/dvuhurovnevye-natyazhnye-potolki',        title: 'Двухуровневые',   price: 450, badge: null,    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=75' },
  { slug: '/catalog/vidy/natyazhnye-potolki-s-fotopechatyu',       title: 'Фотопечать',      price: 550, badge: null,    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75' },
]

const roomCards = [
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-gostinoy',      title: 'Гостиная',    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-spalne',        title: 'Спальня',     img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-na-kuhne',        title: 'Кухня',       img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-vannoy',        title: 'Ванная',      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-detskoy',       title: 'Детская',     img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-prihozhey',     title: 'Прихожая',   img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-kvartire',      title: 'Квартира',    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-chastnom-dome', title: 'Частный дом', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=70' },
]

const colorCards = [
  { to: '/catalog/tsveta/belye-natyazhnye-potolki',       title: 'Белые',      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70' },
  { to: '/catalog/tsveta/chernye-natyazhnye-potolki',     title: 'Чёрные',     img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=70' },
  { to: '/catalog/tsveta/serye-natyazhnye-potolki',       title: 'Серые',      img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=70' },
  { to: '/catalog/tsveta/bezhevye-natyazhnye-potolki',    title: 'Бежевые',    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=70' },
  { to: '/catalog/tsveta/cvetnye-natyazhnye-potolki',     title: 'Цветные',    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=70' },
  { to: '/catalog/tsveta/zolotye-natyazhnye-potolki',     title: 'Золотые',    img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=400&q=70' },
  { to: '/catalog/tsveta/golubye-natyazhnye-potolki',     title: 'Голубые',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70' },
  { to: '/catalog/tsveta/korichnevye-natyazhnye-potolki', title: 'Коричневые', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=70' },
]

const typeCards = [
  { to: '/catalog/vidy/dvuhurovnevye-natyazhnye-potolki',          title: 'Двухуровневые',  price: 450, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70' },
  { to: '/catalog/vidy/paryashchie-natyazhnye-potolki',            title: 'Парящие',        price: 350, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-s-podsvetkoy',           title: 'С подсветкой',   price: 320, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-s-fotopechatyu',         title: 'Фотопечать',     price: 550, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo',          title: 'Звёздное небо',  price: 650, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami',  title: 'Световые линии', price: 380, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=70' },
  { to: '/catalog/vidy/tenevye-natyazhnye-potolki',                title: 'Теневые',        price: 300, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-3d',                     title: '3D потолки',     price: 700, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=70' },
]

function maskPhone(e: Event) {
  const input = e.target as HTMLInputElement
  let val = input.value.replace(/\D/g, '')
  if (val.startsWith('7') || val.startsWith('8')) val = val.slice(1)
  val = val.slice(0, 10)
  val = '7' + val
  let result = '+7'
  if (val.length > 1) result += ' (' + val.slice(1, 4)
  if (val.length >= 4) result += ') ' + val.slice(4, 7)
  if (val.length >= 7) result += '-' + val.slice(7, 9)
  if (val.length >= 9) result += '-' + val.slice(9, 11)
  input.value = result
  return result
}

function submitForm() {
  // TODO: отправка заявки
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 580px;
  display: flex;
  flex-direction: column;
}
.hero__bg-placeholder {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80');
  background-size: cover;
  background-position: center;
  z-index: 0;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.5) 60%, rgba(0,0,0,.2) 100%);
  z-index: 1;
}
.hero__container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 70px;
  padding-bottom: 40px;
  gap: 40px;
}
.hero__content { max-width: 620px; flex: 1; }

.hero__pretitle {
  display: inline-block;
  background: var(--accent);
  color: var(--dark);
  font-size: 13px;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 18px;
  text-transform: uppercase;
  letter-spacing: .5px;
}
.hero__title {
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 18px;
}
.hero__text {
  font-size: 18px;
  color: rgba(255,255,255,.75);
  line-height: 1.65;
  margin-bottom: 28px;
}

.hero__form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.hero__input {
  flex: 1;
  min-width: 170px;
  padding: 14px 18px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: var(--font);
  color: var(--dark);
  outline: none;
  background: rgba(255,255,255,.95);
}
.hero__input:focus { background: #fff; }
.hero__submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 10px;
  white-space: nowrap;
}
.hero__title-price {
  color: var(--accent);
  white-space: nowrap;
}
.hero__text-accent {
  color: var(--accent);
  font-weight: 700;
}
.hero__policy {
  font-size: 11px;
  color: rgba(255,255,255,.4);
}

.hero__badge {
  flex-shrink: 0;
}
.hero__badge-inner {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 0 10px rgba(245,200,0,.2), 0 0 0 20px rgba(245,200,0,.08);
  animation: badge-pulse 3s ease-in-out infinite;
}
.hero__badge-top {
  font-size: 13px;
  font-weight: 700;
  color: var(--dark);
  text-transform: uppercase;
  letter-spacing: .5px;
}
.hero__badge-num {
  font-size: 52px;
  font-weight: 900;
  color: var(--dark);
  line-height: 1;
}
.hero__badge-bot {
  font-size: 11px;
  font-weight: 600;
  color: rgba(0,0,0,.6);
  max-width: 90px;
  line-height: 1.3;
}
@keyframes badge-pulse {
  0%,100% { box-shadow: 0 0 0 10px rgba(245,200,0,.2), 0 0 0 20px rgba(245,200,0,.08); }
  50%      { box-shadow: 0 0 0 14px rgba(245,200,0,.15), 0 0 0 28px rgba(245,200,0,.05); }
}

.hero__facts {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(6px);
  border-top: 1px solid rgba(255,255,255,.08);
  padding: 20px 15px;
  gap: 0;
  margin-top: auto;
}
.hero__fact {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  border-right: 1px solid rgba(255,255,255,.1);
  flex: 1;
}
.hero__fact:last-child { border-right: none; }
.hero__fact-icon { color: var(--accent); flex-shrink: 0; }
.hero__fact-val {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.hero__fact-label {
  font-size: 12px;
  color: rgba(255,255,255,.5);
}

@media (max-width: 900px) {
  .hero__badge { display: none; }
  .hero__title { font-size: 36px; }
}
@media (max-width: 640px) {
  .hero__container { padding-top: 40px; }
  .hero__title { font-size: 28px; }
  .hero__text { font-size: 15px; }
  .hero__form { flex-direction: column; }
  .hero__input, .hero__submit { width: 100%; }
  .hero__facts { flex-wrap: wrap; gap: 12px; }
  .hero__fact { flex: 1 1 calc(50% - 24px); border-right: none; padding: 0 8px; }
}

/* ── CATALOG SECTION ── */
.catalog-section { background: #f7f7f7; padding-top: 64px; padding-bottom: 64px; }

.section-head { text-align: center; margin-bottom: 40px; }
.section-pretitle {
  display: inline-block;
  background: var(--accent);
  color: var(--dark);
  font-size: 12px;
  font-weight: 700;
  padding: 3px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: .5px;
}
.section-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 10px;
  line-height: 1.2;
}
.section-desc {
  font-size: 16px;
  color: var(--gray);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

.cat-card {
  position: relative;
  display: block;
  border-radius: 14px;
  overflow: hidden;
  height: 220px;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(0,0,0,.10);
  transition: transform .22s ease, box-shadow .22s ease;
}
.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(0,0,0,.18);
}
.cat-card__img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform .4s ease;
}
.cat-card:hover .cat-card__img { transform: scale(1.06); }

.cat-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.65) 100%);
  transition: background .22s;
}
.cat-card:hover .cat-card__overlay {
  background: linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.78) 100%);
}

.cat-card__body {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 16px;
}
.cat-card__badge {
  display: inline-block;
  background: var(--accent);
  color: var(--dark);
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: .5px;
  margin-bottom: 6px;
}
.cat-card__title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin-bottom: 4px;
}
.cat-card__price {
  font-size: 13px;
  color: rgba(255,255,255,.7);
  font-weight: 500;
}
.cat-card:hover .cat-card__price { color: var(--accent); }

.cat-card__arrow {
  position: absolute;
  top: 14px; right: 14px;
  width: 32px; height: 32px;
  background: rgba(255,255,255,.15);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity .2s ease, transform .2s ease, background .2s;
}
.cat-card:hover .cat-card__arrow {
  opacity: 1;
  transform: translateX(0);
  background: var(--accent);
  color: var(--dark);
}

/* Subgroups */
.cat-subgroup { margin-top: 40px; }
.cat-subgroup__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.cat-subgroup__title {
  font-size: 22px;
  font-weight: 800;
  color: var(--dark);
}
.cat-subgroup__all {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray);
  text-decoration: none;
  transition: color .15s;
}
.cat-subgroup__all:hover { color: var(--dark); }

.catalog-cta {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}
.catalog-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  font-size: 16px;
}

.catalog-grid--sm { grid-template-columns: repeat(8, 1fr); }
.cat-card--sm { height: 140px; border-radius: 10px; }
.cat-card--sm .cat-card__title { font-size: 13px; font-weight: 700; }
.cat-card--sm .cat-card__body { padding: 10px 12px; }

@media (max-width: 1200px) {
  .catalog-grid--sm { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 768px) {
  .catalog-grid--sm { grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .cat-card--sm { height: 110px; }
  .cat-subgroup__title { font-size: 18px; }
}
@media (max-width: 480px) {
  .catalog-grid--sm { grid-template-columns: repeat(3, 1fr); }
  .cat-card--sm { height: 100px; }
}

@media (max-width: 1024px) {
  .catalog-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .catalog-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .section-title { font-size: 28px; }
  .cat-card { height: 180px; }
}
@media (max-width: 480px) {
  .catalog-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .cat-card { height: 160px; }
  .cat-card__title { font-size: 15px; }
  .rooms-row { gap: 10px; }
}
</style>

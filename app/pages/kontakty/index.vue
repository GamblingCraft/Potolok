<template>
  <div>

    <!-- ═══ HERO ═══ -->
    <section class="ct-hero">
      <div class="container ct-hero__inner">
        <p class="ct-pretitle">Свяжитесь с нами</p>
        <h1 class="ct-hero__title">Мы всегда <span class="ct-hero__accent">на связи</span></h1>
        <p class="ct-hero__desc">Оставьте заявку или напишите в удобный мессенджер — ответим в течение 15 минут и обсудим ваше событие</p>
      </div>
    </section>

    <!-- ═══ CARDS ROW ═══ -->
    <section class="ct-cards-section">
      <div class="container">
        <div class="ct-cards-row">

          <!-- Адрес -->
          <div class="ct-card ct-card--grey">
            <div class="ct-card__icon-wrap">
              <Icon name="lucide:map-pin" size="22" class="ct-card__icon" />
            </div>
            <div class="ct-card__label">Адрес студии</div>
            <div class="ct-card__value">{{ company.address }}</div>
            <button class="ct-card__link" @click="scrollToMap">
              Построить маршрут <Icon name="lucide:arrow-right" size="14" />
            </button>
          </div>

          <!-- Время работы -->
          <div class="ct-card ct-card--grey">
            <div class="ct-card__icon-wrap">
              <Icon name="lucide:clock" size="22" class="ct-card__icon" />
            </div>
            <div class="ct-card__label">Время работы</div>
            <div class="ct-card__value">{{ company.hours[0]?.time ?? site.schedule }}</div>
            <div class="ct-card__sub">по предварительной записи</div>
          </div>

          <!-- Телефон — акцент карточка -->
          <div class="ct-card ct-card--dark">
            <div class="ct-card__icon-wrap ct-card__icon-wrap--accent">
              <Icon name="lucide:phone-call" size="22" />
            </div>
            <div class="ct-card__label ct-card__label--light">Звоните нам</div>
            <a :href="'tel:' + company.phoneTel" class="ct-card__phone">
              {{ company.phone }}
            </a>
          </div>

          <!-- Мессенджеры -->
          <div class="ct-card ct-card--white">
            <div class="ct-card__label ct-card__label--bold">Напишите в мессенджеры</div>
            <div class="ct-card__sub ct-card__sub--mb">Быстро ответим на все вопросы и подберём удобное время для встречи</div>
            <div class="ct-messengers">
              <a :href="company.social.telegram" target="_blank" class="ct-msg ct-msg--tg">
                <svg width="20" height="20" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_tg)"><path d="M16.5 0C12.2575 0 8.185 1.68675 5.1875 4.68625C2.18693 7.68696 0.500859 11.7565 0.5 16C0.5 20.2417 2.1875 24.3142 5.1875 27.3137C8.185 30.3132 12.2575 32 16.5 32C20.7425 32 24.815 30.3132 27.8125 27.3137C30.8125 24.3142 32.5 20.2417 32.5 16C32.5 11.7583 30.8125 7.68575 27.8125 4.68625C24.815 1.68675 20.7425 0 16.5 0Z" fill="url(#paint0_linear_tg)"></path><path d="M7.7425 15.832C12.4075 13.8 15.5175 12.4604 17.0725 11.813C21.5175 9.96478 22.44 9.64378 23.0425 9.63291C23.175 9.63078 23.47 9.66353 23.6625 9.81916C23.8225 9.95041 23.8675 10.1279 23.89 10.2525C23.91 10.377 23.9375 10.6608 23.915 10.8823C23.675 13.4123 22.6325 19.5518 22.1025 22.3855C21.88 23.5845 21.4375 23.9865 21.01 24.0258C20.08 24.1113 19.375 23.4118 18.475 22.822C17.0675 21.8988 16.2725 21.3243 14.905 20.4235C13.325 19.3825 14.35 18.8103 15.25 17.8753C15.485 17.6305 19.58 13.9068 19.6575 13.569C19.6675 13.5268 19.6775 13.3693 19.5825 13.2863C19.49 13.203 19.3525 13.2315 19.2525 13.254C19.11 13.286 16.8625 14.773 12.5025 17.7148C11.865 18.1533 11.2875 18.367 10.7675 18.3558C10.1975 18.3435 9.0975 18.0328 8.28 17.7673C7.28 17.4415 6.4825 17.2693 6.5525 16.716C6.5875 16.428 6.985 16.1333 7.7425 15.832Z" fill="white"></path></g><defs><linearGradient id="paint0_linear_tg" x1="1600.5" y1="0" x2="1600.5" y2="3200" gradientUnits="userSpaceOnUse"><stop stop-color="#2AABEE"></stop><stop offset="1" stop-color="#229ED9"></stop></linearGradient><clipPath id="clip0_tg"><rect width="32" height="32" fill="white" transform="translate(0.5)"></rect></clipPath></defs></svg>
                Telegram
              </a>
              <a v-if="company.social.whatsapp" :href="company.social.whatsapp" target="_blank" class="ct-msg ct-msg--max">
                <svg width="20" height="20" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.6748 20.8374C41.6748 9.32922 32.3456 0 20.8374 0C9.32922 0 0 9.32922 0 20.8374C0 32.3456 9.32922 41.6748 20.8374 41.6748C32.3456 41.6748 41.6748 32.3456 41.6748 20.8374Z" fill="url(#paint0_linear_max)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.0498 30.6693C19.1091 30.6693 18.2071 30.3847 16.6393 29.2465C15.6477 30.527 12.5074 31.5278 12.3704 29.8156C12.3704 28.5303 12.0871 27.4443 11.766 26.2586C11.3835 24.7978 10.949 23.1711 10.949 20.814C10.949 15.1843 15.5485 10.949 20.998 10.949C26.452 10.949 30.7257 15.393 30.7257 20.866C30.744 26.2546 26.415 30.6406 21.0498 30.6693ZM21.1302 15.8151C18.4763 15.6775 16.4079 17.5224 15.9499 20.4156C15.572 22.8106 16.2426 25.7274 16.8141 25.8791C17.088 25.9456 17.7774 25.3859 18.2071 24.9543C18.9176 25.4473 19.7451 25.7434 20.606 25.8127C23.3559 25.9456 25.7055 23.8431 25.8901 21.0843C25.9976 18.3196 23.8804 15.978 21.1302 15.8199V15.8151Z" fill="white"></path><defs><linearGradient id="paint0_linear_max" x1="-2.13509e-08" y1="20.8374" x2="40.7013" y2="23.7031" gradientUnits="userSpaceOnUse"><stop stop-color="#4757F9"></stop><stop offset="1" stop-color="#9261EA"></stop></linearGradient></defs></svg>
                MAX
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ MAP SECTION ═══ -->
    <section class="ct-map-section" ref="mapSection">
      <div class="container ct-map-head">
        <div>
          <p class="ct-map-pretitle">Как нас найти</p>
          <h2 class="ct-map-title">Приезжайте <span class="ct-hero__accent">в гости</span></h2>
        </div>
        <div class="ct-map-addr">
          <Icon name="lucide:map-pin" size="16" />
          {{ company.addressShort || company.address }}
        </div>
      </div>

      <!-- Яндекс.Карта (iframe из настроек) или плейсхолдер -->
      <div class="ct-map-frame-wrap">
        <iframe
          v-if="company.mapEmbed && company.mapEmbed.startsWith('http')"
          :src="company.mapEmbed"
          class="ct-map-frame"
          frameborder="0"
          allowfullscreen
          loading="lazy"
        />
        <div v-else class="ct-map-placeholder">
          <Icon name="lucide:map" size="48" />
          <span>Вставьте embed-ссылку Яндекс.Карт в Настройки → Адрес и карта</span>
        </div>
      </div>
    </section>

    <!-- ═══ BRANCHES ═══ -->
    <section v-if="company.branches && company.branches.length" class="ct-branches-section">
      <div class="container">
        <p class="ct-pretitle" style="margin-bottom:10px">Наши офисы</p>
        <h2 class="ct-branches-title">Где нас найти</h2>
        <div class="ct-branches-grid">
          <div
            v-for="(b, i) in company.branches" :key="i"
            class="ct-branch-card"
            :class="{ 'ct-branch-card--main': b.main }"
          >
            <div class="ct-branch-card__icon">
              <Icon name="lucide:map-pin" size="18" />
            </div>
            <div class="ct-branch-card__body">
              <div class="ct-branch-card__city">{{ b.city }}</div>
              <div class="ct-branch-card__addr">{{ b.address }}</div>
              <div v-if="b.note" class="ct-branch-card__note">{{ b.note }}</div>
            </div>
            <span v-if="b.main" class="ct-branch-card__badge">Главный</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FORM + REQUISITES ═══ -->
    <section class="ct-bottom">
      <div class="container ct-bottom__grid">

        <!-- Форма -->
        <div class="ct-form-card">
          <div class="ct-form-card__head">
            <Icon name="lucide:message-square-plus" size="20" class="ct-form-card__head-icon"/>
            <div>
              <div class="ct-form-card__title">Оставьте заявку</div>
              <div class="ct-form-card__sub">Перезвоним в течение 15 минут</div>
            </div>
          </div>
          <form class="ct-form" @submit.prevent="submitForm">
            <div class="ct-form__row">
              <div class="ct-form__field">
                <label class="ct-form__label">Ваше имя</label>
                <input v-model="form.name" class="ct-form__input" type="text" placeholder="Иван Иванов"/>
              </div>
              <div class="ct-form__field">
                <label class="ct-form__label">Телефон <span class="ct-form__req">*</span></label>
                <input :value="form.phone" class="ct-form__input" type="tel"
                  placeholder="+7 (999) 999-99-99" required @input="form.phone = maskPhone($event)" />
              </div>
            </div>
            <div class="ct-form__row">
              <div class="ct-form__field">
                <label class="ct-form__label">Удобное время</label>
                <select v-model="form.time" class="ct-form__input ct-form__select">
                  <option value="">Любое</option>
                  <option value="9-12">9:00 — 12:00</option>
                  <option value="12-15">12:00 — 15:00</option>
                  <option value="15-18">15:00 — 18:00</option>
                  <option value="18-20">18:00 — 20:00</option>
                </select>
              </div>
              <div class="ct-form__field">
                <label class="ct-form__label">Комментарий</label>
                <input v-model="form.comment" class="ct-form__input" type="text" placeholder="Опишите задачу"/>
              </div>
            </div>
            <Transition name="ct-success" mode="out-in">
              <div v-if="sent" key="s" class="ct-form__success">
                <Icon name="lucide:check-circle" size="20"/>Заявка принята! Позвоним в течение 15 минут.
              </div>
              <button v-else key="b" type="submit" class="nav-btn ct-form__btn">
                <Icon name="lucide:send" size="15"/>Отправить заявку
              </button>
            </Transition>
            <p class="ct-form__policy">
              Нажимая кнопку, вы соглашаетесь с <NuxtLink to="/politika-konfidentsialnosti">политикой конфиденциальности</NuxtLink>
            </p>
          </form>
        </div>

        <!-- Реквизиты + районы -->
        <div class="ct-side">
          <div class="ct-requisites">
            <div class="ct-requisites__title">Реквизиты</div>
            <div class="ct-requisites__row"><span>Наименование</span><span>{{ company.fullName }}</span></div>
            <div class="ct-requisites__row"><span>ИНН</span><span>{{ company.inn }}</span></div>
            <div class="ct-requisites__row"><span>ОГРН</span><span>{{ company.ogrn }}</span></div>
          </div>
          <div class="ct-districts-block">
            <div class="ct-requisites__title">Районы Иркутска</div>
            <div class="ct-districts">
              <span v-for="d in districts" :key="d" class="ct-district">{{ d }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Schema.org -->
    <Head>
      <Script type="application/ld+json">{{ schemaOrg }}</Script>
    </Head>

  </div>
</template>

<script setup lang="ts">
const site = useSite()
import { districts } from '~/data/contacts'

const company = computed(() => ({
  name:         site.name,
  fullName:     site.nameFull,
  phone:        site.phone,
  phoneTel:     site.phoneRaw,
  phoneAlt:     site.phoneAlt,
  phoneAltTel:  site.phoneAltRaw,
  email:        site.email,
  emailSales:   site.emailSales,
  address:      site.address,
  addressShort: site.addressShort,
  hours:        site.hours,
  social: {
    telegram: site.telegram,
    vk:       site.vk,
    whatsapp: site.whatsapp,
  },
  inn:      site.inn,
  ogrn:     site.ogrn,
  mapLat:   site.mapLat,
  mapLng:   site.mapLng,
  mapEmbed:  site.mapEmbed,
  branches:  site.branches ?? [],
}))

usePageSeoMeta('kontakty')

const mapSection = ref<HTMLElement | null>(null)
const sent = ref(false)
const form = reactive({ name: '', phone: '', time: '', comment: '' })

function scrollToMap() {
  mapSection.value?.scrollIntoView({ behavior: 'smooth' })
}

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

function submitForm() {
  sent.value = true
  setTimeout(() => { sent.value = false; form.name = ''; form.phone = ''; form.time = ''; form.comment = '' }, 4000)
}

const schemaOrg = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: company.value.name,
  description: 'Натяжные потолки в Иркутске. Монтаж, замер, ремонт.',
  telephone: company.value.phone,
  email: company.value.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.value.addressShort,
    addressLocality: 'Иркутск',
    addressRegion: 'Иркутская область',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: company.value.mapLat,
    longitude: company.value.mapLng,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '18:00' },
  ],
  sameAs: [company.value.social.vk, company.value.social.telegram],
  priceRange: '₽₽',
  url: site.siteUrl,
}))
</script>

<style scoped>
/* ═══ HERO ═══ */
.ct-hero {
  background: #fff;
  padding: 56px 0 52px;
  border-bottom: 1px solid #f0f0f0;
}
.ct-hero__inner { max-width: 660px; }
.ct-pretitle {
  font-size: 12px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--accent);
  margin-bottom: 14px;
}
.ct-hero__title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 900; color: var(--dark);
  line-height: 1.1; margin-bottom: 16px;
  font-family: 'Gilroy', sans-serif;
}
.ct-hero__accent { color: var(--accent); }
.ct-hero__desc {
  font-size: 16px; color: #6b7280; line-height: 1.65; max-width: 520px;
}

/* ═══ CARDS ROW ═══ */
.ct-cards-section { background: #f7f8fa; padding: 40px 0 48px; }
.ct-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1.1fr 1.2fr;
  gap: 16px;
}

.ct-card {
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 200px;
}
.ct-card--grey  { background: #eef0f4; }
.ct-card--dark  { background: var(--dark); }
.ct-card--white { background: #fff; box-shadow: 0 2px 16px rgba(0,0,0,.07); }

.ct-card__icon-wrap {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(0,0,0,.06);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 8px; color: var(--dark);
}
.ct-card__icon-wrap--accent {
  background: rgba(245,200,0,.15);
  color: var(--accent);
}

.ct-card__label {
  font-size: 13px; font-weight: 700; color: #6b7280;
  text-transform: uppercase; letter-spacing: .5px;
}
.ct-card__label--light { color: rgba(255,255,255,.5); }
.ct-card__label--bold  { font-size: 15px; font-weight: 800; color: var(--dark); text-transform: none; letter-spacing: 0; margin-bottom: 4px; }

.ct-card__value {
  font-size: 15px; font-weight: 600; color: var(--dark);
  line-height: 1.45; margin-top: 4px;
}
.ct-card__sub { font-size: 13px; color: #9ca3af; margin-top: 2px; }
.ct-card__sub--mb { margin-bottom: 14px; }

.ct-card__link {
  display: inline-flex; align-items: center; gap: 5px;
  margin-top: auto; padding-top: 14px;
  font-size: 13px; font-weight: 700; color: var(--dark);
  background: none; border: none; cursor: pointer;
  font-family: 'Gilroy', sans-serif;
  text-decoration: underline; text-underline-offset: 3px;
  transition: opacity .15s;
}
.ct-card__link:hover { opacity: .65; }

.ct-card__phone {
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 900; color: #fff;
  font-family: 'Gilroy', sans-serif;
  text-decoration: none; margin-top: 8px;
  transition: opacity .15s;
}
.ct-card__phone:hover { opacity: .8; }

/* Messengers */
.ct-messengers { display: flex; gap: 10px; flex-wrap: wrap; margin-top: auto; }
.ct-msg {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: 12px;
  font-size: 14px; font-weight: 700;
  text-decoration: none; color: #fff;
  transition: transform .15s, opacity .15s;
}
.ct-msg:hover { transform: translateY(-2px); opacity: .9; }
.ct-msg--tg  { background: #2AABEE; }
.ct-msg--max { background: linear-gradient(90deg, #4757F9 0%, #9261EA 100%); }

/* ═══ MAP ═══ */
.ct-map-section { background: #fff; padding-top: 60px; }
.ct-map-head {
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 20px; flex-wrap: wrap;
  margin-bottom: 32px;
}
.ct-map-pretitle {
  font-size: 12px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
}
.ct-map-title {
  font-size: clamp(28px, 4vw, 44px); font-weight: 900;
  color: var(--dark); line-height: 1.1;
  font-family: 'Gilroy', sans-serif;
}
.ct-map-addr {
  display: flex; align-items: center; gap: 8px;
  background: #f7f8fa; border-radius: 30px;
  padding: 10px 18px;
  font-size: 14px; font-weight: 600; color: var(--dark);
  white-space: nowrap; flex-shrink: 0;
}
.ct-map-frame-wrap {
  width: 100%; height: 460px;
  overflow: hidden;
}
.ct-map-frame { width: 100%; height: 100%; border: none; display: block; }
.ct-map-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 14px; background: #f0f0f0; color: #9ca3af;
  font-size: 14px; font-weight: 500;
}

/* ═══ BOTTOM ═══ */
.ct-bottom { background: #f7f8fa; padding: 56px 0 64px; }
.ct-bottom__grid { display: grid; grid-template-columns: 1fr 380px; gap: 28px; align-items: start; }

/* Form */
.ct-form-card { background: #fff; border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,.08); overflow: hidden; }
.ct-form-card__head {
  display: flex; align-items: center; gap: 14px;
  background: var(--dark); padding: 20px 24px;
}
.ct-form-card__head-icon { color: var(--accent); flex-shrink: 0; }
.ct-form-card__title { font-size: 17px; font-weight: 800; color: #fff; }
.ct-form-card__sub   { font-size: 12px; color: rgba(255,255,255,.4); }
.ct-form { padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; }
.ct-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ct-form__label { font-size: 12px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .4px; display: block; margin-bottom: 6px; }
.ct-form__req { color: #f55; }
.ct-form__input {
  width: 100%; padding: 11px 14px;
  border: 1.5px solid #e8e8e8; border-radius: 10px;
  font-size: 14px; font-family: 'Gilroy', sans-serif; color: var(--dark);
  outline: none; transition: border-color .15s; box-sizing: border-box; background: #fff;
}
.ct-form__input:focus { border-color: var(--accent); }
.ct-form__select { cursor: pointer; }
.ct-form__btn { width: 100%; padding: 14px; font-size: 15px; display: flex; align-items: center; justify-content: center; gap: 8px; }
.ct-form__success {
  display: flex; align-items: center; gap: 10px;
  background: #f0fdf4; border: 1.5px solid #86efac;
  border-radius: 12px; padding: 14px 18px;
  font-size: 14px; font-weight: 600; color: #166534;
}
.ct-form__policy { font-size: 11px; color: #bbb; text-align: center; line-height: 1.5; }
.ct-form__policy a { color: #bbb; text-decoration: underline; }
.ct-success-enter-active, .ct-success-leave-active { transition: all .2s ease; }
.ct-success-enter-from { opacity: 0; transform: translateY(-6px); }
.ct-success-leave-to   { opacity: 0; transform: translateY(6px); }

/* Side */
.ct-side { display: flex; flex-direction: column; gap: 16px; }
.ct-requisites { background: #fff; border-radius: 16px; padding: 20px 22px; box-shadow: 0 1px 8px rgba(0,0,0,.06); }
.ct-districts-block { background: #fff; border-radius: 16px; padding: 20px 22px; box-shadow: 0 1px 8px rgba(0,0,0,.06); }
.ct-requisites__title { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 12px; }
.ct-requisites__row {
  display: flex; justify-content: space-between; gap: 12px;
  font-size: 13px; padding: 7px 0; border-bottom: 1px solid #f0f0f0;
}
.ct-requisites__row:last-child { border-bottom: none; }
.ct-requisites__row span:first-child { color: #9ca3af; }
.ct-requisites__row span:last-child  { font-weight: 600; color: var(--dark); }
.ct-districts { display: flex; flex-wrap: wrap; gap: 7px; }
.ct-district {
  background: #f7f8fa; border: 1px solid #e8e8e8;
  border-radius: 20px; padding: 5px 12px;
  font-size: 12.5px; font-weight: 600; color: var(--dark);
}

/* ═══ BRANCHES ═══ */
.ct-branches-section { background: #f7f8fa; padding: 52px 0 56px; border-top: 1px solid #eee; }
.ct-branches-title {
  font-size: clamp(26px, 3.5vw, 38px); font-weight: 900; color: var(--dark);
  font-family: 'Gilroy', sans-serif; margin-bottom: 28px; line-height: 1.1;
}
.ct-branches-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ct-branch-card {
  position: relative;
  background: #fff; border-radius: 18px;
  padding: 22px 22px 22px 20px;
  display: flex; align-items: flex-start; gap: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  border: 1.5px solid transparent;
  transition: box-shadow .2s;
}
.ct-branch-card--main {
  border-color: var(--accent);
}
.ct-branch-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.1); }
.ct-branch-card__icon {
  flex-shrink: 0;
  width: 38px; height: 38px; border-radius: 10px;
  background: #f0f0f0;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark); margin-top: 2px;
}
.ct-branch-card--main .ct-branch-card__icon {
  background: rgba(245,200,0,.15); color: var(--accent);
}
.ct-branch-card__body { flex: 1; }
.ct-branch-card__city { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 4px; }
.ct-branch-card__addr { font-size: 15px; font-weight: 700; color: var(--dark); line-height: 1.35; }
.ct-branch-card__note { font-size: 12px; color: #9ca3af; margin-top: 4px; }
.ct-branch-card__badge {
  position: absolute; top: 14px; right: 14px;
  background: var(--accent); color: var(--dark);
  font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .5px;
  padding: 3px 9px; border-radius: 20px;
}

/* ═══ Responsive ═══ */
@media (max-width: 1100px) {
  .ct-cards-row { grid-template-columns: 1fr 1fr; }
  .ct-bottom__grid { grid-template-columns: 1fr; }
  .ct-branches-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 680px) {
  .ct-cards-row { grid-template-columns: 1fr; }
  .ct-branches-grid { grid-template-columns: 1fr; }
  .ct-hero__title { font-size: 34px; }
  .ct-map-head { flex-direction: column; align-items: flex-start; }
  .ct-form__row { grid-template-columns: 1fr; }
  .ct-map-frame-wrap { height: 320px; }
}
</style>

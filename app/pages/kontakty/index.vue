<template>
  <div>

    <!-- Hero -->
    <section class="ct-hero">
      <div class="container ct-hero__inner">
        <div>
          <div class="ct-pretitle">Мы рядом</div>
          <h1 class="ct-hero__title">Контакты</h1>
          <p class="ct-hero__desc">Позвоните, напишите или оставьте заявку — ответим в течение 15 минут и запишем на бесплатный замер</p>
        </div>
        <div class="ct-hero__quick">
          <a :href="'tel:' + company.phoneTel" class="ct-hero__phone">
            <Icon name="lucide:phone" size="20" class="ct-hero__phone-icon"/>
            {{ company.phone }}
          </a>
          <div class="ct-hero__hours-today">
            <Icon name="lucide:clock" size="14"/>
            Сегодня: {{ todayHours }}
          </div>
        </div>
      </div>
    </section>

    <!-- Основной блок -->
    <section class="ct-main">
      <div class="container">
        <div class="ct-layout">

          <!-- Левая колонка: карточки контактов -->
          <div class="ct-cards">

            <!-- Телефон -->
            <div class="ct-card">
              <div class="ct-card__icon"><Icon name="lucide:phone-call" size="22"/></div>
              <div class="ct-card__content">
                <div class="ct-card__title">Телефон</div>
                <a :href="'tel:' + company.phoneTel" class="ct-card__main-link">{{ company.phone }}</a>
                <div class="ct-card__note">Звонок бесплатный по России</div>
              </div>
            </div>

            <!-- Email -->
            <div class="ct-card">
              <div class="ct-card__icon"><Icon name="lucide:mail" size="22"/></div>
              <div class="ct-card__content">
                <div class="ct-card__title">Email</div>
                <a :href="'mailto:' + company.email" class="ct-card__main-link">{{ company.email }}</a>
                <div class="ct-card__note">Для заказов и вопросов</div>
              </div>
            </div>

            <!-- Адрес -->
            <div class="ct-card">
              <div class="ct-card__icon"><Icon name="lucide:map-pin" size="22"/></div>
              <div class="ct-card__content">
                <div class="ct-card__title">Адрес офиса</div>
                <div class="ct-card__main-link">{{ company.address }}</div>
                <div class="ct-card__note">Приём по предварительной записи</div>
                <button class="ct-card__map-btn" @click="scrollToMap">
                  <Icon name="lucide:map" size="13"/>
                  Показать на карте
                </button>
              </div>
            </div>

            <!-- Режим работы -->
            <div class="ct-card">
              <div class="ct-card__icon"><Icon name="lucide:calendar-clock" size="22"/></div>
              <div class="ct-card__content">
                <div class="ct-card__title">Режим работы</div>
                <div class="ct-card__hours">
                  <div v-for="h in company.hours" :key="h.days" class="ct-card__hours-row">
                    <span class="ct-card__hours-days">{{ h.days }}</span>
                    <span class="ct-card__hours-time">{{ h.time }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Соцсети -->
            <div class="ct-card ct-card--social">
              <div class="ct-card__icon"><Icon name="lucide:share-2" size="22"/></div>
              <div class="ct-card__content">
                <div class="ct-card__title">Мессенджеры и соцсети</div>
                <div class="ct-socials">
                  <a :href="company.social.telegram" target="_blank" class="ct-social ct-social--tg">
                    <Icon name="simple-icons:telegram" size="18"/>
                    Telegram
                  </a>
                  <a :href="company.social.whatsapp" target="_blank" class="ct-social ct-social--wa">
                    <Icon name="simple-icons:whatsapp" size="18"/>
                    WhatsApp
                  </a>
                  <a :href="company.social.vk" target="_blank" class="ct-social ct-social--vk">
                    <Icon name="simple-icons:vk" size="18"/>
                    ВКонтакте
                  </a>
                </div>
              </div>
            </div>

            <!-- Районы -->
            <div class="ct-card ct-card--districts">
              <div class="ct-card__icon"><Icon name="lucide:navigation" size="22"/></div>
              <div class="ct-card__content">
                <div class="ct-card__title">Работаем по районам</div>
                <div class="ct-districts">
                  <span v-for="d in districts" :key="d" class="ct-district">{{ d }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Правая колонка: форма обратной связи -->
          <div class="ct-form-col">
            <div class="ct-form-card">
              <div class="ct-form-card__head">
                <Icon name="lucide:message-square-plus" size="22" class="ct-form-card__head-icon"/>
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
                    <input
                      :value="form.phone" class="ct-form__input" type="tel"
                      placeholder="+7 (999) 999-99-99" required
                      @input="form.phone = maskPhone($event)"
                    />
                  </div>
                </div>
                <div class="ct-form__row">
                  <div class="ct-form__field">
                    <label class="ct-form__label">Удобное время звонка</label>
                    <select v-model="form.time" class="ct-form__input ct-form__select">
                      <option value="">Любое время</option>
                      <option value="9-12">9:00 — 12:00</option>
                      <option value="12-15">12:00 — 15:00</option>
                      <option value="15-18">15:00 — 18:00</option>
                      <option value="18-20">18:00 — 20:00</option>
                    </select>
                  </div>
                  <div class="ct-form__field">
                    <label class="ct-form__label">Комментарий</label>
                    <input v-model="form.comment" class="ct-form__input" type="text" placeholder="Опишите задачу или вопрос"/>
                  </div>
                </div>

                <Transition name="ct-success" mode="out-in">
                  <div v-if="sent" key="success" class="ct-form__success">
                    <Icon name="lucide:check-circle" size="22"/>
                    Заявка принята! Позвоним в течение 15 минут.
                  </div>
                  <button v-else key="btn" type="submit" class="nav-btn ct-form__btn">
                    <Icon name="lucide:send" size="16"/>
                    Отправить заявку
                  </button>
                </Transition>

                <p class="ct-form__policy">
                  Нажимая кнопку, вы соглашаетесь с
                  <NuxtLink to="/politika-konfidentsialnosti">политикой конфиденциальности</NuxtLink>
                </p>
              </form>
            </div>

            <!-- Реквизиты -->
            <div class="ct-requisites">
              <div class="ct-requisites__title">Реквизиты</div>
              <div class="ct-requisites__row">
                <span>Полное наименование</span>
                <span>{{ company.fullName }}</span>
              </div>
              <div class="ct-requisites__row">
                <span>ИНН</span>
                <span>{{ company.inn }}</span>
              </div>
              <div class="ct-requisites__row">
                <span>ОГРН</span>
                <span>{{ company.ogrn }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Карта -->
    <section class="ct-map-section" ref="mapSection">
      <div class="ct-map-overlay">
        <div class="ct-map-info">
          <Icon name="lucide:map-pin" size="18" class="ct-map-info__icon"/>
          <div>
            <div class="ct-map-info__title">{{ company.addressShort }}</div>
            <div class="ct-map-info__sub">г. Иркутск</div>
          </div>
          <a :href="'tel:' + company.phoneTel" class="ct-map-info__phone">{{ company.phone }}</a>
        </div>
      </div>
      <div class="ct-map-placeholder">
        <Icon name="lucide:map" size="56" class="ct-map-placeholder__icon"/>
        <div class="ct-map-placeholder__title">Здесь будет карта</div>
        <div class="ct-map-placeholder__sub">Вставьте embed-код Яндекс.Карты в <code>data/contacts.ts</code></div>
      </div>
    </section>

    <!-- Schema.org LocalBusiness -->
    <Head>
      <Script type="application/ld+json">{{ schemaOrg }}</Script>
    </Head>

  </div>
</template>

<script setup lang="ts">
import { company, districts } from '~/data/contacts'

useHead({
  title: 'Контакты — натяжные потолки в Иркутске | ПроПотолок',
  meta: [
    { name: 'description', content: `Контакты компании ПроПотолок в Иркутске. Телефон: ${company.phone}. Адрес: ${company.address}. Бесплатный замер на дому.` },
  ],
})

const mapSection = ref<HTMLElement | null>(null)
const sent = ref(false)

const form = reactive({
  name: '',
  phone: '',
  time: '',
  comment: '',
})

const todayHours = computed(() => {
  const day = new Date().getDay()
  if (day === 0) return company.hours[2].time
  if (day === 6) return company.hours[1].time
  return company.hours[0].time
})

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
  setTimeout(() => {
    sent.value = false
    form.name = ''; form.phone = ''; form.time = ''; form.comment = ''
  }, 4000)
}

const schemaOrg = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: company.name,
  description: 'Натяжные потолки в Иркутске. Монтаж, замер, ремонт.',
  telephone: company.phone,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.addressShort,
    addressLocality: 'Иркутск',
    addressRegion: 'Иркутская область',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: company.mapLat,
    longitude: company.mapLng,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '18:00' },
  ],
  sameAs: [company.social.vk, company.social.telegram],
  priceRange: '₽₽',
  url: 'https://propopotolok.ru',
}))
</script>

<style scoped>
/* ═══ Hero ═══ */
.ct-hero { background: #141414; padding: 48px 0 52px; }
.ct-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ct-pretitle {
  display: inline-block; background: var(--accent); color: #141414;
  font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px;
  margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px;
}
.ct-hero__title { font-size: 40px; font-weight: 900; color: #fff; margin-bottom: 12px; }
.ct-hero__desc  { font-size: 16px; color: rgba(255,255,255,.4); max-width: 500px; line-height: 1.6; }
.ct-hero__quick { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
.ct-hero__phone {
  font-size: 28px; font-weight: 900; color: var(--accent);
  font-family: 'Gilroy', sans-serif; text-decoration: none;
  display: flex; align-items: center; gap: 10px;
  transition: opacity .15s;
}
.ct-hero__phone:hover { opacity: .8; }
.ct-hero__phone-icon { color: var(--accent); }
.ct-hero__hours-today {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: rgba(255,255,255,.35);
}

/* ═══ Main ═══ */
.ct-main { background: #f7f7f7; padding: 56px 0 64px; }
.ct-layout { display: grid; grid-template-columns: 1fr 420px; gap: 28px; align-items: start; }

/* Contact cards */
.ct-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.ct-card {
  background: #fff; border-radius: 16px; padding: 22px 20px;
  display: flex; gap: 16px; align-items: flex-start;
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
  border: 1.5px solid transparent;
  transition: border-color .15s;
}
.ct-card:hover { border-color: var(--accent); }
.ct-card--social,
.ct-card--districts { grid-column: 1 / -1; }

.ct-card__icon {
  width: 46px; height: 46px; flex-shrink: 0;
  background: rgba(245,200,0,.12); border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark);
}
.ct-card__title { font-size: 12px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 8px; }
.ct-card__main-link { font-size: 17px; font-weight: 700; color: var(--dark); text-decoration: none; display: block; margin-bottom: 3px; transition: color .15s; }
a.ct-card__main-link:hover { color: var(--accent); }
.ct-card__sub-link { font-size: 14px; color: var(--gray); text-decoration: none; display: block; margin-bottom: 6px; transition: color .15s; }
a.ct-card__sub-link:hover { color: var(--dark); }
.ct-card__note { font-size: 12px; color: #aaa; }
.ct-card__map-btn {
  display: inline-flex; align-items: center; gap: 5px;
  margin-top: 8px; font-size: 13px; font-weight: 600;
  color: var(--accent); background: none; border: none; cursor: pointer;
  font-family: 'Gilroy', sans-serif; padding: 0;
  transition: opacity .15s;
}
.ct-card__map-btn:hover { opacity: .75; }

.ct-card__hours { display: flex; flex-direction: column; gap: 6px; }
.ct-card__hours-row { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; }
.ct-card__hours-days { color: var(--gray); }
.ct-card__hours-time { font-weight: 700; color: var(--dark); white-space: nowrap; }

.ct-socials { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
.ct-social {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 16px; border-radius: 10px;
  font-size: 14px; font-weight: 700; text-decoration: none;
  transition: opacity .15s, transform .15s;
}
.ct-social:hover { opacity: .85; transform: translateY(-2px); }
.ct-social--tg { background: #29a8e9; color: #fff; }
.ct-social--wa { background: #25d366; color: #fff; }
.ct-social--vk { background: #0077ff; color: #fff; }

.ct-districts { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 4px; }
.ct-district {
  background: #f7f7f7; border: 1px solid #e8e8e8;
  border-radius: 20px; padding: 5px 12px;
  font-size: 13px; font-weight: 600; color: var(--dark);
}

/* ═══ Форма ═══ */
.ct-form-col { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 100px; }
.ct-form-card {
  background: #fff; border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,.09);
  overflow: hidden;
}
.ct-form-card__head {
  display: flex; align-items: center; gap: 14px;
  background: var(--dark); padding: 20px 24px;
}
.ct-form-card__head-icon { color: var(--accent); flex-shrink: 0; }
.ct-form-card__title { font-size: 17px; font-weight: 800; color: #fff; }
.ct-form-card__sub   { font-size: 12px; color: rgba(255,255,255,.4); }

.ct-form { padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; }
.ct-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ct-form__label { font-size: 12px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .4px; display: block; margin-bottom: 6px; }
.ct-form__req { color: #f55; }
.ct-form__input {
  width: 100%; padding: 11px 14px;
  border: 1.5px solid #e8e8e8; border-radius: 10px;
  font-size: 14px; font-family: 'Gilroy', sans-serif; color: var(--dark);
  outline: none; transition: border-color .15s; box-sizing: border-box;
  background: #fff;
}
.ct-form__input:focus { border-color: var(--accent); }
.ct-form__select { cursor: pointer; }
.ct-form__btn {
  width: 100%; padding: 14px; font-size: 15px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.ct-form__btn:hover { color: var(--dark); }
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

/* Реквизиты */
.ct-requisites {
  background: #fff; border-radius: 14px; padding: 18px 20px;
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
}
.ct-requisites__title { font-size: 12px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 12px; }
.ct-requisites__row {
  display: flex; justify-content: space-between; gap: 12px;
  font-size: 13px; padding: 7px 0; border-bottom: 1px solid #f0f0f0;
}
.ct-requisites__row:last-child { border-bottom: none; }
.ct-requisites__row span:first-child { color: var(--gray); }
.ct-requisites__row span:last-child  { font-weight: 600; color: var(--dark); }

/* ═══ Карта ═══ */
.ct-map-section {
  height: 420px; background: #1a1a1a;
  position: relative; overflow: hidden;
}
.ct-map-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; color: #444;
}
.ct-map-placeholder__icon { color: #333; }
.ct-map-placeholder__title { font-size: 18px; font-weight: 700; color: #555; }
.ct-map-placeholder__sub { font-size: 13px; color: #444; }
.ct-map-placeholder__sub code { background: #2a2a2a; padding: 2px 6px; border-radius: 4px; color: var(--accent); font-size: 12px; }

.ct-map-overlay {
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
  z-index: 10;
}
.ct-map-info {
  display: flex; align-items: center; gap: 14px;
  background: #fff; border-radius: 14px; padding: 14px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,.2);
  white-space: nowrap;
}
.ct-map-info__icon { color: var(--accent); flex-shrink: 0; }
.ct-map-info__title { font-size: 14px; font-weight: 700; color: var(--dark); }
.ct-map-info__sub   { font-size: 12px; color: var(--gray); }
.ct-map-info__phone { font-size: 16px; font-weight: 800; color: var(--dark); text-decoration: none; font-family: 'Gilroy', sans-serif; }
.ct-map-info__phone:hover { color: var(--accent); }

/* ═══ Responsive ═══ */
@media (max-width: 1100px) {
  .ct-layout { grid-template-columns: 1fr; }
  .ct-form-col { position: static; }
}
@media (max-width: 768px) {
  .ct-hero__inner { flex-direction: column; align-items: flex-start; }
  .ct-hero__quick { align-items: flex-start; }
  .ct-cards { grid-template-columns: 1fr; }
  .ct-card--social, .ct-card--districts { grid-column: 1; }
  .ct-hero__title { font-size: 30px; }
  .ct-map-section { height: 320px; }
  .ct-map-info { flex-wrap: wrap; }
  .ct-form__row { grid-template-columns: 1fr; }
}
</style>

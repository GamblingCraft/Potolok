<template>
  <div>

    <section class="ov-hero">
      <div class="container ov-hero__inner">
        <div>
          <div class="ov-pretitle">Удобные условия</div>
          <h1 class="ov-hero__title">Способы оплаты</h1>
          <p class="ov-hero__desc">Принимаем оплату наиболее популярными способами. Без предоплаты — оплата после монтажа и вашей приёмки работы.</p>
        </div>
        <div class="ov-hero__note">
          <Icon name="lucide:shield-check" size="28" class="ov-hero__note-icon"/>
          <div>
            <div class="ov-hero__note-title">Без предоплаты</div>
            <div class="ov-hero__note-text">Оплата производится только после монтажа и вашей приёмки работы</div>
          </div>
        </div>
      </div>
    </section>

    <section class="ov-section ov-section--white">
      <div class="container">
        <div class="ov-head">
          <div class="ov-pretitle ov-pretitle--dark">Способы оплаты</div>
          <h2 class="ov-title">Как оплатить натяжной потолок</h2>
          <p class="ov-subtitle">Оплата наличными или переводом через банк. По безналичному расчёту возможна частичная предоплата.</p>
        </div>
        <div class="ov-methods">
          <div class="ov-method" v-for="m in methods" :key="m.title">
            <div class="ov-method__icon"><Icon :name="m.icon" size="28"/></div>
            <div class="ov-method__title">{{ m.title }}</div>
            <div class="ov-method__desc">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="ov-section ov-section--gray">
      <div class="container">
        <div class="ov-head">
          <div class="ov-pretitle ov-pretitle--dark">Почему нам доверяют</div>
          <h2 class="ov-title">Гарантии и надёжность</h2>
        </div>
        <div class="ov-why">
          <div class="ov-why-card" v-for="w in whyCards" :key="w.title">
            <div class="ov-why-card__num">{{ w.num }}</div>
            <div class="ov-why-card__icon"><Icon :name="w.icon" size="22"/></div>
            <div class="ov-why-card__title">{{ w.title }}</div>
            <div class="ov-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="ov-section ov-section--white">
      <div class="container ov-docs">
        <div class="ov-head">
          <div class="ov-pretitle ov-pretitle--dark">Юридические лица</div>
          <h2 class="ov-title">Оплата для организаций</h2>
        </div>
        <div class="ov-docs-grid">
          <div class="ov-doc" v-for="d in bizDocs" :key="d.title">
            <Icon :name="d.icon" size="22" class="ov-doc__icon"/>
            <div class="ov-doc__title">{{ d.title }}</div>
            <div class="ov-doc__desc">{{ d.desc }}</div>
          </div>
        </div>
        <div class="ov-legal">
          <Icon name="lucide:info" size="15" class="ov-legal__icon"/>
          <div class="ov-legal__text">
            Для юридических лиц и ИП работаем по договору подряда. Принимаем безналичную оплату по счёту. Реквизиты для выставления счёта — в разделе <NuxtLink to="/rekvizity">«Реквизиты»</NuxtLink>.
          </div>
        </div>
      </div>
    </section>

    <section class="ov-cta">
      <div class="container ov-cta__inner">
        <div>
          <h2 class="ov-cta__title">Есть вопросы по оплате?</h2>
          <p class="ov-cta__desc">Позвоните — объясним все варианты и подберём удобный способ расчёта</p>
        </div>
        <div class="ov-cta__btns">
          <a :href="'tel:' + site.phoneRaw" class="nav-btn ov-btn"><Icon name="lucide:phone-call" size="16"/>Позвонить</a>
          <NuxtLink to="/rekvizity" class="ov-btn-outline"><Icon name="lucide:file-text" size="16"/>Реквизиты</NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const site = useSite()
usePageSeoMeta('rassrochka-i-oplata')

const methods = [
  { icon: 'lucide:banknote',    title: 'Наличными',                    desc: 'Оплата наличными мастеру после завершения монтажа и вашей приёмки. Выдаём кассовый чек.' },
  { icon: 'lucide:building-2',  title: 'Безналичный расчёт',          desc: 'Для ИП и организаций — оплата по счёту. Договор подряда, акт выполненных работ.' },
  { icon: 'lucide:smartphone',  title: 'Перевод через банк / СБП',    desc: 'Перевод через мобильный банк или СБП по номеру телефона. Без комиссии.' },
]

const whyCards = [
  { num: '1', icon: 'lucide:badge-check',  title: 'Сертификаты',        desc: 'На всю продукцию предоставим сертификат качества по вашему запросу.' },
  { num: '2', icon: 'lucide:users',        title: 'Свои мастера',       desc: 'Только собственные монтажные бригады — полностью несём ответственность.' },
  { num: '3', icon: 'lucide:shield-check', title: 'Гарантия 12 лет',    desc: 'Письменная гарантия по договору. Если что-то не так — устраняем бесплатно.' },
  { num: '4', icon: 'lucide:calendar',     title: 'Опыт с 2009 года',   desc: 'Более 15 лет на рынке натяжных потолков в Иркутске.' },
]

const bizDocs = [
  { icon: 'lucide:file-signature', title: 'Договор подряда',       desc: 'Письменный договор с юридическим лицом или ИП' },
  { icon: 'lucide:receipt',        title: 'Счёт на оплату',        desc: 'Выставляем счёт в течение 1 рабочего дня' },
  { icon: 'lucide:file-check',     title: 'Акт выполненных работ', desc: 'Двусторонний акт после завершения монтажа' },
  { icon: 'lucide:badge',          title: 'Накладная на материалы', desc: 'Товарная накладная с сертификатами при необходимости' },
]
</script>

<style scoped>
.ov-pretitle { display: inline-block; background: var(--accent); color: #141414; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.ov-pretitle--dark { color: var(--dark); }
.ov-head { text-align: center; margin-bottom: 36px; }
.ov-title { font-size: 28px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.ov-subtitle { font-size: 15px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }
.ov-section { padding: 64px 0; }
.ov-section--white { background: #fff; }
.ov-section--gray  { background: #f7f7f7; }

.ov-hero { background: #141414; padding: 48px 0; }
.ov-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ov-hero__title { font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 10px; }
.ov-hero__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; line-height: 1.6; }
.ov-hero__note { display: flex; align-items: flex-start; gap: 16px; background: rgba(245,200,0,.1); border: 1px solid rgba(245,200,0,.25); border-radius: 16px; padding: 20px 24px; max-width: 360px; }
.ov-hero__note-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.ov-hero__note-title { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.ov-hero__note-text  { font-size: 13px; color: rgba(255,255,255,.5); line-height: 1.55; }

.ov-methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ov-method { background: #f7f7f7; border-radius: 16px; padding: 28px 24px; border: 2px solid transparent; transition: border-color .15s; text-align: center; }
.ov-method:hover { border-color: var(--accent); }
.ov-method__icon { width: 56px; height: 56px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin: 0 auto 14px; }
.ov-method__title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
.ov-method__desc  { font-size: 14px; color: #555; line-height: 1.6; }

.ov-why { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.ov-why-card { background: #fff; border-radius: 16px; padding: 26px 22px; border: 1.5px solid #eee; position: relative; }
.ov-why-card__num { position: absolute; top: 16px; right: 16px; font-size: 40px; font-weight: 900; color: rgba(0,0,0,.05); line-height: 1; }
.ov-why-card__icon { width: 46px; height: 46px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; }
.ov-why-card__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
.ov-why-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.55; }

.ov-docs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.ov-doc { background: #f7f7f7; border-radius: 14px; padding: 22px 20px; border: 1.5px solid transparent; transition: border-color .15s; }
.ov-doc:hover { border-color: var(--accent); }
.ov-doc__icon { color: var(--accent); margin-bottom: 10px; }
.ov-doc__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 5px; }
.ov-doc__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }
.ov-legal { display: flex; align-items: flex-start; gap: 10px; background: #f7f7f7; border-radius: 12px; padding: 16px 20px; font-size: 13px; color: #666; line-height: 1.6; border: 1px solid #eee; }
.ov-legal__icon { color: var(--gray); flex-shrink: 0; margin-top: 1px; }
.ov-legal a { color: var(--dark); font-weight: 600; }

.ov-cta { background: #141414; padding: 52px 0; }
.ov-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.ov-cta__title { font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.ov-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); }
.ov-cta__btns  { display: flex; gap: 12px; flex-wrap: wrap; }
.ov-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; font-size: 14px; }
.ov-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; font-size: 14px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 50px; color: #fff; cursor: pointer; text-decoration: none; transition: border-color .15s, color .15s; }
.ov-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 900px) { .ov-methods { grid-template-columns: 1fr; } .ov-why { grid-template-columns: 1fr 1fr; } .ov-docs-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .ov-hero__title { font-size: 28px; } .ov-why { grid-template-columns: 1fr; } .ov-docs-grid { grid-template-columns: 1fr; } .ov-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>

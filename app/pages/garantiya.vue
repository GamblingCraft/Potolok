<template>
  <div>

    <section class="gr-hero">
      <div class="container gr-hero__inner">
        <div class="gr-hero__content">
          <div class="gr-pretitle">Наши обязательства</div>
          <h1 class="gr-hero__title">Гарантия на натяжные потолки 12 лет</h1>
          <p class="gr-hero__desc">Письменная гарантия на полотно и монтажные работы фиксируется в договоре. Любой дефект по нашей вине — устраняем бесплатно.</p>
          <div class="gr-hero__badge-row">
            <div class="gr-badge" v-for="b in heroBadges" :key="b.label">
              <Icon :name="b.icon" size="20" class="gr-badge__icon"/>
              <div>
                <div class="gr-badge__val">{{ b.val }}</div>
                <div class="gr-badge__label">{{ b.label }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="gr-hero__shield">
          <Icon name="lucide:shield-check" size="80" class="gr-hero__shield-icon"/>
          <div class="gr-hero__shield-val">12</div>
          <div class="gr-hero__shield-label">лет гарантии</div>
        </div>
      </div>
    </section>

    <!-- На что распространяется -->
    <section class="gr-section gr-section--white">
      <div class="container">
        <div class="gr-head">
          <div class="gr-pretitle gr-pretitle--dark">Условия</div>
          <h2 class="gr-title">На что распространяется гарантия</h2>
        </div>
        <div class="gr-two-col">
          <div>
            <div class="gr-list gr-list--yes">
              <div class="gr-list__title"><Icon name="lucide:check-circle" size="18" class="gr-list__icon--yes"/>Входит в гарантию</div>
              <ul>
                <li v-for="i in warrantyYes" :key="i">{{ i }}</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="gr-list gr-list--no">
              <div class="gr-list__title"><Icon name="lucide:x-circle" size="18" class="gr-list__icon--no"/>Не входит в гарантию</div>
              <ul>
                <li v-for="i in warrantyNo" :key="i">{{ i }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Как воспользоваться -->
    <section class="gr-section gr-section--dark">
      <div class="container">
        <div class="gr-head">
          <div class="gr-pretitle">Гарантийный случай</div>
          <h2 class="gr-title gr-title--light">Как воспользоваться гарантией</h2>
          <p class="gr-desc gr-desc--light">Это просто и бесплатно</p>
        </div>
        <div class="gr-steps">
          <div class="gr-step" v-for="(s, i) in steps" :key="s.title">
            <div class="gr-step__num">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="gr-step__icon"><Icon :name="s.icon" size="24"/></div>
            <div class="gr-step__title">{{ s.title }}</div>
            <div class="gr-step__desc">{{ s.desc }}</div>
          </div>
        </div>
        <div class="gr-steps-cta">
          <a href="tel:+73952000000" class="nav-btn gr-btn">
            <Icon name="lucide:phone-call" size="16"/>Сообщить о дефекте
          </a>
        </div>
      </div>
    </section>

    <!-- Карточки гарантии -->
    <section class="gr-section gr-section--gray">
      <div class="container">
        <div class="gr-head">
          <div class="gr-pretitle gr-pretitle--dark">Подробнее</div>
          <h2 class="gr-title">Гарантийные обязательства</h2>
        </div>
        <div class="gr-cards">
          <div class="gr-card" v-for="c in cards" :key="c.title">
            <div class="gr-card__icon"><Icon :name="c.icon" size="22"/></div>
            <div class="gr-card__title">{{ c.title }}</div>
            <div class="gr-card__desc">{{ c.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ гарантии -->
    <section class="gr-section gr-section--white">
      <div class="container">
        <div class="gr-head">
          <div class="gr-pretitle gr-pretitle--dark">Вопросы</div>
          <h2 class="gr-title">Часто задаваемые вопросы о гарантии</h2>
        </div>
        <div class="gr-faq-list">
          <div class="gr-faq-item" v-for="(q, i) in faq" :key="q.q" :class="{ open: faqOpen === i }" @click="faqOpen = faqOpen === i ? -1 : i">
            <div class="gr-faq-item__q">{{ q.q }}<Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="gr-faq-arrow"/></div>
            <div class="gr-faq-item__a">{{ q.a }}</div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Гарантия на натяжные потолки 12 лет — ПроПотолок Иркутск',
  meta: [{ name: 'description', content: 'Гарантия на натяжные потолки 12 лет по договору. Устраняем любой дефект по нашей вине бесплатно. Выезд в течение 24 часов.' }],
})

const faqOpen = ref(-1)

const heroBadges = [
  { icon: 'lucide:file-text',  val: 'По договору',  label: 'письменно' },
  { icon: 'lucide:clock',      val: '24 часа',      label: 'выезд по гарантии' },
  { icon: 'lucide:banknote',   val: 'Бесплатно',    label: 'устранение дефектов' },
]

const warrantyYes = [
  'Провисание или отслоение полотна от профиля',
  'Деформация полотна в процессе эксплуатации',
  'Потеря цвета или фактуры по вине материала',
  'Дефекты монтажа, выявленные при эксплуатации',
  'Отслоение багетного профиля от стены',
  'Проблемы с установленными светильниками',
  'Все скрытые дефекты, не выявленные при сдаче',
]

const warrantyNo = [
  'Механические повреждения острыми предметами',
  'Ожоги от ламп мощностью свыше нормы',
  'Последствия затопления (требует отдельного обращения)',
  'Повреждения при капитальном ремонте помещения',
  'Использование абразивных средств при чистке',
  'Дефекты по вине третьих лиц',
]

const steps = [
  { icon: 'lucide:camera',      title: 'Сфотографируйте', desc: 'Сделайте фото дефекта и опишите, когда и как он появился.' },
  { icon: 'lucide:phone-call',  title: 'Позвоните нам',   desc: 'Звоните по номеру +7 (3952) 00-00-00 или отправьте фото на email.' },
  { icon: 'lucide:car',         title: 'Выезд мастера',   desc: 'Мастер приедет в течение 24 часов после обращения.' },
  { icon: 'lucide:wrench',      title: 'Бесплатный ремонт', desc: 'Устраним дефект за наш счёт. Оплата с вас — ноль рублей.' },
]

const cards = [
  { icon: 'lucide:shield',       title: 'Срок гарантии',      desc: '12 лет с момента монтажа на полотно и монтажные работы. Условия прописаны в договоре.' },
  { icon: 'lucide:clock',        title: 'Время реакции',       desc: 'По гарантийному обращению выезжаем в течение 24 часов в рабочие дни.' },
  { icon: 'lucide:banknote',     title: 'Стоимость',           desc: 'Все гарантийные работы выполняются бесплатно. Никаких скрытых платежей.' },
  { icon: 'lucide:file-text',    title: 'Договор',             desc: 'Гарантийные обязательства зафиксированы в договоре, который подписывается при монтаже.' },
  { icon: 'lucide:badge-check',  title: 'Материалы',           desc: 'Европейские полотна рассчитаны на срок службы 25+ лет. Гарантия производителя — отдельная.' },
  { icon: 'lucide:refresh-cw',   title: 'Гарантийный ремонт', desc: 'Если дефект неустраним — заменим полотно полностью за наш счёт.' },
]

const faq = [
  { q: 'С какого момента начинается гарантийный срок?', a: 'С момента подписания акта выполненных работ при сдаче объекта. Дата фиксируется в договоре.' },
  { q: 'Что делать, если обнаружил дефект через 5 лет?', a: 'Позвоните нам — если дефект возник по нашей вине и в течение 12 лет, выезд и ремонт бесплатны. Приезд в течение 24 часов.' },
  { q: 'Распространяется ли гарантия на светильники?', a: 'Да. Гарантия распространяется на все работы по установке светильников, термоколец и подключению к электрике, выполненные нашими мастерами.' },
  { q: 'Что если затопили соседи — это гарантийный случай?', a: 'Затопление — страховой, но не гарантийный случай. Мы приедем и сольём воду отдельной услугой. Если потолок восстановит форму — дополнительных расходов нет.' },
  { q: 'Сохраняется ли гарантия при смене владельца квартиры?', a: 'Да. Гарантия распространяется на объект, а не на конкретного человека. При продаже квартиры можно передать договор с гарантийным талоном новому владельцу.' },
]
</script>

<style scoped>
.gr-pretitle { display: inline-block; background: var(--accent); color: #141414; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.gr-pretitle--dark { background: var(--accent); color: var(--dark); }
.gr-head { text-align: center; margin-bottom: 40px; }
.gr-title { font-size: 30px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.gr-title--light { color: #fff; }
.gr-desc { font-size: 15px; color: var(--gray); }
.gr-desc--light { color: rgba(255,255,255,.4); }
.gr-section { padding: 64px 0; }
.gr-section--white { background: #fff; }
.gr-section--gray  { background: #f7f7f7; }
.gr-section--dark  { background: #141414; }

.gr-hero { background: #141414; padding: 52px 0; }
.gr-hero__inner { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; }
.gr-hero__title { font-size: 38px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 14px; }
.gr-hero__desc  { font-size: 16px; color: rgba(255,255,255,.5); line-height: 1.65; margin-bottom: 32px; max-width: 540px; }
.gr-hero__badge-row { display: flex; gap: 20px; flex-wrap: wrap; }
.gr-badge { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 14px 18px; }
.gr-badge__icon { color: var(--accent); flex-shrink: 0; }
.gr-badge__val   { font-size: 18px; font-weight: 800; color: #fff; line-height: 1; }
.gr-badge__label { font-size: 12px; color: rgba(255,255,255,.4); }
.gr-hero__shield { display: flex; flex-direction: column; align-items: center; text-align: center; background: rgba(245,200,0,.1); border: 2px solid rgba(245,200,0,.3); border-radius: 24px; padding: 32px 40px; }
.gr-hero__shield-icon { color: var(--accent); margin-bottom: 8px; }
.gr-hero__shield-val   { font-size: 64px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; line-height: 1; }
.gr-hero__shield-label { font-size: 16px; font-weight: 700; color: rgba(255,255,255,.5); }

.gr-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.gr-list { border-radius: 16px; padding: 28px; }
.gr-list--yes { background: rgba(52,211,153,.06); border: 1.5px solid rgba(52,211,153,.2); }
.gr-list--no  { background: rgba(255,80,80,.05);  border: 1.5px solid rgba(255,80,80,.15); }
.gr-list__title { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 800; color: var(--dark); margin-bottom: 16px; }
.gr-list__icon--yes { color: #34d399; }
.gr-list__icon--no  { color: #ff6060; }
.gr-list ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
.gr-list ul li { font-size: 14px; color: #444; padding-left: 16px; position: relative; line-height: 1.5; }
.gr-list--yes ul li::before { content: '✓'; position: absolute; left: 0; color: #34d399; font-weight: 700; }
.gr-list--no  ul li::before { content: '✗'; position: absolute; left: 0; color: #ff6060; font-weight: 700; }

.gr-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-bottom: 36px; }
.gr-step { padding: 24px; border-right: 1px solid #2a2a2a; }
.gr-step:last-child { border-right: none; }
.gr-step__num { font-size: 40px; font-weight: 900; color: rgba(255,255,255,.04); font-family: 'Gilroy', sans-serif; margin-bottom: 12px; line-height: 1; }
.gr-step__icon { color: var(--accent); margin-bottom: 10px; }
.gr-step__title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 6px; }
.gr-step__desc  { font-size: 13px; color: rgba(255,255,255,.4); line-height: 1.6; }
.gr-steps-cta { text-align: center; }
.gr-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; font-size: 15px; }

.gr-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gr-card { background: #fff; border-radius: 16px; padding: 26px 22px; border: 1.5px solid transparent; transition: border-color .15s; }
.gr-card:hover { border-color: var(--accent); }
.gr-card__icon { width: 48px; height: 48px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; }
.gr-card__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.gr-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

.gr-faq-list { display: flex; flex-direction: column; gap: 10px; max-width: 800px; margin: 0 auto; }
.gr-faq-item { background: #f7f7f7; border-radius: 12px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.gr-faq-item.open { border-color: var(--accent); }
.gr-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; }
.gr-faq-arrow { flex-shrink: 0; color: var(--gray); }
.gr-faq-item.open .gr-faq-arrow { color: var(--accent); }
.gr-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 20px; }
.gr-faq-item.open .gr-faq-item__a { max-height: 200px; padding: 0 20px 16px; }

@media (max-width: 1024px) { .gr-hero__inner { grid-template-columns: 1fr; } .gr-hero__shield { display: none; } .gr-steps { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .gr-two-col { grid-template-columns: 1fr; } .gr-cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .gr-hero__title { font-size: 28px; } .gr-cards { grid-template-columns: 1fr; } .gr-steps { grid-template-columns: 1fr; } .gr-step { border-right: none; border-bottom: 1px solid #2a2a2a; } }
</style>

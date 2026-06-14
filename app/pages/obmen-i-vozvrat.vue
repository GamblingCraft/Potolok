<template>
  <div>

    <section class="ov-hero">
      <div class="container ov-hero__inner">
        <div>
          <div class="ov-pretitle">Защита клиента</div>
          <h1 class="ov-hero__title">Обмен и возврат</h1>
          <p class="ov-hero__desc">Мы работаем честно и соблюдаем права потребителя. Если что-то пошло не так — разберёмся вместе.</p>
        </div>
        <div class="ov-hero__note">
          <Icon name="lucide:scale" size="28" class="ov-hero__note-icon"/>
          <div>
            <div class="ov-hero__note-title">Закон на вашей стороне</div>
            <div class="ov-hero__note-text">Работаем в соответствии с Законом РФ «О защите прав потребителей» № 2300-1</div>
          </div>
        </div>
      </div>
    </section>

    <section class="ov-section ov-section--white">
      <div class="container">
        <div class="ov-head">
          <div class="ov-pretitle ov-pretitle--dark">Основные условия</div>
          <h2 class="ov-title">Когда возможен возврат или обмен</h2>
        </div>
        <div class="ov-cases">
          <div class="ov-case ov-case--yes" v-for="c in casesYes" :key="c.title">
            <div class="ov-case__icon ov-case__icon--yes"><Icon :name="c.icon" size="20"/></div>
            <div>
              <div class="ov-case__title">{{ c.title }}</div>
              <div class="ov-case__desc">{{ c.desc }}</div>
            </div>
          </div>
        </div>

        <div class="ov-head ov-head--mt">
          <h2 class="ov-title">Когда возврат не предусмотрен</h2>
        </div>
        <div class="ov-cases">
          <div class="ov-case ov-case--no" v-for="c in casesNo" :key="c.title">
            <div class="ov-case__icon ov-case__icon--no"><Icon :name="c.icon" size="20"/></div>
            <div>
              <div class="ov-case__title">{{ c.title }}</div>
              <div class="ov-case__desc">{{ c.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ov-section ov-section--gray">
      <div class="container">
        <div class="ov-head">
          <div class="ov-pretitle ov-pretitle--dark">Пошаговая инструкция</div>
          <h2 class="ov-title">Как оформить обмен или возврат</h2>
        </div>
        <div class="ov-steps">
          <div class="ov-step" v-for="(s, i) in steps" :key="s.title">
            <div class="ov-step__num">{{ i + 1 }}</div>
            <div class="ov-step__icon"><Icon :name="s.icon" size="22"/></div>
            <div class="ov-step__title">{{ s.title }}</div>
            <div class="ov-step__desc">{{ s.desc }}</div>
          </div>
        </div>
        <div class="ov-steps__cta">
          <a :href="'tel:' + site.phoneRaw" class="nav-btn ov-btn">
            <Icon name="lucide:phone-call" size="16"/>Позвонить по вопросу возврата
          </a>
        </div>
      </div>
    </section>

    <section class="ov-section ov-section--white">
      <div class="container ov-docs">
        <div class="ov-head">
          <div class="ov-pretitle ov-pretitle--dark">Документы</div>
          <h2 class="ov-title">Что понадобится для возврата</h2>
        </div>
        <div class="ov-docs-grid">
          <div class="ov-doc" v-for="d in docs" :key="d.title">
            <Icon :name="d.icon" size="22" class="ov-doc__icon"/>
            <div class="ov-doc__title">{{ d.title }}</div>
            <div class="ov-doc__desc">{{ d.desc }}</div>
          </div>
        </div>
        <div class="ov-legal">
          <Icon name="lucide:info" size="15" class="ov-legal__icon"/>
          <div class="ov-legal__text">
            Возврат денежных средств осуществляется в соответствии со ст. 22 Закона РФ «О защите прав потребителей» — в течение 10 дней с момента подачи требования. При оплате картой — возврат на карту. При оплате наличными — наличными или переводом.
          </div>
        </div>
      </div>
    </section>

    <section class="ov-cta">
      <div class="container ov-cta__inner">
        <div>
          <h2 class="ov-cta__title">Остались вопросы по возврату?</h2>
          <p class="ov-cta__desc">Свяжитесь с нами — объясним ситуацию и найдём оптимальное решение</p>
        </div>
        <div class="ov-cta__btns">
          <a :href="'tel:' + site.phoneRaw" class="nav-btn ov-btn"><Icon name="lucide:phone-call" size="16"/>Позвонить</a>
          <a :href="site.emailHref" class="ov-btn-outline"><Icon name="lucide:mail" size="16"/>Написать email</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const site = useSite()
usePageSeoMeta('obmen-i-vozvrat')

const casesYes = [
  { icon: 'lucide:alert-triangle', title: 'Дефект материала', desc: 'Если в полотне обнаружен производственный брак — меняем полотно полностью за наш счёт без каких-либо условий.' },
  { icon: 'lucide:hammer',         title: 'Ошибка монтажа',   desc: 'Если дефект возник по вине наших монтажников — устраняем бесплатно. При невозможности устранения — полный возврат.' },
  { icon: 'lucide:x',              title: 'Отказ до монтажа', desc: 'Если вы передумали до начала монтажа — полотно ещё не раскроено — возвращаем предоплату в полном объёме.' },
  { icon: 'lucide:scissors',       title: 'Повреждение при монтаже', desc: 'Если мастер повредил полотно в процессе установки — заменяем за наш счёт, дата монтажа не переносится.' },
]

const casesNo = [
  { icon: 'lucide:hand',     title: 'Механическое повреждение', desc: 'Порезы, проколы и разрывы, нанесённые клиентом или третьими лицами после монтажа.' },
  { icon: 'lucide:scissors', title: 'Изготовленное полотно',    desc: 'Полотно раскроено по индивидуальным размерам и не может быть использовано повторно.' },
  { icon: 'lucide:droplets', title: 'Последствия затопления',   desc: 'Затопление соседями — страховой случай, не гарантийный. Обратитесь к страховщику.' },
  { icon: 'lucide:sun',      title: 'Выгорание от УФ',          desc: 'Длительное воздействие прямых солнечных лучей без защиты UV-плёнкой на окнах.' },
]

const steps = [
  { icon: 'lucide:phone-call',  title: 'Позвоните или напишите', desc: 'Свяжитесь с нами по телефону или email, опишите ситуацию и приложите фото дефекта.' },
  { icon: 'lucide:search',      title: 'Выезд и осмотр',         desc: 'Мастер выедет и осмотрит объект. Составим акт осмотра с описанием дефекта.' },
  { icon: 'lucide:file-check',  title: 'Оформление заявления',   desc: 'Подпишете заявление на обмен или возврат. Мы выдадим вам копию с отметкой о принятии.' },
  { icon: 'lucide:refresh-cw',  title: 'Обмен или возврат',      desc: 'Обмен — в течение 5 рабочих дней. Возврат средств — в течение 10 дней по закону.' },
]

const docs = [
  { icon: 'lucide:file-text',    title: 'Договор',         desc: 'Договор подряда, заключённый при оформлении заказа' },
  { icon: 'lucide:receipt',      title: 'Кассовый чек',    desc: 'Чек или квитанция об оплате заказа' },
  { icon: 'lucide:user',         title: 'Паспорт',         desc: 'Документ, удостоверяющий личность заявителя' },
  { icon: 'lucide:camera',       title: 'Фото дефекта',    desc: 'Фотографии дефекта — для первичной оценки до выезда мастера' },
]
</script>

<style scoped>
.ov-pretitle { display: inline-block; background: var(--accent); color: #141414; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.ov-pretitle--dark { color: var(--dark); }
.ov-head { text-align: center; margin-bottom: 36px; }
.ov-head--mt { margin-top: 52px; }
.ov-title { font-size: 28px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
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

.ov-cases { display: flex; flex-direction: column; gap: 12px; max-width: 800px; margin: 0 auto; }
.ov-case { display: flex; align-items: flex-start; gap: 16px; padding: 20px 24px; border-radius: 14px; }
.ov-case--yes { background: rgba(52,211,153,.06); border: 1.5px solid rgba(52,211,153,.2); }
.ov-case--no  { background: rgba(255,80,80,.05);  border: 1.5px solid rgba(255,80,80,.15); }
.ov-case__icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ov-case__icon--yes { background: rgba(52,211,153,.15); color: #34d399; }
.ov-case__icon--no  { background: rgba(255,80,80,.12);  color: #ff6060; }
.ov-case__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.ov-case__desc  { font-size: 14px; color: #555; line-height: 1.55; }

.ov-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
.ov-step { background: #fff; border-radius: 16px; padding: 26px 22px; border: 1.5px solid #eee; position: relative; overflow: hidden; }
.ov-step__num { position: absolute; bottom: -60px; right: -6px; font-size: 200px; font-weight: 900; font-family: var(--font); line-height: 1; color: transparent; -webkit-text-stroke: 2px var(--accent); text-stroke: 2px var(--accent); opacity: .2; user-select: none; }
.ov-step__icon { width: 46px; height: 46px; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; }
.ov-step__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
.ov-step__desc  { font-size: 13px; color: var(--gray); line-height: 1.55; }
.ov-steps__cta  { text-align: center; }
.ov-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; font-size: 14px; }

.ov-docs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.ov-doc { background: #f7f7f7; border-radius: 14px; padding: 22px 20px; border: 1.5px solid transparent; transition: border-color .15s; }
.ov-doc:hover { border-color: var(--accent); }
.ov-doc__icon { color: var(--accent); margin-bottom: 10px; }
.ov-doc__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 5px; }
.ov-doc__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }
.ov-legal { display: flex; align-items: flex-start; gap: 10px; background: #f7f7f7; border-radius: 12px; padding: 16px 20px; font-size: 13px; color: #666; line-height: 1.6; border: 1px solid #eee; }
.ov-legal__icon { color: var(--gray); flex-shrink: 0; margin-top: 1px; }

.ov-cta { background: #141414; padding: 52px 0; }
.ov-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.ov-cta__title { font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.ov-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); }
.ov-cta__btns  { display: flex; gap: 12px; flex-wrap: wrap; }
.ov-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; font-size: 14px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 50px; color: #fff; cursor: pointer; text-decoration: none; transition: border-color .15s, color .15s; }
.ov-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 900px) { .ov-steps { grid-template-columns: repeat(2, 1fr); } .ov-docs-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .ov-hero__title { font-size: 28px; } .ov-steps { grid-template-columns: 1fr; } .ov-docs-grid { grid-template-columns: 1fr; } .ov-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>

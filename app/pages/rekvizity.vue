<template>
  <div>

    <!-- HERO -->
    <section class="rv-hero">
      <div class="container rv-hero__inner">
        <div>
          <div class="rv-pretitle">Документы компании</div>
          <h1 class="rv-hero__title">Реквизиты ООО «ПроПотолок»</h1>
          <p class="rv-hero__desc">Официальные реквизиты компании для оформления договоров, счетов и официальных обращений</p>
        </div>
        <div class="rv-hero__actions">
          <button class="nav-btn rv-btn" @click="savePdf">
            <Icon name="lucide:file-down" size="16"/>Скачать PDF
          </button>
          <button class="rv-btn-outline" @click="shareRekvizity">
            <Icon name="lucide:share-2" size="16"/>Поделиться
          </button>
        </div>
      </div>
    </section>

    <!-- РЕКВИЗИТЫ -->
    <section class="rv-section" id="rekvizity-print">
      <div class="container">
        <div class="rv-grid">

          <!-- Основные данные -->
          <div class="rv-block">
            <div class="rv-block__title">
              <Icon name="lucide:building-2" size="18"/>Основные сведения
            </div>
            <div class="rv-rows">
              <div class="rv-row" v-for="r in mainData" :key="r.label">
                <div class="rv-row__label">{{ r.label }}</div>
                <div class="rv-row__val">{{ r.val }}</div>
                <button class="rv-copy" @click="copy(r.val, r.label)" :title="'Скопировать ' + r.label">
                  <Transition name="copy" mode="out-in">
                    <Icon v-if="copied === r.label" name="lucide:check" size="14" key="ok" class="rv-copy--ok"/>
                    <Icon v-else name="lucide:copy" size="14" key="copy"/>
                  </Transition>
                </button>
              </div>
            </div>
          </div>

          <!-- Банковские реквизиты -->
          <div class="rv-block">
            <div class="rv-block__title">
              <Icon name="lucide:landmark" size="18"/>Банковские реквизиты
            </div>
            <div class="rv-rows">
              <div class="rv-row" v-for="r in bankData" :key="r.label">
                <div class="rv-row__label">{{ r.label }}</div>
                <div class="rv-row__val">{{ r.val }}</div>
                <button class="rv-copy" @click="copy(r.val, r.label)" :title="'Скопировать ' + r.label">
                  <Transition name="copy" mode="out-in">
                    <Icon v-if="copied === r.label" name="lucide:check" size="14" key="ok" class="rv-copy--ok"/>
                    <Icon v-else name="lucide:copy" size="14" key="copy"/>
                  </Transition>
                </button>
              </div>
            </div>
          </div>

          <!-- Контакты -->
          <div class="rv-block">
            <div class="rv-block__title">
              <Icon name="lucide:phone" size="18"/>Контактные данные
            </div>
            <div class="rv-rows">
              <div class="rv-row" v-for="r in contactData" :key="r.label">
                <div class="rv-row__label">{{ r.label }}</div>
                <div class="rv-row__val">{{ r.val }}</div>
                <button class="rv-copy" @click="copy(r.val, r.label)" :title="'Скопировать ' + r.label">
                  <Transition name="copy" mode="out-in">
                    <Icon v-if="copied === r.label" name="lucide:check" size="14" key="ok" class="rv-copy--ok"/>
                    <Icon v-else name="lucide:copy" size="14" key="copy"/>
                  </Transition>
                </button>
              </div>
            </div>
          </div>

          <!-- Адреса -->
          <div class="rv-block">
            <div class="rv-block__title">
              <Icon name="lucide:map-pin" size="18"/>Адреса
            </div>
            <div class="rv-rows">
              <div class="rv-row" v-for="r in addressData" :key="r.label">
                <div class="rv-row__label">{{ r.label }}</div>
                <div class="rv-row__val">{{ r.val }}</div>
                <button class="rv-copy" @click="copy(r.val, r.label)" :title="'Скопировать ' + r.label">
                  <Transition name="copy" mode="out-in">
                    <Icon v-if="copied === r.label" name="lucide:check" size="14" key="ok" class="rv-copy--ok"/>
                    <Icon v-else name="lucide:copy" size="14" key="copy"/>
                  </Transition>
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Кнопка скопировать всё -->
        <div class="rv-copy-all-wrap">
          <button class="rv-copy-all" @click="copyAll">
            <Icon :name="copiedAll ? 'lucide:check-circle' : 'lucide:clipboard-copy'" size="16"/>
            {{ copiedAll ? 'Реквизиты скопированы!' : 'Скопировать все реквизиты' }}
          </button>
          <div class="rv-copy-all__note">в удобном текстовом формате</div>
        </div>

        <!-- Toast -->
        <Transition name="toast">
          <div v-if="toastMsg" class="rv-toast">
            <Icon name="lucide:check-circle" size="15"/>{{ toastMsg }}
          </div>
        </Transition>

      </div>
    </section>

    <!-- Нижний CTA -->
    <section class="rv-cta">
      <div class="container rv-cta__inner">
        <div>
          <h2 class="rv-cta__title">Нужны документы для бухгалтерии?</h2>
          <p class="rv-cta__desc">Выставим счёт, подготовим договор и закрывающие документы для юридических лиц</p>
        </div>
        <div class="rv-cta__btns">
          <a :href="site.emailHref" class="nav-btn rv-btn">
            <Icon name="lucide:mail" size="16"/>Написать на email
          </a>
          <a :href="'tel:' + site.phoneRaw" class="rv-btn-outline">
            <Icon name="lucide:phone-call" size="16"/>Позвонить
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const site = useSite()
usePageSeoMeta('rekvizity')

const copied    = ref<string | null>(null)
const copiedAll = ref(false)
const toastMsg  = ref('')

const mainData = computed(() => [
  { label: 'Полное наименование',  val: `Общество с ограниченной ответственностью «${site.name}»` },
  { label: 'Краткое наименование', val: site.nameFull },
  { label: 'ИНН',   val: site.inn },
  { label: 'КПП',   val: site.kpp },
  { label: 'ОГРН',  val: site.ogrn },
  { label: 'ОКПО',  val: site.okpo },
  { label: 'ОКВЭД', val: site.okved },
])

const bankData = computed(() => [
  { label: 'Банк',             val: site.bank },
  { label: 'БИК',              val: site.bankBik },
  { label: 'Расчётный счёт',   val: site.bankAccount },
  { label: 'Корр. счёт',       val: site.bankKorr },
  { label: 'Отделение банка',  val: site.bankBranch },
])

const contactData = computed(() => [
  { label: 'Телефон',       val: site.phone },
  { label: 'Email',         val: site.email },
  { label: 'Сайт',          val: site.siteDomain },
  { label: 'Режим работы',  val: site.schedule },
])

const addressData = computed(() => [
  { label: 'Юридический адрес',    val: site.addressLegal },
  { label: 'Фактический адрес',    val: site.addressFull },
  { label: 'Почтовый адрес',       val: site.addressFull },
  { label: 'Генеральный директор', val: site.director },
])

function copy(val: string, label: string) {
  navigator.clipboard.writeText(val)
  copied.value = label
  showToast(`Скопировано: ${label}`)
  setTimeout(() => { copied.value = null }, 2000)
}

function copyAll() {
  const lines = [
    '=== Реквизиты ООО «ПроПотолок» ===',
    '',
    '— Основные сведения —',
    ...mainData.map(r => `${r.label}: ${r.val}`),
    '',
    '— Банковские реквизиты —',
    ...bankData.map(r => `${r.label}: ${r.val}`),
    '',
    '— Контакты —',
    ...contactData.map(r => `${r.label}: ${r.val}`),
    '',
    '— Адреса —',
    ...addressData.map(r => `${r.label}: ${r.val}`),
  ]
  navigator.clipboard.writeText(lines.join('\n'))
  copiedAll.value = true
  showToast('Все реквизиты скопированы!')
  setTimeout(() => { copiedAll.value = false }, 3000)
}

function savePdf() {
  window.print()
}

async function shareRekvizity() {
  const text = `Реквизиты ${site.nameFull}\nИНН: ${site.inn}\nОГРН: ${site.ogrn}\nТел: ${site.phone}\nEmail: ${site.email}`
  if (navigator.share) {
    await navigator.share({ title: 'Реквизиты ПроПотолок', text })
  } else {
    navigator.clipboard.writeText(text)
    showToast('Реквизиты скопированы для отправки')
  }
}

function showToast(msg: string) {
  toastMsg.value = msg
  setTimeout(() => { toastMsg.value = '' }, 2500)
}
</script>

<style scoped>
/* Hero */
.rv-hero { background: #141414; padding: 48px 0; }
.rv-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.rv-pretitle { display: inline-block; background: var(--accent); color: var(--dark); font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.rv-hero__title { font-size: 34px; font-weight: 900; color: #fff; margin-bottom: 10px; line-height: 1.2; }
.rv-hero__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 480px; line-height: 1.6; }
.rv-hero__actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }
.rv-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-size: 14px; }
.rv-btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 22px; font-size: 14px; font-weight: 700; font-family: var(--font);
  background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 50px;
  color: #fff; cursor: pointer; text-decoration: none;
  transition: border-color .15s, color .15s;
}
.rv-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

/* Section */
.rv-section { background: #f7f7f7; padding: 56px 0; }
.rv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }

/* Block */
.rv-block { background: #fff; border-radius: 16px; padding: 28px; border: 1.5px solid #eee; }
.rv-block__title {
  display: flex; align-items: center; gap: 10px;
  font-size: 15px; font-weight: 800; color: var(--dark);
  margin-bottom: 20px; padding-bottom: 14px;
  border-bottom: 2px solid var(--accent);
}

/* Row */
.rv-rows { display: flex; flex-direction: column; gap: 0; }
.rv-row {
  display: flex; align-items: baseline; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid #f5f5f5;
}
.rv-row:last-child { border-bottom: none; }
.rv-row__label {
  font-size: 12px; font-weight: 600; color: var(--gray);
  min-width: 140px; flex-shrink: 0;
  text-transform: uppercase; letter-spacing: .3px;
}
.rv-row__val { font-size: 14px; font-weight: 600; color: var(--dark); flex: 1; line-height: 1.4; }
.rv-copy {
  flex-shrink: 0; background: none; border: none; cursor: pointer;
  color: var(--gray); padding: 4px; border-radius: 6px;
  transition: color .15s, background .15s;
  display: flex; align-items: center;
}
.rv-copy:hover { color: var(--dark); background: #f0f0f0; }
.rv-copy--ok { color: #34d399; }

/* Copy all */
.rv-copy-all-wrap { text-align: center; }
.rv-copy-all {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 32px; font-size: 14px; font-weight: 700;
  font-family: var(--font); background: #fff;
  border: 2px solid var(--accent); border-radius: 50px;
  cursor: pointer; color: var(--dark);
  transition: background .15s;
}
.rv-copy-all:hover { background: #fffbe6; }
.rv-copy-all__note { font-size: 12px; color: var(--gray); margin-top: 6px; }

/* Toast */
.rv-toast {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
  background: var(--dark); color: #fff;
  display: flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: 50px;
  font-size: 14px; font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,.2); z-index: 900;
  white-space: nowrap;
}
.toast-enter-active { transition: all .25s ease; }
.toast-leave-active { transition: all .2s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }

.copy-enter-active { transition: all .12s ease; }
.copy-leave-active { transition: all .08s ease; }
.copy-enter-from, .copy-leave-to { opacity: 0; }

/* CTA */
.rv-cta { background: #141414; padding: 52px 0; }
.rv-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.rv-cta__title { font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.rv-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); }
.rv-cta__btns  { display: flex; gap: 12px; flex-wrap: wrap; }

/* Print */
@media print {
  .rv-hero__actions, .rv-hero__desc, .rv-copy, .rv-copy-all-wrap, .rv-cta, header, footer { display: none !important; }
  .rv-hero { background: #fff; padding: 20px 0; }
  .rv-hero__title { color: #000; font-size: 22px; }
  .rv-pretitle { background: #f0f0f0; color: #000; }
  .rv-section { background: #fff; padding: 20px 0; }
  .rv-block { border: 1px solid #ccc; break-inside: avoid; }
  .rv-row__label, .rv-row__val { color: #000 !important; }
}

@media (max-width: 900px) { .rv-grid { grid-template-columns: 1fr; } }
@media (max-width: 640px) {
  .rv-hero__inner { flex-direction: column; align-items: flex-start; }
  .rv-hero__title { font-size: 26px; }
  .rv-row__label { min-width: 110px; }
  .rv-cta__inner { flex-direction: column; align-items: flex-start; }
}
</style>

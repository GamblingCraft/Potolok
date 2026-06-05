<template>
  <div class="quiz-widget">

    <button v-if="!open" class="quiz-trigger" @click="open = true">
      <Icon name="lucide:gift" size="22" />
      <span class="quiz-trigger__text">Хочешь<br>скидку?</span>
    </button>

    <Transition name="quiz-panel">
      <div v-if="open" class="quiz-panel">

        <div class="quiz-panel__head">
          <div class="quiz-panel__title">
            <template v-if="step < questions.length">
              Шаг {{ step + 1 }} из {{ questions.length }}
            </template>
            <template v-else-if="step === questions.length">Последний шаг</template>
            <template v-else>Ваша скидка готова!</template>
          </div>
          <button class="quiz-panel__close" @click="open = false">
            <Icon name="lucide:x" size="18" />
          </button>
        </div>

        <div class="quiz-panel__progress">
          <div class="quiz-panel__progress-bar" :style="{ width: progressPct + '%' }" />
        </div>

        <div class="quiz-panel__body">

          <template v-if="step < questions.length">
            <p class="quiz-q">{{ questions[step].text }}</p>
            <div class="quiz-options">
              <button
                v-for="opt in questions[step].options"
                :key="opt.value"
                class="quiz-option"
                :class="{ selected: answers[step] === opt.value }"
                @click="choose(opt.value)"
              >
                <Icon :name="opt.icon" size="18" class="quiz-option__icon" />
                {{ opt.label }}
              </button>
            </div>
          </template>

          <template v-else-if="step === questions.length">
            <div class="quiz-contact">
              <p class="quiz-q">Куда отправить расчёт со скидкой?</p>
              <div class="quiz-discount-badge">
                <Icon name="lucide:tag" size="20" />
                Ваша скидка: <strong>10%</strong>
              </div>
              <input v-model="contactName" class="quiz-input" type="text" placeholder="Ваше имя" />
              <input v-model="contactPhone" class="quiz-input" type="tel" placeholder="+7 (999) 999-99-99" />
              <button class="nav-btn quiz-submit" @click="submit">
                Получить скидку
              </button>
            </div>
          </template>

          <template v-else>
            <div class="quiz-result">
              <div class="quiz-result__icon">
                <Icon name="lucide:party-popper" size="36" />
              </div>
              <div class="quiz-result__discount">10%</div>
              <p class="quiz-result__text">Скидка зарезервирована! Наш менеджер свяжется с вами в течение 15 минут.</p>
              <button class="nav-btn quiz-submit" @click="open = false">Закрыть</button>
            </div>
          </template>

        </div>

        <div v-if="step < questions.length" class="quiz-panel__footer">
          <button v-if="step > 0" class="quiz-back" @click="step--">
            <Icon name="lucide:arrow-left" size="16" />
            Назад
          </button>
          <button
            v-if="answers[step]"
            class="quiz-next nav-btn"
            @click="step++"
          >
            Далее
            <Icon name="lucide:arrow-right" size="16" />
          </button>
        </div>

      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
const open = ref(false)
const step = ref(0)
const answers = ref<Record<number, string>>({})
const contactName = ref('')
const contactPhone = ref('')
const done = ref(false)

const questions = [
  {
    text: 'Какое помещение планируете?',
    options: [
      { label: 'Гостиная',    value: 'gostinaya',   icon: 'lucide:sofa' },
      { label: 'Спальня',     value: 'spalnya',      icon: 'lucide:bed' },
      { label: 'Кухня',       value: 'kuhnya',       icon: 'lucide:utensils' },
      { label: 'Ванная',      value: 'vannaya',      icon: 'lucide:droplets' },
      { label: 'Детская',     value: 'detskaya',     icon: 'lucide:baby' },
      { label: 'Другое',      value: 'drugoe',       icon: 'lucide:home' },
    ],
  },
  {
    text: 'Какая площадь потолка?',
    options: [
      { label: 'До 10 м²',      value: 'do10',    icon: 'lucide:minimize-2' },
      { label: '10 — 20 м²',    value: '10_20',   icon: 'lucide:square' },
      { label: '20 — 40 м²',    value: '20_40',   icon: 'lucide:maximize-2' },
      { label: 'Более 40 м²',   value: '40plus',  icon: 'lucide:layout' },
    ],
  },
  {
    text: 'Какая фактура вам нравится?',
    options: [
      { label: 'Матовый',     value: 'mat',      icon: 'lucide:circle' },
      { label: 'Глянцевый',   value: 'glyanec',  icon: 'lucide:sparkles' },
      { label: 'Сатиновый',   value: 'satin',    icon: 'lucide:star' },
      { label: 'Тканевый',    value: 'tkань',    icon: 'lucide:layers' },
      { label: 'Не знаю',     value: 'ne_znau',  icon: 'lucide:help-circle' },
    ],
  },
  {
    text: 'Нужна подсветка?',
    options: [
      { label: 'Да, парящий',       value: 'paryashiy',  icon: 'lucide:lamp-ceiling' },
      { label: 'Точечные споты',     value: 'spoty',      icon: 'lucide:lightbulb' },
      { label: 'Без подсветки',      value: 'net',        icon: 'lucide:moon' },
      { label: 'Пока не решил',      value: 'ne_reshil',  icon: 'lucide:help-circle' },
    ],
  },
  {
    text: 'Когда планируете монтаж?',
    options: [
      { label: 'Срочно (до недели)',   value: 'srocno',    icon: 'lucide:zap' },
      { label: 'В этом месяце',         value: 'month',     icon: 'lucide:calendar' },
      { label: 'Через 1–3 месяца',      value: '1_3month',  icon: 'lucide:clock' },
      { label: 'Просто смотрю',         value: 'looking',   icon: 'lucide:eye' },
    ],
  },
]

const progressPct = computed(() => {
  const total = questions.length + 1
  return Math.round(((step.value) / total) * 100)
})

function choose(value: string) {
  answers.value[step.value] = value
}

function submit() {
  step.value = questions.length + 1
}

watch(open, (val) => {
  if (!val) return
  step.value = 0
  answers.value = {}
  contactName.value = ''
  contactPhone.value = ''
})
</script>

<style>
.quiz-widget {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 300;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

.quiz-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #f5c800;
  color: #282828;
  border: none;
  cursor: pointer;
  padding: 16px 10px;
  border-radius: 12px 0 0 12px;
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 11px;
  text-align: center;
  line-height: 1.3;
  box-shadow: -4px 0 20px rgba(0,0,0,.15);
  transition: background .15s, transform .15s;
  writing-mode: initial;
}
.quiz-trigger:hover {
  background: #e0b400;
  transform: translateX(-3px);
}
.quiz-trigger__text { font-size: 11px; font-weight: 700; }

.quiz-panel {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 340px;
  background: #fff;
  border-radius: 16px 0 0 16px;
  box-shadow: -8px 0 40px rgba(0,0,0,.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.quiz-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 12px;
  background: #282828;
  color: #fff;
  flex-shrink: 0;
}
.quiz-panel__title {
  font-size: 13px;
  font-weight: 600;
  color: #aaa;
}
.quiz-panel__close {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: color .15s;
}
.quiz-panel__close:hover { color: #fff; }

.quiz-panel__progress {
  height: 4px;
  background: #333;
  flex-shrink: 0;
}
.quiz-panel__progress-bar {
  height: 100%;
  background: #f5c800;
  transition: width .3s ease;
}

.quiz-panel__body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.quiz-q {
  font-size: 16px;
  font-weight: 700;
  color: #282828;
  margin-bottom: 16px;
  line-height: 1.4;
}

.quiz-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.quiz-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1.5px solid #d6d6d6;
  border-radius: 10px;
  background: #fff;
  font-family: 'Gilroy', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #282828;
  cursor: pointer;
  text-align: left;
  transition: border-color .15s, background .15s;
}
.quiz-option:hover { border-color: #f5c800; background: #fffbe6; }
.quiz-option.selected { border-color: #f5c800; background: #f5c800; font-weight: 700; }
.quiz-option__icon { flex-shrink: 0; color: #686868; }
.quiz-option.selected .quiz-option__icon { color: #282828; }

.quiz-discount-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #f5c800;
  color: #282828;
  font-size: 16px;
  font-weight: 700;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 16px;
}
.quiz-contact { display: flex; flex-direction: column; gap: 10px; }
.quiz-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #d6d6d6;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Gilroy', sans-serif;
  color: #282828;
  outline: none;
  transition: border-color .15s;
}
.quiz-input:focus { border-color: #f5c800; }
.quiz-submit {
  width: 100%;
  padding: 13px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.quiz-result {
  text-align: center;
  padding: 10px 0;
}
.quiz-result__icon {
  width: 70px; height: 70px;
  background: #f5c800;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  color: #282828;
}
.quiz-result__discount {
  font-size: 64px;
  font-weight: 800;
  color: #f5c800;
  line-height: 1;
  margin-bottom: 12px;
  font-family: 'Gilroy', sans-serif;
}
.quiz-result__text {
  font-size: 14px;
  color: #686868;
  line-height: 1.6;
  margin-bottom: 20px;
}

.quiz-panel__footer {
  padding: 12px 20px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;
  flex-shrink: 0;
}
.quiz-back {
  display: flex; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer;
  font-family: 'Gilroy', sans-serif;
  font-size: 14px; color: #686868;
  padding: 4px;
  transition: color .15s;
}
.quiz-back:hover { color: #282828; }
.quiz-next {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 22px; font-size: 14px;
}

.quiz-panel-enter-active { transition: opacity .25s ease, transform .25s ease; }
.quiz-panel-leave-active { transition: opacity .2s ease, transform .2s ease; }
.quiz-panel-enter-from { opacity: 0; transform: translateY(-50%) translateX(40px); }
.quiz-panel-leave-to  { opacity: 0; transform: translateY(-50%) translateX(40px); }

@media (max-width: 400px) {
  .quiz-panel { width: 100vw; border-radius: 0; }
}
</style>

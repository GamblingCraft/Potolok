<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
        <div class="modal">
          <button class="modal__close" @click="$emit('update:modelValue', false)">
            <Icon name="lucide:x" size="20" />
          </button>

          <div class="modal__icon">
            <Icon name="lucide:phone-call" size="32" />
          </div>

          <h2 class="modal__title">Заказать звонок</h2>
          <p class="modal__desc">Оставьте номер — перезвоним в течение 15 минут</p>

          <form class="modal__form" @submit.prevent="submit">
            <div class="modal__field">
              <input
                v-model="name"
                type="text"
                placeholder="Ваше имя"
                class="modal__input"
                required
              />
            </div>
            <div class="modal__field">
              <input
                :value="phone"
                type="tel"
                placeholder="+7 (999) 999-99-99"
                class="modal__input"
                required
                @input="phone = maskPhone($event)"
              />
            </div>
            <div class="modal__field modal__promo-wrap">
              <Icon name="lucide:ticket" size="15" class="modal__promo-icon"/>
              <input
                v-model="promoCode"
                type="text"
                placeholder="Промокод (необязательно)"
                class="modal__input modal__input--promo"
                @input="promoCode = ($event.target as HTMLInputElement).value.toUpperCase()"
              />
              <Transition name="promo-status">
                <span v-if="promoStatus === 'valid'" class="modal__promo-badge modal__promo-badge--ok">
                  <Icon name="lucide:badge-check" size="13"/>{{ foundPromo!.discount }}
                </span>
                <span v-else-if="promoStatus === 'invalid'" class="modal__promo-badge modal__promo-badge--err">
                  <Icon name="lucide:x-circle" size="13"/>Не найден
                </span>
              </Transition>
            </div>
            <button type="submit" class="nav-btn modal__submit" :disabled="sent">
              <template v-if="!sent">Перезвоните мне</template>
              <template v-else>
                <Icon name="lucide:check" size="16" />
                Заявка принята!
              </template>
            </button>
          </form>

          <p class="modal__policy">
            Нажимая кнопку, вы соглашаетесь с
            <NuxtLink to="/politika-konfidentsialnosti" @click="$emit('update:modelValue', false)">политикой конфиденциальности</NuxtLink>
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { activePromoCodes } from '~/data/promo'

const props = defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])

const name = ref('')
const phone = ref('')
const promoCode = ref('')
const sent = ref(false)

const foundPromo = computed(() => {
  const code = promoCode.value.trim().toUpperCase()
  if (!code) return null
  return activePromoCodes.find(p => p.code === code) ?? null
})

const promoStatus = computed<'empty' | 'valid' | 'invalid'>(() => {
  if (!promoCode.value.trim()) return 'empty'
  return foundPromo.value ? 'valid' : 'invalid'
})

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

function submit() {
  sent.value = true
  setTimeout(() => {
    sent.value = false
    name.value = ''
    phone.value = ''
    promoCode.value = ''
  }, 3000)
}

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<style scoped>
.modal__field { position: relative; }

.modal__promo-wrap { display: flex; align-items: center; }

.modal__promo-icon {
  position: absolute; left: 14px;
  color: var(--accent); pointer-events: none;
}
.modal__input--promo {
  padding-left: 40px;
  padding-right: 94px;
  text-transform: uppercase;
  letter-spacing: .4px;
  font-weight: 600;
}
.modal__promo-badge {
  position: absolute; right: 10px;
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 700;
  padding: 3px 8px; border-radius: 20px; white-space: nowrap;
}
.modal__promo-badge--ok  { background: rgba(52,211,153,.15); color: #34d399; }
.modal__promo-badge--err { background: rgba(255,80,80,.12);  color: #ff6060; }

.promo-status-enter-active { transition: opacity .15s ease, transform .15s ease; }
.promo-status-leave-active { transition: opacity .1s ease; }
.promo-status-enter-from   { opacity: 0; transform: scale(.85); }
.promo-status-leave-to     { opacity: 0; }
</style>

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
const props = defineProps<{ modelValue: boolean }>()
defineEmits(['update:modelValue'])

const name = ref('')
const phone = ref('')
const sent = ref(false)

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
  }, 3000)
}

watch(() => props.modelValue, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

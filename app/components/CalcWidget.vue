<template>
  <section class="calc-section" id="kalkulator">
    <div class="container">

      <!-- Head -->
      <div class="calc-head">
        <div class="calc-pretitle">Онлайн-расчёт</div>
        <h2 class="calc-title">Калькулятор натяжных потолков</h2>
        <p class="calc-desc">Выберите фактуру, вид и цвет — мы рассчитаем стоимость для каждой комнаты</p>
      </div>

      <div class="calc-layout">

        <!-- ════ LEFT ════ -->
        <div class="calc-col">

          <!-- ── Шаг 1: Фактура ── -->
          <div class="calc-block">
            <div class="calc-block__hd">
              <div class="calc-block__num">01</div>
              <div class="calc-block__ttl">Выберите фактуру</div>
              <div class="carousel-nav">
                <button class="carousel-arrow" @click="scroll('tex', -1)"><Icon name="lucide:chevron-left" size="16"/></button>
                <button class="carousel-arrow" @click="scroll('tex', +1)"><Icon name="lucide:chevron-right" size="16"/></button>
              </div>
            </div>
            <div class="carousel-wrap" ref="texRef">
              <button
                v-for="t in textures" :key="t.id"
                class="calc-card"
                :class="{ active: sel.texture === t.id }"
                @click="sel.texture = t.id"
              >
                <div class="calc-card__img" :style="{ backgroundImage: `url('${t.img}')` }"></div>
                <div class="calc-card__overlay"></div>
                <div class="calc-card__body">
                  <div class="calc-card__name">{{ t.name }}</div>
                  <div class="calc-card__sub">от {{ t.price }} ₽/м²</div>
                </div>
                <div class="calc-card__tick"><Icon name="lucide:check" size="12"/></div>
              </button>
            </div>
          </div>

          <!-- ── Шаг 2: Вид ── -->
          <div class="calc-block">
            <div class="calc-block__hd">
              <div class="calc-block__num">02</div>
              <div class="calc-block__ttl">Выберите вид потолка</div>
              <div class="carousel-nav">
                <button class="carousel-arrow" @click="scroll('view', -1)"><Icon name="lucide:chevron-left" size="16"/></button>
                <button class="carousel-arrow" @click="scroll('view', +1)"><Icon name="lucide:chevron-right" size="16"/></button>
              </div>
            </div>
            <div class="carousel-wrap" ref="viewRef">
              <button
                v-for="v in views" :key="v.id"
                class="calc-card"
                :class="{ active: sel.view === v.id }"
                @click="sel.view = v.id"
              >
                <div class="calc-card__img" :style="{ backgroundImage: `url('${v.img}')` }"></div>
                <div class="calc-card__overlay"></div>
                <div class="calc-card__body">
                  <div class="calc-card__name">{{ v.name }}</div>
                  <div class="calc-card__sub" v-if="v.extra > 0">+{{ v.extra }} ₽/м²</div>
                  <div class="calc-card__sub" v-else>включено</div>
                </div>
                <div class="calc-card__tick"><Icon name="lucide:check" size="12"/></div>
              </button>
            </div>
          </div>

          <!-- ── Шаг 3: Помещения ── -->
          <div class="calc-block">
            <div class="calc-block__hd">
              <div class="calc-block__num">03</div>
              <div class="calc-block__ttl">Помещения</div>
              <div class="calc-block__area-total">
                Итого: <strong>{{ totalArea }} м²</strong>
              </div>
            </div>

            <div class="calc-rooms">
              <TransitionGroup name="room">
                <div v-for="(room, i) in rooms" :key="room.id" class="calc-room">
                  <div class="calc-room__top">
                    <div class="calc-room__icon">
                      <Icon :name="getRoomIcon(room.type)" size="16"/>
                    </div>
                    <select class="calc-room__type" v-model="room.type">
                      <option v-for="rt in roomTypes" :key="rt.id" :value="rt.id">{{ rt.name }}</option>
                    </select>
                    <div class="calc-room__area-badge">{{ roomArea(room) }} м²</div>
                    <button v-if="rooms.length > 1" class="calc-room__del" @click="removeRoom(i)">
                      <Icon name="lucide:x" size="14"/>
                    </button>
                  </div>
                  <div class="calc-room__dims">
                    <div class="calc-room__dim">
                      <span class="calc-room__dim-label">Длина</span>
                      <div class="calc-room__dim-ctrl">
                        <button @click="adjRoom(room, 'l', -0.5)"><Icon name="lucide:minus" size="12"/></button>
                        <input type="number" v-model.number="room.l" min="1" max="50" step="0.1"/>
                        <button @click="adjRoom(room, 'l', +0.5)"><Icon name="lucide:plus" size="12"/></button>
                      </div>
                      <span class="calc-room__dim-m">м</span>
                    </div>
                    <div class="calc-room__dim-x">×</div>
                    <div class="calc-room__dim">
                      <span class="calc-room__dim-label">Ширина</span>
                      <div class="calc-room__dim-ctrl">
                        <button @click="adjRoom(room, 'w', -0.5)"><Icon name="lucide:minus" size="12"/></button>
                        <input type="number" v-model.number="room.w" min="1" max="50" step="0.1"/>
                        <button @click="adjRoom(room, 'w', +0.5)"><Icon name="lucide:plus" size="12"/></button>
                      </div>
                      <span class="calc-room__dim-m">м</span>
                    </div>
                  </div>
                  <!-- Цвет для этого помещения -->
                  <div class="calc-room__colors">
                    <div class="calc-room__colors-label">Цвет:</div>
                    <div class="calc-room__colors-list">
                      <button
                        v-for="c in colors" :key="c.id"
                        class="calc-room__color"
                        :class="{ active: room.color === c.id }"
                        :title="c.name"
                        @click="room.color = c.id"
                      >
                        <div class="calc-room__color-dot" :style="{ background: c.hex }"></div>
                      </button>
                    </div>
                    <div class="calc-room__color-name">{{ getColorName(room.color) }}</div>
                  </div>
                  <!-- Доп. работы для этого помещения -->
                  <div class="calc-room__extras">
                    <div class="calc-room__extras-label">Доп. работы:</div>
                    <div class="calc-room__extras-list">
                      <div v-for="ex in extras" :key="ex.key" class="calc-room__extra">
                        <Icon :name="ex.icon" size="13" class="calc-room__extra-icon"/>
                        <div class="calc-room__extra-info">
                          <div class="calc-room__extra-name">{{ ex.name }}</div>
                          <div class="calc-room__extra-price">{{ ex.price }} ₽/{{ ex.unit }}</div>
                        </div>
                        <div class="calc-stepper calc-stepper--sm">
                          <button @click="room.extras[ex.key] = Math.max(0, room.extras[ex.key] - 1)">
                            <Icon name="lucide:minus" size="11"/>
                          </button>
                          <span>{{ room.extras[ex.key] }}</span>
                          <button @click="room.extras[ex.key]++">
                            <Icon name="lucide:plus" size="11"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>

            <button class="calc-add-room" @click="addRoom">
              <Icon name="lucide:plus-circle" size="17"/>
              Добавить помещение
            </button>
          </div>

        </div>

        <!-- ════ RIGHT ════ -->
        <div class="calc-sticky">
          <div class="calc-result">

            <div class="calc-result__top">
              <div class="calc-result__top-lbl">Предварительная стоимость</div>
              <Transition name="flip" mode="out-in">
                <div class="calc-result__big-price" :key="total">{{ fmt(total) }} <span>₽</span></div>
              </Transition>
              <div class="calc-result__top-sub">
                {{ totalArea }} м² · {{ currentTexture?.name }}
                <template v-if="currentView?.extra"> · {{ currentView?.name }}</template>
              </div>
            </div>

            <div class="calc-result__breakdown">
              <template v-for="(room, i) in rooms" :key="room.id">
                <div class="calc-result__room-head">
                  <Icon :name="getRoomIcon(room.type)" size="12"/>
                  <span>{{ getRoomName(room.type) }}</span>
                  <span class="calc-result__room-area">{{ roomArea(room) }} м²</span>
                  <span class="calc-result__room-total">{{ fmt(roomCost(room)) }} ₽</span>
                </div>
                <div class="calc-result__row calc-result__row--sub">
                  <span>Полотно + монтаж</span>
                  <span>{{ fmt(Math.round(roomArea(room) * ((currentTexture?.price ?? 159) + (currentTexture?.mountPrice ?? 0)))) }} ₽</span>
                </div>
                <div v-if="(currentView?.extra ?? 0) > 0" class="calc-result__row calc-result__row--sub">
                  <span>{{ currentView?.name }}</span>
                  <span>{{ fmt(Math.round(roomArea(room) * (currentView?.extra ?? 0))) }} ₽</span>
                </div>
                <div v-if="getRoomColorExtra(room) > 0" class="calc-result__row calc-result__row--sub">
                  <span>Цвет «{{ getColorName(room.color) }}»</span>
                  <span>{{ fmt(Math.round(roomArea(room) * getRoomColorExtra(room))) }} ₽</span>
                </div>
                <template v-for="ex in extras" :key="ex.key">
                  <div v-if="room.extras[ex.key] > 0" class="calc-result__row calc-result__row--sub">
                    <span>{{ ex.name }} × {{ room.extras[ex.key] }} {{ ex.unit }}</span>
                    <span>{{ fmt(room.extras[ex.key] * ex.price) }} ₽</span>
                  </div>
                </template>
                <div v-if="i < rooms.length - 1" class="calc-result__divider"></div>
              </template>
            </div>

            <div class="calc-result__total-line">
              <span>Итого</span>
              <Transition name="flip" mode="out-in">
                <strong :key="total">{{ fmt(total) }} ₽</strong>
              </Transition>
            </div>

            <div class="calc-result__badge" :class="{ active: promoCode.trim() }">
              <Icon name="lucide:tag" size="15"/>
              <template v-if="promoCode.trim()">
                Промокод <strong>{{ promoCode.trim().toUpperCase() }}</strong> применён
              </template>
              <template v-else>
                Есть промокод? Введите ниже
              </template>
            </div>

            <div class="calc-result__disclaimer">
              <Icon name="lucide:triangle-alert" size="15" class="calc-result__disclaimer-icon"/>
              <span>Цена <strong>ознакомительная</strong>. Точная стоимость определяется только после бесплатного замера нашим специалистом.</span>
            </div>

            <form class="calc-result__form" @submit.prevent="submitCalc">
              <input v-model="formName" class="calc-inp" type="text" placeholder="Ваше имя"/>
              <input
                :value="formPhone" class="calc-inp" type="tel"
                placeholder="+7 (999) 999-99-99" required
                @input="formPhone = maskPhone($event)"
              />
              <div class="calc-promo">
                <Icon name="lucide:ticket" size="15" class="calc-promo__icon"/>
                <input v-model="promoCode" class="calc-inp calc-inp--promo" type="text" placeholder="Промокод (необязательно)"/>
              </div>
              <button type="submit" class="nav-btn calc-result__btn" :disabled="sent">
                <template v-if="!sent">
                  <Icon name="lucide:calculator" size="16"/>
                  Получить точный расчёт
                </template>
                <template v-else>
                  <Icon name="lucide:check-circle" size="16"/>
                  Заявка отправлена!
                </template>
              </button>
              <p class="calc-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
            </form>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { faktury, vidy as vidyData, tsveta as tsvetaData, extraWorks, pomeshcheniya as pomData } from '~/data/catalog'

let _id = 0

/* ── Справочники (из catalog.ts) ── */
const textures = faktury.map(f => ({ id: f.id, name: f.title, price: f.price, mountPrice: f.mountPrice, img: f.img }))
const views    = vidyData.map(v => ({ id: v.id, name: v.title, extra: v.extra ?? 0, img: v.img }))
const colors   = tsvetaData.map(c => ({ id: c.id, name: c.title, hex: c.hex, extra: c.extra ?? 0 }))
const extras   = extraWorks
const roomTypes = pomData.map(p => ({ id: p.id, name: p.title.replace(/^[ВНа]+ /, ''), icon: p.icon }))
  .concat([{ id: 'other', name: 'Другое', icon: 'lucide:home' }])


/* ── Carousel refs ── */
const texRef  = ref<HTMLElement | null>(null)
const viewRef = ref<HTMLElement | null>(null)

function scroll(which: 'tex' | 'view', dir: number) {
  const el = which === 'tex' ? texRef.value : viewRef.value
  if (!el) return
  const card = el.querySelector('.calc-card') as HTMLElement | null
  const cardW = card ? card.offsetWidth + 10 : el.offsetWidth / 4
  el.scrollBy({ left: dir * cardW * 4, behavior: 'smooth' })
}

/* ── State ── */
const sel = reactive({ texture: 'mat', view: 'base' })

function makeRoomExtras() {
  return Object.fromEntries(extras.map(e => [e.key, e.default])) as Record<string, number>
}

const rooms = reactive([{ id: ++_id, type: 'living', l: 4, w: 3, color: 'white', extras: makeRoomExtras() }])
const formName  = ref('')
const formPhone = ref('')
const promoCode = ref('')
const sent = ref(false)

/* ── Helpers ── */
const currentTexture = computed(() => textures.find(t => t.id === sel.texture))
const currentView    = computed(() => views.find(v => v.id === sel.view))

function roomArea(r: any) { return +(r.l * r.w).toFixed(1) }
function getRoomIcon(type: string) { return roomTypes.find(r => r.id === type)?.icon ?? 'lucide:home' }
function getRoomName(type: string) { return roomTypes.find(r => r.id === type)?.name ?? 'Помещение' }
function getRoomColorExtra(r: any) { return colors.find(c => c.id === r.color)?.extra ?? 0 }

function roomExtrasTotal(r: any) {
  return extras.reduce((s, e) => s + (r.extras[e.key] ?? 0) * e.price, 0)
}

function roomCost(r: any) {
  const priceM2 = (currentTexture.value?.price ?? 159)
    + (currentTexture.value?.mountPrice ?? 0)
    + (currentView.value?.extra ?? 0)
    + getRoomColorExtra(r)
  return Math.round(roomArea(r) * priceM2) + roomExtrasTotal(r)
}

const totalArea = computed(() => +rooms.reduce((s, r) => s + roomArea(r), 0).toFixed(1))
const costBase  = computed(() => Math.round(totalArea.value * ((currentTexture.value?.price ?? 159) + (currentTexture.value?.mountPrice ?? 0))))
const costView  = computed(() => Math.round(totalArea.value * (currentView.value?.extra ?? 0)))
const total     = computed(() => rooms.reduce((s, r) => s + roomCost(r), 0))

function fmt(n: number) { return n.toLocaleString('ru-RU') }

function addRoom() { rooms.push({ id: ++_id, type: 'bedroom', l: 3, w: 3, color: 'white', extras: makeRoomExtras() }) }
function getColorName(colorId: string) { return colors.find(c => c.id === colorId)?.name ?? 'Белый' }
function removeRoom(i: number) { rooms.splice(i, 1) }
function adjRoom(r: any, f: 'l'|'w', d: number) {
  r[f] = +Math.max(1, Math.min(50, r[f] + d)).toFixed(1)
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

function submitCalc() {
  sent.value = true
  setTimeout(() => { sent.value = false; formName.value = ''; formPhone.value = '' }, 3000)
}
</script>

<style scoped>
/* ═══ Section ═══ */
.calc-section {
  background: #141414;
  padding: 72px 0 80px;
}

/* ═══ Head ═══ */
.calc-head { text-align: center; margin-bottom: 52px; }

.calc-pretitle {
  display: inline-block;
  background: var(--accent);
  color: #141414;
  font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 14px;
  text-transform: uppercase; letter-spacing: .5px;
}
.calc-title {
  font-size: 36px; font-weight: 800;
  color: #fff;
  margin: 0 0 12px; line-height: 1.2;
}
.calc-desc {
  font-size: 16px; color: rgba(255,255,255,.45);
  max-width: 520px; margin: 0 auto; line-height: 1.6;
}

/* ═══ Layout ═══ */
.calc-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

/* ═══ Block ═══ */
.calc-block {
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 14px;
}
.calc-block:last-child { margin-bottom: 0; }

.calc-block__hd {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px;
}
.calc-block__num {
  background: rgba(245,200,0,.15);
  color: var(--accent);
  font-size: 11px; font-weight: 800;
  padding: 3px 9px; border-radius: 6px;
  letter-spacing: .5px;
}
.calc-block__ttl {
  font-size: 16px; font-weight: 700; color: #fff;
  flex: 1;
}
.calc-block__area-total {
  font-size: 13px; color: rgba(255,255,255,.4);
}
.calc-block__area-total strong { color: var(--accent); }

/* ═══ Carousel ═══ */
.carousel-nav { display: flex; gap: 6px; margin-left: auto; }
.carousel-arrow {
  width: 30px; height: 30px;
  background: #2a2a2a; border: 1px solid #333;
  border-radius: 8px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.5);
  transition: background .15s, color .15s;
}
.carousel-arrow:hover { background: #333; color: #fff; }

.carousel-wrap {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 4px;
  /* clip overflow visually */
  overflow-y: visible;
}
.carousel-wrap::-webkit-scrollbar { display: none; }

.calc-card {
  position: relative;
  display: flex; flex-direction: column;
  border-radius: 12px; overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  height: 110px;
  /* ровно 4 в ряд с учётом 3 отступов по 10px */
  flex: 0 0 calc((100% - 30px) / 4);
  width: calc((100% - 30px) / 4);
  scroll-snap-align: start;
  transition: border-color .15s, box-shadow .15s;
  background: #2a2a2a;
}
.calc-card:hover { border-color: #444; }
.calc-card.active { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(245,200,0,.18); }

.calc-card__img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transition: transform .35s ease;
}
.calc-card:hover .calc-card__img { transform: scale(1.06); }

.calc-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.7) 100%);
}
.calc-card__body {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 8px 10px;
}
.calc-card__name { font-size: 13px; font-weight: 700; color: #fff; line-height: 1.2; }
.calc-card__sub  { font-size: 11px; color: rgba(255,255,255,.55); }

.calc-card__tick {
  position: absolute; top: 7px; right: 7px;
  width: 20px; height: 20px;
  background: var(--accent); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #141414;
  opacity: 0; transform: scale(.5);
  transition: opacity .15s, transform .15s;
}
.calc-card.active .calc-card__tick { opacity: 1; transform: scale(1); }

/* ═══ Colors ═══ */
.calc-colors {
  display: flex; flex-wrap: wrap; gap: 8px;
}
.calc-color {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 12px 7px 8px;
  border: 1.5px solid #2e2e2e;
  border-radius: 10px;
  background: #252525;
  cursor: pointer;
  position: relative;
  transition: border-color .15s, background .15s;
}
.calc-color:hover { border-color: #444; }
.calc-color.active { border-color: var(--accent); background: rgba(245,200,0,.07); }

.calc-color__dot {
  width: 22px; height: 22px; border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,.12);
  flex-shrink: 0;
}
.calc-color__name { font-size: 13px; font-weight: 600; color: #ddd; }
.calc-color__tick {
  position: absolute; top: -5px; right: -5px;
  width: 16px; height: 16px;
  background: var(--accent); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #141414;
  opacity: 0; transform: scale(.5);
  transition: opacity .15s, transform .15s;
}
.calc-color.active .calc-color__tick { opacity: 1; transform: scale(1); }

/* ═══ Rooms ═══ */
.calc-rooms { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }

.calc-room {
  background: #252525;
  border: 1px solid #2e2e2e;
  border-radius: 12px;
  padding: 14px 16px;
  transition: border-color .15s;
}
.calc-room:hover { border-color: #3a3a3a; }

.calc-room__top {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 12px;
}
.calc-room__icon {
  width: 30px; height: 30px;
  background: rgba(245,200,0,.12);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); flex-shrink: 0;
}
.calc-room__type {
  flex: 1;
  background: #1e1e1e; border: 1px solid #333;
  border-radius: 8px; padding: 6px 10px;
  font-size: 14px; font-weight: 600; color: #fff;
  font-family: 'Gilroy', sans-serif;
  outline: none; cursor: pointer;
}
.calc-room__area-badge {
  background: rgba(245,200,0,.15);
  color: var(--accent);
  font-size: 13px; font-weight: 700;
  padding: 4px 10px; border-radius: 7px;
  white-space: nowrap;
}
.calc-room__del {
  width: 28px; height: 28px;
  background: rgba(255,60,60,.1); border: none;
  border-radius: 7px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #ff6060;
  transition: background .15s;
  flex-shrink: 0;
}
.calc-room__del:hover { background: rgba(255,60,60,.2); }

.calc-room__dims {
  display: flex; align-items: center; gap: 10px;
}
.calc-room__dim { display: flex; align-items: center; gap: 6px; flex: 1; }
.calc-room__dim-label { font-size: 12px; color: rgba(255,255,255,.35); white-space: nowrap; }
.calc-room__dim-ctrl {
  display: flex; align-items: center;
  background: #1a1a1a; border: 1px solid #333;
  border-radius: 8px; overflow: hidden; flex: 1;
}
.calc-room__dim-ctrl button {
  width: 30px; height: 32px;
  background: none; border: none; color: rgba(255,255,255,.4);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background .12s, color .12s;
}
.calc-room__dim-ctrl button:hover { background: #2a2a2a; color: #fff; }
.calc-room__dim-ctrl input {
  flex: 1; min-width: 0;
  background: none; border: none;
  text-align: center; font-size: 16px; font-weight: 700;
  color: #fff; font-family: 'Gilroy', sans-serif; outline: none;
  -moz-appearance: textfield;
}
.calc-room__dim-ctrl input::-webkit-outer-spin-button,
.calc-room__dim-ctrl input::-webkit-inner-spin-button { -webkit-appearance: none; }
.calc-room__dim-m { font-size: 12px; color: rgba(255,255,255,.3); }
.calc-room__dim-x { font-size: 18px; color: #333; flex-shrink: 0; }

.calc-room__colors {
  display: flex; align-items: center; gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #2e2e2e;
  flex-wrap: wrap;
}
.calc-room__colors-label {
  font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,.35);
  white-space: nowrap;
}
.calc-room__colors-list { display: flex; gap: 6px; flex-wrap: wrap; }
.calc-room__color {
  width: 24px; height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 0; cursor: pointer;
  transition: transform .15s, border-color .15s;
  background: none;
}
.calc-room__color:hover { transform: scale(1.15); }
.calc-room__color.active { border-color: var(--accent); transform: scale(1.15); }
.calc-room__color-dot {
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.15);
}
.calc-room__color-name {
  font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,.5);
}

.calc-add-room {
  display: flex; align-items: center; gap: 8px;
  width: 100%; padding: 12px;
  background: rgba(245,200,0,.06);
  border: 1.5px dashed rgba(245,200,0,.3);
  border-radius: 12px; cursor: pointer;
  font-size: 14px; font-weight: 700; color: var(--accent);
  font-family: 'Gilroy', sans-serif;
  justify-content: center;
  transition: background .15s, border-color .15s;
}
.calc-add-room:hover { background: rgba(245,200,0,.1); border-color: rgba(245,200,0,.5); }

/* Room transitions */
.room-enter-active { transition: all .3s ease; }
.room-leave-active { transition: all .2s ease; }
.room-enter-from { opacity: 0; transform: translateY(-10px); }
.room-leave-to   { opacity: 0; transform: translateX(20px); }

/* ═══ Room extras ═══ */
.calc-room__extras {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #2e2e2e;
}
.calc-room__extras-label {
  font-size: 12px; font-weight: 600;
  color: rgba(255,255,255,.35);
  margin-bottom: 8px;
}
.calc-room__extras-list { display: flex; flex-direction: column; gap: 6px; }
.calc-room__extra {
  display: flex; align-items: center; gap: 10px;
}
.calc-room__extra-icon { color: var(--accent); flex-shrink: 0; }
.calc-room__extra-info { flex: 1; }
.calc-room__extra-name  { font-size: 13px; font-weight: 600; color: #ccc; }
.calc-room__extra-price { font-size: 11px; color: rgba(255,255,255,.3); }

.calc-stepper {
  display: flex; align-items: center;
  background: #1a1a1a; border: 1px solid #333;
  border-radius: 9px; overflow: hidden;
}
.calc-stepper button {
  width: 32px; height: 32px;
  background: none; border: none; color: rgba(255,255,255,.4);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background .12s, color .12s;
}
.calc-stepper button:hover { background: #2a2a2a; color: #fff; }
.calc-stepper span {
  min-width: 36px; text-align: center;
  font-size: 15px; font-weight: 700; color: #fff;
  font-family: 'Gilroy', sans-serif;
  border-left: 1px solid #2e2e2e; border-right: 1px solid #2e2e2e;
  line-height: 32px;
}

.calc-stepper--sm button { width: 26px; height: 26px; }
.calc-stepper--sm span  { min-width: 28px; font-size: 13px; line-height: 26px; }

/* ═══ Result ═══ */
.calc-sticky { position: sticky; top: 100px; }
.calc-result {
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 20px;
  overflow: hidden;
}

.calc-result__top {
  background: #141414;
  padding: 24px 22px 20px;
  text-align: center;
  border-bottom: 1px solid #2a2a2a;
}
.calc-result__top-lbl {
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,.3);
  text-transform: uppercase; letter-spacing: .6px;
  margin-bottom: 8px;
}
.calc-result__big-price {
  font-size: 44px; font-weight: 900;
  color: var(--accent);
  font-family: 'Gilroy', sans-serif;
  line-height: 1;
  margin-bottom: 6px;
}
.calc-result__big-price span { font-size: 26px; font-weight: 700; }
.calc-result__top-sub { font-size: 12px; color: rgba(255,255,255,.3); }

.calc-result__breakdown { padding: 16px 20px 0; }
.calc-result__room-head {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,.7);
  margin-bottom: 4px;
}
.calc-result__room-head svg { opacity: .5; flex-shrink: 0; }
.calc-result__room-area {
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,.3);
  background: #252525; border-radius: 5px;
  padding: 1px 6px;
}
.calc-result__room-total {
  margin-left: auto;
  font-size: 13px; font-weight: 800;
  color: var(--accent);
  white-space: nowrap;
}
.calc-result__row--sub {
  padding-left: 18px;
  font-size: 12px !important;
  color: rgba(255,255,255,.3) !important;
}
.calc-result__row--sub span:last-child {
  color: rgba(255,255,255,.5) !important;
  font-weight: 500 !important;
}
.calc-result__row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; color: rgba(255,255,255,.45);
  padding: 4px 0; gap: 6px;
}
.calc-result__row span:first-child { display: flex; align-items: center; gap: 5px; }
.calc-result__row span:last-child { font-weight: 600; color: rgba(255,255,255,.8); white-space: nowrap; }
.calc-result__divider { height: 1px; background: #2a2a2a; margin: 12px 0; }

.calc-result__total-line {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 20px;
  border-top: 1px solid #2a2a2a;
  font-size: 15px; font-weight: 700; color: rgba(255,255,255,.7);
}
.calc-result__total-line strong {
  font-size: 22px; font-weight: 900; color: #fff;
  font-family: 'Gilroy', sans-serif;
}

.calc-result__badge {
  display: flex; align-items: center; gap: 8px;
  background: rgba(245,200,0,.07);
  color: rgba(255,255,255,.4);
  font-size: 13px; font-weight: 600;
  padding: 10px 20px;
  border-top: 1px solid rgba(245,200,0,.1);
  transition: background .2s, color .2s;
}
.calc-result__badge.active {
  background: rgba(245,200,0,.15);
  color: var(--accent);
  border-top-color: rgba(245,200,0,.25);
}
.calc-result__badge strong { font-weight: 800; }
.calc-result__disclaimer {
  display: flex; align-items: flex-start; gap: 9px;
  background: rgba(255, 180, 0, .08);
  border-top: 1px solid rgba(255,180,0,.15);
  border-bottom: 1px solid rgba(255,180,0,.15);
  padding: 12px 20px;
  font-size: 12px; color: rgba(255,255,255,.55);
  line-height: 1.5;
}
.calc-result__disclaimer-icon { color: #f5a623; flex-shrink: 0; margin-top: 1px; }
.calc-result__disclaimer strong { color: #f5a623; font-weight: 700; }

.calc-result__form {
  padding: 14px 20px 0;
  display: flex; flex-direction: column; gap: 8px;
}
.calc-promo {
  position: relative;
  display: flex;
  align-items: center;
}
.calc-promo__icon {
  position: absolute;
  left: 14px;
  color: var(--accent);
  pointer-events: none;
  flex-shrink: 0;
}
.calc-inp.calc-inp--promo { padding-left: 42px; }

.calc-inp {
  width: 100%; padding: 11px 14px;
  background: #141414; border: 1.5px solid #2e2e2e;
  border-radius: 10px;
  font-size: 14px; font-family: 'Gilroy', sans-serif; color: #fff;
  outline: none; transition: border-color .15s;
  box-sizing: border-box;
}
.calc-inp::placeholder { color: rgba(255,255,255,.25); }
.calc-inp:focus { border-color: var(--accent); }

.calc-result__btn {
  width: 100%; padding: 14px;
  font-size: 15px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.calc-result__btn:hover {
  background: #e0b400;
  color: #1a1a1a;
}
.calc-policy {
  font-size: 10px; color: rgba(255,255,255,.2);
  text-align: center; margin: 0; padding: 6px 0 16px;
  line-height: 1.5;
}

/* ═══ Flip animation ═══ */
.flip-enter-active { transition: all .18s ease; }
.flip-leave-active { transition: all .12s ease; }
.flip-enter-from   { opacity: 0; transform: translateY(-6px); }
.flip-leave-to     { opacity: 0; transform: translateY(6px); }

/* ═══ Responsive ═══ */
@media (max-width: 1100px) {
  .calc-layout { grid-template-columns: 1fr; }
  .calc-sticky  { position: static; }
  .calc-result  { max-width: 600px; margin: 0 auto; }
}
@media (max-width: 640px) {
.calc-title { font-size: 28px; }
  .calc-room__dims { flex-wrap: wrap; }
}
</style>

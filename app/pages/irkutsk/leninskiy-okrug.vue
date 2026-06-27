<template>
  <div>

    <section class="gp-hero">
      <NuxtImg class="gp-hero__bg" src="https://images.unsplash.com/photo-1600210491892-03d54079b6ac?w=1600&q=80" alt="" fetchpriority="high" loading="eager" width="1600" height="580" sizes="100vw" />
      <div class="gp-hero__overlay"></div>
      <div class="container gp-hero__inner">
        <div class="gp-hero__content">
          <div class="gp-pretitle gp-pretitle--light">Натяжные потолки в Иркутске</div>
          <h1 class="gp-hero__title">Ленинский округ</h1>
          <p class="gp-hero__price"><strong>от 159 ₽/м²</strong> — замер и выезд бесплатно</p>
          <p class="gp-hero__desc">
            Монтируем натяжные потолки в Ленинском округе — Ново-Ленино, Авиастроителе, Иркутске-2, Жилкино. Скрываем трещины и дефекты советских домов за один день.
          </p>
          <div class="gp-facts">
            <div class="gp-fact"><Icon name="lucide:shield-check" size="15" class="gp-fact__icon"/>Гарантия 12 лет</div>
            <div class="gp-fact"><Icon name="lucide:clock" size="15" class="gp-fact__icon"/>Монтаж за 1 день</div>
            <div class="gp-fact"><Icon name="lucide:banknote" size="15" class="gp-fact__icon"/>Оплата после</div>
            <div class="gp-fact"><Icon name="lucide:ruler" size="15" class="gp-fact__icon"/>Замер бесплатно</div>
          </div>
          <form class="gp-hero__form" @submit.prevent="submitHero">
            <input v-model="formName" class="gp-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="gp-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn gp-hero__btn">
              <Icon name="lucide:calculator" size="16"/>Рассчитать стоимость
            </button>
          </form>
          <p class="gp-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>
        <div class="gp-hero__nums">
          <div class="gp-num" v-for="n in nums" :key="n.label">
            <div class="gp-num__val">{{ n.val }}</div>
            <div class="gp-num__label">{{ n.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="gp-section gp-about">
      <div class="container gp-two-col">
        <div class="gp-two-col__text">
          <div class="gp-pretitle gp-pretitle--dark">Ново-Ленино, Иркутск-2, Жилкино</div>
          <h2 class="gp-title">Натяжной потолок в Ленинском округе — быстро и без доплат</h2>
          <p class="gp-body">Ленинский округ включает Ново-Ленино, Авиастроитель, Иркутск-2, Жилкино, Ермаковский, Боково, Вересовку, Кирова, Селиваниху, Батарейную. Большую часть жилого фонда составляют советские хрущёвки, брежневки и панельные девятиэтажки 1970–80-х годов.</p>
          <p class="gp-body">Кривые потолки, трещины, пятна от давних протечек — типичные проблемы старого жилья. Натяжной потолок решает всё <strong>за один день</strong>: новое полотно натягивается поверх, скрывая любые дефекты. Высота комнаты уменьшается всего на 3–5 см.</p>
          <p class="gp-body"><strong>Выезд в Ленинский округ — бесплатный.</strong> Матовый потолок от 159 ₽/м². Дешевле и быстрее, чем штукатурка. Гарантия 12 лет по договору.</p>
          <div class="gp-utp-grid">
            <div class="gp-utp" v-for="u in utpItems" :key="u.title">
              <div class="gp-utp__icon"><Icon :name="u.icon" size="18"/></div>
              <div>
                <div class="gp-utp__title">{{ u.title }}</div>
                <div class="gp-utp__desc">{{ u.desc }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="gp-two-col__aside">
          <div class="gp-aside-card">
            <div class="gp-aside-card__title">Цены в Ленинском округе</div>
            <div class="gp-aside-card__price">от <span>159</span> ₽/м²</div>
            <ul class="gp-aside-list">
              <li v-for="row in priceRows" :key="row.name">
                <span>{{ row.name }}</span>
                <strong>{{ row.price === '0' ? 'бесплатно' : 'от ' + row.price + ' ₽/м²' }}</strong>
              </li>
            </ul>
            <button class="nav-btn gp-aside-card__btn" @click="callbackOpen = true">
              <Icon name="lucide:phone-call" size="15"/>Заказать замер
            </button>
            <NuxtLink to="/kalkulyator" class="gp-aside-card__calc">
              <Icon name="lucide:calculator" size="14"/>Рассчитать онлайн
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="gp-section gp-prices">
      <div class="container">
        <div class="gp-head">
          <div class="gp-pretitle gp-pretitle--dark">Прозрачное ценообразование</div>
          <h2 class="gp-title">Стоимость натяжных потолков в Ленинском округе</h2>
          <p class="gp-desc">Цена включает полотно, монтаж, расходники и уборку. Без доплат за выезд.</p>
        </div>
        <div class="gp-price-grid">
          <div class="gp-price-card" v-for="p in priceCards" :key="p.title" :class="{ 'gp-price-card--hit': p.hit }">
            <div class="gp-price-card__badge" v-if="p.hit">{{ p.hit }}</div>
            <div class="gp-price-card__icon"><Icon :name="p.icon" size="22"/></div>
            <div class="gp-price-card__title">{{ p.title }}</div>
            <div class="gp-price-card__price">от {{ p.price }} <span>₽/м²</span></div>
            <ul class="gp-price-card__list">
              <li v-for="f in p.features" :key="f"><Icon name="lucide:check" size="12" class="gp-check"/>{{ f }}</li>
            </ul>
            <button class="gp-price-card__btn" @click="callbackOpen = true">Заказать</button>
          </div>
        </div>
      </div>
    </section>

    <section class="gp-section gp-steps">
      <div class="container">
        <div class="gp-head">
          <div class="gp-pretitle gp-pretitle--light">Как мы работаем</div>
          <h2 class="gp-title gp-title--light">От звонка до готового потолка</h2>
          <p class="gp-desc gp-desc--light">Прозрачный процесс — никаких сюрпризов</p>
        </div>
        <div class="gp-steps-grid">
          <div class="gp-step" v-for="(s, i) in steps" :key="s.title">
            <div class="gp-step__num">{{ i + 1 }}</div>
            <div class="gp-step__icon"><Icon :name="s.icon" size="22"/></div>
            <div class="gp-step__title">{{ s.title }}</div>
            <div class="gp-step__desc">{{ s.desc }}</div>
            <div class="gp-step__time" v-if="s.time"><Icon name="lucide:clock" size="11"/>{{ s.time }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="gp-section gp-reviews">
      <div class="container">
        <div class="gp-head">
          <div class="gp-pretitle gp-pretitle--dark">Отзывы клиентов</div>
          <h2 class="gp-title">Что говорят жители Ленинского округа</h2>
        </div>
        <div class="gp-reviews-grid">
          <div class="gp-review" v-for="r in reviews" :key="r.author">
            <div class="gp-review__top">
              <div class="gp-review__avatar">{{ r.author[0] }}</div>
              <div class="gp-review__info">
                <div class="gp-review__author">{{ r.author }}</div>
                <div class="gp-review__meta">{{ r.platform }} · {{ r.date }}</div>
              </div>
              <div class="gp-review__stars">
                <Icon v-for="i in r.rating" :key="i" name="lucide:star" size="14" class="gp-star"/>
              </div>
            </div>
            <p class="gp-review__text">{{ r.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="gp-cta">
      <div class="container gp-cta__inner">
        <div>
          <h2 class="gp-cta__title">Готовы обновить потолок в Ленинском округе?</h2>
          <p class="gp-cta__desc">Выезд замерщика бесплатно — скажем точную цену ещё до начала работ</p>
        </div>
        <div class="gp-cta__btns">
          <button class="nav-btn gp-cta__btn" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>Заказать звонок
          </button>
          <NuxtLink to="/kalkulyator" class="gp-cta__outline">
            <Icon name="lucide:calculator" size="16"/>Калькулятор
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="gp-section gp-faq">
      <div class="container">
        <div class="gp-head">
          <div class="gp-pretitle gp-pretitle--dark">Вопросы и ответы</div>
          <h2 class="gp-title">Часто спрашивают жители Ленинского округа</h2>
        </div>
        <div class="gp-faq-list">
          <div class="gp-faq-item" v-for="(item, i) in faqs" :key="item.q" :class="{ open: faqOpen === i }" @click="faqOpen = faqOpen === i ? -1 : i">
            <div class="gp-faq-item__q">
              {{ item.q }}
              <Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="gp-faq-item__arrow"/>
            </div>
            <div class="gp-faq-item__a"><div>{{ item.a }}</div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="gp-section gp-seo">
      <div class="container">
        <div class="gp-seo-inner">
          <div class="gp-seo-content">
            <h2>Натяжные потолки в Ленинском округе Иркутска</h2>
            <p>Ленинский округ включает Ново-Ленино, Авиастроитель, Иркутск-2, Жилкино, Ермаковский, Боково, Вересовку, Кирова, Селиваниху, Батарейную. Мы работаем на <strong>ул. Розы Люксембург, ул. Авиастроителей, ул. Жукова, ул. Кутузова, ул. Маршала Говорова, ул. Новаторов, ул. Баумана, ул. Тухачевского, ул. Флотской, ул. Шахтёрской</strong>. Большинство домов советской эпохи: хрущёвки, кирпичные пятиэтажки, панельные девятиэтажки. Потолки трескаются, желтеют, остаются следы протечек.</p>
            <p>Натяжной потолок — самое быстрое и экономичное решение. Не нужно штукатурить и красить. Не нужно освобождать комнату. Мастера работают за 1 день, убирают мусор и сдают готовый потолок под ключ.</p>
            <h3>Почему натяжной потолок лучше побелки и штукатурки</h3>
            <p>Выравнивание потолка штукатуркой в квартире 60 м² стоит от 30 000 ₽ и занимает неделю с учётом сушки. Натяжной потолок той же площади — от 9 540 ₽ при цене 159 ₽/м², монтаж за 1 день. И результат гарантирован на 12 лет.</p>
            <h3>Гарантия и надёжность</h3>
            <p>Мы работаем официально — договор, акт выполненных работ, гарантийный талон. Платите только после того, как примете работу и останетесь довольны.</p>
          </div>
          <div class="gp-seo-links">
            <div class="gp-seo-links__title">Микрорайоны и улицы</div>
            <nav>
              <span class="gp-seo-street">мкр. Ново-Ленино</span>
              <span class="gp-seo-street">мкр. Авиастроитель</span>
              <span class="gp-seo-street">пос. Иркутск-2</span>
              <span class="gp-seo-street">пос. Жилкино</span>
              <span class="gp-seo-street">ул. Розы Люксембург</span>
              <span class="gp-seo-street">ул. Авиастроителей</span>
              <span class="gp-seo-street">ул. Жукова</span>
              <span class="gp-seo-street">ул. Маршала Говорова</span>
            </nav>
            <div class="gp-seo-links__title" style="margin-top: 24px;">Другие районы Иркутска</div>
            <nav>
              <NuxtLink to="/irkutsk/oktyabrskiy-okrug" class="gp-seo-link"><Icon name="lucide:arrow-right" size="13"/>Октябрьский округ</NuxtLink>
              <NuxtLink to="/irkutsk/pravoberezhnyy-okrug" class="gp-seo-link"><Icon name="lucide:arrow-right" size="13"/>Правобережный округ</NuxtLink>
              <NuxtLink to="/irkutsk/sverdlovskiy-okrug" class="gp-seo-link"><Icon name="lucide:arrow-right" size="13"/>Свердловский округ</NuxtLink>
            </nav>
            <div class="gp-seo-links__title" style="margin-top: 24px;">Виды потолков</div>
            <nav>
              <NuxtLink to="/catalog/faktury/matovye-natyazhnye-potolki" class="gp-seo-link"><Icon name="lucide:arrow-right" size="13"/>Матовые от 159 ₽/м²</NuxtLink>
              <NuxtLink to="/catalog/faktury/glyancevye-natyazhnye-potolki" class="gp-seo-link"><Icon name="lucide:arrow-right" size="13"/>Глянцевые от 209 ₽/м²</NuxtLink>
              <NuxtLink to="/catalog/vidy/paryashchie-natyazhnye-potolki" class="gp-seo-link"><Icon name="lucide:arrow-right" size="13"/>Парящие от 350 ₽/м²</NuxtLink>
              <NuxtLink to="/catalog" class="gp-seo-link"><Icon name="lucide:arrow-right" size="13"/>Весь каталог</NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen" :initial-name="formName" :initial-phone="formPhone" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const site = useSite()

usePageSeoMeta('leninskiy-okrug')
useHead({ meta: [{ property: 'og:type', content: 'website' }] })

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')

function maskPhone(e: Event) {
  const input = e.target as HTMLInputElement
  let v = input.value.replace(/\D/g, '')
  if (v[0] === '7' || v[0] === '8') v = v.slice(1)
  v = v.slice(0, 10)
  let out = '+7'
  if (v.length > 0) out += ' (' + v.slice(0, 3)
  if (v.length >= 4) out += ') ' + v.slice(3, 6)
  if (v.length >= 7) out += '-' + v.slice(6, 8)
  if (v.length >= 9) out += '-' + v.slice(8, 10)
  input.value = out
  return out
}
function submitHero() { callbackOpen.value = true }

const nums = [
  { val: '4 000+', label: 'объектов в Иркутске' },
  { val: '12 лет', label: 'гарантия' },
  { val: '1 день', label: 'монтаж' },
  { val: '15 лет', label: 'опыт работы' },
]

const utpItems = [
  { icon: 'lucide:wrench', title: 'Скрываем любые дефекты', desc: 'Трещины, пятна, следы протечек — всё скрыто после монтажа' },
  { icon: 'lucide:file-text', title: 'Договор с фиксированной ценой', desc: 'Цена из договора совпадает с итоговым чеком — без сюрпризов' },
  { icon: 'lucide:sofa', title: 'Мебель на месте', desc: 'Не нужно освобождать комнату — работаем вокруг мебели' },
  { icon: 'lucide:shield-check', title: 'Гарантия 12 лет', desc: 'Письменная гарантия на полотно и все монтажные работы' },
]

const priceRows = [
  { name: 'Матовый', price: '159' },
  { name: 'Сатиновый', price: '189' },
  { name: 'Глянцевый', price: '209' },
  { name: 'Тканевый (эко)', price: '319' },
  { name: 'Парящий потолок', price: '350' },
  { name: 'Замер и выезд', price: '0' },
]

const priceCards = [
  { title: 'Матовый / Глянцевый', price: 159, icon: 'lucide:square', hit: 'Хит', features: ['Одноуровневый', 'ПВХ-полотно', 'Монтаж включён', 'Уборка включена'] },
  { title: 'Сатиновый', price: 189, icon: 'lucide:sparkles', hit: null, features: ['Шелковистая фактура', 'Без бликов', 'Монтаж включён', 'Уборка включена'] },
  { title: 'Парящий потолок', price: 350, icon: 'lucide:lamp-ceiling', hit: 'Тренд', features: ['Световая ниша', 'LED-подсветка', 'Монтаж включён', 'Профиль в подарок'] },
]

const steps = [
  { icon: 'lucide:phone-call', title: 'Заявка', desc: 'Оставьте заявку или позвоните. Ответим в течение 15 минут.', time: '15 минут' },
  { icon: 'lucide:ruler', title: 'Бесплатный замер', desc: 'Приедем с образцами, измерим и рассчитаем стоимость на месте.', time: 'В день обращения' },
  { icon: 'lucide:file-signature', title: 'Договор', desc: 'Фиксируем стоимость и сроки в договоре.', time: 'На месте' },
  { icon: 'lucide:hammer', title: 'Монтаж', desc: 'Мастера монтируют потолок за 1 день. Накрывают мебель, убирают после.', time: '1 день' },
  { icon: 'lucide:clipboard-check', title: 'Приёмка', desc: 'Принимаете работу, подписываете акт, производите оплату.', time: 'После монтажа' },
]

const reviews = [
  { author: 'Николай Власов', date: '8 мая 2025', text: 'Хрущёвка 1969 года, потолок с перепадом 4 см и старыми трещинами. Ребята предупредили, что потеряем 5 см высоты — согласился. После монтажа — идеальная плоскость, все дефекты скрыты. Не ожидал такого результата за один день!', rating: 5, platform: 'Яндекс' },
  { author: 'Валентина Мухина', date: '15 марта 2025', text: 'Обращалась в ПроПотолок по совету соседки. Порадовало, что выезд бесплатный и замерщик приехал уже на следующий день. Сделали глянцевый потолок в кухне — кажется, что кухня стала в два раза больше! Очень довольна.', rating: 5, platform: '2ГИС' },
  { author: 'Евгений Кузьмин', date: '20 января 2025', text: 'Заказывал матовый белый в трёх комнатах. Мастера приехали с утра, к вечеру всё готово. Цена вышла точно как по расчёту с сайта. Гарантию дали письменно. Чисто, быстро, по-человечески — рекомендую.', rating: 5, platform: 'Avito' },
]

const faqs = [
  { q: 'Работаете ли вы в хрущёвках и советских домах в Ленинском округе?', a: 'Да, это наш профиль. Большинство домов в Ленинском округе — советской постройки с кривыми потолками и трещинами. Натяжной потолок скрывает все дефекты и при этом теряем всего 3–5 см высоты — для комнаты 2,5 м это практически незаметно.' },
  { q: 'Есть ли доплата за выезд в Ленинский округ?', a: 'Никакой доплаты. Цены единые для всего Иркутска: матовый от 159 ₽/м², замер и выезд — бесплатно.' },
  { q: 'Нужно ли освобождать комнату перед монтажом?', a: 'Нет. Мы работаем методом холодного натяжения без тепловых пушек. Мебель накрываем защитной плёнкой и снимаем после монтажа. Никакого запаха, никакой грязи.' },
  { q: 'Сколько стоит потолок в однокомнатной хрущёвке?', a: 'Типовая однокомнатная квартира в хрущёвке — около 14–16 м² в одной комнате. При цене от 159 ₽/м² потолок в одной комнате обойдётся от 2 226 до 2 544 ₽. Точная стоимость рассчитывается после бесплатного замера.' },
  { q: 'Как скоро приедет замерщик?', a: 'Как правило, в день обращения или на следующий день. Работаем с 8:00 до 21:00 без выходных. Позвоните — согласуем удобное время.' },
  { q: 'Можно ли сделать потолок только в одной комнате?', a: 'Конечно. Минимальный заказ — одна комната. Большинство наших клиентов начинают с одного помещения и потом постепенно обновляют остальные.' },
]
</script>

<style scoped>
.gp-pretitle { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.gp-pretitle--dark  { background: var(--accent); color: var(--dark); }
.gp-pretitle--light { background: rgba(245,200,0,.15); color: var(--accent); }
.gp-head  { text-align: center; margin-bottom: 44px; }
.gp-title { font-size: 34px; font-weight: 800; color: var(--dark); margin: 0 0 12px; line-height: 1.2; }
.gp-title--light { color: #fff; }
.gp-desc  { font-size: 16px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }
.gp-desc--light { color: rgba(255,255,255,.5); }
.gp-body  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 14px; }
.gp-check { color: var(--accent); flex-shrink: 0; }
.gp-section { padding: 72px 0; }
.gp-hero { position: relative; min-height: 520px; display: flex; align-items: center; }
.gp-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0; display: block; }
.gp-hero__overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.65) 60%, rgba(0,0,0,.35) 100%); z-index: 1; }
.gp-hero__inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; padding-top: 60px; padding-bottom: 60px; }
.gp-hero__content { max-width: 620px; }
.gp-hero__title { font-size: 48px; font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 10px; }
.gp-hero__price { font-size: 20px; color: rgba(255,255,255,.7); margin-bottom: 16px; }
.gp-hero__price strong { color: var(--accent); }
.gp-hero__desc { font-size: 16px; color: rgba(255,255,255,.6); line-height: 1.65; margin-bottom: 24px; }
.gp-facts { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
.gp-fact { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.6); }
.gp-fact__icon { color: var(--accent); }
.gp-hero__form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.gp-inp { flex: 1; min-width: 200px; padding: 13px 16px; border: none; border-radius: 10px; font-size: 15px; font-family: var(--font); color: var(--dark); outline: none; background: rgba(255,255,255,.95); }
.gp-inp:focus { background: #fff; }
.gp-hero__btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 15px; white-space: nowrap; }
.gp-policy { font-size: 11px; color: rgba(255,255,255,.35); margin: 0; }
.gp-hero__nums { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.gp-num { background: rgba(255,255,255,.08); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 18px 20px; text-align: center; min-width: 130px; }
.gp-num__val   { font-size: 26px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 5px; }
.gp-num__label { font-size: 12px; color: rgba(255,255,255,.45); }
.gp-about { background: #fff; }
.gp-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.gp-utp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 20px; }
.gp-utp { display: flex; align-items: flex-start; gap: 14px; padding: 16px; background: #f7f7f7; border-radius: 14px; border: 1.5px solid transparent; transition: border-color .15s; }
.gp-utp:hover { border-color: var(--accent); }
.gp-utp__icon { width: 42px; height: 42px; flex-shrink: 0; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); }
.gp-utp__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 3px; }
.gp-utp__desc  { font-size: 13px; color: var(--gray); line-height: 1.4; }
.gp-aside-card { background: #f7f7f7; border-radius: 18px; padding: 26px; border: 1.5px solid #ececec; position: sticky; top: 100px; }
.gp-aside-card__title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 6px; }
.gp-aside-card__price { font-size: 14px; color: var(--gray); margin-bottom: 16px; }
.gp-aside-card__price span { font-size: 30px; font-weight: 900; color: var(--dark); }
.gp-aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 9px; }
.gp-aside-list li { display: flex; justify-content: space-between; align-items: center; font-size: 13px; border-bottom: 1px solid #e8e8e8; padding-bottom: 8px; gap: 8px; }
.gp-aside-list li span { color: #555; }
.gp-aside-list li strong { color: var(--dark); white-space: nowrap; font-size: 13px; }
.gp-aside-card__btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; margin-bottom: 10px; }
.gp-aside-card__calc { display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 14px; font-weight: 600; color: var(--gray); text-decoration: none; transition: color .15s; }
.gp-aside-card__calc:hover { color: var(--dark); }
.gp-prices { background: #f7f7f7; }
.gp-price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gp-price-card { background: #fff; border-radius: 18px; padding: 26px 22px; border: 2px solid transparent; position: relative; box-shadow: 0 2px 12px rgba(0,0,0,.06); transition: border-color .2s, box-shadow .2s, transform .2s; }
.gp-price-card:hover { border-color: var(--accent); box-shadow: 0 8px 28px rgba(245,200,0,.15); transform: translateY(-3px); }
.gp-price-card--hit { border-color: var(--accent); }
.gp-price-card__badge { position: absolute; top: -10px; left: 22px; background: var(--accent); color: var(--dark); font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: .5px; }
.gp-price-card__icon { width: 48px; height: 48px; background: rgba(245,200,0,.12); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; transition: background .2s; }
.gp-price-card:hover .gp-price-card__icon { background: var(--accent); }
.gp-price-card__title { font-size: 17px; font-weight: 800; color: var(--dark); margin-bottom: 6px; }
.gp-price-card__price { font-size: 28px; font-weight: 900; color: var(--dark); margin-bottom: 16px; }
.gp-price-card__price span { font-size: 16px; font-weight: 600; color: var(--gray); }
.gp-price-card__list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 7px; }
.gp-price-card__list li { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #555; }
.gp-price-card__btn { display: block; width: 100%; padding: 11px; border-radius: 10px; font-size: 14px; font-weight: 700; font-family: var(--font); background: var(--accent); border: none; cursor: pointer; color: var(--dark); transition: opacity .15s; }
.gp-price-card__btn:hover { opacity: .9; }
.gp-steps { background: #141414; }
.gp-steps-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
.gp-step { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 18px; padding: 24px 20px; position: relative; overflow: hidden; transition: border-color .2s; }
.gp-step:hover { border-color: var(--accent); }
.gp-step__num { position: absolute; bottom: -60px; right: -6px; font-size: 200px; font-weight: 900; font-family: var(--font); line-height: 1; color: transparent; -webkit-text-stroke: 2px var(--accent); text-stroke: 2px var(--accent); opacity: .2; user-select: none; }
.gp-step__icon { width: 48px; height: 48px; background: rgba(245,200,0,.12); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 14px; transition: background .2s; }
.gp-step:hover .gp-step__icon { background: var(--accent); color: var(--dark); }
.gp-step__title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.gp-step__desc  { font-size: 13px; color: rgba(255,255,255,.4); line-height: 1.6; margin-bottom: 10px; }
.gp-step__time  { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(245,200,0,.1); padding: 3px 10px; border-radius: 20px; }
.gp-reviews { background: #fff; }
.gp-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.gp-review { background: #f7f7f7; border-radius: 16px; padding: 22px; border: 1.5px solid transparent; transition: border-color .15s; }
.gp-review:hover { border-color: var(--accent); }
.gp-review__top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
.gp-review__avatar { width: 42px; height: 42px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 17px; color: var(--dark); flex-shrink: 0; }
.gp-review__author { font-weight: 700; font-size: 14px; color: var(--dark); }
.gp-review__meta   { font-size: 12px; color: var(--gray); }
.gp-review__stars  { display: flex; gap: 2px; margin-left: auto; }
.gp-star { color: var(--accent); }
.gp-review__text { font-size: 14px; color: #555; line-height: 1.65; margin: 0; }
.gp-faq { background: #f7f7f7; }
.gp-faq-list { display: flex; flex-direction: column; gap: 10px; max-width: 860px; margin: 0 auto; }
.gp-faq-item { background: #fff; border-radius: 14px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.gp-faq-item.open { border-color: var(--accent); }
.gp-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; }
.gp-faq-item__arrow { flex-shrink: 0; color: var(--gray); }
.gp-faq-item.open .gp-faq-item__arrow { color: var(--accent); }
.gp-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 22px; }
.gp-faq-item.open .gp-faq-item__a { max-height: 300px; padding: 0 22px 18px; }
.gp-cta { background: #141414; padding: 64px 0; }
.gp-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.gp-cta__title { font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.gp-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; }
.gp-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.gp-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.gp-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; font-size: 15px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 10px; color: #fff; text-decoration: none; transition: border-color .15s, color .15s; }
.gp-cta__outline:hover { border-color: var(--accent); color: var(--accent); }
.gp-seo { background: #fff; }
.gp-seo-inner { display: grid; grid-template-columns: 1fr 240px; gap: 56px; align-items: start; }
.gp-seo-content h2 { font-size: 22px; font-weight: 800; color: var(--dark); margin: 0 0 14px; }
.gp-seo-content h3 { font-size: 16px; font-weight: 700; color: var(--dark); margin: 20px 0 8px; }
.gp-seo-content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.gp-seo-content strong { color: var(--dark); }
.gp-seo-links { position: sticky; top: 100px; }
.gp-seo-links__title { font-size: 13px; font-weight: 800; color: var(--dark); margin-bottom: 12px; text-transform: uppercase; letter-spacing: .4px; }
.gp-seo-link { display: flex; align-items: center; gap: 7px; padding: 9px 0; font-size: 14px; font-weight: 500; color: var(--gray); text-decoration: none; border-bottom: 1px solid #f0f0f0; transition: color .15s, padding-left .15s; }
.gp-seo-link:hover { color: var(--dark); padding-left: 4px; }
.gp-seo-street { display: block; padding: 7px 0; font-size: 13px; color: #555; border-bottom: 1px solid #f0f0f0; }
@media (max-width: 1100px) { .gp-hero__inner { grid-template-columns: 1fr; } .gp-hero__nums { grid-template-columns: repeat(4, 1fr); } .gp-price-grid { grid-template-columns: 1fr 1fr; } .gp-steps-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 860px) { .gp-two-col { grid-template-columns: 1fr; } .gp-aside-card { position: static; } .gp-reviews-grid { grid-template-columns: 1fr 1fr; } .gp-seo-inner { grid-template-columns: 1fr; } .gp-seo-links { position: static; } }
@media (max-width: 640px) { .gp-hero__title { font-size: 32px; } .gp-hero__nums { grid-template-columns: repeat(2, 1fr); } .gp-hero__form { flex-direction: column; } .gp-inp, .gp-hero__btn { width: 100%; } .gp-price-grid { grid-template-columns: 1fr; } .gp-utp-grid { grid-template-columns: 1fr; } .gp-steps-grid { grid-template-columns: 1fr; } .gp-reviews-grid { grid-template-columns: 1fr; } .gp-title { font-size: 26px; } .gp-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>

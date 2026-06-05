<template>
  <header class="header-pc">

    <div class="topmenu-forphone">
      <div class="topmenu-forphone--inner container">
        <div>{{ site.city }}</div>
        <div class="withdot"><span class="dot"></span>{{ site.schedule }}</div>
      </div>
    </div>

    <div class="container">

      <div class="header-1">

        <NuxtLink to="/" class="header__logo">
          <img class="header__logo-img" src="/img/logo.png" alt="ПроПотолок — натяжные потолки Иркутск">
        </NuxtLink>

        <nav
          class="top-menu"
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
          aria-label="Верхнее меню"
        >
          <ul>
            <li
              class="top-menu--link o-kompanii"
              @mouseenter="dropdownOpen = true"
              @mouseleave="dropdownOpen = false"
            >
              <a class="down" href="#">О компании</a>
              <Transition name="dropdown">
                <ul v-show="dropdownOpen" class="submenu-top">
                  <li><NuxtLink to="/o-kompanii">О компании</NuxtLink></li>
                  <li><NuxtLink to="/rekvizity">Реквизиты</NuxtLink></li>
                  <li><NuxtLink to="/sertifikaty">Сертификаты и лицензии</NuxtLink></li>
                  <li><NuxtLink to="/garantiya">Гарантия</NuxtLink></li>
                  <li><NuxtLink to="/voprosy-otvety">Вопрос-ответ</NuxtLink></li>
                  <li><NuxtLink to="/obmen-i-vozvrat">Обмен и возврат</NuxtLink></li>
                </ul>
              </Transition>
            </li>
            <li class="top-menu--link" itemprop="name"><NuxtLink to="/ceny" itemprop="url">Цены</NuxtLink></li>
            <li class="top-menu--link" itemprop="name"><NuxtLink to="/otzyvy" itemprop="url">Отзывы</NuxtLink></li>
            <li class="top-menu--link" itemprop="name"><NuxtLink to="/kontakty" itemprop="url">Контакты</NuxtLink></li>
          </ul>
        </nav>

        <div class="top-info">
          <div>Город: <strong>{{ site.city }}</strong></div>
          <div class="withdot"><span class="dot"></span>{{ site.schedule }}</div>
        </div>

        <div class="top-phone">
          <a :href="'tel:' + site.phoneRaw" class="nav__phone">{{ site.phone }}</a>
          <div class="nav-bars" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen">
            <span></span><span></span><span></span>
          </div>
        </div>

      </div>

      <div class="header-2">

        <nav
          class="bottom-menu"
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
          aria-label="Основное меню"
        >
          <ul>
            <li class="opensubmenu" :class="{ open: megaOpen }" itemprop="name">
              <a href="/catalog" itemprop="url" @click.prevent="megaOpen = !megaOpen">Каталог потолков</a>
            </li>
            <li class="nonclick" itemprop="name"><NuxtLink to="/portfolio"   itemprop="url">Наши работы</NuxtLink></li>
            <li class="nonclick" itemprop="name"><NuxtLink to="/kalkulyator" itemprop="url">Калькулятор</NuxtLink></li>
            <li class="nonclick" itemprop="name"><NuxtLink to="/akczii"      itemprop="url">Акции и скидки</NuxtLink></li>
            <li class="nonclick" itemprop="name"><NuxtLink to="/uslugi"      itemprop="url">Услуги</NuxtLink></li>
          </ul>
        </nav>

        <div class="bottom-info">
          <div class="nav__phone withdot">
            <span class="dot"></span>
            <a :href="'tel:' + site.phoneRaw">{{ site.phone }}</a>
          </div>
          <button class="nav-btn" @click="$emit('openCallback')">Заказать звонок</button>
        </div>

      </div>

    </div>

    <div class="submenu__block--back">
      <Transition name="mega">
      <div v-show="megaOpen" class="submenu__block">
        <div class="container">
          <div class="nav__submenu">

            <nav class="nav-item nav-item--forphone">
              <div class="nav__names callme8" @click="$emit('openCallback'); megaOpen = false">Вызвать замерщика</div>
            </nav>

            <nav class="nav-item">
              <div class="nav__names sub">По фактуре</div>
              <div class="nav-item--submenu">
                <NuxtLink to="/catalog/faktury/matovye-natyazhnye-potolki" @click="megaOpen = false">Матовые</NuxtLink>
                <NuxtLink to="/catalog/faktury/glyancevye-natyazhnye-potolki" @click="megaOpen = false">Глянцевые</NuxtLink>
                <NuxtLink to="/catalog/faktury/satinovye-natyazhnye-potolki" @click="megaOpen = false">Сатиновые</NuxtLink>
                <NuxtLink to="/catalog/faktury/tkanevye-natyazhnye-potolki" @click="megaOpen = false">Тканевые</NuxtLink>
                <NuxtLink to="/catalog/faktury/fakturnye-natyazhnye-potolki" @click="megaOpen = false">Фактурные</NuxtLink>
                <NuxtLink to="/catalog/faktury/besshovnye-natyazhnye-potolki" @click="megaOpen = false">Бесшовные</NuxtLink>
              </div>
            </nav>

            <nav class="nav-item">
              <div class="nav__names sub">Виды потолков</div>
              <div class="nav-item--submenu">
                <NuxtLink to="/catalog/vidy/natyazhnye-potolki-s-podsvetkoy" @click="megaOpen = false">С подсветкой</NuxtLink>
                <NuxtLink to="/catalog/vidy/dvuhurovnevye-natyazhnye-potolki" @click="megaOpen = false">Двухуровневые</NuxtLink>
                <NuxtLink to="/catalog/vidy/paryashchie-natyazhnye-potolki" @click="megaOpen = false">Парящие потолки</NuxtLink>
                <NuxtLink to="/catalog/vidy/tenevye-natyazhnye-potolki" @click="megaOpen = false">Теневые потолки</NuxtLink>
                <NuxtLink to="/catalog/vidy/natyazhnye-potolki-s-fotopechatyu" @click="megaOpen = false">С фотопечатью</NuxtLink>
                <NuxtLink to="/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo" @click="megaOpen = false">Звёздное небо</NuxtLink>
                <NuxtLink to="/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami" @click="megaOpen = false">Световые линии</NuxtLink>
                <NuxtLink to="/catalog/vidy/besshchelevye-natyazhnye-potolki" @click="megaOpen = false">Бесщелевые</NuxtLink>
              </div>
            </nav>

            <nav class="nav-item">
              <div class="nav__names sub">Помещение</div>
              <div class="nav-item--submenu">
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-na-kuhne" @click="megaOpen = false">На кухне</NuxtLink>
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-vannoy" @click="megaOpen = false">В ванной</NuxtLink>
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-gostinoy" @click="megaOpen = false">В гостиную</NuxtLink>
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-spalne" @click="megaOpen = false">В спальню</NuxtLink>
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-detskoy" @click="megaOpen = false">В детскую</NuxtLink>
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-prihozhey" @click="megaOpen = false">В прихожую</NuxtLink>
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-kvartire" @click="megaOpen = false">В квартиру</NuxtLink>
                <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-chastnom-dome" @click="megaOpen = false">В частный дом</NuxtLink>
              </div>
            </nav>

            <nav class="nav-item">
              <div class="nav__names sub">Производители</div>
              <div class="nav-item--submenu">
                <NuxtLink to="/catalog/brendy/natyazhnye-potolki-msd" @click="megaOpen = false">MSD</NuxtLink>
                <NuxtLink to="/catalog/brendy/natyazhnye-potolki-bauf" @click="megaOpen = false">Bauf (Германия)</NuxtLink>
                <NuxtLink to="/catalog/brendy/natyazhnye-potolki-descor" @click="megaOpen = false">Descor</NuxtLink>
                <NuxtLink to="/catalog/brendy/natyazhnye-potolki-clipso" @click="megaOpen = false">Clipso</NuxtLink>
                <NuxtLink to="/catalog/brendy/natyazhnye-potolki-teqtum" @click="megaOpen = false">Teqtum</NuxtLink>
                <NuxtLink to="/catalog/brendy/natyazhnye-potolki-lumfer" @click="megaOpen = false">Lumfer</NuxtLink>
                <NuxtLink to="/catalog/brendy/natyazhnye-potolki-cerutti" @click="megaOpen = false">Cerutti</NuxtLink>
              </div>
            </nav>

            <nav class="nav-item">
              <div class="nav__names sub">Услуги</div>
              <div class="nav-item--submenu">
                <NuxtLink to="/uslugi/montazh-natyazhnyh-potolkov" @click="megaOpen = false">Монтаж потолков</NuxtLink>
                <NuxtLink to="/uslugi/vyezd-zamershchika" @click="megaOpen = false">Бесплатный замер</NuxtLink>
                <NuxtLink to="/uslugi/srochnyj-montazh-24-chasa" @click="megaOpen = false">Срочный монтаж 24ч</NuxtLink>
                <NuxtLink to="/uslugi/demontazh-natyazhnogo-potolka" @click="megaOpen = false">Демонтаж полотен</NuxtLink>
                <NuxtLink to="/uslugi/remont-natyazhnogo-potolka" @click="megaOpen = false">Ремонт потолка</NuxtLink>
                <NuxtLink to="/uslugi/sliv-vody-s-natyazhnogo-potolka" @click="megaOpen = false">Слив воды</NuxtLink>
                <NuxtLink to="/uslugi/zamena-polotna" @click="megaOpen = false">Замена полотна</NuxtLink>
              </div>
            </nav>

            <nav class="nav-item nav-item--forphone"><NuxtLink to="/portfolio" @click="megaOpen = false">Наши работы</NuxtLink></nav>
            <nav class="nav-item nav-item--forphone"><NuxtLink to="/akczii" @click="megaOpen = false">Акции</NuxtLink></nav>
            <nav class="nav-item nav-item--forphone"><NuxtLink to="/o-kompanii" @click="megaOpen = false">О компании</NuxtLink></nav>
            <nav class="nav-item nav-item--forphone"><NuxtLink to="/kontakty" @click="megaOpen = false">Контакты</NuxtLink></nav>

          </div>
        </div>
      </div>
      </Transition>
      <div class="submenu__block--bg" :class="{ open: megaOpen }" @click="megaOpen = false"></div>
    </div>

    <div class="mobile-menu__overlay" :class="{ open: mobileOpen }" @click="mobileOpen = false"></div>
    <div class="mobile-menu" :class="{ open: mobileOpen }">

      <div class="mobile-menu__header">
        <NuxtLink to="/" @click="mobileOpen = false">
          <img src="/img/logo.png" alt="ПроПотолок" class="mobile-menu__logo-img" />
        </NuxtLink>
        <span class="mobile-menu__close" @click="mobileOpen = false">
          <Icon name="lucide:x" size="20" />
        </span>
      </div>

      <nav class="mobile-menu__nav">

        <NuxtLink to="/catalog" class="mm-link mm-link--catalog" @click="mobileOpen = false">
          <Icon name="lucide:layout-grid" size="18" />
          Весь каталог
        </NuxtLink>

        <div class="mm-group" :class="{ open: mmOpen === 'faktury' }">
          <div class="mm-group__head" @click="mmOpen = mmOpen === 'faktury' ? '' : 'faktury'">
            <span>Фактуры</span>
            <Icon name="lucide:chevron-down" size="18" class="mm-group__arrow" />
          </div>
          <div class="mm-group__body">
            <NuxtLink to="/catalog/faktury/glyancevye-natyazhnye-potolki" @click="mobileOpen = false">Глянцевые</NuxtLink>
            <NuxtLink to="/catalog/faktury/matovye-natyazhnye-potolki" @click="mobileOpen = false">Матовые</NuxtLink>
            <NuxtLink to="/catalog/faktury/satinovye-natyazhnye-potolki" @click="mobileOpen = false">Сатиновые</NuxtLink>
            <NuxtLink to="/catalog/faktury/tkanevye-natyazhnye-potolki" @click="mobileOpen = false">Тканевые</NuxtLink>
            <NuxtLink to="/catalog/faktury/fakturnye-natyazhnye-potolki" @click="mobileOpen = false">Фактурные</NuxtLink>
            <NuxtLink to="/catalog/faktury/besshovnye-natyazhnye-potolki" @click="mobileOpen = false">Бесшовные</NuxtLink>
            <NuxtLink to="/catalog/faktury/gipoallergennye-natyazhnye-potolki" @click="mobileOpen = false">Гипоаллергенные</NuxtLink>
            <NuxtLink to="/catalog/faktury/negoryuchie-natyazhnye-potolki" @click="mobileOpen = false">Негорючие</NuxtLink>
          </div>
        </div>

        <div class="mm-group" :class="{ open: mmOpen === 'tehnologii' }">
          <div class="mm-group__head" @click="mmOpen = mmOpen === 'tehnologii' ? '' : 'tehnologii'">
            <span>Технологии</span>
            <Icon name="lucide:chevron-down" size="18" class="mm-group__arrow" />
          </div>
          <div class="mm-group__body">
            <NuxtLink to="/catalog/vidy/dvuhurovnevye-natyazhnye-potolki" @click="mobileOpen = false">Двухуровневые</NuxtLink>
            <NuxtLink to="/catalog/vidy/mnogourovenye-natyazhnye-potolki" @click="mobileOpen = false">Многоуровневые</NuxtLink>
            <NuxtLink to="/catalog/vidy/tenevye-natyazhnye-potolki" @click="mobileOpen = false">Теневые</NuxtLink>
            <NuxtLink to="/catalog/vidy/natyazhnye-potolki-s-fotopechatyu" @click="mobileOpen = false">С фотопечатью</NuxtLink>
            <NuxtLink to="/catalog/vidy/besshchelevye-natyazhnye-potolki" @click="mobileOpen = false">Бесщелевые</NuxtLink>
            <NuxtLink to="/catalog/vidy/besshovnye-natyazhnye-potolki" @click="mobileOpen = false">Бесшовные</NuxtLink>
            <NuxtLink to="/catalog/vidy/natyazhnye-potolki-3d" @click="mobileOpen = false">3D потолки</NuxtLink>
            <NuxtLink to="/catalog/vidy/krivolinejnye-natyazhnye-potolki" @click="mobileOpen = false">Криволинейные</NuxtLink>
          </div>
        </div>

        <div class="mm-group" :class="{ open: mmOpen === 'podsvetka' }">
          <div class="mm-group__head" @click="mmOpen = mmOpen === 'podsvetka' ? '' : 'podsvetka'">
            <span>Подсветка</span>
            <Icon name="lucide:chevron-down" size="18" class="mm-group__arrow" />
          </div>
          <div class="mm-group__body">
            <NuxtLink to="/catalog/vidy/natyazhnye-potolki-s-podsvetkoy" @click="mobileOpen = false">С подсветкой</NuxtLink>
            <NuxtLink to="/catalog/vidy/paryashchie-natyazhnye-potolki" @click="mobileOpen = false">Парящие</NuxtLink>
            <NuxtLink to="/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo" @click="mobileOpen = false">Звёздное небо</NuxtLink>
            <NuxtLink to="/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami" @click="mobileOpen = false">Световые линии</NuxtLink>
            <NuxtLink to="/catalog/vidy/konturnye-natyazhnye-potolki" @click="mobileOpen = false">Контурные</NuxtLink>
            <NuxtLink to="/catalog/osveshchenie" @click="mobileOpen = false">Системы освещения</NuxtLink>
          </div>
        </div>

        <div class="mm-group" :class="{ open: mmOpen === 'pomescheniya' }">
          <div class="mm-group__head" @click="mmOpen = mmOpen === 'pomescheniya' ? '' : 'pomescheniya'">
            <span>Помещения</span>
            <Icon name="lucide:chevron-down" size="18" class="mm-group__arrow" />
          </div>
          <div class="mm-group__body">
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-na-kuhne" @click="mobileOpen = false">На кухне</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-vannoy" @click="mobileOpen = false">В ванной</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-gostinoy" @click="mobileOpen = false">В гостиной</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-spalne" @click="mobileOpen = false">В спальне</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-detskoy" @click="mobileOpen = false">В детской</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-prihozhey" @click="mobileOpen = false">В прихожей</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-tualete" @click="mobileOpen = false">В туалете</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-kvartire" @click="mobileOpen = false">В квартире</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-chastnom-dome" @click="mobileOpen = false">В частном доме</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-ofise" @click="mobileOpen = false">В офисе</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-na-balkone" @click="mobileOpen = false">На балконе</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-na-dache" @click="mobileOpen = false">На даче</NuxtLink>
          </div>
        </div>

        <div class="mm-group" :class="{ open: mmOpen === 'cveta' }">
          <div class="mm-group__head" @click="mmOpen = mmOpen === 'cveta' ? '' : 'cveta'">
            <span>Цвета</span>
            <Icon name="lucide:chevron-down" size="18" class="mm-group__arrow" />
          </div>
          <div class="mm-group__body">
            <NuxtLink to="/catalog/tsveta/belye-natyazhnye-potolki" @click="mobileOpen = false">Белые</NuxtLink>
            <NuxtLink to="/catalog/tsveta/chernye-natyazhnye-potolki" @click="mobileOpen = false">Чёрные</NuxtLink>
            <NuxtLink to="/catalog/tsveta/serye-natyazhnye-potolki" @click="mobileOpen = false">Серые</NuxtLink>
            <NuxtLink to="/catalog/tsveta/bezhevye-natyazhnye-potolki" @click="mobileOpen = false">Бежевые</NuxtLink>
            <NuxtLink to="/catalog/tsveta/cvetnye-natyazhnye-potolki" @click="mobileOpen = false">Цветные</NuxtLink>
            <NuxtLink to="/catalog/tsveta/zolotye-natyazhnye-potolki" @click="mobileOpen = false">Золотые</NuxtLink>
            <NuxtLink to="/catalog/tsveta/golubye-natyazhnye-potolki" @click="mobileOpen = false">Голубые</NuxtLink>
            <NuxtLink to="/catalog/tsveta/korichnevye-natyazhnye-potolki" @click="mobileOpen = false">Коричневые</NuxtLink>
          </div>
        </div>

        <div class="mm-group" :class="{ open: mmOpen === 'uslugi' }">
          <div class="mm-group__head" @click="mmOpen = mmOpen === 'uslugi' ? '' : 'uslugi'">
            <span>Услуги</span>
            <Icon name="lucide:chevron-down" size="18" class="mm-group__arrow" />
          </div>
          <div class="mm-group__body">
            <NuxtLink to="/uslugi/montazh-natyazhnyh-potolkov" @click="mobileOpen = false">Монтаж потолков</NuxtLink>
            <NuxtLink to="/uslugi/vyezd-zamershchika" @click="mobileOpen = false">Бесплатный замер</NuxtLink>
            <NuxtLink to="/uslugi/srochnyj-montazh-24-chasa" @click="mobileOpen = false">Срочный монтаж 24ч</NuxtLink>
            <NuxtLink to="/uslugi/sliv-vody-s-natyazhnogo-potolka" @click="mobileOpen = false">Слив воды с потолка</NuxtLink>
            <NuxtLink to="/uslugi/demontazh-natyazhnogo-potolka" @click="mobileOpen = false">Демонтаж полотен</NuxtLink>
            <NuxtLink to="/uslugi/remont-natyazhnogo-potolka" @click="mobileOpen = false">Ремонт потолка</NuxtLink>
            <NuxtLink to="/uslugi/zamena-polotna" @click="mobileOpen = false">Замена полотна</NuxtLink>
            <NuxtLink to="/uslugi/peretyazhka-potolka" @click="mobileOpen = false">Перетяжка потолка</NuxtLink>
            <NuxtLink to="/uslugi/ustanovka-svetilnikov" @click="mobileOpen = false">Установка светильников</NuxtLink>
          </div>
        </div>

        <div class="mm-group" :class="{ open: mmOpen === 'info' }">
          <div class="mm-group__head" @click="mmOpen = mmOpen === 'info' ? '' : 'info'">
            <span>Информация</span>
            <Icon name="lucide:chevron-down" size="18" class="mm-group__arrow" />
          </div>
          <div class="mm-group__body">
            <NuxtLink to="/o-kompanii" @click="mobileOpen = false">О компании</NuxtLink>
            <NuxtLink to="/garantiya" @click="mobileOpen = false">Гарантия</NuxtLink>
            <NuxtLink to="/rekvizity" @click="mobileOpen = false">Реквизиты</NuxtLink>
            <NuxtLink to="/sertifikaty" @click="mobileOpen = false">Сертификаты и лицензии</NuxtLink>
            <NuxtLink to="/voprosy-otvety" @click="mobileOpen = false">Вопросы и ответы</NuxtLink>
            <NuxtLink to="/rassrochka-i-oplata" @click="mobileOpen = false">Способы оплаты</NuxtLink>
            <NuxtLink to="/akczii" @click="mobileOpen = false">Акции и скидки</NuxtLink>
          </div>
        </div>

        <NuxtLink to="/portfolio" class="mm-link" @click="mobileOpen = false">
          <Icon name="lucide:images" size="18" />
          Наши работы
        </NuxtLink>
        <NuxtLink to="/kalkulyator" class="mm-link" @click="mobileOpen = false">
          <Icon name="lucide:calculator" size="18" />
          Калькулятор
        </NuxtLink>
        <NuxtLink to="/kontakty" class="mm-link" @click="mobileOpen = false">
          <Icon name="lucide:map-pin" size="18" />
          Контакты
        </NuxtLink>

      </nav>

      <div class="mobile-menu__callback">
        <a :href="'tel:' + site.phoneRaw" class="mobile-menu__callback-phone">{{ site.phone }}</a>
        <button class="nav-btn" @click="mobileOpen = false; $emit('openCallback')">Заказать звонок</button>
        <div class="mobile-menu__socials">
          <a href="https://t.me/propotolok" target="_blank" class="mobile-menu__social mobile-menu__social--tg" aria-label="Telegram">
            <Icon name="simple-icons:telegram" size="22" />
          </a>
          <a href="https://maxim.ru" target="_blank" class="mobile-menu__social mobile-menu__social--max" aria-label="MAX">
            <Icon name="simple-icons:vk" size="22" />
          </a>
        </div>
      </div>

    </div>

  </header>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
defineEmits(['openCallback'])

const megaOpen = ref(false)
const mobileOpen = ref(false)
const dropdownOpen = ref(false)
const mmOpen = ref('')

const route = useRoute()
watch(() => route.path, () => {
  megaOpen.value = false
  mobileOpen.value = false
})

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { megaOpen.value = false; mobileOpen.value = false }
  }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})
</script>

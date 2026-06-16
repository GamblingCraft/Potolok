<template>
  <section class="section--footer">
    <div class="container">
      <div class="footer">

        <div class="footer__item footer__item--cont">
          <NuxtLink to="/" class="footer__logo">
            <img class="footer__logo-img" src="/img/logo.png" alt="ПроПотолок — натяжные потолки Иркутск">
          </NuxtLink>

          <div class="footer__h1">Контакты</div>

          <ul class="footer-info">
            <li>{{ site.city }}</li>
            <li>{{ site.schedule }}</li>
            <li>E-mail: {{ site.email }}</li>
            <li>{{ site.nameFull }}</li>
            <li>ИНН: {{ site.inn }}</li>
            <li>ОГРН: {{ site.ogrn }}</li>
            <li>Выполняем замеры по городу и области</li>
          </ul>

          <div class="footer__tel">
            <span>Получить консультацию, подобрать материал или оформить вызов мастера, Вы можете по телефону:</span>
            <a :href="'tel:' + site.phoneRaw">{{ site.phone }}</a>
          </div>

          <div class="footer__callme nav-btn" @click="$emit('openCallback')">Заказать звонок</div>

          <div class="footer__socials">
            <!-- Telegram -->
            <a v-if="site.telegram" :href="site.telegram" target="_blank" class="footer__soc" aria-label="Telegram">
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="38" height="38" rx="19" fill="url(#tg_grad)"/>
                <path d="M8.74 18.832C13.405 16.8 16.515 15.46 18.07 14.813C22.515 12.965 23.438 12.644 24.04 12.633C24.173 12.631 24.468 12.664 24.66 12.819C24.82 12.95 24.865 13.128 24.888 13.253C24.908 13.377 24.935 13.661 24.913 13.882C24.673 16.412 23.63 22.552 23.1 25.385C22.878 26.585 22.435 26.987 22.008 27.026C21.078 27.111 20.373 26.412 19.473 25.822C18.065 24.899 17.27 24.324 15.903 23.424C14.323 22.383 15.348 21.81 16.248 20.875C16.483 20.631 20.578 16.907 20.655 16.569C20.665 16.527 20.675 16.369 20.58 16.286C20.488 16.203 20.35 16.232 20.25 16.254C20.108 16.286 17.86 17.773 13.5 20.715C12.863 21.153 12.285 21.367 11.765 21.356C11.195 21.344 10.095 21.033 9.278 20.767C8.278 20.442 7.48 20.269 7.55 19.716C7.585 19.428 7.983 19.133 8.74 18.832Z" fill="white"/>
                <defs>
                  <linearGradient id="tg_grad" x1="19" y1="0" x2="19" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2AABEE"/>
                    <stop offset="1" stop-color="#229ED9"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>
            <!-- MAX -->
            <a v-if="site.whatsapp" :href="site.whatsapp" target="_blank" class="footer__soc" aria-label="MAX">
              <svg width="38" height="38" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="42" height="42" rx="21" fill="url(#max_grad)"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0498 30.6693C19.1091 30.6693 18.2071 30.3847 16.6393 29.2465C15.6477 30.527 12.5074 31.5278 12.3704 29.8156C12.3704 28.5303 12.0871 27.4443 11.766 26.2586C11.3835 24.7978 10.949 23.1711 10.949 20.814C10.949 15.1843 15.5485 10.949 20.998 10.949C26.452 10.949 30.7257 15.393 30.7257 20.866C30.744 26.2546 26.415 30.6406 21.0498 30.6693ZM21.1302 15.8151C18.4763 15.6775 16.4079 17.5224 15.9499 20.4156C15.572 22.8106 16.2426 25.7274 16.8141 25.8791C17.088 25.9456 17.7774 25.3859 18.2071 24.9543C18.9176 25.4473 19.7451 25.7434 20.606 25.8127C23.3559 25.9456 25.7055 23.8431 25.8901 21.0843C25.9976 18.3196 23.8804 15.978 21.1302 15.8199V15.8151Z" fill="white"/>
                <defs>
                  <linearGradient id="max_grad" x1="0" y1="21" x2="42" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#4757F9"/>
                    <stop offset="1" stop-color="#9261EA"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer__item">
          <div class="footer__nav-name">Информация</div>
          <NuxtLink to="/catalog">Каталог</NuxtLink>
          <NuxtLink to="/kalkulyator">Калькулятор</NuxtLink>
          <NuxtLink to="/portfolio">Наши работы</NuxtLink>
          <NuxtLink to="/voprosy-otvety">Вопросы и ответы</NuxtLink>
          <NuxtLink to="/rassrochka-i-oplata">Способы оплаты</NuxtLink>
          <NuxtLink to="/akczii">Акции и скидки</NuxtLink>
          <NuxtLink to="/o-kompanii">О компании</NuxtLink>
          <NuxtLink to="/garantiya">Гарантия</NuxtLink>
          <NuxtLink to="/kontakty">Контакты</NuxtLink>

          <div class="footer__nav-name" style="margin-top:24px;">Услуги</div>
          <NuxtLink to="/uslugi/montazh-natyazhnyh-potolkov">Монтаж потолков</NuxtLink>
          <NuxtLink to="/uslugi/vyezd-zamershchika">Бесплатный замер</NuxtLink>
          <NuxtLink to="/uslugi/srochnyj-montazh-24-chasa">Срочный монтаж 24ч</NuxtLink>
          <NuxtLink to="/uslugi/sliv-vody-s-natyazhnogo-potolka">Слив воды с потолка</NuxtLink>
          <NuxtLink to="/uslugi/demontazh-natyazhnogo-potolka">Демонтаж полотен</NuxtLink>
          <NuxtLink to="/uslugi/remont-natyazhnogo-potolka">Ремонт потолка</NuxtLink>
          <NuxtLink to="/uslugi/zamena-polotna">Замена полотна</NuxtLink>
          <NuxtLink to="/uslugi/peretyazhka-potolka">Перетяжка потолка</NuxtLink>
          <NuxtLink to="/uslugi/ustanovka-svetilnikov">Установка светильников</NuxtLink>
        </div>

        <div class="footer__item">
          <div class="footer__nav-name">Фактуры</div>
          <NuxtLink to="/catalog/faktury/glyancevye-natyazhnye-potolki">Глянцевые</NuxtLink>
          <NuxtLink to="/catalog/faktury/matovye-natyazhnye-potolki">Матовые</NuxtLink>
          <NuxtLink to="/catalog/faktury/satinovye-natyazhnye-potolki">Сатиновые</NuxtLink>
          <NuxtLink to="/catalog/faktury/tkanevye-natyazhnye-potolki">Тканевые</NuxtLink>
          <NuxtLink to="/catalog/faktury/fakturnye-natyazhnye-potolki">Фактурные</NuxtLink>
          <NuxtLink to="/catalog/faktury/besshovnye-natyazhnye-potolki">Бесшовные</NuxtLink>
          <NuxtLink to="/catalog/faktury/gipoallergennye-natyazhnye-potolki">Гипоаллергенные</NuxtLink>
          <NuxtLink to="/catalog/faktury/negoryuchie-natyazhnye-potolki">Негорючие</NuxtLink>

          <div class="footer__nav-name" style="margin-top:24px;">Цвета</div>
          <NuxtLink to="/catalog/tsveta/belye-natyazhnye-potolki">Белые</NuxtLink>
          <NuxtLink to="/catalog/tsveta/chernye-natyazhnye-potolki">Чёрные</NuxtLink>
          <NuxtLink to="/catalog/tsveta/serye-natyazhnye-potolki">Серые</NuxtLink>
          <NuxtLink to="/catalog/tsveta/bezhevye-natyazhnye-potolki">Бежевые</NuxtLink>
          <NuxtLink to="/catalog/tsveta/cvetnye-natyazhnye-potolki">Цветные</NuxtLink>
          <NuxtLink to="/catalog/tsveta/zolotye-natyazhnye-potolki">Золотые</NuxtLink>
          <NuxtLink to="/catalog/tsveta/golubye-natyazhnye-potolki">Голубые</NuxtLink>
          <NuxtLink to="/catalog/tsveta/korichnevye-natyazhnye-potolki">Коричневые</NuxtLink>
        </div>

        <div class="footer__item">
          <div class="footer__nav-name">Технологии</div>
          <NuxtLink to="/catalog/vidy/dvuhurovnevye-natyazhnye-potolki">Двухуровневые</NuxtLink>
          <NuxtLink to="/catalog/vidy/mnogourovenye-natyazhnye-potolki">Многоуровневые</NuxtLink>
          <NuxtLink to="/catalog/vidy/tenevye-natyazhnye-potolki">Теневые</NuxtLink>
          <NuxtLink to="/catalog/vidy/natyazhnye-potolki-s-fotopechatyu">С фотопечатью</NuxtLink>
          <NuxtLink to="/catalog/vidy/besshchelevye-natyazhnye-potolki">Бесщелевые</NuxtLink>
          <NuxtLink to="/catalog/vidy/besshovnye-natyazhnye-potolki">Бесшовные</NuxtLink>
          <NuxtLink to="/catalog/vidy/natyazhnye-potolki-3d">3D потолки</NuxtLink>
          <NuxtLink to="/catalog/vidy/krivolinejnye-natyazhnye-potolki">Криволинейные</NuxtLink>

          <div class="footer__nav-name" style="margin-top:24px;">Подсветка</div>
          <NuxtLink to="/catalog/vidy/natyazhnye-potolki-s-podsvetkoy">С подсветкой</NuxtLink>
          <NuxtLink to="/catalog/vidy/paryashchie-natyazhnye-potolki">Парящие</NuxtLink>
          <NuxtLink to="/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo">Звёздное небо</NuxtLink>
          <NuxtLink to="/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami">Световые линии</NuxtLink>
          <NuxtLink to="/catalog/vidy/konturnye-natyazhnye-potolki">Контурные</NuxtLink>
        </div>

        <div class="footer__item">
          <div class="footer__nav-name">Помещения</div>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-na-kuhne">На кухне</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-vannoy">В ванной</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-gostinoy">В гостиной</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-spalne">В спальне</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-detskoy">В детской</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-prihozhey">В прихожей</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-tualete">В туалете</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-kvartire">В квартире</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-chastnom-dome">В частном доме</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-v-ofise">В офисе</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-na-balkone">На балконе</NuxtLink>
          <NuxtLink to="/catalog/po-pomescheniyu/natyazhnye-potolki-na-dache">На даче</NuxtLink>

          <div class="footer__nav-name" style="margin-top:24px;">Районы Иркутска</div>
          <NuxtLink to="/irkutsk/oktyabrskiy-okrug">Октябрьский округ</NuxtLink>
          <NuxtLink to="/irkutsk/pravoberezhnyy-okrug">Правобережный округ</NuxtLink>
          <NuxtLink to="/irkutsk/sverdlovskiy-okrug">Свердловский округ</NuxtLink>
          <NuxtLink to="/irkutsk/leninskiy-okrug">Ленинский округ</NuxtLink>
        </div>

      </div>

      <div class="footer__bottom">
        <div class="footer__copy">
          © {{ new Date().getFullYear() }} ПроПотолок — натяжные потолки в Иркутске. Все права защищены.
        </div>
        <div class="footer__policy">
          <NuxtLink to="/politika-konfidentsialnosti">Политика конфиденциальности</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits(['openCallback'])
const site = useSite()
</script>

<style scoped>
.footer__socials {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}
.footer__soc {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-decoration: none;
  flex-shrink: 0;
  opacity: 0.85;
  transition: opacity 0.2s, transform 0.2s;
}
.footer__soc:hover {
  opacity: 1;
  transform: translateY(-2px);
}
.footer__soc svg { display: block; border-radius: 50%; }
</style>

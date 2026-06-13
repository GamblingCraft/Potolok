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

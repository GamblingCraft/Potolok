<template>
  <div>
    <AppHeader @open-callback="callbackOpen = true" />

    <div class="error-page">
      <div class="container">

        <div class="error-page__hero">
          <div class="error-page__code">404</div>
          <h1 class="error-page__title">Страница не найдена</h1>
          <p class="error-page__desc">
            К сожалению, запрошенная страница не существует или была перемещена.<br>
            Возможно, вы перешли по устаревшей ссылке.
          </p>
          <div class="error-page__btns">
            <NuxtLink to="/" class="nav-btn">
              <Icon name="lucide:home" size="16" />
              На главную
            </NuxtLink>
            <button class="btn-outline" @click="callbackOpen = true">
              <Icon name="lucide:phone" size="16" />
              Связаться с нами
            </button>
          </div>
        </div>

        <div class="error-page__card">
          <div class="error-page__card-title">Возможно, вы искали:</div>
          <div class="error-page__grid">
            <NuxtLink to="/catalog" class="error-page__item">
              <span class="error-page__item-icon"><Icon name="lucide:layout-grid" size="22" /></span>
              <div>
                <div class="error-page__item-name">Каталог потолков</div>
                <div class="error-page__item-sub">Все виды и фактуры</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/kalkulyator" class="error-page__item">
              <span class="error-page__item-icon"><Icon name="lucide:calculator" size="22" /></span>
              <div>
                <div class="error-page__item-name">Калькулятор цены</div>
                <div class="error-page__item-sub">Рассчитайте стоимость</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/portfolio" class="error-page__item">
              <span class="error-page__item-icon"><Icon name="lucide:images" size="22" /></span>
              <div>
                <div class="error-page__item-name">Наши работы</div>
                <div class="error-page__item-sub">Фотогалерея проектов</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/uslugi" class="error-page__item">
              <span class="error-page__item-icon"><Icon name="lucide:wrench" size="22" /></span>
              <div>
                <div class="error-page__item-name">Услуги</div>
                <div class="error-page__item-sub">Монтаж, замер, ремонт</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/akczii" class="error-page__item">
              <span class="error-page__item-icon"><Icon name="lucide:tag" size="22" /></span>
              <div>
                <div class="error-page__item-name">Акции и скидки</div>
                <div class="error-page__item-sub">Актуальные предложения</div>
              </div>
            </NuxtLink>
            <NuxtLink to="/kontakty" class="error-page__item">
              <span class="error-page__item-icon"><Icon name="lucide:map-pin" size="22" /></span>
              <div>
                <div class="error-page__item-name">Контакты</div>
                <div class="error-page__item-sub">Адрес и телефон</div>
              </div>
            </NuxtLink>
          </div>

          <div class="error-page__contacts">
            <span class="error-page__contacts-label">Нужна помощь? Мы на связи:</span>
            <a href="tel:+73952000000">
              <Icon name="lucide:phone" size="15" />
              +7 (3952) 00-00-00
            </a>
            <a href="mailto:info@propotolok.ru">
              <Icon name="lucide:mail" size="15" />
              info@propotolok.ru
            </a>
          </div>
        </div>

      </div>
    </div>

    <AppFooter @open-callback="callbackOpen = true" />
  </div>
</template>

<script setup lang="ts">
const callbackOpen = ref(false)
</script>

<style scoped>
.error-page {
  padding: 80px 0 60px;
  background: #fff;
}
.error-page__hero {
  text-align: center;
  margin-bottom: 48px;
}
.error-page__code {
  font-size: 220px;
  font-weight: 800;
  line-height: 1;
  color: var(--accent);
  font-family: var(--font);
  margin-bottom: 4px;
}
.error-page__title {
  font-size: 42px;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 18px;
}
.error-page__desc {
  font-size: 18px;
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: 32px;
}
.error-page__btns {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.error-page__btns .nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 2px solid var(--dark);
  padding: 10px 25px;
  border-radius: 50px;
  font-size: 15px;
  color: var(--dark);
  background: transparent;
  font-family: var(--font);
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
  transition: background .15s, color .15s;
}
.btn-outline:hover {
  background: var(--dark);
  color: #fff;
}

.error-page__card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 36px 40px;
  max-width: 860px;
  margin: 0 auto;
}
.error-page__card-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--dark);
  text-align: center;
  margin-bottom: 24px;
}
.error-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}
.error-page__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--dark);
  transition: border-color .15s, box-shadow .15s;
}
.error-page__item:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 12px rgba(245,200,0,.2);
}
.error-page__item-icon {
  color: var(--accent);
  flex-shrink: 0;
  display: flex;
}
.error-page__item-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 3px;
}
.error-page__item-sub {
  font-size: 13px;
  color: var(--gray);
}

.error-page__contacts {
  border-top: 1px solid var(--border);
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.error-page__contacts-label {
  font-size: 14px;
  color: var(--gray);
  width: 100%;
  text-align: center;
}
.error-page__contacts a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--dark);
  transition: color .15s;
}
.error-page__contacts a:hover {
  color: var(--accent-hover);
}

@media (max-width: 640px) {
  .error-page__code { font-size: 130px; }
  .error-page__title { font-size: 30px; }
  .error-page__grid { grid-template-columns: 1fr 1fr; }
  .error-page__card { padding: 24px 20px; }
}
@media (max-width: 420px) {
  .error-page__grid { grid-template-columns: 1fr; }
}
</style>

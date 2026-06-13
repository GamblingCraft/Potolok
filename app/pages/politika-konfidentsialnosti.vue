<template>
  <div>

    <section class="ov-hero">
      <div class="container ov-hero__inner">
        <div>
          <div class="ov-pretitle">Документ</div>
          <h1 class="ov-hero__title">Политика конфиденциальности</h1>
          <p class="ov-hero__desc">Мы бережём ваши персональные данные. Настоящая политика определяет порядок их обработки и защиты.</p>
        </div>
        <div class="ov-hero__note">
          <Icon name="lucide:lock" size="28" class="ov-hero__note-icon"/>
          <div>
            <div class="ov-hero__note-title">152-ФЗ</div>
            <div class="ov-hero__note-text">Соответствует Федеральному закону «О персональных данных» № 152-ФЗ от 27.07.2006 г.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="ov-section ov-section--white">
      <div class="container">
        <div class="pk-content">
          <h2>1. Общие положения</h2>
          <p>Настоящая Политика в отношении обработки персональных данных (далее — Политика) составлена в соответствии с требованиями Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных {{ site.nameFull }} (далее — Оператор).</p>
          <p>Настоящая Политика действует в отношении сайта <strong>{{ site.domain }}</strong>, а также всех его подстраниц, форм обратной связи и иных способов сбора персональных данных.</p>

          <h2>2. Персональные данные, которые мы собираем</h2>
          <ul>
            <li>Фамилия, имя, отчество (если указано)</li>
            <li>Номер телефона</li>
            <li>Email</li>
            <li>IP-адрес, данные о браузере и устройстве</li>
            <li>Информация о посещениях (URL, время захода, переходы)</li>
            <li>Cookie-файлы</li>
          </ul>

          <h2>3. Цели обработки данных</h2>
          <ul>
            <li>Обработка заявок, обратной связи и консультирования</li>
            <li>Исполнение обязательств по оказанию услуг</li>
            <li>Повышение качества обслуживания</li>
            <li>Проведение маркетингового анализа</li>
            <li>Отправка рекламных предложений при согласии пользователя</li>
          </ul>

          <h2>4. Обработка cookies и аналитических данных</h2>
          <p>Мы используем cookies для анализа пользовательского поведения и улучшения работы сайта. Применяем следующие сервисы:</p>
          <ul>
            <li>Яндекс.Метрика (ООО «Яндекс»)</li>
            <li>Google Analytics (Google LLC)</li>
          </ul>
          <p>Эти сервисы автоматически собирают обезличенные технические данные. Пользователь может отключить cookies в настройках браузера.</p>

          <h2>5. Основания обработки</h2>
          <ul>
            <li>Согласие пользователя, выраженное через заполнение форм на сайте</li>
            <li>Выполнение обязательств по договору или предварительной заявке</li>
            <li>Законные интересы Оператора (маркетинг и развитие услуг)</li>
          </ul>

          <h2>6. Защита и хранение данных</h2>
          <p>Данные обрабатываются с соблюдением технических, организационных и правовых мер защиты. Срок хранения данных — до отзыва согласия либо до достижения целей обработки.</p>
          <p>Передача третьим лицам возможна только по закону (по запросу госорганов) либо в рамках работы с подрядчиками (CRM, хостинг), с которыми заключены договоры о конфиденциальности.</p>

          <h2>7. Права пользователя</h2>
          <p>Пользователь имеет право:</p>
          <ul>
            <li>Запросить перечень хранимых данных</li>
            <li>Потребовать уточнение или удаление данных</li>
            <li>Отозвать согласие на обработку, написав на email Оператора</li>
            <li>Подать жалобу в Роскомнадзор</li>
          </ul>

          <h2>8. Контактные данные</h2>
          <p>По всем вопросам, связанным с обработкой персональных данных:</p>
          <ul>
            <li>Телефон: <a :href="'tel:' + site.phoneRaw">{{ site.phone }}</a></li>
            <li>Email: <a :href="site.emailHref">{{ site.email }}</a></li>
          </ul>

          <h2>9. Изменения политики</h2>
          <p>Мы оставляем за собой право вносить изменения. Новая редакция вступает в силу с момента её размещения на сайте. Продолжение использования сайта означает согласие с обновлённой Политикой.</p>

          <div class="pk-updated">Дата последнего обновления: 1 января {{ new Date().getFullYear() }} г.</div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const site = useSite()
usePageSeoMeta('politika-konfidentsialnosti')
</script>

<style scoped>
.ov-pretitle { display: inline-block; background: var(--accent); color: #141414; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.ov-section { padding: 64px 0; }
.ov-section--white { background: #fff; }

.ov-hero { background: #141414; padding: 48px 0; }
.ov-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ov-hero__title { font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 10px; }
.ov-hero__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; line-height: 1.6; }
.ov-hero__note { display: flex; align-items: flex-start; gap: 16px; background: rgba(245,200,0,.1); border: 1px solid rgba(245,200,0,.25); border-radius: 16px; padding: 20px 24px; max-width: 360px; }
.ov-hero__note-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.ov-hero__note-title { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.ov-hero__note-text  { font-size: 13px; color: rgba(255,255,255,.5); line-height: 1.55; }

.pk-content { max-width: 800px; margin: 0 auto; }
.pk-content h2 { font-size: 20px; font-weight: 800; color: var(--dark); margin: 36px 0 12px; }
.pk-content h2:first-child { margin-top: 0; }
.pk-content p { font-size: 15px; color: #555; line-height: 1.8; margin-bottom: 12px; }
.pk-content ul { list-style: disc; padding-left: 24px; margin-bottom: 12px; }
.pk-content li { font-size: 15px; color: #555; line-height: 1.8; }
.pk-content a { color: var(--dark); font-weight: 600; }
.pk-updated { margin-top: 40px; font-size: 13px; color: var(--gray); border-top: 1px solid #eee; padding-top: 16px; }

@media (max-width: 640px) { .ov-hero__title { font-size: 28px; } }
</style>

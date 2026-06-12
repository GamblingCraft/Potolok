<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const content = ref(`# ПроПотолок — Натяжные потолки в Иркутске

## Компания
ПроПотолок — профессиональный монтаж натяжных потолков с 2009 года.
Работаем по Иркутску и Иркутской области.

## Услуги
- Натяжные потолки всех видов (матовые, глянцевые, сатиновые, тканевые)
- Монтаж парящих потолков
- Потолки с подсветкой
- Двухуровневые конструкции
- Фотопечать на потолке

## Цены
Базовая цена монтажа от 159 ₽/м²
Бесплатный замер и выезд специалиста.

## Контакты
Сайт: https://propot.ru
Телефон: +7 (3952) 00-00-00`)

const saved = ref(false)
function save() { saved.value = true; setTimeout(() => saved.value = false, 2500) }
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">llms.txt</h1>
        <p class="adm-page-sub">Описание сайта для языковых моделей (AI)</p>
      </div>
      <button class="adm-btn adm-btn--primary" @click="save">
        <Icon :name="saved ? 'lucide:check' : 'lucide:save'" style="width:15px;height:15px" />
        {{ saved ? 'Сохранено!' : 'Сохранить' }}
      </button>
    </div>
    <div class="adm-card adm-card--pad">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding:12px;background:#eff6ff;border-radius:10px;border:1px solid #bfdbfe">
        <Icon name="lucide:brain" style="width:18px;height:18px;color:#3b82f6;flex-shrink:0" />
        <p style="font-size:13px;color:#1e40af;margin:0">Файл <code>llms.txt</code> помогает AI-ассистентам (ChatGPT, Perplexity, Claude) правильно понимать и описывать ваш сайт.</p>
      </div>
      <label class="adm-label">Содержимое llms.txt</label>
      <textarea v-model="content" class="adm-textarea adm-textarea--code" rows="18" spellcheck="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login, isLoading, error } = useAdminAuth()
const form = reactive({ login: '', password: '' })
const showPw = ref(false)

async function handleSubmit() {
  await login(form.login, form.password)
}
</script>

<template>
  <div class="adm-login">
    <div class="adm-login__box">

      <!-- Logo -->
      <div class="adm-login__logo">
        <div class="adm-login__icon">
          <Icon name="lucide:zap" style="width:22px;height:22px;color:#13131a" />
        </div>
        <div class="adm-login__brand">ПроПотолок</div>
        <div class="adm-login__sub">Панель управления</div>
      </div>

      <!-- Form card -->
      <div class="adm-login__card">
        <h1 class="adm-login__title">Вход в систему</h1>

        <form @submit.prevent="handleSubmit" class="adm-login__form">
          <div>
            <label class="adm-label" style="margin-bottom:6px;display:block">Логин</label>
            <input
              v-model="form.login"
              type="text"
              autocomplete="username"
              required
              class="adm-input"
              placeholder="*******"
            />
          </div>

          <div>
            <label class="adm-label" style="margin-bottom:6px;display:block">Пароль</label>
            <div class="adm-login__pw">
              <input
                v-model="form.password"
                :type="showPw ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="adm-input"
                placeholder="••••••••"
                style="padding-right:40px"
              />
              <button type="button" class="adm-login__eye" @click="showPw = !showPw">
                <Icon :name="showPw ? 'lucide:eye-off' : 'lucide:eye'" style="width:17px;height:17px" />
              </button>
            </div>
          </div>

          <div v-if="error" class="adm-login__err">
            <Icon name="lucide:alert-circle" style="width:15px;height:15px;flex-shrink:0" />
            {{ error }}
          </div>

          <button type="submit" class="adm-btn adm-btn--primary" style="width:100%;justify-content:center;padding:11px" :disabled="isLoading">
            <Icon v-if="isLoading" name="lucide:loader-2" style="width:16px;height:16px;animation:adm-spin 1s linear infinite" />
            {{ isLoading ? 'Входим...' : 'Войти' }}
          </button>
        </form>
      </div>

      <p class="adm-login__copy">© {{ new Date().getFullYear() }} ПроПотолок — панель администратора</p>
    </div>
  </div>
</template>

<style>
.adm-login {
  min-height: 100vh;
  background: #0e0e16;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Inter', 'Gilroy', 'Roboto', sans-serif;
}
.adm-login *, .adm-login *::before, .adm-login *::after { box-sizing: border-box; }

.adm-login__box {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.adm-login__logo { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.adm-login__icon {
  width: 56px; height: 56px;
  background: #f5c800;
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
}
.adm-login__brand { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -.02em; }
.adm-login__sub   { font-size: 13px; color: rgba(255,255,255,.35); }

.adm-login__card {
  width: 100%;
  background: #fff;
  border-radius: 18px;
  padding: 28px 28px;
  box-shadow: 0 24px 60px rgba(0,0,0,.4);
}
.adm-login__title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
}
.adm-login__form { display: flex; flex-direction: column; gap: 14px; }

.adm-login__pw { position: relative; }
.adm-login__eye {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: #9ca3af; transition: color .15s; display: flex;
}
.adm-login__eye:hover { color: #374151; }

.adm-login__err {
  display: flex; align-items: center; gap: 8px;
  background: #fef2f2; color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 9px; padding: 9px 12px;
  font-size: 13.5px;
}

.adm-login__copy { font-size: 12px; color: rgba(255,255,255,.2); text-align: center; }

/* shared input/label/btn reuse */
.adm-login .adm-input {
  width: 100%; padding: 10px 13px;
  border: 1.5px solid #e8eaed; border-radius: 9px;
  font-size: 14.5px; font-family: inherit; color: #111827;
  background: #fff; outline: none; transition: border-color .15s;
}
.adm-login .adm-input:focus { border-color: #f5c800; }
.adm-login .adm-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; }
.adm-login .adm-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px; border-radius: 9px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: background .15s; }
.adm-login .adm-btn--primary { background: #f5c800; color: #13131a; }
.adm-login .adm-btn--primary:hover { background: #e0b400; }
.adm-login .adm-btn:disabled { opacity: .7; cursor: default; }
@keyframes adm-spin { to { transform: rotate(360deg); } }
</style>

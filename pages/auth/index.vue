<template>
    <div class="min-h-screen bg-base-200 flex items-center justify-center">
        <div class="bg-base-100 shadow-md rounded-lg p-8 w-full max-w-md">
            <h1 class="text-3xl font-bold text-center mb-6">Hesap</h1>
            <div class="tabs tabs-boxed mb-6 flex justify-center">
                <a
                    class="tab"
                    :class="{ 'tab-active': activeTab === 'login' }"
                    @click="activeTab = 'login'"
                >
                    Giriş Yap
                </a>
                <a
                    v-if="allowRegister"
                    class="tab"
                    :class="{ 'tab-active': activeTab === 'register' }"
                    @click="activeTab = 'register'"
                >
                    Kayıt Ol
                </a>
            </div>
            <div v-if="activeTab === 'login'">
                <form @submit.prevent="handleLogin" class="flex flex-col items-center">
                    <div class="form-control mb-4 flex flex-col w-full">
                        <label class="label">
                            <span class="label-text">E-posta</span>
                        </label>
                        <input
                            v-model="loginEmail"
                            type="email"
                            class="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div class="form-control mb-4 flex flex-col w-full">
                        <label class="label">
                            <span class="label-text">Şifre</span>
                        </label>
                        <input
                            v-model="loginPassword"
                            type="password"
                            class="input input-bordered w-full"
                            required
                            minlength="4"
                        />
                    </div>
                    <button
                        class="btn btn-accent btn-outline w-full"
                        type="submit"
                        :disabled="!isLoginFormValid || isLoading"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
            <div v-else-if="allowRegister">
                <form @submit.prevent="handleRegister" class="flex flex-col items-center">
                    <div class="form-control mb-4 flex flex-col w-full">
                        <label class="label">
                            <span class="label-text">Ad Soyad</span>
                        </label>
                        <input
                            v-model="registerName"
                            type="text"
                            class="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div class="form-control mb-4 flex flex-col w-full">
                        <label class="label">
                            <span class="label-text">E-posta</span>
                        </label>
                        <input
                            v-model="registerEmail"
                            type="email"
                            class="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div class="form-control mb-4 flex flex-col w-full">
                        <label class="label">
                            <span class="label-text">Şifre</span>
                        </label>
                        <input
                            v-model="registerPassword"
                            type="password"
                            class="input input-bordered w-full"
                            required
                            minlength="4"
                        />
                    </div>
                    <button
                        class="btn btn-accent btn-outline w-full"
                        type="submit"
                        :disabled="!isRegisterFormValid || isLoading"
                    >
                        Kayıt Ol
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const activeTab = ref('login'); // Varsayılan olarak giriş yap sekmesi aktif
const allowRegister = ref(true); // Kayıt olma seçeneği kontrolü
const loginEmail = ref('');
const loginPassword = ref('');
const registerName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const isLoading = ref(false);
const router = useRouter();

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
};

const isLoginFormValid = computed(() => {
  return loginEmail.value.trim() !== '' && isValidEmail(loginEmail) && loginPassword.value.length >= 4;
});

const isRegisterFormValid = computed(() => {
  return (
    registerName.value.trim() !== '' &&
    registerEmail.value.trim() !== '' &&
    isValidEmail(registerEmail) &&
    registerPassword.value.length >= 4
  );
});

const handleLogin = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.statusCode !== 200) {
      throw new Error(data.message || 'Giriş başarısız!');
    }

    alert(data.message);
    localStorage.setItem('user', JSON.stringify(data.user)); // Kullanıcı oturumunu sakla
    router.push('/'); // Ana sayfaya yönlendir
  } catch (error) {
    console.error('Giriş başarısız:', error);
    alert(error.message || 'Giriş başarısız!');
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.statusCode !== 200) {
      throw new Error(data.message || 'Kayıt başarısız!');
    }

    console.log('Kayıt başarılı:', data);
    alert('Kayıt başarılı!');
    router.push('/auth'); // Giriş yapma sayfasına yönlendir
  } catch (error) {
    console.error('Kayıt başarısız:', error);
    alert(error.message || 'Kayıt başarısız!');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <nav class="bg-base-100 shadow-md">
    <div class="container mx-auto flex justify-between items-center py-4">
      <a href="/" class="text-2xl font-bold">Mühendis Blog</a>
      <div class="flex space-x-4">
        <a href="/blog" class="btn btn-ghost">Blog</a>
        <a href="/tools" class="btn btn-ghost">Araçlar</a>
        <div v-if="isLoggedIn" class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-accent m-1">Hesap</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/profile">Profilim</a></li>
            <li><a href="/settings">Ayarlar</a></li>
            <li v-if="isRoot"><a href="/admin/site-settings">Site Ayarları</a></li>
            <li><a @click="logout">Çıkış Yap</a></li>
          </ul>
        </div>
        <a v-else href="/auth" class="btn btn-accent">Hesap</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isLoggedIn = ref(false); // Kullanıcının giriş yapıp yapmadığını kontrol eder
const isRoot = ref(false); // Kullanıcının root olup olmadığını kontrol eder
const router = useRouter();

const logout = () => {
  isLoggedIn.value = false;
  isRoot.value = false;
  if (import.meta.client) {
    localStorage.removeItem('user'); // Kullanıcı oturumunu temizle
  }
  router.push('/'); // Ana sayfaya yönlendir
};

// Sayfa yüklendiğinde oturum kontrolü
onMounted(() => {
  if (import.meta.client) {
    const user = localStorage.getItem('user');

    if (user && user !== 'undefined') {
      const parsedUser = JSON.parse(user); // JSON.parse işlemi yalnızca geçerli bir değer olduğunda yapılır
      isLoggedIn.value = true;
      isRoot.value = parsedUser.isroot || false; // Kullanıcının root olup olmadığını kontrol et
    }
  }
});
</script>

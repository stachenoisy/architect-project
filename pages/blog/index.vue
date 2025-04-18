<template>
    <div class="min-h-screen bg-dark-bg">
        <Navbar />
        <div class="container mx-auto py-10">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-center text-white mb-6">Bloglar</h1>
                <a
                    v-if="isLoggedIn"
                    href="/blog/create"
                    class="btn btn-primary"
                >
                    Blog Oluştur
                </a>
            </div>
            <div class="flex justify-between items-center mb-4">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Bloglarda ara..."
                    class="input input-bordered w-full max-w-xs"
                />
                <select v-model="sortOrder" class="select select-bordered">
                    <option value="desc">Yeniden Eskiye</option>
                    <option value="asc">Eskiden Yeniye</option>
                </select>
            </div>
            <transition-group name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="blog in filteredBlogs"
                    :key="blog.id"
                    class="card backdrop-blur-xs bg-opacity-10 border border-white border-opacity-20 shadow-md transform transition duration-300 hover:scale-95 cursor-pointer"
                    @click="viewBlog(blog.id)"
                >
                    <figure v-if="blog.banner">
                        <img :src="blog.banner" alt="Blog Banner" class="w-full h-48 object-cover" />
                    </figure>
                    <div class="card-body text-white">
                        <h2 class="card-title">{{ blog.title }}</h2>
                        <p>{{ blog.summary }}</p>
                        <p class="text-sm text-gray-400">
                            {{ blog.date }} - {{ blog.author }}
                        </p>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.client.vue';

const blogs = ref([]);
const search = ref('');
const sortOrder = ref('desc');
const isLoggedIn = ref(false);

onMounted(async () => {
    if (import.meta.client) {
        const user = localStorage.getItem('user');
        if (user && user !== 'undefined') {
            isLoggedIn.value = true;
        }
    }

    // Blogları backend'den al
    try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        if (response.ok) {
            blogs.value = data.blogs;
        } else {
            console.error('Bloglar alınamadı:', data.message);
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
    }
});

const filteredBlogs = computed(() => {
    let result = blogs.value.filter((blog) =>
        blog.title.toLowerCase().includes(search.value.toLowerCase())
    );
    result.sort((a, b) =>
        sortOrder.value === 'desc'
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date)
    );
    return result;
});

const viewBlog = (id) => {
    // Blog detay sayfasına yönlendirme
    window.location.href = `/blog/${id}`;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>

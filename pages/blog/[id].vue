<template>
    <div class="min-h-screen bg-base-200">
        <Navbar />
        <div class="container mx-auto py-10">
            <div v-if="blog" class="bg-base-100 shadow-md rounded-lg p-6">
                <figure v-if="blog.banner">
                    <img :src="blog.banner" alt="Blog Banner" class="w-full h-64 object-cover rounded-lg mb-6" />
                </figure>
                <h1 class="text-4xl font-bold mb-4">{{ blog.title }}</h1>
                <p class="text-sm text-gray-500 mb-4">
                    {{ blog.date }} - {{ blog.author }}
                </p>
                <div class="prose max-w-none">
                    <p>{{ blog.content }}</p>
                </div>
            </div>
            <div v-else class="text-center py-20">
                <p class="text-xl text-gray-500">Blog yükleniyor...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '~/components/Navbar.client.vue';

const route = useRoute();
const blog = ref(null);

const fetchBlog = async (id) => {
    try {
        const response = await fetch(`/api/single-blog/${id}`);
        if (!response.ok) {
            throw new Error(data.message || 'Blog bulunamadı');
        }

        const data = await response.json();
        if (!data || !data.blog) {
            throw new Error('Blog verisi bulunamadı');
        }

        blog.value = data.blog; // API'den dönen blog verisi
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        blog.value = null;
    }
};

onMounted(() => {
const { id } = route.params;
fetchBlog(id);
});
</script>

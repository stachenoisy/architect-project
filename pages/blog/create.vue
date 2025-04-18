<template>
    <div class="min-h-screen bg-dark-bg">
        <Navbar />
        <div class="container mx-auto py-10">
            <h1 class="text-3xl font-bold text-center text-white mb-6">Blog Oluştur</h1>
            <form @submit.prevent="handleCreateBlog" class="bg-base-100 shadow-md rounded-lg p-6">
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">Başlık</span>
                    </label>
                    <input
                        v-model="title"
                        type="text"
                        class="input input-bordered"
                        placeholder="Blog başlığı"
                        required
                    />
                </div>
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">Özet</span>
                    </label>
                    <textarea
                        v-model="summary"
                        class="textarea textarea-bordered"
                        placeholder="Blog özeti"
                        required
                    ></textarea>
                </div>
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">İçerik</span>
                    </label>
                    <textarea
                        v-model="content"
                        class="textarea textarea-bordered"
                        placeholder="Blog içeriği"
                        rows="6"
                        required
                    ></textarea>
                </div>
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">Banner Resmi</span>
                    </label>
                    <input
                        type="file"
                        class="file-input file-input-bordered"
                        @change="handleFileUpload"
                    />
                </div>
                <button class="btn btn-primary w-full" type="submit">Oluştur</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.client.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('');
const summary = ref('');
const content = ref('');
const banner = ref(null);
const router = useRouter();

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        banner.value = file;
    }
};

const handleCreateBlog = async () => {
    try {
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('summary', summary.value);
        formData.append('content', content.value);
        if (banner.value) {
            formData.append('banner', banner.value);
        }

        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Blog oluşturulamadı!');
        }

        alert('Blog başarıyla oluşturuldu!');
        router.push('/blog'); // Bloglar sayfasına yönlendir
    } catch (error) {
        console.error(error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
};
</script>

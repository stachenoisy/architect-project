<template>
    <Navbar />
    <div class="min-h-screen bg-cover bg-center" :style="{ backgroundImage: `url(${bgimage})` }">
        <div class="bg-black bg-opacity-60 min-h-screen text-white">
            <div class="container mx-auto py-16 text-center">
                <h1 class="text-6xl font-bold mb-4">İnşaat Mühendisleri için Geleceğin Platformu</h1>
                <p class="text-xl text-gray-300 max-w-2xl mx-auto">
                    İnşaat mühendisliği dünyasına dair bilgi paylaşımı ve yenilikçi araçlar sunuyoruz.
                </p>
            </div>
        </div>
        <div class="bg-black bg-opacity-60 pb-5">
            <div class="container mx-auto">
                <h2 class="text-4xl font-bold text-center mb-8">İnşaat Mühendisliği Hakkında</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="card bg-base-100 shadow-md">
                        <div class="card-body">
                            <h3 class="card-title">Tasarım ve Planlama</h3>
                            <p>
                                İnşaat mühendisliği projelerinde tasarım ve planlama süreçlerinin önemi büyüktür.
                            </p>
                        </div>
                    </div>
                    <div class="card bg-base-100 shadow-md">
                        <div class="card-body">
                            <h3 class="card-title">Yapı Malzemeleri</h3>
                            <p>
                                Kaliteli yapı malzemeleri, projelerin dayanıklılığı ve güvenliği için kritik öneme sahiptir.
                            </p>
                        </div>
                    </div>
                    <div class="card bg-base-100 shadow-md">
                        <div class="card-body">
                            <h3 class="card-title">Teknolojik Gelişmeler</h3>
                            <p>
                                İnşaat mühendisliği, teknolojik yeniliklerle sürekli olarak gelişmektedir.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="divider"></div>
    <div class="bg-dark-bg py-16">
        <div class="container mx-auto">
            <h2 class="text-4xl font-bold text-center mb-8">Site Sahipleri</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="card bg-base-100 shadow-md" v-for="(owner, index) in owners" :key="index">
                    <div class="card-body flex items-center">
                        <img :src="owner.image" alt="Owner 1" class="w-24 h-24 rounded-full mr-4" />
                        <div>
                            <h3 class="card-title">{{ owner.name }}</h3>
                            <p>{{ owner.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.client.vue';

const bgimage = ref('/images/construction-bg.jpg');
const owners = ref([
    { name: 'Ahmet Yılmaz', title: 'İnşaat Mühendisi', image: '/images/p-male.jpg' },
    { name: 'Elif Kaya', title: 'Yapı Tasarım Uzmanı', image: '/images/p-female.jpg' },
]);
</script>

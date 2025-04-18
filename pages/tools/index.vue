<template>
    <div class="min-h-screen bg-base-200">
        <Navbar />
        <div class="container mx-auto py-10">
            <h1 class="text-3xl font-bold text-center mb-6">İşlevsel Araçlar</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="tool in tools"
                    :key="tool.id"
                    class="card bg-base-100 shadow-md transform transition duration-300 hover:scale-95 cursor-pointer"
                    @click="navigateToTool(tool.route)"
                >
                    <div class="card-body">
                        <h2 class="card-title">{{ tool.name }}</h2>
                        <p>{{ tool.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.client.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tools = [
    {
        id: 1,
        name: 'M3 Hesaplama',
        description: 'Hacim hesaplama aracı.',
        route: '/tools/details/m3-calculator',
    },
    {
        id: 2,
        name: 'M2 Hesaplama',
        description: 'Alan hesaplama aracı.',
        route: '/tools/details/m2-calculator',
    },
    {
        id: 3,
        name: 'Brüt Ağırlık Hesaplama',
        description: 'Ağırlık hesaplama aracı.',
        route: '/tools/details/weight-calculator',
    },
    {
        id: 4,
        name: 'Beton Miktarı Hesaplama',
        description: 'Beton miktarını hesaplamak için kullanılır.',
        route: '/tools/details/concrete-calculator',
    },
    {
        id: 5,
        name: 'Demir Ağırlık Hesaplama',
        description: 'Demir ağırlığını hesaplamak için kullanılır.',
        route: '/tools/details/iron-weight-calculator',
    },
];

const navigateToTool = (route) => {
    router.push(route);
};
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <Navbar />
        <div class="container mx-auto py-10">
            <h1 class="text-3xl font-bold text-center mb-6">Demir Ağırlık Hesaplama</h1>
            <div class="bg-base-100 shadow-md rounded-lg p-6">
                <form @submit.prevent="calculateIronWeight">
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Çap (mm)</span>
                        </label>
                        <input v-model.number="diameter" type="number" class="input input-bordered" />
                    </div>
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Uzunluk (m)</span>
                        </label>
                        <input v-model.number="length" type="number" class="input input-bordered" />
                    </div>
                    <button class="btn btn-primary w-full" type="submit">Hesapla</button>
                </form>
                <div v-if="ironWeight !== null" class="mt-4">
                    <p class="text-lg">Demir Ağırlığı: {{ ironWeight }} kg</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.client.vue';
import { ref } from 'vue';

const diameter = ref(0);
const length = ref(0);
const ironWeight = ref(null);

const calculateIronWeight = () => {
    const density = 7850; // Demir yoğunluğu (kg/m³)
    const radius = diameter.value / 2000; // Çapı yarıçapa çevir (mm'den metreye)
    const volume = Math.PI * Math.pow(radius, 2) * length.value; // Silindirin hacmi
    ironWeight.value = (volume * density).toFixed(2);
};
</script>

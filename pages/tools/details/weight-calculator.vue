<template>
    <div class="min-h-screen bg-base-200">
        <Navbar />
        <div class="container mx-auto py-10">
            <h1 class="text-3xl font-bold text-center mb-6">Brüt Ağırlık Hesaplama</h1>
            <div class="bg-base-100 shadow-md rounded-lg p-6">
                <form @submit.prevent="calculateWeight">
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Hacim (m³)</span>
                        </label>
                        <input v-model.number="volume" type="number" class="input input-bordered" />
                    </div>
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Yoğunluk (kg/m³)</span>
                        </label>
                        <input v-model.number="density" type="number" class="input input-bordered" />
                    </div>
                    <button class="btn btn-primary w-full" type="submit">Hesapla</button>
                </form>
                <div v-if="weight !== null" class="mt-4">
                    <p class="text-lg">Brüt Ağırlık: {{ weight }} kg</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.client.vue';
import { ref } from 'vue';

const volume = ref(0);
const density = ref(0);
const weight = ref(null);

const calculateWeight = () => {
    weight.value = (volume.value * density.value).toFixed(2);
};
</script>

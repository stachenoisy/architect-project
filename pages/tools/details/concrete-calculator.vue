<template>
    <div class="min-h-screen bg-base-200">
        <Navbar />
        <div class="container mx-auto py-10">
            <h1 class="text-3xl font-bold text-center mb-6">Beton Miktarı Hesaplama</h1>
            <div class="bg-base-100 shadow-md rounded-lg p-6">
                <form @submit.prevent="calculateConcrete">
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Uzunluk (m)</span>
                        </label>
                        <input v-model.number="length" type="number" class="input input-bordered" />
                    </div>
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Genişlik (m)</span>
                        </label>
                        <input v-model.number="width" type="number" class="input input-bordered" />
                    </div>
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Yükseklik (m)</span>
                        </label>
                        <input v-model.number="height" type="number" class="input input-bordered" />
                    </div>
                    <button class="btn btn-primary w-full" type="submit">Hesapla</button>
                </form>
                <div v-if="concreteVolume !== null" class="mt-4">
                    <p class="text-lg">Beton Miktarı: {{ concreteVolume }} m³</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.client.vue';
import { ref } from 'vue';

const length = ref(0);
const width = ref(0);
const height = ref(0);
const concreteVolume = ref(null);

const calculateConcrete = () => {
    concreteVolume.value = (length.value * width.value * height.value).toFixed(2);
};
</script>

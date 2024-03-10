<script setup>
import FormTextInputItem from './FormTextInputItem.vue';
import { toRefs } from 'vue'

const props = defineProps(['block', 'name', 'emptyFields']);
const infoBlock = defineModel();

const { block, name, emptyFields } = toRefs(props);
</script>

<template>
    <h3 class="mar-top-6">{{ name }}</h3>
    <div v-for="inputItem in block" :key="inputItem.label" class="d-flex flex-v-center mar-top-6">
        <FormTextInputItem :iconPath="inputItem.iconPath" :label="inputItem.label" v-model="infoBlock[inputItem.name]"
            :name="inputItem.name" :notEmptyField="emptyFields[inputItem.name]" />
    </div>
</template>

<style scoped>
h3 {
    color: var(--color-gray-darker);
}
</style>

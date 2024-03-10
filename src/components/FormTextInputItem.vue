<script setup>
import { ref, toRefs } from 'vue'
import { validateFullName } from '../utils/validateFullName';
import { validatePhone } from '../utils/validatePhone'
import { validateEmail } from '../utils/validateEmail'
import { validateSNILS } from '../utils/validateSNILS'

const props = defineProps({
  iconPath: String,
  name: String,
  label: String,
  notEmptyField: Boolean
})

const field = defineModel();

const { iconPath, name, label } = toRefs(props);

const isCorrect = ref(true);
const isInput = ref(false);

const getImageUrl = (path) => {
  return new URL(`../assets/${path}`, import.meta.url).href;
};

function handleInput() {
  isInput.value = true;
  if (name.value === 'firstName') {
    isCorrect.value = validateFullName(field.value, 'firstName');
  }
  if (name.value === 'lastName') {
    isCorrect.value = validateFullName(field.value, 'lastName');
  }
  if (name.value === 'patronymic') {
    isCorrect.value = validateFullName(field.value, 'patronymic');
  }
  if (name.value === 'SNILS') {
    isCorrect.value = validateSNILS(field.value);
  }
  if (name.value === 'phone') {
    isCorrect.value = validatePhone(field.value);
  }
  if (name.value === 'email') {
    isCorrect.value = validateEmail(field.value);
  }
}
</script>

<template>
  <div class="icon mar-right-4"><img :src="getImageUrl(iconPath)" /></div>
  <div class="form-control w-100v">
    <input class="input border-none pad-left-none shadow-none hover" type="text" placeholder="не указано"
      v-model="field" @input="handleInput" :name="name">
    <div class="form-label form-label-small form-label-sticky mar-none color-primary"
      :class="{ 'color-invalid': !isCorrect || (!notEmptyField && !isInput) }">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.input {
  box-shadow: var(--shadow-none);
  outline: var(--outline-none);
  border-bottom: var(--border-bottom);
  border-radius: var(--border-radius-none);
  color: var(--color-gray-darker);
}
</style>

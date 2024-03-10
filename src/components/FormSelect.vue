<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  iconPath: String,
  name: String,
  isNotEmpty: Boolean
})

const selectedPosition = defineModel();

const serverPositions = ref([]);
const isSelected = ref(false);

fetch("/api/positions")
  .then((response) => response.json())
  .then(({ positions }) => {
    serverPositions.value = positions;
  })

const { iconPath, name } = toRefs(props);

const getImageUrl = (path) => {
  return new URL(`../assets/${path}`, import.meta.url).href;
};

function handleChange() {
  isSelected.value = true;
}
</script>

<template>
  <div class="icon mar-right-4"><img :src="getImageUrl(iconPath)" /></div>
  <div class="form-control w-100v">
    <select class="select border-none pad-left-none shadow-none" :class="{ 'color-disabled-dark': !isSelected }"
      name="positions" v-model="selectedPosition" @change="handleChange">
      <option class="color-grey-light" disabled selected>не указано</option>
      <option v-for="position in serverPositions" :value="position" :key="position" :title="position"
        class="color-grey-dark">
        {{ position.length > 30 ? `${position.slice(0, 32)}...` : position }}
      </option>
    </select>
    <div class="form-label form-label-small form-label-sticky mar-none color-primary"
      :class="{ 'color-invalid': !isNotEmpty && !isSelected }">{{ name }}</div>
  </div>
</template>

<style scoped>
.select {
  box-shadow: var(--shadow-none);
  outline: var(--outline-none);
  border-bottom: var(--border-bottom);
  border-radius: var(--border-radius-none);
}
</style>

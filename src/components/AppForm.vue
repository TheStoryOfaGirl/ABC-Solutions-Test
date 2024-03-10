<script setup>
import { blocksForm } from '../const';
import FormBlock from './FormBlock.vue';
import FormSelect from './FormSelect.vue';
import { ref, toRefs, reactive } from 'vue';
import { validateFullName } from '../utils/validateFullName';
import { validatePhone } from '../utils/validatePhone'
import { validateEmail } from '../utils/validateEmail'
import { validateSNILS } from '../utils/validateSNILS'

const props = defineProps({
  heading: String
})

const { heading } = toRefs(props);

const state = reactive({
  info: {
    firstName: '',
    lastName: '',
    patronymic: '',
    SNILS: '',
    position: 'не указано'
  },
  contacts: {
    phone: '',
    email: ''
  },
})

const emptyFields = reactive({
  firstName: true,
  lastName: true,
  patronymic: true,
  SNILS: true,
  position: true,
  phone: true,
  email: true
})

async function fetchSendForm() {
  try {
    const req = await fetch("/api/sendForm", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: state.info.firstName,
        lastName: state.info.lastName,
        patronymic: state.info.patronymic,
        SNILS: state.info.SNILS,
        position: state.info.position,
        phone: state.contacts.phone,
        email: state.contacts.email
      })
    })
    if (req.status === 400) {
      const { invalidFields } = await req.json();
      alert(`Ошибка отправки формы! Проверьте поля: ${invalidFields.join(', ')}`);
    }
  }
  catch (error) {
    console.error(error);
  }
}

function handleSubmit() {
  fetchSendForm();
  if (validateFullName(state.info.firstName, 'firstName') &&
    validateFullName(state.info.lastName, 'lastName') &&
    (validateFullName(state.info.patronymic, 'patronymic') || state.info.patronymic.trim().length === 0) &&
    (validateSNILS(state.info.SNILS) || state.info.SNILS.trim().length === 0) &&
    state.info.position !== 'не указано' &&
    validatePhone(state.contacts.phone) &&
    validateEmail(state.contacts.email)) {
    alert(`Форма была успешно отправлена!`);
  }
  else {
    emptyFields.firstName = state.info.firstName.trim().length > 0;
    emptyFields.lastName = state.info.lastName.trim().length > 0;
    emptyFields.phone = state.contacts.phone.trim().length > 0;
    emptyFields.email = state.contacts.email.trim().length > 0;
    emptyFields.position = state.info.position !== 'не указано';
  }
}
</script>

<template>
  <form class="w-f3 h-maxc m-w-12-12" method="post" @submit.prevent="handleSubmit">
    <div class="pad-v-2 pad-right-2 bg-grey-lighter">
      <div class="d-flex flex-row flex-h-space-between flex-v-center pad-v-l1 pad-right-l1 pad-left-6 ">
        <h3 class="mar-none text-bold">{{ heading }}</h3>
        <button class="btn btn-inline btn-icon" type="button">
          <img src="../assets/clear.svg" />
        </button>
      </div>
    </div>
    <div class="pad-h-6">
      <FormBlock :block="blocksForm.info" name="Заголовок" v-model="state.info" :emptyFields="emptyFields" />
      <div class="d-flex flex-v-center mar-top-6">
        <FormSelect iconPath="briefcase-account.svg" name="Должность*" v-model="state.info.position" :isNotEmpty="emptyFields.position"/>
      </div>
      <FormBlock :block="blocksForm.contacts" name="Заголовок" v-model="state.contacts" :emptyFields="emptyFields" />
    </div>
    <div class="pad-v-l4">
      <div class="pad-v-4"></div>
    </div>
    <div class="pos-fixed pos-bot w-f3 bg-white m-w-12-12">
      <hr />
      <div class="pad-6 d-flex flex-h-end">
        <button class="btn btn-ghost pad-h-5 mar-right-3" type="button">Отмена</button>
        <button class="btn btn-primary pad-h-5" type="submit">Button</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
h3 {
  color: var(--color-gray-darker);
}

button {
  font-size: var(--font-size-base);
}
</style>

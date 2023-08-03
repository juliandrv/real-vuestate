<script setup>
import { useForm, useField } from "vee-validate";
import { loginSchema } from "../validation/loginSchema";
import { useAuthStore } from "../stores/auth";

import Alert from "../components/Alert.vue";

const { handleSubmit } = useForm({ validationSchema: loginSchema });
const auth = useAuthStore();

const email = useField("email");
const password = useField("password");

const submit = handleSubmit((values) => {
  auth.login(values);
});
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h4">Login</v-card-title>
    <v-card-subtitle class="text-h5" tag="h5">
      Log in to your account
    </v-card-subtitle>

    <Alert v-if="auth.hasError" :title="auth.errorMessage" />

    <v-form class="mt-10">
      <v-text-field
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value" />

      <v-text-field
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value" />

      <v-btn block size="x-large" color="teal-darken-2" @click="submit">
        Continue
      </v-btn>
    </v-form>
  </v-card>
</template>

<style scope></style>

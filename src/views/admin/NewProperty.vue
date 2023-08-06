<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import {
  validationSchema,
  imageSchema,
} from "../../validation/newPropertySchema";

const items = [1, 2, 3, 4, 5];

const router = useRouter();
const db = useFirestore();

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const title = useField("title");
const image = useField("image");
const price = useField("price");
const rooms = useField("rooms");
const bathrooms = useField("bathrooms");
const parking = useField("parking");
const description = useField("description");
const pool = useField("pool", "", {
  initialValue: false,
});

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values;

  const docRef = await addDoc(collection(db, "properties"), {
    ...property,
  });
  if (docRef.id) {
    router.push({ name: "admin-properties" });
  }
});
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h4">
      New Property
    </v-card-title>

    <v-card-subtitle class="text-h5" tag="h5">
      Create a new Property by filling out this form
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Property Title"
        v-model.trim="title.value.value"
        :error-messages="title.errorMessage.value" />

      <v-file-input
        accept="image/jpeg"
        class="mb-5"
        label="Property Photo"
        prepend-icon="mdi-camera"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value" />

      <v-text-field
        type="number"
        class="mb-3"
        label="Precio"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value" />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="mb-3"
            label="Rooms"
            :items="items"
            v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value" />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            class="mb-3"
            label="Bathrooms"
            :items="items"
            v-model="bathrooms.value.value"
            :error-messages="bathrooms.errorMessage.value" />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            class="mb-3"
            label="Parking"
            :items="items"
            v-model="parking.value.value"
            :error-messages="parking.errorMessage.value" />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-3"
        label="Description"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value" />

      <v-checkbox label="Pool" v-model="pool.value.value" />

      <v-btn color="teal-darken-3" block size="x-large" @click="submit">
        Create Property
      </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
import useProperties from "../../composables/useProperties";
import { propertyPrice } from "../../helpers";

const { propertiesCollection, deleteItem } = useProperties();
</script>

<template>
  <h2 class="text-center text-h5 my-5 font-weight-bold">Admin Panel</h2>

  <v-btn color="teal-darken-2" variant="flat" :to="{ name: 'new-property' }">
    New Property
  </v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item v-for="property in propertiesCollection" :key="property.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img
              loading="lazy"
              width="180"
              :src="property.image"
              :alt="property.title"
          /></v-list-item-media>
        </template>

        <v-list-item-title>{{ property.title }}</v-list-item-title>
        <v-list-item-subtitle>{{
          propertyPrice(property.price)
        }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            variant="flat"
            color="blue-darken-3"
            class="mr-5"
            :to="{
              name: 'edit-property',
              params: { id: property.id },
            }">
            Edit
          </v-btn>

          <v-btn
            variant="flat"
            color="red-darken-3"
            @click="deleteItem(property.id, property.image)"
            >Delete</v-btn
          >
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

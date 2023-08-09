<script setup>
import useProperties from "../composables/useProperties";
import Property from "../components/Property.vue";
import { propertyPrice } from "../helpers";

const { pool, filteredProperties } = useProperties();
</script>

<template>
  <h1 class="text-center">Our Properties</h1>

  <v-card flat class="py-10">
    <v-card-title class="text-h6">
      Filter:
      <v-checkbox label="Pool" v-model="pool" />
    </v-card-title>

    <v-row>
      <Property
        v-for="property in filteredProperties"
        :key="property.id"
        :property="property"
        :price="propertyPrice" />
    </v-row>
  </v-card>
</template>

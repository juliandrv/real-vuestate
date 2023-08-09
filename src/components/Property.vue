<script setup>
defineProps({
  property: Object,
  price: Function,
});
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="property.image" cover height="200" />

      <v-card-title class="text-center font-weight-bold">{{
        property.title
      }}</v-card-title>

      <v-card-text class="text-center text-truncate">
        {{ property.description }}
      </v-card-text>

      <v-row class="py-2">
        <v-col class="text-center">
          <v-icon icon="mdi-bed"></v-icon>
          <p>{{ property.rooms }}</p>
        </v-col>
        <v-col class="text-center">
          <v-icon icon="mdi-shower-head"></v-icon>
          <p>{{ property.bathrooms }}</p>
        </v-col>
        <v-col class="text-center">
          <v-icon icon="mdi-parking"></v-icon>
          <p>{{ property.parking }}</p>
        </v-col>
      </v-row>

      <v-card-text class="text-center text-h6 font-weight-bold">
        {{ price(property.price) }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          color="teal"
          block
          variant="flat"
          :to="{ name: 'property', params: { id: property.id } }">
          See Property
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>

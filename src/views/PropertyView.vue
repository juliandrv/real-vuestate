<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { doc } from "firebase/firestore";
import { useDocument, useFirestore } from "vuefire";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import useLocationMap from "../composables/useLocationMap";
import { propertyPrice } from "../helpers/index.js";

const { zoom, center } = useLocationMap();

const route = useRoute();
const db = useFirestore();
const docRef = doc(db, "properties", route.params.id);
const property = useDocument(docRef);

watch(property, (property) => {
  center.value = property.location;
});
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h4 text-center font-weight-bold">
      {{ property?.title }}
    </v-card-title>

    <v-img :src="property?.image" height="600" cover />

    <div
      class="bg-blue-grey-lighten-5 d-flex flex-column flex-sm-row align-center text-center">
      <v-card-text class="text-h6">
        Price:
        <span class="font-weight-bold">{{
          propertyPrice(property?.price)
        }}</span>
      </v-card-text>

      <v-card-text>
        Rooms:
        <span class="font-weight-bold">{{ property?.rooms }}</span>
      </v-card-text>

      <v-card-text>
        Bathrooms:
        <span class="font-weight-bold">{{ property?.bathrooms }}</span>
      </v-card-text>

      <v-card-text>
        Parking:
        <span class="font-weight-bold">{{ property?.parking }}</span>
      </v-card-text>
    </div>

    <div class="text-pre-wrap my-10">{{ property?.description }}</div>
    <div style="height: 300px">
      <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
        <LMarker :lat-lng="center">
          <LPopup>{{ property.title }}</LPopup>
        </LMarker>

        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
      </LMap>
    </div>
  </v-card>
</template>

<style scoped>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>

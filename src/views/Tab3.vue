<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar debounce="500" :onIonChange="(e) => fetchSearchResults(e.detail.value)"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state.loading">
      <div class="center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <div class="center" v-if="state.searchResults && state.searchResults.length === 0">
        <ion-label>
          No Results. Please Search Above.
        </ion-label>
      </div>
      <DrinkCard v-for="drink in state.searchResults" :key="drink.idDrink" :drink="drink"></DrinkCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonSpinner, IonLabel } from "@ionic/vue";
import { reactive } from "vue";

import {getSearchResults} from "@/services/CocktailApi";
import DrinkCard from "@/components/DrinkCard.vue";
import IDrinkDetails from "@/interfaces/IDrinkDetails";

export default {
  name: "Tab3",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSearchbar, IonSpinner, IonLabel, DrinkCard },
  setup() {
    const state = reactive({
      searchResults: [] as IDrinkDetails[],
      loading: false
    });
    const fetchSearchResults = async (searchTerm: string) => {
      state.loading = true;
      if (searchTerm) {
        state.searchResults = [];
        const data = await getSearchResults(searchTerm);
        if (data?.drinks) {
          state.searchResults = data?.drinks;
        }
      }
      state.loading = false;
    };
    return {
      state,
      fetchSearchResults
    };
  }
};
</script>

<style>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
ion-spinner {
  transform: scale(1.5);
}
</style>

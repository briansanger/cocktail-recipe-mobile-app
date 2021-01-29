<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Random Cocktail</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state.loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content v-else :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <DrinkCard :drink="state.randomCocktail"></DrinkCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { reactive } from "vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonRefresher, IonRefresherContent } from "@ionic/vue";

import {getRandomDrink} from "@/services/CocktailApi";
import DrinkCard from "@/components/DrinkCard.vue";

export default {
  name: "RandomDrink",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonRefresher, IonRefresherContent, IonSpinner, DrinkCard },
  setup() {
    const state = reactive({
      randomCocktail: {},
      loading: false
    });
    const fetchRandomCocktail = async (displayLoaderPage: boolean) => {
      if (displayLoaderPage) {
        state.loading = true;
      }
      const data = await getRandomDrink();
      if (data) {
        state.randomCocktail = data?.drinks[0];
      }
      if (displayLoaderPage) {
        state.loading = false;
      }
    };
    const doRefresh = (event: CustomEvent) => {
      fetchRandomCocktail(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
      event.target?.complete();
    };
    fetchRandomCocktail(true);
    return {
      state,
      fetchRandomCocktail,
      doRefresh
    };
  }
};
</script>

<style>
.loading-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
ion-spinner {
  transform: scale(1.5);
}
</style>

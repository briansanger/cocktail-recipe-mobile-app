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
      <ion-refresher slot="fixed" @ionRefresh="doRefresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <DrinkCard :drink="state.randomCocktail"></DrinkCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { reactive } from "vue";
import axios from "axios";
import DrinkCard from "@/components/DrinkCard.vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonRefresher, IonRefresherContent } from "@ionic/vue";
export default {
  name: "Tab1",
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
      const res = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      if (res.data) {
        state.randomCocktail = res.data?.drinks[0];
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

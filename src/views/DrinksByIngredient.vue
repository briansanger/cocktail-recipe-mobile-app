<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ ingredient }} Drinks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="state.loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <ion-list>
        <ion-item v-for="drink in state.lstDrinks" :key="drink.idDrink" @click="() => router.push(`/drink/${drink.idDrink}`)">
          <ion-avatar slot="start">
            <img :src="drink.strDrinkThumb" />
          </ion-avatar>
          <ion-label>
            <h2>{{ drink.strDrink }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonAvatar, IonSpinner } from "@ionic/vue";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getDrinksByIngredients } from "@/services/CocktailApi";
import IDrink from "@/interfaces/IDrink";

export default {
  name: "DrinksByIngredient",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonAvatar, IonSpinner },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const ingredient = route.params.ingredient as string;
    const state = reactive({
      lstDrinks: [] as IDrink[],
      loading: false
    });
    const fetchDrinksByIngredients = async (ingredient: string) => {
      state.loading = true;
      const data = await getDrinksByIngredients(ingredient);
      if (data) {
        state.lstDrinks = data?.drinks;
      }
      state.loading = false;
    };
    fetchDrinksByIngredients(ingredient);
    return {
      router,
      ingredient,
      state
    };
  }
};
</script>

<style scoped>
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

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ state.drink.strDrink }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-if="state.loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <DrinkCard :drink="state.drink"></DrinkCard>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonSpinner } from "@ionic/vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";

import { getDrinkById } from "@/services/CocktailApi";
import DrinkCard from "@/components/DrinkCard.vue";
import IDrinkDetails from "@/interfaces/IDrinkDetails";

export default {
  name: "Drink",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton, IonSpinner, DrinkCard },
  setup() {
    const route = useRoute();
    const drinkId = route.params.id as string;
    const state = reactive({
      drink: {} as IDrinkDetails,
      loading: false
    });
    const fetchDrinkById = async (drinkId: string) => {
      state.loading = true;
      const data = await getDrinkById(drinkId);
      if (data) {
        state.drink = data?.drinks[0];
      }
      state.loading = false;
    };
    fetchDrinkById(drinkId);
    return {
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

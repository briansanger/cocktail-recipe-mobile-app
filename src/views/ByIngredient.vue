<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search By Ingredient</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state.loading">
      <div class="loading-center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content :fullscreen="true" v-if="state.lstIngredients.length > 0">
      <ion-list>
        <ion-item v-for="ingredient in state.lstIngredients" :key="ingredient.strIngredient1" @click="() => router.push(`/drinks-by-ingredient/${ingredient.strIngredient1}`)">
          <ion-avatar slot="start">
            <img :src="ingredientImage(ingredient.strIngredient1)" />
          </ion-avatar>
          <ion-label>
            <h2>{{ ingredient.strIngredient1 }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonSpinner } from "@ionic/vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

import {getIngredients} from "@/services/CocktailApi";
import IIngredient from "@/interfaces/IIngredient";

export default {
  name: "ByIngredient",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonAvatar, IonLabel, IonSpinner },
  setup() {
    const router = useRouter();
    const state = reactive({
      lstIngredients: [] as IIngredient[],
      loading: false
    });
    const fetchIngredients = async () => {
      state.loading = true;
      const data = await getIngredients();
      if (data) {
        state.lstIngredients = data?.drinks;
        state.lstIngredients.sort(function(a, b) {
          return a.strIngredient1.localeCompare(b.strIngredient1);
        });
      }
      state.loading = false;
    };
    const ingredientImage = (ingredient: string) => {
      return `https://www.thecocktaildb.com/images/ingredients/${encodeURI(ingredient)}-Small.png`;
    };
    fetchIngredients();
    return {
      router,
      state,
      ingredientImage
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

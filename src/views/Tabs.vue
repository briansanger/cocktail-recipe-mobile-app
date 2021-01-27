<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="random-drink" href="/tabs/random-drink">
          <ion-icon :icon="shuffle" />
          <ion-label>Random</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="by-ingredient" href="/tabs/by-ingredient">
          <ion-icon :icon="wine" />
          <ion-label>By Ingredient</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/tabs/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from "@ionic/vue";
import { ellipse, square, shuffle, wine, search } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse,
      square,
      shuffle,
      wine,
      search
    };
  }
};
</script>

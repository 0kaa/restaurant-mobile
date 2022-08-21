<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar mode="ios">
        <ion-tab-button tab="explore" href="/home/explore">
          <ion-icon src="/assets/icon/home.svg"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="orders" href="/home/orders">
          <img src="/assets/icon/orders.png" class="w-10 h-10" />
        </ion-tab-button>

        <ion-tab-button tab="cart" href="/home/cart" class="text-red-500">
          <img src="/assets/icon/shopping-bag.png" class="w-8 h-8" />
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/home/tab3">
          <img src="/assets/icon/shopping-bag.png" class="w-8 h-8" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonRouterOutlet, IonPage } from '@ionic/vue';

export default defineComponent({
  name: 'TabsPage',
  components: { IonTabs, IonTabBar, IonTabButton, IonRouterOutlet, IonPage, IonIcon },
});
</script>

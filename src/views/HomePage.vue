<template>
  <base-layout page-title="Home">
    <ion-button @click="logout" expand="block" color="dark">Login</ion-button>
    {{ userName }}
  </base-layout>
</template>

<script lang="ts">
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonButton,
  },
  setup() {
    const store = useStore();
    const userName = store.getters.getUser;
    const logout = () => {
      store.dispatch('logout');
    };
    return {
      userName,
      logout
    };
  }

});
</script>
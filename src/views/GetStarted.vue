<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="flex flex-col justify-between h-full py-12 bg-white">
                <div></div>
                <div>
                    <img src="./../svg/get-started2.svg" />
                </div>
                <div>
                    <ion-button router-link="/login" router-direction="root" expand="block" size="large" strong color="primary">
                        {{ $t('getStarted') }}
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonButton, IonPage, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomePage',
    components: {
        IonButton,
        IonPage,
        IonContent
    },
});
</script>
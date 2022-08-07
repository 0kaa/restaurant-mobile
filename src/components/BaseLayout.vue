<template>
    <ion-page>
        <ion-header :translucent="true" collapse="fade">
            <ion-toolbar>
                <ion-buttons>
                    <ion-back-button :default-href="pageDefaultBackLink" :text="$t('back')" color="dark"
                        :icon="chevronForwardOutline"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
                <slot name="actions-end"></slot>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <slot></slot>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { chevronForwardOutline } from "ionicons/icons";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
} from "@ionic/vue";
export default {
    props: ["pageTitle", "pageDefaultBackLink"],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonBackButton,
        IonButtons,
    },
    setup() {
        return {
            chevronForwardOutline
        };
    }
};
</script>
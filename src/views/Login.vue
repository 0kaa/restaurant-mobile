<template>
    <ion-page>
        <ion-content class="ion-padding">
            <div class="flex flex-col justify-center h-full gap-4">
                <ion-item>
                    <ion-label position="stacked" class="!text-xl">{{ $t('phone') }}</ion-label>
                    <ion-input type="tel" inputmode="numeric" :placeholder="$t('putYourPhone')" clear-input
                        v-model="phone">
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked" class="!text-xl">{{ $t('password') }}</ion-label>
                    <ion-input type="password" :placeholder="$t('putYourPassword')" clear-input v-model="password">
                    </ion-input>
                </ion-item>
                <ion-button @click="signIn" expand="block" size="large" strong color="primary">
                    {{ $t('signIn') }}
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonPage,
    IonContent
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useIonRouter } from '@ionic/vue';
import { useStore } from 'vuex';


export default defineComponent({
    name: 'HomePage',
    components: {
        IonButton,
        IonItem,
        IonLabel,
        IonInput,
        IonPage,
        IonContent
    },
    setup() {
        const phone = ref<string>('1');
        const password = ref<string>('123123');
        const router = useIonRouter();
        const store = useStore();

        const { mutate: signIn, onDone, error: sendMessageError } = useMutation(gql`
            mutation Login($phone: String!, $password: String!)  {
                node:loginUser(phone: $phone, password: $password) {
                    user {
                        id
                        name
                        phone
                        locations{
                            id
                            lat
                            lng
                            address
                        }
                        points
                        type
                        image
                    }
                    token
                }
                }
            `, () => ({
            variables: {
                phone: phone.value,
                password: password.value
            }
        })
        )
        onDone(result => {
            phone.value = '';
            password.value = '';
            store.dispatch('login', result.data.node);
            (this as any).$ionicStorage.set('token', result.data.node.token);
            router.navigate('/home', 'forward', 'replace')
        })

        return {
            signIn,
            sendMessageError,
            phone,
            password,
        }
    }

});
</script>
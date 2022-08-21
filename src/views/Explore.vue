<template>
  <ion-page>
    <ion-header :translucent="true" collapse="fade">
      <ion-toolbar>
        <ion-buttons class="flex items-center justify-between">
          <ion-button>
            <ion-icon class="text-black" :icon="searchOutline"></ion-icon>
          </ion-button>

          <ion-button>
            <AppMenu class="text-black" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="py-4">
        <h1 class="mb-4 text-3xl">
          {{ $t('explore.title') }}
          <strong>
            {{ $t('explore.subtitle') }}
          </strong>
        </h1>
        <ion-slides :options="categoryOptions" v-if="categories && categories.length">
          <ion-slide v-for="(category, i) in categories" :key="i">
            <a href="#" @click.prevent="selectCategory(category)"
              class="flex items-center justify-center w-16 h-16 mb-6 bg-transparent border border-gray-100 rounded-lg"
              :class="{
                'bg-white shadow-lg shadow-gray-200 border-transparent': category.id === selectedCategory.id,
              }">
              <ion-img :src="category.image" :alt="category.name" class="!w-8 !h-8" />
            </a>
          </ion-slide>
        </ion-slides>
        <div class="my-4"></div>
        <!-- <ion-slides :options="productOptions" v-if="products && products.length">
          <ion-slide v-for="(product, i) in products" :key="i">

          </ion-slide>
        </ion-slides> -->

        <div class="flex flex-col gap-10">
          <a href="#" @click.prevent
            class="flex flex-col items-center w-full h-full p-4 shadow-xl bg-primary-gray shadow-gray-200 rounded-xl"
            v-for="(product, i) in products" :key="i">
            <div class="flex items-center justify-center w-full bg-primary rounded-xl min-h-[170px] relative">
              <ion-img :src="product.image" class="!w-[200px] !h-[200px] absolute -top-10" />
            </div>
            <div class="flex items-center justify-between w-full px-4 mt-2">
              <h3 v-text="product.name" class="text-lg font-bold text-gray-800"></h3>
              <p class="text-lg font-bold text-dark-gray" v-if="product.price" v-text="product.price + $t('symbol')">
              </p>
            </div>
            <div class="flex items-center justify-between w-full mt-4">
              <div class="flex items-center gap-4 px-4">
                <div class="flex items-center gap-2 font-bold text-gray-500">
                  <ion-icon :icon="timeOutline"></ion-icon>
                  <h3>30 دقيقة</h3>
                </div>
                <div class="flex items-center gap-2 font-bold text-gray-500">
                  <ion-icon :icon="star"></ion-icon>
                  <h3>4 نجوم</h3>
                </div>

              </div>
              <ion-button @click.prevent="addToCart">
                <ion-icon class="text-white" :icon="cartOutline"></ion-icon>
              </ion-button>
            </div>
          </a>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonIcon, IonButton, IonContent, IonSlides, IonSlide, IonImg } from '@ionic/vue';
import AppMenu from '@/components/Icon/AppMenu.vue';
import { searchOutline, timeOutline, star, cartOutline } from 'ionicons/icons';
import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
export default defineComponent({
  name: 'Tab2Page',
  components: { IonHeader, IonToolbar, IonButtons, IonIcon, IonButton, IonContent, IonPage, AppMenu, IonSlides, IonSlide, IonImg },
  setup() {
    type Category = {
      name: string
      id: string
      image: string
    }
    const ITEMS_AND_CATEGORIES = gql`
  query ProductsWithCategories {
    categories {
      name
      id
      image
    }
    products:getMyProductsWithPagination(page: 1, limit: 8) {
      products {
        id
        name
        price
        description
        image
      }
      paginator {
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
      }
    }
  }
`;

    const ADD_TO_CART = gql`
        mutation AddToCart($productId: ID!, $quantity: Int!) {
          addToCart(productId: $productId, quantity: $quantity) {
            message
            success
          }
        }
    `;
    const { onResult } = useQuery(ITEMS_AND_CATEGORIES);
    const categories = ref([] as Category[]);
    const products = ref([] as any[]);
    const selectedCategory = ref({} as Category);
    const selectCategory = (cat: any) => {
      selectedCategory.value = cat;
    }
    const { mutate: addToCart, onDone, error: sendMessageError } = useMutation(ADD_TO_CART, () => ({
      variables: {
        productId: "62fc3fd92821c5694bdaaca1",
        quantity: 1
      }
    }));

    onDone(result => {
      alert('added')
    })

    onResult(({ data }) => {
      categories.value = data.categories;
      products.value = data.products.products;
    })
    const categoryOptions = {
      slidesPerView: 4.5,
      freeMode: {
        enabled: true,
        sticky: true,
      },
      initialSlide: 0,
    };
    const productOptions = {
      slidesPerView: 1.75,
      spaceBetween: 10,
      freeMode: {
        enabled: true,
        sticky: true,
      },
      initialSlide: 0,
    };

    return {
      addToCart,
      timeOutline,
      categoryOptions,
      productOptions,
      categories,
      products,
      selectedCategory,
      selectCategory,
      searchOutline,
      star,
      cartOutline
    }
  }
});
</script>
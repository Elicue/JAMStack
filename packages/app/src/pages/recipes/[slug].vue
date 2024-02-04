<script lang="ts" setup>
import Tag from '~/components/Tag.vue';

// import { useAsyncData } from "../../.nuxt/imports";

const route = useRoute();
const { find } = useStrapi();

// const {data: recipe, pending, error} = await useAsyncData('recipes', () => $fetch(`http://localhost:1337/api/recipes?slug=${route.params.slug}`));
// console.log('recipe', recipe);

const { data: recipe } = await find('recipes', { filters: { slug: route.params.slug }, populate: '*' });
console.log('recipe', recipe);
// console.log('tags', recipe[0].tags[0].title);

</script> 

<template>
  <div v-if="recipe" class="bg-[#f3f1f2] overflow-x-hidden flex flex-row h-[100vh] p-4 gap-4">
    <div class="parent w-[50%] h-full flex flex-col relative">
      <li @click="$router.push(`/`)"
              class="list-none absolute text-xl bg-[#f6c944] p-x-5 p-y-1 tracking-wider m-y-3 rounded-lg m-4 flex flex-row items-center hover:cursor-pointer">Back to home page <img class="w-10" src="../../assets/arrow-b.png" alt=""></li>
      <img :src="recipe[0].image[0].url" alt="image pate" class="w-full h-full object-cover rounded-3xl ">
    </div>

    <div class="parent w-[50%] h-full flex flex-col gap-4 justify-between">
      <div class="infos flex flex-col gap-4">
        <div class="flex flex-row items-center justify-between">
          <h1 class="text-[2.5rem] tracking-wider">{{ recipe[0].title }}</h1>
          <p class="text-[#a89144] border-[#a89144] border-solid border-2 p-4 rounded-xl bg-[#a89144] bg-opacity-25 font-bold">{{ recipe[0].serving }}</p>
        </div>
        <p class="text-[1rem] leading-6 tracking-wider">{{ recipe[0].description }}</p>
        <Tag/>
      </div>


      <div class="flex flex-col h-[70vh] gap-4">
        <h2 class="text-[1.7rem] font-bold">Ingredients</h2>
        <div class="flex flex-col overflow-y-scroll gap-4">
          <ul v-for="(ingredient, index) in recipe[0].ingredients" :key="index"
            class="flex flex-col bg-white rounded-md p-4 m-0 ">
            <li class="list-none tracking-wider leading-6 text-[#adadad] uppercase text-sm">{{ ingredient.unity }}</li>
            <li class="list-none tracking-wider leading-6 font-bold text-lg">{{ ingredient.title }}</li>
            <li class="list-none tracking-wider leading-6 text-[#adadad]">{{ ingredient.description }}</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>


<style>
  @media screen and (max-width: 768px) {
    .overflow-x-hidden {
      display: flex;
      flex-direction: column;
      height: fit-content;
    }

    .parent {
      width: 100%;
    }

    .infos div:nth-child(1){
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    h1 {
      letter-spacing: normal;
      margin: 0;
      font-size: 2rem !important;
      margin-bottom: 1rem;
    }

    .object-cover {
      height: 40vh;
    }
  }

</style>
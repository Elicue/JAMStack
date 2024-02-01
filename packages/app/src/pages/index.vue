<script lang="ts" setup>
// import { useAsyncData } from "../../.nuxt/imports";

const { find } = useStrapi();

// const { data: recipes, pending, error } = await useAsyncData('recipes', () => $fetch('http://localhost:1337/api/recipes?populate=*'));
// console.log('recipes', recipes);

const { data: recipes } = await find('recipes', { populate: '*' });
console.log('recipes', recipes);

onMounted(() => {
  console.log(recipes);
});

</script>

<template>
  <div class="container">
    <div class="flex flex-col items-center gap-y-4">
      <h1>Démarrage Nuxt Strapi</h1>
      <div class="gap-x-4 hidden">
        <NuxtLink to="/start">
          Documentation
        </NuxtLink>
        <NuxtLink to="/exemple-recherche">
          Exemple de recherche
        </NuxtLink>
      </div>
    </div>

    <div v-if="recipes">
      <ul class="grid grid-cols-4 gap-6">
        <div v-for="recipe in recipes" :key="recipe.id"
          class="border-solid border-2 border-black w-fill p-6 m-y-3  gap-y-2 flex flex-col">
          <img :src="recipe.image[0].url" alt="image pate" class="w-fill h-80 min-h-80 object-cover ">
          <li @click="$router.push(`/recipes/${recipe.slug}`)"
            class="list-none text-xl bg-[#f6c944] p-x-2 p-y-1 tracking-wider m-y-3">
            {{ recipe.title }}</li>
          <li class="list-none"> {{ recipe.tags[0] }} </li>
          <li class="list-none tracking-wide leading-6"> {{ recipe.description }} </li>
          <li @click="$router.push(`/recipes/${recipe.slug}`)"
            class="border-solid border-2 border-black list-none p-x-2 p-y-1 bg-white tracking-wider m-y-3 hover:cursor-pointer hover:scale-105 transition-all text-center shadow-[5px 5px black]">
            See more</li>
        </div>
      </ul>
    </div>
</div></template>

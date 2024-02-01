<script lang="ts" setup>
// import { useAsyncData } from "../../.nuxt/imports";

const { find } = useStrapi();

const { data: recipes, pending, error } = await useAsyncData('recipes', () => $fetch('http://localhost:1337/api/recipes?populate=*'));
console.log('recipes', recipes);

onMounted(() => {
  console.log(recipes, pending, error);
});

</script>

<template>
  <div class="container">
    <div class="flex flex-col items-center gap-y-4">
      <h1>Démarrage Nuxt Strapi</h1>
      <div class="flex gap-x-4">
        <NuxtLink to="/start">
          Documentation
        </NuxtLink>
        <NuxtLink to="/exemple-recherche">
          Exemple de recherche
        </NuxtLink>
      </div>
    </div>

    <div v-if="recipes">
      <ul class="grid grid-cols-4">
        <div v-for="recipe in recipes.data" :key="recipe.id" class="border-solid border-2 border-black w-fit p-6 m-y-3">
          <li class="list-none"> {{ recipe.title }} </li>
          <li class="list-none"> {{ recipe.description }} </li>
          </div>
      </ul>
    </div>
  </div>
</template>

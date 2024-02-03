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
  <div class="bg-[#f3f1f2] min-h-screen relative w-full overflow-x-hidden p-4 flex flex-col">
    <div class="flex flex-col items-center gap-y-4">
      <!-- <h1>Démarrage Nuxt Strapi</h1> -->
      <div class="gap-x-4 hidden">
        <NuxtLink to="/start">
          Documentation
        </NuxtLink>
        <NuxtLink to="/exemple-recherche">
          Exemple de recherche
        </NuxtLink>
      </div>
    </div>

    <nav class="flex flex-row justify-between w-full absolute top-0 p-6 p-r-16 p-y-12 z-100 items-center mx-auto">
      <img src="../assets/logo.png" alt="logo" class="logo w-[6vw]">
      <div class="search flex flex-row justify-between items-center">
        <div class="p-4 p-x-6 p-r-40 border-none rounded-full border-white border-solid border-[3px] items-center flex flex-row gap-2">
          <img src="../assets/search.svg" alt="search">
          <input class="border-none text-white outline-none text-[1rem] bg-transparent placeholder-white" placeholder="Chercher une recette"
            type="text">
        </div>
      </div>
    </nav>

    <header class=" h-[70vh] w-full relative justify-end flex flex-row items-end mb-4">
      <img src="../assets/bg.png" alt="fond" class="absolute w-full h-full object-cover rounded-3xl z-0">
      <div class="flex flex-row justify-between w-full items-end p-8">
        <img src="../assets/pasta.png" alt="pate" class="z-10 flex relative w-[40vw] h-fit pasta">
        <img src="../assets/recipes.png" alt="recipes" class="recipe flex w-[22vw] h-[22vh] absolute bottom-8 right-8">
        <div class="recipe flex flex-col relative h-fit w-[21.5vw] p-4 justify-between gap-5">
          <p class="z-10 text-[1.2rem] uppercase tracking-tighter"><span class="font-bold text-[2rem]">500
              +</span><br>amazing recipes</p>
          <div class="flex flex-row align-center items-center z-10 justify-between w-full relative">
            <img src="../assets/pastilles.png" alt="pastilles" class="flex relative w-[8vw] h-fit z-10">
            <a href="#recipes"
              class="uppercase bg-[#141414] border-none text-white text-xl font-medium rounded-full p-3 p-x-6 gap-4 items-center flex flex-row tracking-tighter no-underline">explore
              <img class="w-[1vw]" src="../assets/arrow.png" alt="arrow"></a>
          </div>
        </div>
      </div>
    </header>

    <div v-if="recipes" id="recipes" class="z-10 flex w-full">
      <ul class="grid grid-cols-4 gap-6 w-full p-0">
        <div v-for="recipe in recipes" :key="recipe.id"
          class="w-fill p-6 m-y-3  gap-y-2 flex flex-col rounded-xl bg-white justify-between">
          <div class="w-fill flex flex-col">
            <img :src="recipe.image[0].url" alt="image pate"
              class="w-fill h-80 min-h-80 object-cover object-bottom rounded-lg">
            <li @click="$router.push(`/recipes/${recipe.slug}`)"
              class="list-none text-xl bg-[#f6c944] p-x-5 p-y-1 tracking-wider m-y-3 rounded-lg">
              {{ recipe.title }}</li>
            <!-- <li class="list-none"> {{ recipe.tags[0] }} </li> -->
            <li class="list-none tracking-wide leading-6"> {{ recipe.description }} </li>
          </div>
          <li @click="$router.push(`/recipes/${recipe.slug}`)"
            class="border-solid border-2 border-black list-none p-y-3 bg-white tracking-wider m-y-3 hover:cursor-pointer hover:scale-105 transition-all text-center rounded-full">
            See more</li>
        </div>
      </ul>
    </div>
  </div>
</template>

<style>
  @media screen and (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }

    header {
      height: 50vh !important;
    }

    .recipe {
      display: none;
    }

    .pasta {
      width: 100%;
    }

    nav {
      padding: 2rem 1rem !important;
    }

    .logo {
      width: 20%;
    }

    .search {
      width: 70%;
    }

    .search div {
      padding: 0.5rem 1rem;
    }
  }
</style>
<script lang="ts" setup>
import type { ITag } from '~/models/recipe.model';
// import { useAsyncData } from "../../.nuxt/imports";

const { find } = useStrapi();
const search = useSearchStore();

// const { data: recipes, pending, error } = await useAsyncData('recipes', () => $fetch('http://localhost:1337/api/recipes?populate=*'));
// console.log('recipes', recipes);

const { data: recipes } = await find('recipes', { populate: '*' });
console.log('recipes', recipes);

// const { data: tags } = await find('tags', { populate: '*' });
// console.log('tags', tags);

const { data: tags } = useAsyncData(
  'tags',
  () => find<{ data: ITag[] }>('tags'),
)

function addTag(tag: string) {
  if (!search.queryTags.includes(tag))
    search.queryTags.push(tag)
  else search.queryTags = search.queryTags.filter(t => t !== tag)
}

onMounted(() => {
  console.log(recipes);
});


</script>

<template>
  <div class="bg-[#f3f1f2] min-h-screen relative w-full overflow-x-hidden p-4 flex flex-col" v-if="!search.pending && search.sortedByTags">
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
        <div
          class="p-4 p-x-6 p-r-40 border-none rounded-full border-white border-solid border-[3px] items-center flex flex-row gap-2">
          <img src="../assets/search.svg" alt="search">
          <input id="search" v-model="search.query"
            class="border-none text-white outline-none text-[1rem] bg-transparent placeholder-white"
            placeholder="Chercher une recette" type="search">
        </div>
      </div>
    </nav>

    <header class=" h-[70vh] w-full relative justify-end flex flex-row items-end mb-12">
      <img src="../assets/bg.png" alt="fond" class="absolute w-full h-full object-cover rounded-3xl z-0">
      <div class="flex flex-row justify-between w-full items-end p-8">
        <img src="../assets/pasta.png" alt="pate" class="z-10 flex relative w-[40vw] h-fit pasta">
        <img src="../assets/recipes.png" alt="recipes" class="recipe flex w-[22vw] h-[18vh] absolute bottom-8 right-8">
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

    <div v-if="search.sortedByTags" id="recipes" class="z-10 flex flex-col w-full">
      <div v-if="tags">
        <h2 class="list-none text-3xl p-y-4 tracking-wider">All our recipes</h2>
        <ul class="tags flex flex-row gap-4 p-y-4">
          <div v-for="tag in tags?.data" :key="tag.id">
            <li :class="[search.queryTags.includes(tag.slug) ? 'bg-[#f6c944] p-4 p-x-6 w-fit capitalize rounded-full list-none hover:cursor-pointer' : 'bg-[#f6c944] bg-opacity-50 p-4 p-x-6 w-fit capitalize rounded-full list-none hover:cursor-pointer']" :title="tag.title" @click="addTag(tag.slug)">
              {{ tag.title }}</li>
            <!-- <Tag/> -->
          </div>
        </ul>
      </div>
      <ul class="grid grid-cols-4 gap-6 gap-y-1 w-full p-0">
        <div v-for="recipe in search.sortedByTags" :key="recipe.id"
          class="w-fill p-6 m-y-3  gap-y-2 flex flex-col rounded-xl bg-white justify-between min-h-[62vh]">
          <div class="w-fill flex flex-col">
            <img :src="recipe.image[0].url" :alt="recipe.image[0].name"
              class="w-fill h-80 min-h-80 object-cover object-bottom rounded-lg">
            <li @click="$router.push(`/recipes/${recipe.slug}`)"
              class="list-none text-xl bg-[#f6c944] p-x-5 p-y-1 tracking-wider m-y-3 rounded-lg">
              {{ recipe.title }}</li>
            <!-- <li class="list-none"> {{ recipe.tags[0] }} </li> -->
            <li class="list-none tracking-wide leading-6"> {{ recipe.description }} </li>
          </div>
          <div>
            <ul class="flex flex-row gap-4">
              <li
                v-for="(tag, index) in recipe.tags"
                :key="index"
                class="bg-[#f6c944] bg-opacity-50 p-4 p-x-6 w-fit capitalize rounded-full list-none hover:cursor-pointer"
              >
                {{ tag.title }}
              </li>
            </ul>
            <li @click="$router.push(`/recipes/${recipe.slug}`)"
              class="border-solid border-2 border-black list-none p-y-3 bg-white tracking-wider m-y-3 hover:cursor-pointer hover:scale-105 transition-all text-center rounded-full">
              See more</li>
          </div>
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

  .tags {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}</style>
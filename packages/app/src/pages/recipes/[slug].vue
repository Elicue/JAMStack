<script lang="ts" setup>

// import { useAsyncData } from "../../.nuxt/imports";

const route = useRoute();
const { find } = useStrapi();

// const {data: recipe, pending, error} = await useAsyncData('recipes', () => $fetch(`http://localhost:1337/api/recipes?slug=${route.params.slug}`));
// console.log('recipe', recipe);

const {data: recipe} = await find('recipes', {filters:{slug: route.params.slug}});
console.log('recipe', recipe);

</script>

<template>
  <div v-if="recipe">
    <h1>{{ recipe[0].title }}</h1>
    <p>{{ recipe[0].description }}</p>
  </div>
</template>
<script lang="ts" setup>

// import { useAsyncData } from "../../.nuxt/imports";

const route = useRoute();
const { find } = useStrapi();

// const {data: recipe, pending, error} = await useAsyncData('recipes', () => $fetch(`http://localhost:1337/api/recipes?slug=${route.params.slug}`));
// console.log('recipe', recipe);

const {data: recipe} = await find('recipes', {filters:{slug: route.params.slug}, populate: '*'});
console.log('recipe', recipe);
// console.log('tags', recipe[0].tags[0].title);

const tags = recipe[0].tags;

</script>

<template>
  <div v-if="recipe" class="flex flex-row items-center gap-4">
    <p
      v-for="(tag, index) in tags"
      :key="index"
      class="bg-[#f6c944] bg-opacity-50 p-4 p-x-6 w-fit capitalize rounded-full"
    >
      {{ tag.title }}
    </p>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const words: Ref<string[]> = ref(["Mind"]);

const createPost = () => {
  return router.push({
    name: "post-create",
  });
};
</script>
<template>
  <NuxtLayout name="landing-layout">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-12 px-4 py-6 relative space-y-10">
        <div class="text-center">
          <h1
            class="font-semibold lg:text-5xl sm:text-4xl uppercase text-slate-900"
          >
            Express Your Wildest
            <span v-for="(word, index) in words" :key="index">{{ word }}</span>
            Through
          </h1>
          <p
            class="font-extrabold lg:text-5xl sm:text-4xl uppercase text-slate-900"
          >
            MEME
          </p>
        </div>
        <div class="flex justify-center space-x-4">
          <BasePrimaryButton @click="createPost()" type="button"
            >Post MEME</BasePrimaryButton
          >
          <BaseSecondaryButton type="button">Find MEME</BaseSecondaryButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

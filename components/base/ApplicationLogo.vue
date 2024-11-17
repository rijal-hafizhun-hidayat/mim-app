<script setup lang="ts">
const router = useRouter();

const toLandingPage = () => {
  return router.push({
    name: "index",
  });
};
</script>
<template>
  <h1
    @click="toLandingPage()"
    class="text-2xl hover:cursor-pointer text-center font-bold"
  >
    MIM
  </h1>
</template>

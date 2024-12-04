<script setup lang="ts">
console.log(true);
</script>
<template>
  <NuxtLayout name="landing-layout">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-12 px-4 py-6 space-y-8">
        <div class="text-center space-y-6">
          <h1 class="text-4xl">
            Support <span class="uppercase font-bold">mim</span>
          </h1>
          <p class="text-slate-900 text-xs sm:text-sm">
            Mim will always be free for everyone. However, if you would like to
            support the platform, your support would be greatly appreciated as
            it helps cover development and server costs. Thank you so much!
          </p>
        </div>
        <div class="flex justify-center space-x-4">
          <BasePrimaryButton type="button">social buzz</BasePrimaryButton>
          <BasePrimaryButton type="button">saweria</BasePrimaryButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

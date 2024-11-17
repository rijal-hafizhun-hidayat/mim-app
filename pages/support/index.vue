<script setup lang="ts">
console.log(true);
</script>
<template>
  <NuxtLayout name="landing-layout">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-12 px-4 py-6 space-y-8">
        <div class="text-center">
          <p class="text-slate-900 text-2xl">
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

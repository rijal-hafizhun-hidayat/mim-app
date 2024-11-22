<script setup lang="ts">
const props = defineProps<{
  src_img: string;
}>();
</script>
<template>
  <div class="relative w-full overflow-hidden">
    <img
      class="h-auto w-full object-cover rounded-lg"
      :src="props.src_img"
      alt=""
    />
  </div>
</template>

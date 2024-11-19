<script setup lang="ts">
const props = defineProps<{
  source: string;
  type?: string;
}>();
</script>

<template>
  <div class="relative w-full h-96 overflow-hidden">
    <video class="absolute w-full h-full" controls controlsList="nodownload">
      <source :src="props.source" :type="props.type" />
    </video>
  </div>
</template>
<!-- <style scoped>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 70%; /* Aspect ratio 16:9 */
  height: 0;
  overflow: hidden;
}

.responsive-video {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style> -->

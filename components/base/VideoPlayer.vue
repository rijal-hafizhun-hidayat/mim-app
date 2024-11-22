<script setup lang="ts">
defineProps<{
  source: string;
  type?: string;
}>();

const videoRef: Ref<HTMLVideoElement | null> = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = videoRef.value;

        if (video) {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  if (videoRef.value) {
    observer.observe(videoRef.value);
  }

  onUnmounted(() => {
    if (videoRef.value) {
      observer.unobserve(videoRef.value);
    } else {
      observer.disconnect();
    }
  });
});
</script>

<template>
  <div class="relative w-full h-96 overflow-hidden">
    <video
      ref="videoRef"
      class="absolute w-full h-full"
      controls
      controlsList="nodownload"
    >
      <source :src="source" :type="type" />
    </video>
  </div>
</template>

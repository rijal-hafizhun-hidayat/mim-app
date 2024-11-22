<script setup lang="ts">
interface Fetch {
  statusCode: number;
  message: string;
  data: Posts[];
}
interface Posts {
  content: string;
  created_at: Date;
  id: number;
  name: string;
  updated_at: Date;
  post_file: PostFile | null;
  post_types: PostTypesWithMemeType[];
}
interface PostFile {
  created_at: Date;
  id: number;
  path: string;
  post_id: number;
  updated_at: Date;
  type_file: string;
}
interface PostTypesWithMemeType {
  created_at: Date;
  id: number;
  meme_type_id: number;
  post_id: number;
  updated_at: Date;
  meme_type: MemeType;
}
interface MemeType {
  id: number;
  created_at: Date;
  name: string;
  updated_at: Date;
}

const posts: Ref<Posts[]> = ref([]);

const { data, error } = await useCustomFetch<Fetch>("post");
if (data.value) {
  posts.value = data.value.data;
  console.log(posts.value);
} else if (error.value) {
  console.log(error.value);
}
</script>
<template>
  <NuxtLayout name="landing-layout">
    <PostSearch />
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-for="post in posts"
        :key="post.id"
        class="mt-10 px-4 py-6 overflow-x-auto border"
      >
        <article class="space-y-4">
          <div class="flex flex-row space-x-2">
            <p>Sender :</p>
            <p>{{ post.name }}</p>
          </div>
          <div class="flex flex-row space-x-2">
            <p>Meme Type:</p>
            <PostType :post_types="post.post_types" />
          </div>
          <div class="text-balance">
            {{ post.content }}
          </div>
          <div v-if="post.post_file">
            <BaseVideoPlayer
              v-if="post.post_file.type_file === 'video/mp4'"
              :source="post.post_file.path"
              :type="post.post_file.type_file"
            />
            <BaseImage v-else :src_img="post.post_file.path" />
          </div>
        </article>
      </div>
      <div>
        <PostMore />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface Fetch {
  statusCode: number;
  message: string;
  data: Posts[];
}
interface Form {
  search: string;
  meme_types: MemeType[];
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
  background_color: string;
  text_color: string;
  updated_at: Date;
}

const { $api } = useNuxtApp();
const posts: Ref<Posts[]> = ref([]);

const { data, error } = await useCustomFetch<Fetch>("post");
if (data.value) {
  posts.value = data.value.data;
  console.log(posts.value);
} else if (error.value) {
  console.log(error.value);
}

const getSearchData = async (searchData: Form) => {
  //console.log(searchData.meme_types);
  try {
    const result: Fetch = await $api<Fetch>("post", {
      query: {
        search: searchData.search,
        meme_types: searchData.meme_types as MemeType[],
      },
    });
    posts.value = result.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <NuxtLayout name="landing-layout">
    <PostSearch @search="getSearchData" />
    <div v-if="posts.length > 0" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
    <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-10 px-4 py-6 overflow-x-auto border">
        <p class="text-center">no post found</p>
      </div>
      <div>
        <PostMore />
      </div>
    </div>
  </NuxtLayout>
</template>

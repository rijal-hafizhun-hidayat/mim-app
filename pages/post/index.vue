<script setup lang="ts">
interface Fetch {
  statusCode: number;
  message: string;
  data: PostsWithPostFileAndPostTypes[];
  post_count: number;
}
interface Form {
  search: string;
  meme_types: MemeType[];
}
interface PostsWithPostFileAndPostTypes {
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

const route = useRoute();
const { $api, $swal } = useNuxtApp();
const posts: Ref<PostsWithPostFileAndPostTypes[]> = ref([]);
const countAllPosts: Ref<number> = ref(0);
const cursor: Ref<number> = ref(5);
const form: Form = reactive({
  search: "",
  meme_types: [],
});

const { data, error } = await useCustomFetch<Fetch>("post");
if (data.value) {
  posts.value = data.value.data;
  countAllPosts.value = data.value.post_count;
  console.log(data.value);
  console.log(countAllPosts.value);
} else if (error.value) {
  console.log(error.value);
}

const getSearchData = async (searchData: Form) => {
  setReactiveStateForm(searchData);

  try {
    const result: Fetch = await $api<Fetch>("post", {
      query: {
        cursor: cursor.value,
        search: searchData.search,
        meme_types: searchData.meme_types as MemeType[],
      },
    });
    posts.value = result.data;
    countAllPosts.value = result.post_count;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const cursorPaginationPost = async (postLength: number) => {
  if (countAllPosts.value > postLength) {
    try {
      const result: Fetch = await $api<Fetch>("post", {
        query: {
          cursor: (cursor.value += 2),
          search: form.search,
          meme_types: form.meme_types as MemeType[],
        },
      });
      posts.value = result.data;
      countAllPosts.value = result.post_count;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    $swal.fire({
      title: "info!",
      text: "this is maximum post",
      icon: "info",
    });
  }
};

const setReactiveStateForm = (state: Form) => {
  form.search = state.search;
  form.meme_types = state.meme_types;
};

const copyLink = (postId: number) => {
  const config = useRuntimeConfig();
  navigator.clipboard.writeText(
    `${config.public.urlBase + route.fullPath}/${postId}`
  );
  $swal.fire({
    title: "success",
    text: "copy link success",
    icon: "success",
  });
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
          <div class="flex justify-between">
            <div class="flex flex-row space-x-2">
              <p>Sender :</p>
              <p>{{ post.name }}</p>
            </div>
            <div>
              <div class="sm:flex sm:items-center sm:ml-6">
                <div class="ml-3 relative">
                  <BaseDropdown align="right" width="48">
                    <template #trigger>
                      <span class="inline-flex rounded-md">
                        <button
                          type="button"
                          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                          <font-awesome icon="fa-ellipsis-vertical" />
                        </button>
                      </span>
                    </template>
                    <template #content>
                      <a
                        @click="copyLink(post.id)"
                        class="cursor-pointer block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        Copy Link
                      </a>
                    </template>
                  </BaseDropdown>
                </div>
              </div>
            </div>
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
        <PostCursorPagination @click="cursorPaginationPost(posts.length)" />
      </div>
    </div>
    <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-10 px-4 py-6 overflow-x-auto border">
        <p class="text-center">no post found</p>
      </div>
    </div>
  </NuxtLayout>
</template>

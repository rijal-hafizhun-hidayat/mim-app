<script setup lang="ts">
interface Form {
  search: string;
}
interface PostType {
  name: string;
  code: string;
}

const selectedPostTypes: Ref<PostType[]> = ref([]);
const options: Ref<PostType[]> = ref([
  { name: "Vue.js", code: "vu" },
  { name: "Javascript", code: "js" },
  { name: "Open Source", code: "os" },
]);
const form: Form = reactive({
  search: "",
});

const search = () => {
  console.log(form);
  console.log(selectedPostTypes.value);
};
</script>
<template>
  <NuxtLayout name="landing-layout">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-10 px-4 py-6 border">
        <form
          @submit.prevent="search()"
          class="grid grid-flow-col justify-stretch space-x-4"
        >
          <div>
            <BaseTextInput
              type="text"
              class="block mt-1 w-full"
              v-model="form.search"
              placeholder="search by content"
            />
          </div>
          <div>
            <multiselect
              class="block mt-1 w-full"
              v-model="selectedPostTypes"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="code"
              :options="options"
              :multiple="true"
              :taggable="true"
            ></multiselect>
          </div>
          <div class="my-auto">
            <BasePrimaryButton type="submit">search</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-10 px-4 py-6 overflow-x-auto border">
        <article class="space-y-4">
          <div class="flex flex-row space-x-2">
            <p>Sender :</p>
            <p>Bebs21</p>
          </div>
          <div class="text-balance">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
          </div>
          <div>
            <BaseVideoPlayer
              :source="'/video/example.mp4'"
              :type="'video/mp4'"
            />
          </div>
        </article>
      </div>
    </div>
  </NuxtLayout>
</template>

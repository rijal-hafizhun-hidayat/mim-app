<script setup lang="ts">
interface Form {
  search: string;
  meme_types: MemeType[];
}
interface Fetch {
  statusCode: number;
  message: string;
  data: MemeType[];
}
interface MemeType {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  background_color: string;
  text_color: string;
}

const emit = defineEmits<{
  search: [value: Form];
}>();
const memeTypes: Ref<MemeType[]> = ref([]);
const form: Form = reactive({
  search: "",
  meme_types: [] as MemeType[],
});

const { data, error } = await useCustomFetch<Fetch>("meme_type");
if (data.value) {
  memeTypes.value = data.value.data;
} else if (error.value) {
  console.log(error.value);
}

const search = () => {
  emit("search", form);
};
</script>

<template>
  <div class="sticky top-16 z-10">
    <div class="max-w-5xl bg-white mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-10 px-4 py-6 border">
        <form @submit.prevent="search()">
          <div class="grid grid-row-1 sm:grid-cols-3 gap-3">
            <div>
              <BaseTextInput
                type="text"
                class="block mt-1 w-full"
                v-model="form.search"
                placeholder="search by content"
              />
            </div>
            <div>
              <Multiselect
                :close-on-select="false"
                :clear-on-select="false"
                class="block mt-1 w-full"
                v-model="form.meme_types"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="name"
                track-by="id"
                :options="memeTypes"
                :multiple="true"
                :taggable="true"
              ></Multiselect>
            </div>
            <div class="my-auto">
              <BasePrimaryButton type="submit">search</BasePrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Form {
  name: string;
  content: string;
  file: File | string;
  post_type: PostType[];
}
interface FileUpload {
  file: File | string;
  name: String;
  size: number;
  type: String;
  fileExtention: String;
  url: String;
  isImage: Boolean;
  isUploaded: Boolean;
}
interface PostType {
  name: string;
  code: string;
}

const options: Ref<PostType[]> = ref([
  { name: "Vue.js", code: "vu" },
  { name: "Javascript", code: "js" },
  { name: "Open Source", code: "os" },
]);
const form: Form = reactive({
  name: "",
  content: "",
  file: "",
  post_type: [],
});

const send = () => {
  console.log(form);
};

const getUploadData = (dataFile: FileUpload) => {
  if (dataFile.size > 0) {
    form.file = dataFile.file as File;
  } else {
    form.file = "";
  }
};
</script>
<template>
  <NuxtLayout name="landing-layout">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-10 px-4 py-6 overflow-x-auto">
        <PostWarning />
        <form @submit.prevent="send()" class="space-y-4">
          <div>
            <BaseInputLabel>Nama Pengirim</BaseInputLabel>
            <BaseTextInput
              type="text"
              class="block mt-1 w-full"
              v-model="form.name"
            />
          </div>
          <div>
            <BaseInputLabel>Content Meme</BaseInputLabel>
            <BaseTextAreaInput
              rows="8"
              v-model="form.content"
              class="block mt-1 w-full"
            ></BaseTextAreaInput>
          </div>
          <div>
            <BaseInputLabel>Meme Type</BaseInputLabel>
            <Multiselect
              class="block mt-1 w-full"
              v-model="form.post_type"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="code"
              :options="options"
              :multiple="true"
              :taggable="true"
            ></Multiselect>
          </div>
          <div>
            <BaseInputLabel>Upload File</BaseInputLabel>
            <BaseFileUpload
              :maxSize="1"
              :accept="'png,jpg,jpeg,mkv,mp4'"
              class="block mt-1 w-full"
              @file-upload="getUploadData"
            />
          </div>
          <div>
            <BasePrimaryButton type="submit">send</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

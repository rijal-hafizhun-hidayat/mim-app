<script setup lang="ts">
interface Form {
  name: string;
  content: string;
  file: File | string;
  meme_types: MemeType[] | string;
}
interface Result {
  statusCode: number;
  message: string;
  data: Post;
}
interface Post {
  content: string;
  created_at: Date;
  id: number;
  name: string;
  updated_at: Date;
}
interface Fetch {
  data: MemeType[];
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
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
interface MemeType {
  name: string;
  code: string;
}

const { $api, $swal } = useNuxtApp();
const memeTypes: Ref<MemeType[]> = ref([]);
const validation: Ref<Validation | null> = ref(null);
const form: Form = reactive({
  name: "",
  content: "",
  file: "",
  meme_types: [],
});

const { data, error } = await useCustomFetch<Fetch>("meme_type");
if (data.value) {
  memeTypes.value = data.value.data;
  console.log(memeTypes.value);
} else if (error.value) {
  console.log(error.value);
}

const send = async () => {
  try {
    const result = await $api<Result>("post", {
      method: "post",
      body: {
        name: form.name,
        content: form.content,
        meme_types: form.meme_types,
      },
    });

    if (form.file) {
      const formData = new FormData();
      formData.append("file", form.file);

      const sendPostFile = await $api(
        `storage/post/${result.data.id}/post_file`,
        {
          method: "post",
          body: formData,
        }
      );

      console.log(sendPostFile);
    }

    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });
  } catch (error: any) {
    const err = error.data as Validation;
    validation.value = err;
    console.log(validation.value);
  }
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
            <BaseInputError
              v-if="validation && validation.errors.name"
              :message="validation.errors.name[0]"
            />
          </div>
          <div>
            <BaseInputLabel>Content Meme</BaseInputLabel>
            <BaseTextAreaInput
              rows="8"
              v-model="form.content"
              class="block mt-1 w-full"
            />
            <BaseInputError
              v-if="validation && validation.errors.content"
              :message="validation.errors.content[0]"
            />
          </div>
          <div>
            <BaseInputLabel>Meme Type</BaseInputLabel>
            <Multiselect
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
            <BaseInputError
              v-if="validation && validation.errors.meme_types"
              :message="validation.errors.meme_types[0]"
            />
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

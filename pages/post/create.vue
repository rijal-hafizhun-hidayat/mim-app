<script setup lang="ts">
console.log(true);
interface Form {
  name: string;
  content: string;
  file: File | string;
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

const form: Form = reactive({
  name: "",
  content: "",
  file: "",
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
        <div class="p-7 mb-4 text-sm rounded-lg bg-gray-800" role="alert">
          <h1 class="font-medium text-lg text-yellow-300">Note!</h1>
          <ul class="list-disc">
            <li class="text-white">
              <span class="text-yellow-300">Upload file tidak wajib</span>
            </li>
            <li class="text-white">
              <span class="text-yellow-300"
                >Jika ingin upload file, bisa menggunakan format jpg, png, mkv
                atau mp4</span
              >
            </li>
            <li class="text-white">
              <span class="text-yellow-300"
                >maksimum upload file is
                <span class="font-medium">1 mb</span></span
              >
            </li>
          </ul>
        </div>

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

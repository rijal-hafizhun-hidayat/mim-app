<script setup lang="ts">
interface Form {
  feedback: string;
}
interface Fetch {
  statusCode: number;
  message: string;
  data: Feedback;
}
interface Feedback {
  id: number;
  feedback: string;
  created_at: Date;
  updated_at: Date;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}

const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const { $api, $swal } = useNuxtApp();
const router = useRouter();
const form: Form = reactive({
  feedback: "",
});

const send = async () => {
  try {
    isLoading.value = true;
    const result: Fetch = await $api<Fetch>("feedback", {
      method: "post",
      body: {
        feedback: form.feedback,
      },
    });

    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });
  } catch (error: any) {
    const err = error.data as Validation;
    validation.value = err;
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <NuxtLayout name="landing-layout">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mt-12 px-4 py-6 space-y-8">
        <div class="text-center space-y-6">
          <h1 class="text-4xl">
            <span class="uppercase font-bold">Feedback</span>
          </h1>
          <p class="text-slate-900 text-xs sm:text-sm">
            We value your input! Please share your feedback about
            <span class="font-bold">Mim-App</span>. Your suggestions and
            insights will help us enhance and develop the app further.
          </p>
        </div>
        <div>
          <form @submit.prevent="send()" class="space-y-4">
            <div>
              <BaseInputLabel>Feedback</BaseInputLabel>
              <BaseTextAreaInput
                class="block mt-1 w-full"
                rows="10"
                v-model="form.feedback"
              />
              <BaseInputError
                v-if="validation && validation.errors.feedback"
                :message="validation.errors.feedback[0]"
              />
            </div>
            <div class="flex justify-end">
              <BasePrimaryButton
                :disabled="isLoading == true"
                :class="{ 'opacity-75': isLoading == true }"
                type="submit"
                >submit</BasePrimaryButton
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

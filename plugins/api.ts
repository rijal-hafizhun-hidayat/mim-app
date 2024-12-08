export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: config.public.apiBase || "http://localhost:8000/api",
    onRequest({ request }) {
      console.log(request);
      // if (token.value) {
      //   options.credentials = "include";
      // }
      //   if (token.value) {
      //     options.headers = options.headers || ({} as Record<string, string>);
      //     if (Array.isArray(options.headers)) {
      //       options.headers.push(["Authorization", `Bearer ${token.value}`]);
      //     } else if (options.headers instanceof Headers) {
      //       options.headers.set("Authorization", `Bearer ${token.value}`);
      //     } else {
      //       (options.headers as Record<string, string>)[
      //         "Authorization"
      //       ] = `Bearer ${token.value}`;
      //     }
      //   }
    },
    onResponse({ response }) {
      console.log(response);
    },
    async onResponseError({ response }) {
      console.log(response);
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});

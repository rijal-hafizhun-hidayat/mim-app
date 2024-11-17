import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default defineNuxtPlugin((useNuxtApp) => {
  useNuxtApp.vueApp.component("Multiselect", Multiselect);
});

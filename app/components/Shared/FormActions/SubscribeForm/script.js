import { ref } from "vue";
import useApi from "../../../../composables/useApi.js";

const { post, loading } = useApi();

const formData = ref({
  email: "",
  lastname: "",
  firstname: "",
});

const resetData = () => {
  formData.value = {
    email: "",
    lastname: "",
    firstname: "",
  };
};

const buildFormData = () => {
  const formattedData = new FormData();

  for (const key in formData.value) {
    if (key !== "phone" && key !== "country_code") {
      formattedData.append(key, formData.value[key]);
    }
  }




  return formattedData;
};

const submited = async () => {
  const formattedData = buildFormData();
  const response = await post("subscribers", formattedData);
  if (response) {
    resetData();
  }
};

export { formData, loading, submited, post, resetData, buildFormData };

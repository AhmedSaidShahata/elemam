import { ref } from "vue";
import useApi from "../../../../composables/useApi.js";

const { post, get, loading } = useApi();

const allTopics = ref([]);
const formData = ref({
  person_name: "",
  person_email: "",
  contact_topic: "",
  body: "",
  phone: "",
  country_code: "00966",
});

const resetData = () => {
  formData.value = {
    person_name: "",
    person_email: "",
    contact_topic: "",
    body: "",
    phone: "",
    country_code: "00966",
  };
};

const getAllTopics = async () => {
  const response = await get("/contact-topics?pagination=all");
  allTopics.value = response?.data?.data; // [{id: '', name: ''}]
};

const buildFormData = () => {
  const formattedData = new FormData();

  for (const key in formData.value) {
    if (key !== "phone" && key !== "country_code") {
      formattedData.append(key, formData.value[key]);
    }
  }

  let phone = formData.value.phone.startsWith("0")
    ? formData.value.phone.substring(1)
    : formData.value.phone;

  formattedData.append("phone[number]", phone);
  formattedData.append("phone[country_code]", formData.value.country_code);



  return formattedData;
};

const submited = async () => {
  const formattedData = buildFormData();
  const response = await post("contact-messages", formattedData);
  if (response) {
    resetData();
  }
};

export {
  formData,
  loading,
  submited,
  post,
  resetData,
  buildFormData,
  getAllTopics,
  allTopics,
};

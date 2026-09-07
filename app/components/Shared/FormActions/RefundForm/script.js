import { ref } from "vue";
import useApi from "../../../../composables/useApi.js";

const { post, get, loading } = useApi();

const formData = ref({
  person_name: "",
  order_number:"",
  person_email:"",
  national_id: "",
  phone: "",
  country_code: "00966",
  reasons:""
});

const resetData = () => {
  formData.value = {
  person_name: "",
  order_number:"",
  person_email:"",
  national_id: "",
  phone: "",
  country_code: "00966",
  reasons:""
};
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
  const response = await post("refund-forms", formattedData);
  if (response) {
    resetData();
  }
};

export { formData, loading, submited, post, resetData, buildFormData };

import { ref } from "vue";
import axios from "../axios";

export default () => {
  const errorsResponse = ref({});
  const loading = ref(false);

  const handleRequest = async (request) => {
    loading.value = true;
    errorsResponse.value = {};
    try {
      const result = await request();
      return result;
    } catch (error) {
      errorsResponse.value = error.response?.data?.errors;
    } finally {
      loading.value = false;
    }
  };

  const get = (url, params = null) => {
    return handleRequest(() => axios.get(url, { params }));
  };

  const post = (url, data = null) => {
    return handleRequest(() => axios.post(url, data));
  };

  const remove = (url, params = null) => {
    return handleRequest(() => axios.delete(url));
  };

  return { loading, errorsResponse, get, post, remove };
};

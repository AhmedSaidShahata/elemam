import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const useFilter = (filterName) => {
  const route = useRoute();
  const router = useRouter();

  const query = reactive({
    [filterName]: '',
  });

  const handleFilter = () => {
    const newQuery = { ...route.query };
    newQuery[filterName] = query[filterName];
    // Reset page when filter changes
    delete newQuery.page;
    router.push({ query: newQuery });
  };

  const removeFilter = () => {
    const newQuery = { ...route.query };
    delete newQuery[filterName];
    delete newQuery.page;
    router.push({ query: newQuery });
  };

  watch(
    () => route.query,
    (newQuery) => {
      if (newQuery[filterName]) {
        // Try to parse as number if it looks like one, otherwise keep as string
        const val = newQuery[filterName];
        query[filterName] = isNaN(val) ? val : Number(val);
      } else {
        query[filterName] = '';
      }
    },
    { immediate: true }
  );

  return {
    query,
    handleFilter,
    removeFilter,
  };
};

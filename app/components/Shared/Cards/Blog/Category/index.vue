<template>
    <div v-if="!display" class="blogs__category text-no-wrap size-14 my-3 px-5 d-flex justify-center" 
    :class="isActive ? 'blogs__category--active' : ''" 
    @click="handleFilter"
    >
        {{ item.name }}
      </div>
      <div v-else class="blogs-home__category-display my-3 px-5 font-weight-bold" 
    >
        {{ item.name }}
      </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  display: {
    type: Boolean,
    default: false,
  }
})

const route = useRoute()
const router = useRouter()

const isActive = computed(() => {
  return route.query.blog_category === String(props.item.id)
})

const handleFilter = () => {
        const query = { ...route.query }

        if (query.blog_category === String(props.item.id)) {
            delete query.blog_category
        } else {
            query.blog_category = props.item.id
        }

        router.push({ query })
}

</script>
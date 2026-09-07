<template>
  
    <v-data-table :headers="headers" :items="items" :loading="loading" :loading-text="$t('loading')"
        :no-data-text="$t('no-data')">
        <template v-slot:item="{ item }">
            <tr>
                <td v-for="header in headers" :key="header.key">
                    <slot :name="`item.${header.key}`" :item="item">
                        {{ item[header.key] }}
                    </slot>
                </td>
            </tr>
        </template>
    </v-data-table>
    <div class="text-center">
        <SharedPagination @change="loadItems" :config="config" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import useApi from "~/composables/useApi";
const { get } = useApi();
import accessEmitter from '@/utils/bus'
const emitter = accessEmitter();


const props = defineProps({
    headers: Array,
    url: String,
    query: Object
})


const items = ref([])
const loading = ref(true)
const config = reactive({})

const paginateConfig = (data) => {
    Object.assign(config, data)
}

const loadItems = async (current_page = 1) => {
    loading.value = true
    try {
        const { data } = await get(`/api/admin/${props.url}?page=${current_page}`, props.query)
        items.value = data.data.data
        paginateConfig(data.data)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadItems()
    emitter.on("reload-data", () => {
        loadItems()
    })
})
</script>

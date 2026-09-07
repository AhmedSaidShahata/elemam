<template>
    <v-dialog :persistent="persistent" :max-width="maxWidth" v-model="props.dialog"
    @input="$emit('update:dialog')" @click:outside="$emit('close-dialog')"
    style="z-index: 999999999 !important;">
        <v-card>
            <v-card-title v-if="title">
                {{ title }}
            </v-card-title>
            <v-card-text>
                <p v-if="message">
                    {{ message }}
                </p>
                <div>
                    <slot />
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>


const props = defineProps(['dialog', 'title', 'message', 'icon','persistent','maxWidth']);


</script>

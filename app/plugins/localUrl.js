import { defineNuxtPlugin } from '#imports'
import {
  checkLocal,
  staticUrl,
} from '~/utils/localUrl.js'

export default defineNuxtPlugin({
  name: 'local-url',

  setup() {
    return {
      provide: {
        checkLocal,
        staticUrl,
      },
    }
  },
})
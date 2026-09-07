export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.warnHandler = () => { }
  return {
    provide: {
      textTruncate: (value, count = 20) => {
        if (value && value.length > count) {
          return value.substring(0, count) + "...";
        } else {
          return value;
        }
      },


    },

  }
})
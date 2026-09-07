export default {
  load(config) {
    if (!config?.measurement_id || window.gtag) return
    const id = config.measurement_id
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script1)
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${id}');
    `
    document.head.appendChild(script2)
  }
}



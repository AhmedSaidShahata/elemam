export default {
  load(config) {
    if (!config?.container_id || window.google_tag_manager) return
    const id = config.container_id

    const script = document.createElement('script')
    script.innerHTML = `
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');
    `
    document.head.appendChild(script)
    
    const noscript = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.display = 'none'
    iframe.style.visibility = 'hidden'
    noscript.appendChild(iframe)

    if (document.body) {
      document.body.insertBefore(noscript, document.body.firstChild)
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.insertBefore(noscript, document.body.firstChild)
      })
    }
  }
}

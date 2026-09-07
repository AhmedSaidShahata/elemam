export default {
  load(config) {
    if (!config?.pixel_id || window.snaptr) return
    const id = config.pixel_id
    const script = document.createElement('script')
    script.innerHTML = `
      (function(e,t,n){
        if(e.snaptr)return;
        var a=e.snaptr=function(){
          a.handleRequest?a.handleRequest.apply(a,arguments):
          a.queue.push(arguments)
        };
        a.queue=[];
        var s='script';
        r=t.createElement(s);
        r.async=!0;
        r.src=n;
        var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);
      })(window,document,'https://sc-static.net/scevent.min.js');

      snaptr('init', '${id}');
      snaptr('track', 'PAGE_VIEW');
    `

    document.head.appendChild(script)
  }
}



window.onload = function() {
    // Get all elements with the cy-lazy class
    var lazyElements = document.querySelectorAll('.cy-lazy');

    // Get all the fade elements    
    var fadeElements = document.querySelectorAll('.fade-up-pre, .fade-down-pre, .fade-left-pre, .fade-right-pre');

    //lazyload images script
    function preloadImage(img){
        const src = img.getAttribute("data-photosource");
        if(!src){
            return;
        }
        if (img.tagName.toLowerCase() === 'img'){
            img.src = src;
        } else{
            img.style.backgroundImage = 'url(' + src + ')'
        }
    }
    const imgOptions = {
        threshold:0,
        rootMargin: "0px 0px -1px 0px"
    };
    const imgObserver = new IntersectionObserver((entries,imgObserver)=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting){
                return
            } else{
                preloadImage(entry.target);
                entry.target.classList.add("fade-in");
                imgObserver.unobserve(entry.target);
            }
        })
    },imgOptions);

    lazyElements.forEach(image=> {
        imgObserver.observe(image);
    });


    //lazyload fader script
    const fadeOptions = {
        threshold:0,
        rootMargin: "0px 0px -1px 0px"
    };
    const fadeObserver = new IntersectionObserver((entries,fadeObserver)=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting){
                return
            } else{
                const className = entry.target.classList[0];
                const newClass = className.replace('-pre', '');
                entry.target.classList.remove(className);
                entry.target.classList.add(newClass);
                fadeObserver.unobserve(entry.target);
            }
        })
    },fadeOptions);

    fadeElements.forEach(fader=> {
        fadeObserver.observe(fader);
    });


  //counter
  const counters = document.querySelectorAll('.num');
  const interval = 4000;

  counters.forEach((c)=>{
    let startValue = 0;
    let endValue = parseInt(c.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);

    let counter = setInterval(()=>{
      startValue+=1;
      c.textContent = startValue
      if(startValue===endValue){
        clearInterval(counter);
      }
    },duration)

  })



    var script = document.createElement('script');
        script.src = 'https://cy-sierra-assets.s3-us-west-1.amazonaws.com/sites/elevaterealtygroup.com/custom-scripts.js';
        script.type = 'text/javascript';
        document.body.appendChild(script);

    const footerBranding = `<a class="cherieYoung" href="https://www.cherieyoung.com/">Chime Custom Designs</a>`;
    const footerCredit = document.querySelector("#app > footer > div.footer-container > div.copyright > div > p:nth-child(1)");
    footerCredit.insertAdjacentHTML('afterend',footerBranding);

};
const logo = document.querySelector("#app > footer > div.footer-container > div.mg-container > div > div.right-content > div.site-logo > img");
logo.setAttribute("src","https://cy-chime-assets.s3.amazonaws.com/sites/laneescottrealtors.net/images/Full+Primary+White.png");
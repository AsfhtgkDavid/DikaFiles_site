
import 'https://unpkg.com/@egjs/conveyer/dist/conveyer.min.js'
let carousel = document.querySelector("div.imageCarousel")
const conveyer = new Conveyer("div.imageCarousel");

let images = [...carousel.children]
let active = 0
let isSwitchingManually = false



function nextImage(next) {
    active += next
    if (active >= images.length) {
        active = 0;
        conveyer.scrollIntoView("end", {
            align: "center",
            duration: 500,
            excludeStand: true,
          });
        return
    }
    if (active < 0) {
            active = images.length-1
        conveyer.scrollIntoView("start", {
            align: "center",
            duration: 500,
            excludeStand: true,
          });
          return
    }
    
    conveyer.scrollIntoView(next == 1 && "next" || "prev", {
        align: "center",
        duration: 500,
        excludeStand: true,
      });

}
document.querySelectorAll("button[carouselButton]").forEach((button)=>{
    button.addEventListener("click",()=>{
        nextImage(Number(button.attributes.next.value))
        isSwitchingManually = true
        window.setTimeout(()=>{isSwitchingManually =false},2000)
    })
})
window.setInterval(()=>{
    !isSwitchingManually && nextImage(1)
},2000)
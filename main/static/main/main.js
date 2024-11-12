
let carousel = document.querySelector("div.carouselWrapper")


let images = [...carousel.querySelectorAll("div.imageCarousel > img")]
let dots = [...carousel.querySelectorAll("div.imageDots > p")]
let active = 0
let isSwitchingManually = false
let timeout = null


function nextImage(next) {
    images[active].setAttribute("active",false);
    dots[active].setAttribute("active",false);
    active += next
    if (active >= images.length) {active = 0;}
    if (active < 0) {active = images.length-1}
    images[active].setAttribute("active",true);
    dots[active].setAttribute("active",true);
}

function setSwitchingManually() {
    isSwitchingManually = true
    if (timeout) {
        window.clearTimeout(timeout)
    }
    timeout = window.setTimeout(()=>{isSwitchingManually =false},2000)

}
dots.forEach((dot)=>{
    dot.addEventListener("click",()=>{
        nextImage(Math.abs(active-dots.indexOf(dot)))
        setSwitchingManually()
    })

})

document.querySelectorAll("button[carouselButton]").forEach((button)=>{
    button.addEventListener("click",()=>{
        nextImage(Number(button.attributes.next.value))
    setSwitchingManually()


        
    })
})
window.setInterval(()=>{
    !isSwitchingManually && nextImage(1)
},2000)
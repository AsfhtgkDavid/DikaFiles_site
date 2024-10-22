let carousel = document.querySelector("div.imageCarousel")
let images = [...carousel.children]
let active = 0
document.querySelectorAll("button[carouselButton]").forEach((button)=>{
    button.addEventListener("click",()=>{
        active += Number(button.attributes.next.value)
        if (active >= images.length) active = 0
        if (active < 0) active = images.length-1
        images[active].scrollIntoView({ block: "center", behavior: "smooth" })
    })
})
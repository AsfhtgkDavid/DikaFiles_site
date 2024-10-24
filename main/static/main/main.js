let carousel = document.querySelector("div.imageCarousel")
let images = [...carousel.children]
let active = 0
let isSwitchingManually = false

// const scrollIntoViewHorizontally = (container,child) => {
//     const child_offsetRight = child.offsetLeft + child.offsetWidth;
//     const container_scrollRight = container.scrollLeft + container.offsetWidth;
//     container.scrollLeft += 500
//     container.scrollLeft = container.scrollLeft % 1500
//     console.log(container.scrollLeft)
//   };

let scrollIntoViewIfNeeded;

import(
  'https://esm.sh/scroll-into-view-if-needed'
).then(({default: scrollFunc}) => {scrollIntoViewIfNeeded = scrollFunc})
  


function nextImage(next) {
    active += next
    if (active >= images.length) active = 0
    if (active < 0) active = images.length-1
    // carousel.scrollTo({
    //     left: images[active].offsetLeft,
    //     behavior: "smooth",
    //   });
    scrollIntoViewIfNeeded(images[active], { behavior: 'smooth', block: 'nearest', inline: 'center', scrollMode: 'if-needed' })
    //scrollIntoViewHorizontally(carousel,images[active])
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
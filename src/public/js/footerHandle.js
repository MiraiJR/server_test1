window.addEventListener("scroll", function() {
    var doc = document.documentElement
    var rollback = this.document.getElementById("scroll-top")
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    if(top != 0){
        rollback.style.opacity = "1"
    }else {
        rollback.style.opacity = "0"
    }
})

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
}
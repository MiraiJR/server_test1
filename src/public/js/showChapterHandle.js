(function activeChapterIsReading() {
    let getSlugFromCurUrl = Url => new URL(Url).pathname.match(/[^\/]+/g)

    var slugChapter = getSlugFromCurUrl(window.location.href)
    slugChapter = slugChapter[slugChapter.length - 1]
    document.getElementById(`${slugChapter}`).classList.add('chapter-active')
})()

var listChapterLeftLayer = document.getElementById('list-chapter-left-layer')
var listChapterLeft = document.getElementById('list-chapter-left')
var listChapterMain = document.getElementById('list-chapter-left-list-main')
var listChapterExtra = document.getElementById('list-chapter-left-list-extra')
document.addEventListener("click", function(event) {
    if(!listChapterLeft.contains(event.target)) {
        listChapterLeftLayer.style.display = 'none'
    }
    if(listChapterMain.contains(event.target) || listChapterExtra.contains(event.target)) {
        listChapterLeftLayer.style.display = 'block'
    }
})

function countViewPage() {
    let slug = url => new URL(url).pathname.match(/[^\/]+/g)
    var slugNameComic = `countViewPageComic-${slug(window.location.href)[1]}`

    // lứu ý thằng key= chỉ nhận tối đa 64 ký tự 
    if(slugNameComic.length > 64) {
        slugNameComic = slugNameComic.substring(0, 63)
    }

    fetch(`https://api.countapi.xyz/update/laptop/${slugNameComic}/?amount=1`)
        .then((res) => res.json())
        .then((res) => {
            if(res.value == null) {
                fetch(`https://api.countapi.xyz/create?namespace=laptop&key=${slugNameComic}&value=0`)
                    .then((res), countViewPage())
            }
        })
}
countViewPage()

var lastPosition = 0
window.addEventListener("scroll", () => {
    var curPosition = window.pageYOffset || document.documentElement.scrollTop

    if(curPosition >= lastPosition || curPosition < 200) {
        document.querySelector('.navigation-scroll-up').style.display = 'none'
    } else {
        document.querySelector('.navigation-scroll-up').style.animation = 'apearFromBotton 0.5s linear'
        document.querySelector('.navigation-scroll-up').style.display = 'block'
    }
    lastPosition = curPosition <= 0 ? 0 : curPosition
})

count = 0
function showListChapter(idTag) {
    count = count + 1
    if(count % 2 == 0)
    {
        document.getElementById(`${idTag}`).style.display = 'none'
    }else {
        document.getElementById(`${idTag}`).style.display = 'block'
    }
}

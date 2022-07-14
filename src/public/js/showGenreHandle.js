(function activeNumberPagination() {
    const curUrl = window.location.href
    let getSlugFromCurUrl = Url => new URL(Url).pathname.match(/[^\/]+/g)

    try {
        if(!curUrl.split("page=")[1]) {
            document.getElementById('page-1').classList.add('page-item-active')
        }else {
            document.getElementById(`page-${curUrl.split("page=")[1]}`).classList.add('page-item-active')
        }
    } catch(error) {
        return
    }
})()

function getNameGenreFromUrl() {
        const curUrl = window.location.href
        let getSlugFromCurUrl = Url => new URL(Url).pathname.match(/[^\/]+/g)
    try {
        const nameGenre = getSlugFromCurUrl(curUrl)[1]

        if(!nameGenre)
        {
            document.getElementById('breadcrumb-item-genre').remove()
            document.getElementById('breadcrumb-item-list').classList.add('breadcrumb-item-active')
        }
        document.getElementById('breadcrumb-name-genre').innerHTML = nameGenre

    } catch(error) {
        return
    }
}

getNameGenreFromUrl()
toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function showMoreAppearInContent(){
    var divContentComic = document.querySelector('.comic-detail-content-clearly').offsetHeight
    if (divContentComic == 50)
    {
        document.querySelector('.show-more-content').style.display = 'flex'
    }else {
        document.querySelector('.show-more-content').style.display = 'none'
    }
}
function showMoreAppearInChapter(){
    var divContentComic = document.querySelector('.comic-detail-chapter-list').offsetHeight
    if (divContentComic == 500)
    {
        document.querySelector('.show-more-chapter').style.display = 'flex'
    }else {
        document.querySelector('.show-more-chapter').style.display = 'none'
    }
}
showMoreAppearInChapter()
showMoreAppearInContent()

// xem thêm -> ẩn đi
function showMoreContent() {
    var eleShowMore = document.querySelector('.show-more-content')
    var statusShowMore = eleShowMore.classList[0]
    if (statusShowMore == 'more-state')
    {
        document.querySelector('.comic-detail-content-clearly').style.maxHeight = 'none'
        eleShowMore.innerHTML = 'Ẩn đi'
        eleShowMore.classList.replace('more-state', 'less-state')
    }else {
        document.querySelector('.comic-detail-content-clearly').style.maxHeight = '50px'
        eleShowMore.innerHTML = 'Xem thêm'
        eleShowMore.classList.replace('less-state', 'more-state')
    }
}

// xem thêm -> ẩn đi -> bên chapter
function showMoreChapter() {
    var eleShowMore = document.querySelector('.show-more-chapter')
    var statusShowMore = eleShowMore.classList[0]
    console.log(statusShowMore)
    if (statusShowMore == 'more-state')
    {
        document.querySelector('.comic-detail-chapter-list').style.maxHeight = 'none'
        eleShowMore.innerHTML = 'Ẩn đi'
        eleShowMore.classList.replace('more-state', 'less-state')
    }else {
        document.querySelector('.comic-detail-chapter-list').style.maxHeight = '500px'
        eleShowMore.innerHTML = 'Xem thêm'
        eleShowMore.classList.replace('less-state', 'more-state')
    }
}

// đếm số lượt xem page comic
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
            }else {
                document.getElementById('numberOfViews').innerHTML = `${res.value}`
            }
        })
}
countViewPage()

async function favouriteComicActive() {
    await fetch('/getComic/favouriteComic', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.text())
    .then((data) => {
        const slugComic = window.location.href.split('/')[4]
        if(data.includes(slugComic)) {
            document.querySelector('.favourite-comic').style.color = 'red'
        }
    })

}
favouriteComicActive()

async function addFavouriteComic(item) {
    await fetch('/getComic/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(async (data) => {
        if(!data) {
            toastr.warning("Vui lòng đăng nhập để thực hiện tính năng này")
        }else {
            if(document.querySelector('.favourite-comic').style.color == "red") {
                const comic = {}
                comic.slug = window.location.href.split('/')[4]

                await fetch('/getComic/favouriteComicRemove', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comic)
                })
                .then(res => res.json())
                .then((data) => {
                    toastr.success("Ban đã hủy yêu thích truyện " + data)
                })

                item.style.color = "white"
            }else {
                const comic = {}
                comic.slug = window.location.href.split('/')[4]

                await fetch('/getComic/favouriteComic', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comic)
                })
                .then(res => res.json())
                .then((data) => {
                    toastr.success("Ban đã thêm truyện này vào danh sách yêu thích truyện " + data)
                })

                item.style.color = "red"
            }
        }
    })       
    .catch((Error) => {
        toastr.warning("Vui lòng đăng nhập để thực hiện tính năng này!")
    })
}

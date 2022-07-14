var boxDataSearch = document.getElementById('navbar-search-data')
var searchInput = document.getElementById('navbar-search-box')
document.addEventListener('click', function(event) {
    if (!boxDataSearch.contains(event.target)) {
        boxDataSearch.style.display = 'none'
    }
    if (searchInput.contains(event.target)){
        boxDataSearch.style.display = 'block'
    }

})

function sendDataComic(item) {
    const resultSearch = document.getElementById('navbar-search-data')
    fetch('/getComic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({payload: item.value})
    })
        .then(res => res.json()).then(data => {
            let payload = data.payload
            resultSearch.innerHTML = '';
            if(payload.length < 1) {
                resultSearch.innerHTML = '<span>Không có truyện này</span>'
                return
            }
            payload.forEach((item, index) => {
                resultSearch.innerHTML += `<a href="/comic/${item.slug}" class="navbar-search-data-item">
                                                <img src="${item.urlImage}" alt="">
                                                <span>${item.name}</span>
                                            </a>`
            })
            return
        })
}
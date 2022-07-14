(function colorColumnInTable() {
    const list = document.querySelectorAll('tbody > tr')
    for(let i = 0; i < list.length; i++) {
        var idIndex = list[i].id.split('comics-')[1]
        if(idIndex % 2 == 0) {
            document.getElementById(`${list[i].id}`).style.backgroundColor = '#ccc'
        }
    }
})()

async function delComic(slug, index) {
    if(confirm('Bạn có muốn xóa truyện này ra khỏi danh sách yêu thích?'))
    {
        index = Number(index) + 1
        const delElement = document.getElementById(`comics-${index}`)
        delElement.remove()
        const comic = {}
        comic.slug = slug

        await fetch('/getComic/favouriteComicRemove', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comic)
        })

        location.reload()
    }
}
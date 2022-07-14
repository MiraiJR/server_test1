async function deleteComicInList(slugComic) {
    const eleNeedRemove = document.getElementById(`${slugComic}`)
    eleNeedRemove.remove()
    await fetch('/getComic/history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json()).then(async (data) =>{
        data = data.filter(item => item.comic != slugComic)

        await fetch('/getComic/updateHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if(data.length == 0) {
            document.getElementById('no-comic-in-history').innerHTML = "<span>Không có lịch sử đọc truyện!</span>"
        }
    })
}

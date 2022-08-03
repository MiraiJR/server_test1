var dialogfu = document.getElementById('dialog-box-upload-file')
var cavt = document.getElementById('user-replace-avt')
var count = 0

function showDialogBoxUploadFile() {
    count++
    if(count % 2 != 0) {
        dialogfu.style.display = 'block'
        cavt.style.color = 'black'
        console.log(cavt)
        document.addEventListener('click', function(event) {
            if (!dialogfu.contains(event.target)) {
                dialogfu.style.display = 'none'
                cavt.style.color = 'white'

            }
            if(cavt.contains(event.target)) {
                dialogfu.style.display = 'block'
                cavt.style.color = 'black'
            }
        })
    }else {
        dialogfu.style.display = 'none'
        cavt.style.color = 'white'
    }
}


const inputSubmit = document.getElementById('dialog-box-upload-file-form')
inputSubmit.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(inputSubmit)

    fetch('/me/uploadImage', {
        method: 'POST',
        body: formData
    }).then(r => r.json())
    .then(data => {
        document.getElementById('user-avatar').src= `${window.location.origin}/${data}`

        document.getElementById('user-avatar-preview').src= `${window.location.origin}/${data}`
        
        document.getElementById('admin-navbar-user-avatar').src= `${window.location.origin}/${data}`

        const dataImg = {}
        dataImg.linkImage = data

        fetch('/me/changeAvatarUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataImg)
        })
    })

})

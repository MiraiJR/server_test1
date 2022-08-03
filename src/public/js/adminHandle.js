(function activeNagivation() {
    const id = window.location.href.split('/')[4]
    document.getElementById(`${id}`).classList.add('active-navigation')
})()

var appearNavigation = 0
function disappearNavigation() {
    appearNavigation++
    const element = document.querySelector('.admin-navbar')
    if(appearNavigation % 2 != 0) {
        document.querySelector('.admin-navigation').style.display = 'none'
        element.parentElement.classList.replace('col-10', 'col-12')
    }else {
        document.querySelector('.admin-navigation').style.display = 'block'
        element.parentElement.classList.replace('col-12', 'col-10')

    }
}


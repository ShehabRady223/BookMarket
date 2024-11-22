var nameSite = document.getElementById('bookName');
var nameUrl = document.getElementById('bookUrl');
var subBtn = document.getElementById('submitBtn');
var tableBody = document.getElementById('tableBody');
var boxInfo = document.getElementById('boxInfo');
var closeBtn = document.getElementById('closeBtn');
var vistBtn = document.getElementById('vistBtn');

var webSites = []
//// webSites=localStorage.getItem(JSON.parse(webSites));
//// webSites=localStorage.getItem(JSON.parse('container'))
// console.log(JSON.parse(localStorage.getItem("container")));

if (JSON.parse(localStorage.getItem("container"))) {
    webSites = JSON.parse(localStorage.getItem("container"))
    display()
}

subBtn.addEventListener('click', function () {
    if (validation(nameSite) && validation(nameUrl)) {
        var webSite = {
            name: nameSite.value,
            url: nameUrl.value
        };
        webSites.push(webSite);
        localStorage.setItem("container", JSON.stringify(webSites))
        display();
        clear();
    }
    else
    boxInfo.classList.remove('d-none');
    closeBtn.addEventListener('click', function () {
        boxInfo.classList.add('d-none')
    })
})
function vist () {
    window.open(nameUrl.value , '_blank')
}

function display() {
    var container = '';
    for (var i = 0; i < webSites.length; i++) {
        container += `
    <tr>
<td>${i + 1}</td>
<td>${webSites[i].name}</td>
<td><button onclick="vist()" id="vistBtn" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button></td>
<td><button onclick="deleter(${i})" class="btn btn-delet"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
</tr>`;
    }
    tableBody.innerHTML = container;
}

function clear() {
    nameSite.value = null;
    nameUrl.value = null;
}

function deleter(index) {
    webSites.splice(index, 1);
    localStorage.setItem("container", JSON.stringify(webSites))
    display();
}

function validation(element) {
    var regex = {
        bookName: /^\w{3,}(\s+\w+)*$/,
        bookUrl: /^https?:\/\/\S+$/
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        return true
    }
    else {
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        return false
    }
}

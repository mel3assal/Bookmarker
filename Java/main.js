var siteName= document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var siteList;
if (localStorage.getItem("siteList") == null) {
    siteList = [];
} else {
    siteList = JSON.parse(localStorage.getItem("siteList"));
    displaySites(siteList);
}
function addSite() {
    if ((validateSiteName() == true)&&validateSiteUrl()==true){
        var site = {
            name: siteName.value,
            url: siteUrl.value,
        }
        siteList.push(site);
        localStorage.setItem("siteList", JSON.stringify(siteList));
        displaySites(siteList)
        clearForm();
    }
}
function displaySites(list) {
    var cartona = ``
    for (i = 0; i < list.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td><button onclick="visitSite(${i})" class="btn btn-success "> <i class="fa-solid fa-eye pe-2"></i>
        Visit</button>
        </td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i>
        Delete</button>
        </td>
    </tr>`
    }
    document.getElementById("getData").innerHTML = cartona;
}
function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}
function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem("siteList", JSON.stringify(siteList));
    displaySites(siteList)
}
function visitSite(index) {
    for(var i=0;i<siteList.length;i++){
        if(i==index){
            // console.log(siteList[i].url);
            window.open(siteList[i].url)
        }
    }
}


function validateSiteName() {
    var regex = /^[A-Za-z0-9]{3,}$/
    if (regex.test(siteName.value) == true) {
        siteName.style.border = "none";
        document.getElementById("invalid-name").classList.add("d-none");
        return true;
    }
    else {
        siteName.style.border = "5px solid red";
        document.getElementById("invalid-name").classList.remove("d-none");
        return false;
    }
}

function validateSiteUrl() {
    var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (regex.test(siteUrl.value) == true) {
        siteUrl.style.border = "none";
        document.getElementById("invalid-url").classList.add("d-none");
        return true;
    }
    else {
        siteUrl.style.border = "5px solid red";
        document.getElementById("invalid-url").classList.remove("d-none");
        return false;
    }
}

let modal = document.getElementById("loginModal");

let btn = document.querySelector(".btn-login");

let span = document.getElementsByClassName("close")[0];

window.onload = function() {
    modal.style.display = "none";
}

btn.onclick = function() {
    modal.style.display = "flex";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const loginForm = document.getElementById("loginForm");
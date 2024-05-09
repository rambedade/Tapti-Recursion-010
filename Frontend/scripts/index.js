async function fetchData(){
    try {
        let res=await fetch(url);
        let data
    } catch (error) {
        console.lof(error);
    }
}
const menuIcon = document.querySelector('.button-icons');
const dropdownMenu = document.getElementById('dropdownMenu');

menuIcon.addEventListener('click', function() {
  dropdownMenu.classList.toggle('show');
});

// Rameshwar /

document.addEventListener("DOMContentLoaded", function() {
    var popularDropdown = document.getElementById("popularDropdown");
    popularDropdown.classList.add("active");
    var popularContent = popularDropdown.querySelector(".dropdown-content");
    popularContent.style.display = "block";

    var dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener("click", function() {
            var currentContent = document.querySelector(".dropdown.active .dropdown-content");
            if (currentContent && currentContent.parentElement !== this) {
                currentContent.parentElement.classList.remove("active");
                currentContent.style.display = "none";
            }
            this.classList.toggle("active");
        });
    });
});
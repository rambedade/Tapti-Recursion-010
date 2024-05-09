const menuIcon = document.querySelector('.button-icons');
const dropdownMenu = document.getElementById('dropdownMenu');

menuIcon.addEventListener('click', function() {
  dropdownMenu.classList.toggle('show');
});
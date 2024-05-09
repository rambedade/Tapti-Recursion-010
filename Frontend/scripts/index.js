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

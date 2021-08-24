//TODO: ==========>>>> THEME SWITCH

const darkIcon = document.querySelector('.header-theme-dark-icon');
const lightIcon = document.querySelector('.header-theme-light-icon');
const themeBtn = document.querySelector('.header-theme');
const body = document.body;

// ====> Deactivate Light Mode Icon (Default)
lightIcon.style.display = 'none';

// ====> Target the theme switch button
themeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if(body.classList.contains('dark-theme')) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'initial';
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
    else if (body.classList.contains('light-theme')) {
        darkIcon.style.display = 'initial';
        lightIcon.style.display = 'none';
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
});
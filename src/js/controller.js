//TODO: ==========>>>> THEME SWITCH
const container = document.querySelector('.container__inner');
const spinnerContainer = document.querySelector('.container__spinner');
const mainContainer = document.querySelector('.container');
const darkIcon = document.querySelector('.header-theme-dark-icon');
const lightIcon = document.querySelector('.header-theme-light-icon');
const themeBtn = document.querySelector('.header-theme');
const body = document.body;
const search = document.querySelector('.search__input');

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

//TODO: ==========>>>> PRELOADER SPINNER 
const spinner = function(parentElement) {
    const markup = `
    <div class="container__spinner">
        <div class="spinner">
        <div class="spinner__spin">
            <i class="fas fa-spinner"></i>
        </div>
        </div>
    </div>
    `
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML('afterbegin', markup);
}

//TODO: ==========>>>> FETCH ALL COUNTRY DATA
const countryData = async function() {
    try {
        //Insert Spinner
        spinner(container);

        const response = await fetch('https://restcountries.eu/rest/v2/all');

        //Throw a custom error
        if (!response.ok) throw new Error('Could not fetch data from the API!')

        const data = await response.json();
        const res = data;

        console.log(res);

        //Render Fetch Data to the Homepage

        const markup = res.map(country => {
            return `
            <div class="card">
            <a href="#${country.alpha3Code}">
                <div class="card__image">
                <img src="${country.flag}" alt="${country.name}" />
                </div>
                <div class="card__title"><h2>${country.name}</h2></div>
                <div class="card__info">
                <p>Population: <span>${country.population}</span></p>
                <p>Region: <span>${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
                </div>
            </a>
           </div>
            `
        }).join('');

        container.innerHTML = "";
        // spinnerContainer.style.display = 'none';
        container.insertAdjacentHTML('afterbegin', markup);

    } catch (error) {
        alert(error);
    }
}

countryData();
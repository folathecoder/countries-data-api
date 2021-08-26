//TODO ====> DECLARE ALL REQUIRED VARIABLES

const container = document.querySelector('.container__inner');
const spinnerContainer = document.querySelector('.container__spinner');
const mainContainer = document.querySelector('.container');
const searchContainer = document.querySelector('.search');
const filterContainer = document.querySelector('.filter');
const detailsContainer = document.querySelector('.container__details');

const darkIcon = document.querySelector('.header-theme-dark-icon');
const lightIcon = document.querySelector('.header-theme-light-icon');
const themeBtn = document.querySelector('.header-theme');
const body = document.body;
const search = document.querySelector('.search__input');
const cards = document.querySelectorAll('.card');
const home = document.querySelector('.home__button');

const allRegions = document.querySelector('#region-all');
const africa = document.querySelector('#region-africa');
const america = document.querySelector('#region-america');
const asia = document.querySelector('#region-asia');
const europe = document.querySelector('#region-europe');
const oceania = document.querySelector('#region-oceania');

//TODO: ==========>>>> HIDE HOME BACK BUTTON ON LOAD
home.style.display = 'none';

//TODO: ==========>>>> THEME SWITCH
lightIcon.style.display = 'none';

let darkMode = localStorage.getItem('darkMode');

const enableDarkMode = () => {
  darkIcon.style.display = 'none';
  lightIcon.style.display = 'initial';
  body.classList.remove('dark-theme');
  body.classList.add('light-theme');

  localStorage.setItem("darkMode", "enabled");
}

const disableDarkMode = () => {
  darkIcon.style.display = 'initial';
  lightIcon.style.display = 'none';
  body.classList.remove('light-theme');
  body.classList.add('dark-theme');

  localStorage.setItem("darkMode", null);
}

if (darkMode === "enabled") enableDarkMode();

themeBtn.addEventListener('click', function(e) {
  e.preventDefault();

  darkMode = localStorage.getItem("darkMode");
  
  if(darkMode !== "enabled") {
      enableDarkMode();
  }
  else {
      disableDarkMode();
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
        //* ====> Insert Spinner
        spinner(container);

        //* ====> Fetch Data From Country Endpoint
        const response = await fetch('https://restcountries.eu/rest/v2/all');

        //* ====> Throw a custom error
        if (!response.ok) throw new Error('Could not fetch data from the API!')

        const data = await response.json();

        //* ====> Render Fetch Data to the Homepage
        const markup = data.map(country => {
            return `
            <div class="card">
            <a href="#${country.alpha3Code}">
                <div class="card__image">
                <img src="${country.flag}" alt="${country.name}" />
                </div>
                <div class="card__title"><h2 class="country-name">${country.name}</h2></div>
                <div class="card__info">
                <p>Population: <span>${country.population}</span></p>
                <p>Region: <span class="country-region">${country.region}</span></p>
                <p>Capital: <span>${country.capital}</span></p>
                </div>
            </a>
           </div>
            `
        }).join('');

        container.innerHTML = "";
        container.insertAdjacentHTML('afterbegin', markup);

    } catch (error) {
        alert(error);
    }
}
countryData();

//TODO: ==========>>>> SEARCH FILTER 
search.addEventListener('input', function(e) {
  const { value } = e.target;
  console.log(value);

  const countryName = document.querySelectorAll('.country-name');

  countryName.forEach(country => {
    console.log(country.textContent);   
    
    if((country.textContent.toLowerCase().includes(value.toLowerCase()))) {
      country.closest('.card').style.display = 'block';
    } else {
      country.closest('.card').style.display = 'none';
    }
  })
})

//TODO: ==========>>>> REGION FILTER 
const filterRegion = function(region) {

  region.addEventListener('click', function(e) {
    const regions = document.querySelectorAll('.country-region');

    regions.forEach(region => {
      if(region.textContent === e.target.textContent) {
        region.closest('.card').style.display = 'block';
      } else {
        region.closest('.card').style.display = 'none';
      }
    })
  })
}

filterRegion(africa); //Filter African Countries
filterRegion(america); //Filter American Countries
filterRegion(asia); //Filter Asian Countries
filterRegion(europe); //Filter European Countries
filterRegion(oceania); //Filter Oceanian Countries
allRegions.addEventListener('click', countryData); //Show all Countries


//TODO: ==========>>>> FETCH COUNTRY DETAIL
const countryDetail = async function() {
    try {

        //* ====> Hide the homepage display
        searchContainer.style.display ='none';
        filterContainer.style.display ='none';
        home.style.display = 'initial';

        //* ====> Extract the hash from href
        const id = window.location.hash.slice(1);
        if (!id) return;

        //* ====> Insert loading Spinner
        spinner(mainContainer);

        //* ====> Fetch individual country details
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

        //* ====> Throw a custom error
        if (!response.ok) throw new Error('Could not fetch data from the API!')
        const data = await response.json();

        //* ====> Destructure Content
        //[1] ====> Currencies
        const [currency] = data.currencies;
        const {code:currencyCode, name: currencyName, symbol: currencySymbol} = currency;

        //[2] ====> Languages
        const [language] = data.languages;
        const {name: langName} = language;

        //* ====> Render to the frontend
        const markup = `
        <div class="container__details">

        <div class="country__image">
          <div>
            <img src="${data.flag}" alt="${data.name}">
          </div>
        </div>

        <div class="country__info">
          <h2>${data.name}</h2>
          <div class="country__details">
            <ul>
              <li>Native Name: <span>${data.nativeName}</span></li>
              <li>Population: <span>${data.population}</span></li>
              <li>Region: <span>${data.region}</span></li>
              <li>Sub Region: <span>${data.subregion}</span></li>
              <li>Capital: <span>${data.capital}</span></li>
            </ul>
            <ul>
              <li>Top Level Domain: <span>${data.topLevelDomain}</span></li>
              <li>Currencies: <span>${currencyName} (${currencySymbol})</span></li>
              <li>Languages: <span>${langName}</span></li>
            </ul>
          </div>
          <div class ="country__header">
            <h3>Border Countries</h3>
          </div>
          <ul class="country__border">
            ${data.borders.map(border => {
              return `
                <li><a href="#${border}">${border}</a></li>
              `
            }).join('')}
          </ul>
        </div>
        </div>
        `
        // mainContainer.innerHTML = "";
        mainContainer.insertAdjacentHTML('afterbegin', markup);

    } catch (error) {
        alert(error);
    }
}

window.addEventListener('hashchange', countryDetail);
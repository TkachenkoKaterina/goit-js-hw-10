import './css/styles.css';
import { fetchCountries } from './/fetchCountries';

var _ = require('lodash');
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const ulRef = document.querySelector('.country-list');
const divTef = document.querySelector('.country-info');
console.log(inputRef);
console.log(ulRef);
console.log(divTef);

inputRef.addEventListener(
  'input',
  _.debounce(() => {
    if (inputRef.value === '') {
      console.log('пусто');
      return;
    }

    clearInput();

    const inputRefData = inputRef.value.trim();
    console.log(inputRefData.value);

    fetchCountries(inputRefData)
      .then(renderCountriesList)
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

function renderCountriesList(countries) {
  console.log(countries);
  console.log(inputRef.value);

  if (countries.length > 10) {
    console.log('Too much');
  } else if ((countries.length = 1)) {
    divTef.innerHTML = renderCountryInfo(countries[0]);
  } else {
    const markupCountryList = countries
      .map(country => renderCountryList(country))
      .join('');
    ulRef.insertAdjacentHTML('beforeend', markupCountryList);
  }
}

function renderCountryInfo({ name, capital, population, flags, languages }) {
  return `
      <li><img src="${flags.svg}" alt="${name} flag" width="40" /><span>${name}</span></li>
      <li class="country-list__item"><span>Capital:</span>${capital}</li>
      <li class="country-list__item"><span>Population:</span>${population}</li>
      <li class="country-list__item"><span>Languages:</span>${languages}</li>
    `;
}

function renderCountryList({ name, flags }) {
  return `
      <img src="${flags.svg}" alt="${name} flag" width="40" />
      <h>${name.official}</h>
    `;
}

function clearInput() {
  if (inputRef.value === '') {
    ulRef.innerHTML = '';
    divTef.innerHTML = '';
  }
}

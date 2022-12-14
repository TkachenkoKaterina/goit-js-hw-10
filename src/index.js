import './css/styles.css';
import { fetchCountries } from './/fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
var _ = require('lodash');
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const ulRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  _.debounce(() => {
    const inputRefData = inputRef.value.trim();
    console.log(inputRefData);

    if (
      inputRef.value === '' ||
      inputRef.value === ' ' ||
      inputRef.value === '  ' ||
      inputRef.value === '   ' ||
      inputRef.value === '    ' ||
      inputRef.value === '     '
    ) {
      clearInput();
      return;
    }

    fetchCountries(inputRefData)
      .then(renderCountriesList)
      .catch(error => {
        clearInput();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);

function renderCountriesList(countries) {
  console.log(countries);
  clearInput();
  if (countries.length > 10) {
    ulRef.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length === 1) {
    divRef.innerHTML = renderCountryInfo(countries[0]);
    ulRef.innerHTML = '';
  } else if (countries.length >= 2 && countries.length <= 10) {
    console.log(countries);
    const markupCountryList = countries
      .map(country => renderCountryList(country))
      .join('');
    divRef.innerHTML = '';
    ulRef.insertAdjacentHTML('beforeend', markupCountryList);
  } else if (countries.length === 0) {
    clearInput();
  }
}

function renderCountryInfo({ name, capital, population, flags, languages }) {
  return `
      <li><img src="${flags.svg}" alt="${
    name.official
  } flag" width="60" /><span>${name.official}</span></li>
      <li class="country-list__item"><span>Capital:</span>${capital}</li>
      <li class="country-list__item"><span>Population:</span>${population}</li>
      <li class="country-list__item"><span>Languages:</span>${Object.values(
        languages
      ).join()}</li>
    `;
}

function renderCountryList({ name, flags }) {
  return `
      <img src="${flags.svg}" alt="${name.official} flag" width="60" />
      <h>${name.official}</h>
    `;
}

function clearInput() {
  ulRef.innerHTML = '';
  divRef.innerHTML = '';
}

ulRef.style.listStyleType = 'none';
ulRef.style.display = 'flex';
ulRef.style.justifyContent = 'flex-start';
ulRef.style.fontSize = '30px';
ulRef.style.gap = '20px';
ulRef.style.alignItems = 'center';
ulRef.style.flexWrap = 'wrap';

divRef.style.listStyleType = 'none';
divRef.style.fontSize = '30px';
divRef.style.gap = '20px';
divRef.style.alignItems = 'center';

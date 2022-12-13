import './css/styles.css';
import { fetchCountries } from './/fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
var _ = require('lodash');
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const ulRef = document.querySelector('.country-list');
const divTef = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  _.debounce(() => {
    if (inputRef.value === '') {
      clearInput();
      return;
    }

    const inputRefData = inputRef.value.trim();
    console.log(inputRefData);

    fetchCountries(inputRefData)
      .then(renderCountriesList)
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }, DEBOUNCE_DELAY)
);

function renderCountriesList(countries) {
  console.log(countries);
  if (countries.length > 10) {
    ulRef.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length === 1) {
    divTef.innerHTML = renderCountryInfo(countries[0]);
    ulRef.innerHTML = '';
  } else if (countries.length > 2 && countries.length < 10) {
    console.log(countries);
    const markupCountryList = countries
      .map(country => renderCountryList(country))
      .join('');
    divTef.innerHTML = '';
    ulRef.insertAdjacentHTML('beforeend', markupCountryList);
  }
}

function renderCountryInfo({ name, capital, population, flags, languages }) {
  return `
      <li><img src="${flags.svg}" alt="${
    name.official
  } flag" width="40" /><span>${name.official}</span></li>
      <li class="country-list__item"><span>Capital:</span>${capital}</li>
      <li class="country-list__item"><span>Population:</span>${population}</li>
      <li class="country-list__item"><span>Languages:</span>${Object.values(
        languages
      ).join()}</li>
    `;
}

function renderCountryList({ name, flags }) {
  return `
      <img src="${flags.svg}" alt="${name.official} flag" width="40" />
      <h>${name.official}</h>
    `;
}

function clearInput() {
  if (inputRef.value === '') {
    console.log(inputRef.value);
    ulRef.innerHTML = '';
    divTef.innerHTML = '';
  }
}

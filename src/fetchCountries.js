export { fetchCountries };

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      console.log(response);
      if (!response.ok) {
        // Notiflix.Notify.failure('Oops, there is no country with that name');
        // console.log('Oops, there is no country with that name');
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countriesData => {
      console.log(countriesData);
      console.log(countriesData.length);
    });
}

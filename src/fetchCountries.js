export { fetchCountries };

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      console.log(response);
      if (!response.ok) {
        console.log(response);
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countriesData => {
      console.log(countriesData);
      console.log(countriesData.length);
    });
  // .catch(error => {
  //   console.log(error);
  // });
}

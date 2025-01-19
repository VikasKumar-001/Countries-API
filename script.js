const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInputCountries = document.querySelector('.search-container')
const lightThemeChanger = document.querySelector('.lightThemeChanger');
const darkThemeChanger = document.querySelector('.darkThemeChanger');


let allCountriesData


fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) =>{
        renderCountries(data)
        allCountriesData = data
    })

    filterByRegion.addEventListener('change', (e) => {
        fetch(`https://restcountries.com/v3.1/subregion/${ filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
    })

    function renderCountries(data){

        countriesContainer.innerHTML = '';
        data.forEach((country) => {
           // console.log(country);
            const countryCard = document.createElement('a')
            countryCard.classList.add('country-card')
            countryCard.href = `./country.html?name=${country.name.common}`

 countryCard.innerHTML = `
                   <img src="${country.flags.svg}" alt="${country.name.common}">
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population:</b>${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region:</b>${country.region}</p>
                        <p><b>Capital:</b>${country.capital} </p>
                    </div>
    `
            

            countriesContainer.append(countryCard)
        });

    }

    searchInputCountries.addEventListener('input', (e) =>{
        console.log(e.target.value)

       const filteredCountries= allCountriesData.filter((country) =>  country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
        renderCountries(filteredCountries)
    })


 document.addEventListener('click', (event) => {
    if (event.target === lightThemeChanger) {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
    } else if (event.target === darkThemeChanger) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }
});



    

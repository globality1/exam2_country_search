"use strict";

// get ajax data
function GetAjaxData(url, successCallBack, errorCallBack) {
    $.ajax({
        method: "GET",
        url: url,
        error: err => errorCallBack(err.message),
        success: response => successCallBack(response)
    });
};

// call to search with all countries
function searchAllCountries() {
   GetAjaxData("https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag", response => createArrayFromAllCountries(response) , err => console.log(err))
};

// creates new array of all the returned countries
function createArrayFromAllCountries(countriesData) {
    let v = new Array();
    for (let i=0; i<countriesData.length; i++) {
        v.push(countriesData[i]);
    }
    createCountriesOnScreen(v);    
};

// creates display of country info card
function createCountriesOnScreen(countriesArray) {
    $('#allCountriesDisplayDiv').empty();
    let listOfAllCountries = ''
    for ( let i=0; i< countriesArray.length; i++ ) {
      let currencies = getAllCurrencies(countriesArray[i].currencies);
      let newDivWithCountry = `
      <div id="countryInfoDiv" class="col-sm-4">
        <div class=countryDetailsDiv">
          <div class=row>
           <div col-sm>
              <img id="countryImage" src=${countriesArray[i].flag}> 
           </div>
           <div col-sm id="infoOfCountry">
              <b>Country Name:</b> ${countriesArray[i].name}
              </br>
              <b>Top Level Domain:</b> ${countriesArray[i].topLevelDomain[0]}
              </br>
              <b>Currencies:</b> </br> ${currencies}
           </div>
          </div>
        </div>
      </div>
      `
      listOfAllCountries += '</br>' + newDivWithCountry;
    }
    console.log(listOfAllCountries)
    $('#allCountriesDisplayDiv').append(listOfAllCountries);
};

// gets all currencies from currencies array and creates currency view
function getAllCurrencies(currencies) {
    console.log(currencies)
    let currenciesArray = ''
    for(let i = 0; i<currencies.length; i++) {
        currenciesArray += `
        ${i+1}. <b>${currencies[i].name}</b> || <b>CODE:</b>  ${currencies[i].code} || <b>Symbol</b>: ${currencies[i].symbol}
        </br>      
    `
    }
    return currenciesArray
};


// search function from filter
function searchFromFilter() {
    GetAjaxData("https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag", response => filterArrayOfCountries(response) , err => console.log(err))
};


// filtering function from returned array
function filterArrayOfCountries(countriesToFilter) {
    let filteredCoinsObj = new Array();
    let searchValue = document.getElementById("searchInputText").value.toUpperCase();
    for( let i=0; i<countriesToFilter.length; i++ )
      if( countriesToFilter[i].name.toString().toUpperCase().includes(searchValue) == true) {
          filteredCoinsObj.push(countriesToFilter[i]);
      }
    createCountriesOnScreen(filteredCoinsObj);
};

// sets onclick for each butoon
$().ready(() => {
    document.getElementById("searchAllCountries").onclick = () => searchAllCountries();
    document.getElementById("searchFilterButton").onclick = () => searchFromFilter();
})


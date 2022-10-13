let borders= document.querySelector(".row:nth-of-type(3)")
let countryinfo=document.querySelector(".row:nth-of-type(2)")
let searchInput=document.querySelector("input")
let button=document.querySelector(".btn")
let borderHeading=document.querySelector(".text-border")



// *Inputun Ici bos deyilse olkeni axtarir

button.addEventListener("click", () => {
    if (searchInput.value) {
      getCountry(searchInput.value);
    }
});


//* Olkeni axtaran funksiya

const getCountry = (country) => {
    fetch("https://restcountries.com/v3.1/name/" + country)
      .then((response) => response.json())
      .then((data) => {
        getBorders(data[0].borders.toString());
        let lang = Object.values(data[0].languages).map((lang) => lang);
        let currencyKey = Object.keys(data[0].currencies)[0];
        let currency = data[0].currencies[currencyKey];
        countryinfo.innerHTML =`
        <div class="col mb-6">
        <div class="card">
          <img src="${data[0].flags.png}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h1 class="card-title text-danger">${data[0].name.common}</h1>
            <p class="card-text">
              <span class="text-success">Paytaxt:</span> ${ data[0].capital[0] }
            </p>
            <p class="card-text">
              <span class="text-success">Sahəsi: </span>${data[0].area}km<sup>2</sup>
            </p>
            <p class="card-text">
              <span class="text-success">Dil:</span> ${lang}
            </p>
            <p class="card-text">
              <span class="text-success">Əhali:</span> ${( data[0].population /
              1000000 ).toFixed(2)}mln
            </p>
            <p class="card-text">
              <span class="text-success">Pul Vahidi:</span> ${ currency.name }
              (${currency.symbol})
            </p>
          </div>
        </div>
      </div>
        `;
      })
      .catch((error) => {
        borders.innerHTML=""
        borderHeading.innerHTML=""
        countryinfo.innerHTML = `<h1 class="text-danger text-center">Nəticə Tapılmadı</h1>`;
      });
};

// *Serhed olkeleri gosteren funksiya

const getBorders = (countries) => {
    fetch("https://restcountries.com/v3.1/alpha?codes=" + countries)
      .then((response) => response.json())
      .then((data) => {
        if(data){
            borderHeading.innerText="Sərhədləri"
        borders.innerHTML=""
        data.map((e) => {
          borders.innerHTML += `
          <div class="card col-12 mb-2 p-2 col-sm-6 col-md-3" style="width: 18rem;">
          <img src="${e.flags.png}" class="card-img-top border h-50" alt="flag" />
          <div class="card-body d-flex flex-column justify-content-between">
            <h3 class="card-title text-center">${e.name.common}</h3>
            <button
              onclick="getCountry('${e.name.common}')"
              class="btn btn-primary btn-lg btn-block">
              Bax
            </button>
          </div>
        </div>
          `;
        })}
        else{
           
            borders.innerHTML=`<h1 class="text-danger text-center">Sərhədi Yoxdur</h1>`
        }
      });
};
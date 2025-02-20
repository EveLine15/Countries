const cardHolder = document.querySelector('#card-holder');

const getData = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then((response) =>  response.json())
    .then((dataArr) => renderData(dataArr))
    .catch(errorMessage)
}

const renderData = (dataArr) => {
    for(let i = 0; i < 120; i++){
        const element = dataArr[i];
        cardHolder.insertAdjacentHTML('beforeend', `
            <div class="col">
              <div class="card h-100">
              <div class="img-holder"><img src="${element.flags.svg}" class="card-img-top" alt="country"></div>
                <div class="card-body">
                  <h4 class="card-title">${element.name.common}</h4>
                  <p class="card-text">${element.continents.join(', ')}</p>
                  <div class="additional-info">
                    <p>👨‍👩‍👧‍👦 ${convertPopulation(+element.population)}</p>
                    <p>🔊 ${element?.languages ? Object.values(element.languages).join(', ') : '-'}</p>
                    <p>💰 ${element?.currencies ? Object.values(element.currencies)[0].name : '-'}</p>
                  </div>
                </div>
              </div>
            </div>
            `);
    }

}

const convertPopulation = (population) => {
  if(population < 100) return population;
  else if(population < 100000) return ((population / 10000).toFixed(1))+' тыс';
  else return ((population / 1000000).toFixed(1))+' млн';
}

function errorMessage(){
  cardHolder.innerHTML = `<p>Error</p>`
}

getData();

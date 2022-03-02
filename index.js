const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if(searchField == '') {
        document.getElementById('error').innerText='please write something'
    }
    else{

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data));
    
    
        searchField.value = '';
    }


}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(data.length ==0){
        document.getElementById('error').innerText='show no result found'
    }
    data.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div  class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${phone.brand}</h5>
            <h5 class="card-title text-center">${phone.phone_name}</h5>
        </div>
        <div class="allbutton text-center">
        <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-success">Details</button>
    </div>
    </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = (info )=> {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phones => {
    console.log(phones);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phones.image}" class="card-img-top" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title text-center">${phones.name}</h5>
      <h5 class="card-title" text-center>${phones.brand}</h5>
      <h5 class="card-title" text-center>${phones.releaseDate}</h5>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    phoneDetails.appendChild(div);
}
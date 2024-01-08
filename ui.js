
import { favoriteDogImage, deleteFavorite } from './api.js';

 export function updateUI(dogs, searchTerm = '') {
    const dogList = document.getElementById('dogList');
    dogList.innerHTML = '';

    dogs.forEach(dog => {
        if (dog.name.toLowerCase().includes(searchTerm.toLowerCase())){
        const element = document.createElement('div');
        element.classList.add('col-md-4', 'mb-3');
        
        // Bootstrap Card
        element.innerHTML = `
            <div class="card">
                <img src="${dog.image.url}" class="card-img-top" alt="${dog.name}">
                <div class="card-body">
                    <h5 class="card-title">${dog.name}</h5>
                </div>
            </div>
        `;
         // Attach click event listener to each card
         element.addEventListener('click', () => {
            showDogInfo(dog);
        });

// Create Favorite button
const favoriteBtn = document.createElement('button');
favoriteBtn.textContent = 'Favorite';
favoriteBtn.classList.add('favorite-btn');

// Attach event listener to the Favorite button
favoriteBtn.addEventListener('click', (event) => handleFavoriteClick(event,dog));

// Append the Favorite button to the card
const cardBody = element.querySelector('.card-body');
cardBody.appendChild(favoriteBtn);
       
       
        dogList.appendChild(element);
    }
    });

 }


function showDogInfo(dog) {
    const modalTitle = document.getElementById('dogInfoModalLabel');
    const modalBody = document.querySelector('#dogInfoModal .modal-body');
    const dogOrigin = dog.origin ? dog.origin: 'N/A';
    const dogBreedGroup = dog.breed_group ? dog.breed_group : 'N/A';
    const dogBredFor = dog.bred_for ? dog.bred_for : 'N/A';
    const dogTemperament = dog.temperament ? dog.temperament : 'N/A';
    const dogLifeSpan = dog.life_span ? dog.life_span : 'N/A';
    const dogHeight = dog.height.imperial ? dog.height.imperial : 'N/A';
    const dogWeight = dog.weight.imperial ? dog.weight.imperial : 'N/A';

    // Populate modal with dog information
    modalTitle.textContent = dog.name;
    modalBody.innerHTML = `
        <img src="${dog.image.url}" class="img-fluid mb-3" alt="${dog.name}">
        <p>Breed: ${dog.name}</p>
        <p>Breed Group: ${dogBreedGroup}</p>
        <p>Origin: ${dogOrigin}</p>
        <p>Bred For: ${dogBredFor}</p>
        <p>Temperament: ${ dogTemperament}</p>
        <p>Life Span: ${dogLifeSpan}</p>
        <p>Height: ${dogHeight} inches</p>
        <p>Weight: ${dogWeight} lbs</p>
    `;

    // Show the modal
    $('#dogInfoModal').modal('show');
   
}
function handleFavoriteClick(event, dog) {
    event.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const existingFavorite = favorites.find(f => f.imageId === dog.image.id);

    if (existingFavorite) {
        // Dog is already favorited, delete it from API and local storage
        deleteFavorite(existingFavorite.id).then(() => {
            const newFavorites = favorites.filter(f => f.imageId !== dog.image.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            console.log('Favorite removed for', dog.name);
        }).catch(error => console.error('Error removing favorite dog', error));
    } else {
        // Dog is not favorited, add it to API and local storage
        favoriteDogImage(dog.image.id).then(result => {
            console.log('Favorite clicked for', result);
            favorites.push({ imageId: dog.image.id, name: dog.name, id: result.id });
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }).catch(error => console.error('Error favoriting dog', error));
    }
}

export function displayFavoritesModal(favorites) {
    const modalTitle = document.getElementById('dogInfoModalLabel');
    const modalBody = document.querySelector('#dogInfoModal .modal-body');

    // Set modal title
    modalTitle.textContent = 'Favorite Breeds';

    // Populate modal body with favorite dogs
    modalBody.innerHTML = '<ul>';
    favorites.forEach(fav => {
        modalBody.innerHTML += `<li>${fav.name}</li>`; // Assuming fav object has a 'name' property
    });
    modalBody.innerHTML += '</ul>';

    // Show the modal
    $('#dogInfoModal').modal('show');
}
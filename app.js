
import { getDogs, fetchFavorites} from './api.js';
import {  updateUI, displayFavoritesModal } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    const dogs = await getDogs();
    updateUI(dogs);
});

document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    getDogs().then(dogs => {
        updateUI(dogs, searchTerm);
    });
});

document.getElementById('resetButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = ''; // Clear the search input
    getDogs().then(dogs => {
        updateUI(dogs); // Call updateUI without a search term to display all breeds
    });
});

document.getElementById('listFavoritesButton').addEventListener('click', () => {
    fetchFavorites().then(favorites => {
        displayFavoritesModal(favorites);
        const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteDogs = favorites.map(fav => {
            const dog = favoritesFromLocalStorage.find(d => d.imageId === fav.image_id);
            return dog ? dog.name : 'Unknown';
        });

        console.log(favoriteDogs); // Or update the UI with these dogs
    });
});
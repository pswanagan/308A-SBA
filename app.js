
import { getDogs} from './api.js';
import {  updateUI } from './ui.js';

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
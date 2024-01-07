
import { getDogs} from './api.js';
import {  updateUI } from './ui.js';

document.addEventListener('DOMContentLoaded', async () => {
    const dogs = await getDogs();
    updateUI(dogs);
});


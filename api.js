
const API_KEY = 'live_4V04id3K97xjGpG9pIZ98kz5GYLTs4l3kRAXA08wgcjR9rkuCtS2P2BdIgBr5YF8';

async function getDogs() {
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data from the Dog API:', error);
    }
}

const API_KEY = 'live_4V04id3K97xjGpG9pIZ98kz5GYLTs4l3kRAXA08wgcjR9rkuCtS2P2BdIgBr5YF8';

 export async function getDogs() {
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data from the Dog API:', error);
    }
}

export async function favoriteDogImage(imageId) {
    const url = "https://api.thedogapi.com/v1/favourites";
    const dogBody = JSON.stringify({ 
        "image_id": imageId,
        "sub_id": "default" // Adjust as needed
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
            body: dogBody
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error favoriting dog image:', error);
        throw error; // Or handle it as needed
    }
}
export async function fetchFavorites() {
    const url = "https://api.thedogapi.com/v1/favourites";
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'x-api-key': API_KEY }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error getting favorite dogs: ', error);
        throw error;
    }
}

export async function deleteFavorite(favoriteId) {
    const url = `https://api.thedogapi.com/v1/favourites/${favoriteId}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}
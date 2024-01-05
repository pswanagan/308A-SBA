

function updateUI(dogs) {
    const dogList = document.getElementById('dogList');
    dogList.innerHTML = '';

    dogs.forEach(dog => {
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

        dogList.appendChild(element);
    });
}



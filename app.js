document.addEventListener('DOMContentLoaded', async () => {
    const dogs = await getDogs();
    updateUI(dogs);
});
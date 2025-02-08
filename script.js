document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    this.reset();
});

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}

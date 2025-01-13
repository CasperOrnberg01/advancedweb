document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Kiitos viestistäsi! Otamme sinuun yhteyttä pian.');
    this.reset();
});
document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.subsection h3'); 

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const image = this.nextElementSibling; 
            image.style.display = image.style.display === 'none' ? 'block' : 'none'; 
        });
    });
});

// script.js

// Functionality for the Mobile Menu Toggle

document.addEventListener('DOMContentLoaded', function() {
    
    // Select elements using the IDs we added to the HTML
    // #menu-toggle is the '☰' button
    const menuToggle = document.getElementById('menu-toggle'); 
    
    // #main-nav is the <nav> element containing the links
    const mainNav = document.getElementById('main-nav'); 

    // Check if both elements exist before adding the listener
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Toggles the 'active' class on the <nav> element
            // The CSS shows/hides the menu based on this class
            mainNav.classList.toggle('active');
        });
    }
});
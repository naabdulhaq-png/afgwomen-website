// script.js

// --- 1. Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Select elements using the IDs we added to the HTML
    const menuToggle = document.getElementById('menu-toggle'); 
    const mainNav = document.getElementById('main-nav'); 

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // --- 2. Course Access Gate (Run on Lesson Pages) ---
    // Note: The specific lesson pages (e.g., courses/english/lesson1.html) must be updated 
    // to call this function. See below.

    const courseContent = document.querySelector('.lesson-page-container');
    
    if (courseContent) {
        // If we are on a lesson page, check access
        checkCourseAccess();
    }
});

const COURSE_PASSWORD = "AFGWomen2025!"; // CHANGE THIS SECURE PASSWORD REGULARLY!
const ACCESS_KEY = "afg_course_access";

function checkCourseAccess() {
    const courseContent = document.querySelector('.lesson-page-container');
    const lessonNav = document.querySelector('.lesson-nav'); // Hide lesson nav too
    
    // If access is already granted in session, proceed
    if (sessionStorage.getItem(ACCESS_KEY) === 'granted') {
        if (courseContent) courseContent.style.display = 'block';
        if (lessonNav) lessonNav.style.display = 'flex'; // Assuming flex for navigation buttons
        return;
    }

    // Hide content initially
    if (courseContent) courseContent.style.display = 'none';
    if (lessonNav) lessonNav.style.display = 'none';

    // Show custom prompt box
    const gateBox = document.createElement('div');
    gateBox.innerHTML = `
        <div style="max-width:400px; margin: 100px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; background: #fff;">
            <h3>Course Access Required</h3>
            <p>Please enter the access code provided by the AFGWomen team to view this lesson.</p>
            <input type="password" id="accessCode" placeholder="Enter Access Code" style="width: 90%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;">
            <button id="submitAccess" class="btn" style="width: 90%; margin-top: 10px;">Unlock Course</button>
            <p id="accessMessage" style="color: red; margin-top: 10px;"></p>
        </div>
    `;
    document.body.prepend(gateBox);

    document.getElementById('submitAccess').addEventListener('click', () => {
        const enteredCode = document.getElementById('accessCode').value.trim();
        const message = document.getElementById('accessMessage');
        
        if (enteredCode === COURSE_PASSWORD) {
            sessionStorage.setItem(ACCESS_KEY, 'granted');
            gateBox.remove();
            if (courseContent) courseContent.style.display = 'block';
            if (lessonNav) lessonNav.style.display = 'flex';
            
        } else {
            message.textContent = "Incorrect code. Please check your credentials.";
            document.getElementById('accessCode').value = '';
        }
    });
}
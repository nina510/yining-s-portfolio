document.addEventListener('DOMContentLoaded', () => {
    const aboutContent = document.querySelector('.about-content');
    aboutContent.innerHTML = `
        <div class="about-intro fade-in">
            <h2>Interdisciplinary Designer</h2>
            <p>Creative thinker with a passion for combining different disciplines to create unique solutions.</p>
        </div>
        <div class="about-details">
            <div class="about-section fade-in">
                <h3>Background</h3>
                <p>Details about your background...</p>
            </div>
            <div class="about-section fade-in">
                <h3>Skills</h3>
                <p>Your key skills and expertise...</p>
            </div>
            <div class="about-section fade-in">
                <h3>Experience</h3>
                <p>Your professional experience...</p>
            </div>
        </div>
    `;
}); 
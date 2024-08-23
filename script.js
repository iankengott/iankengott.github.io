document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const backgroundImages = [
        { url: 'background1.svg', size: '50%' }, // Original size
        { url: 'background2.svg', size: '50%' },   // Shrunk by 20%
        { url: 'background3.svg', size: '50%' }    // Shrunk by 20%
    ];

    let currentImageIndex = 0;

    function updateBackgroundImage() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        let newImageIndex = 0;
        if (scrollPercent > 66) {
            newImageIndex = 2;
        } else if (scrollPercent > 33) {
            newImageIndex = 1;
        } else {
            newImageIndex = 0;
        }

        if (newImageIndex !== currentImageIndex) {
            // Set the background image properties
            document.body.style.backgroundImage = `url('${backgroundImages[newImageIndex].url}')`;
            document.body.style.backgroundSize = 'cover'; // Ensure the image covers the whole screen
            document.body.style.backgroundPosition = 'center'; // Center the image
            document.body.style.backgroundRepeat = 'no-repeat'; // Prevent the image from repeating

            // Use requestAnimationFrame for smoother transition
            requestAnimationFrame(() => {
                document.body.style.backgroundSize = backgroundImages[newImageIndex].size;
            });

            currentImageIndex = newImageIndex;
        }
    }

    // Create a <style> element and append CSS rules for img
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #display_image > img {
            display: block;
            margin: 0 auto;
        }
    `;
    document.head.appendChild(styleElement);

    window.addEventListener('scroll', updateBackgroundImage);
});

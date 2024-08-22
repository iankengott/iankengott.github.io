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
            // Set a temporary size to avoid sudden jumps
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundImage = `url('${backgroundImages[newImageIndex].url}')`;

            // Use requestAnimationFrame for smoother transition
            requestAnimationFrame(() => {
                document.body.style.backgroundSize = backgroundImages[newImageIndex].size;
            });

            currentImageIndex = newImageIndex;
        }
    }

    window.addEventListener('scroll', updateBackgroundImage);
});

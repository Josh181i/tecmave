document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = localStorage.getItem('language') || 'es';

    async function loadLanguage(lang) {
        const response = await fetch(`../assets/lang/${lang}.json`);
        const translations = await response.json();
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    loadLanguage(currentLanguage);

    languageToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLanguage);
        loadLanguage(currentLanguage);
    });
});

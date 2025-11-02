document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = localStorage.getItem('language') || 'es';

    async function loadLanguage(lang) {
        try {
            const response = await fetch(`../assets/lang/${lang}.json`);
            if (!response.ok) {
                console.error(`Failed to load language file for ${lang}: ${response.statusText}`);
                return;
            }
            const translations = await response.json();
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                if (translations[key]) {
                    element.textContent = translations[key];
                }
            });
        } catch (error) {
            console.error(`Error loading or parsing language file for ${lang}:`, error);
        }
    }

    loadLanguage(currentLanguage);

    languageToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLanguage);
        loadLanguage(currentLanguage);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    chrome.storage.local.get('language', async (settings) => {
        
        const browserLang = navigator.language.split('-')[0]; 
        
        const supportedLangs = ['tr', 'en', 'es', 'de']; 
        
        const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en'; 

        const lang = settings.language || defaultLang;
        
        document.documentElement.lang = lang;

        try {
            const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);
            
            const response = await fetch(url);
            const messages = await response.json();

            document.querySelectorAll('[data-i18n]').forEach(elem => {
                const key = elem.getAttribute('data-i18n');
                if (messages[key]) {
                    elem.innerHTML = messages[key].message;
                }
            });
            
        } catch (error) {
            console.error("Dil yüklenirken hata oluştu:", error);
        }
    });
});
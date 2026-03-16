document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const themeToggle = document.getElementById('themeToggle');
    const masterStatusText = document.getElementById('masterStatusText');
    const masterToggle = document.getElementById('masterToggle');
    const focusCountDisplay = document.getElementById('focusCountDisplay');

    const hardcoreModal = document.getElementById('hardcoreModal');
    const challengeTextElem = document.getElementById('challengeText');
    const hardcoreInput = document.getElementById('hardcoreInput');
    const hardcoreCancel = document.getElementById('hardcoreCancel');
    const hardcoreConfirm = document.getElementById('hardcoreConfirm');

    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const selectedLangFlag = document.getElementById('selectedLangFlag');
    const selectedLangCode = document.getElementById('selectedLangCode');
    const flags = { 'tr': '🇹🇷', 'en': '🇬🇧', 'es': '🇪🇸', 'de': '🇩🇪' };

    let currentMessages = {};

    // --- 1. DİNAMİK ÇEVİRİ MOTORU (i18n Implementation) ---
    /**
     * @description: Seçilen dile göre JSON dosyasını asenkron (async) olarak çeker 
     * ve sayfadaki tüm data-i18n etiketlerini günceller.
     */
    async function applyLanguage(lang) {
        try {
            const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);
            const response = await fetch(url);
            currentMessages = await response.json();

            document.querySelectorAll('[data-i18n]').forEach(elem => {
                const key = elem.getAttribute('data-i18n');
                if (currentMessages[key]) elem.innerHTML = currentMessages[key].message;
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
                const key = elem.getAttribute('data-i18n-placeholder');
                if (currentMessages[key]) elem.placeholder = currentMessages[key].message;
            });

            document.querySelectorAll('[data-i18n-title]').forEach(elem => {
                const key = elem.getAttribute('data-i18n-title');
                if (currentMessages[key]) elem.title = currentMessages[key].message;
            });

            if (masterToggle && currentMessages["masterActive"] && currentMessages["masterInactive"]) {
                masterStatusText.innerText = masterToggle.checked 
                    ? currentMessages["masterActive"].message 
                    : currentMessages["masterInactive"].message;
            }

            document.documentElement.lang = lang;
            
        } catch (error) {
            console.error("Dil yükleme hatası:", error);
        }
    }

    chrome.storage.local.get(null, (settings) => {
        const currentTheme = settings.theme || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (themeToggle) themeToggle.innerText = currentTheme === 'dark' ? '☀️' : '🌙';

        if (focusCountDisplay) focusCountDisplay.innerText = settings.focusCount || 0;

        const browserLang = navigator.language.split('-')[0]; 
        const supportedLangs = ['tr', 'en', 'es', 'de']; 
        const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en'; 

        const currentLang = settings.language || defaultLang;
        applyLanguage(currentLang);
        
        if (selectedLangFlag && selectedLangCode && flags[currentLang]) {
            selectedLangFlag.innerText = flags[currentLang];
            selectedLangCode.innerText = currentLang.toUpperCase();
        }

        checkboxes.forEach(box => {
            if (box.id === 'masterToggle') {
                box.checked = settings.masterToggle !== false; 
            } else {
                box.checked = settings[box.id] || false;
            }
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
            chrome.storage.local.set({ theme: newTheme });
        });
    }

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => langDropdown.classList.remove('show'));

        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const newLang = e.currentTarget.getAttribute('data-value');
                applyLanguage(newLang);
                chrome.storage.local.set({ language: newLang });
                selectedLangFlag.innerText = flags[newLang];
                selectedLangCode.innerText = newLang.toUpperCase();
            });
        });
    }

    checkboxes.forEach(box => {
        box.addEventListener('change', (e) => {
            if (e.target.id === 'masterToggle' && !e.target.checked && hardcoreModal) {
                e.target.checked = true; 
                hardcoreModal.classList.add('active');
                setTimeout(() => hardcoreInput.focus(), 100);
                return; 
            }

            let setting = {};
            setting[e.target.id] = e.target.checked;
            chrome.storage.local.set(setting);
        });
    });

    if (hardcoreInput && challengeTextElem) {
        hardcoreInput.addEventListener('input', (e) => {
            const targetText = challengeTextElem.innerText.trim().toLowerCase();
            const typedText = e.target.value.trim().toLowerCase();
            hardcoreConfirm.disabled = (typedText !== targetText);
        });

        hardcoreConfirm.addEventListener('click', () => {
            hardcoreModal.classList.remove('active');
            if (masterToggle) masterToggle.checked = false;
            chrome.storage.local.set({ masterToggle: false });
        });
        
        hardcoreCancel.addEventListener('click', () => hardcoreModal.classList.remove('active'));
    }
});
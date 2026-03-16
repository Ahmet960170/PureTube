let isExtensionActive = true;
let globalSettings = {}; 

const PURETUBE_TEXTS = {
    tr: { title: "Bugün ne için odaklanacaksınız?", desc: "Örn: Trigonometri Yarım Açı formülleri", btn: "Odaklan", error: "Anlamlı bir araştırma konusu yazın..." },
    en: { title: "What will you focus on today?", desc: "e.g., Trigonometry Half-Angle formulas", btn: "Focus", error: "Enter a valid research topic..." },
    es: { title: "¿En qué te enfocarás hoy?", desc: "Ej. Fórmulas de ángulo mitad de trigonometría", btn: "Enfocar", error: "Introduce un tema válido..." },
    de: { title: "Worauf wirst du dich heute konzentrieren?", desc: "Z.B. Trigonometrie Halbwinkelformeln", btn: "Fokus", error: "Gib ein gültiges Thema ein..." }
};

const CSS_KEYS = [
    'hideHomepage', 'hideSidebar', 'hideRecommended', 'hideLiveChat', 'hidePlaylist',
    'hideShorts', 'hideEndVideowall', 'hideEndCards', 'hideComments', 'hideMixRadio', 'hideMerch',
    'hideVideoInfo', 'hideVideoButtons', 'hideChannel', 'hideVideoDesc', 'hideTopHeader', 'hideNotification',
    'grayscaleMode', 'dyslexiaFont'
];

try {
    chrome.storage.local.get(null, (settings) => {
        globalSettings = settings || {};
        
        if (globalSettings.masterToggle === false) {
            isExtensionActive = false;
        } else {
            CSS_KEYS.forEach(key => {
                if (globalSettings[key] && document.documentElement) {
                    document.documentElement.classList.add(key);
                }
            });
        }

        document.addEventListener('yt-navigate-finish', () => {
            checkIntentFilter(globalSettings);
        });

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => checkIntentFilter(globalSettings));
        } else {
            checkIntentFilter(globalSettings);
        }
    });
} catch (e) {
    console.error("PureTube Başlatma Hatası:", e);
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
        
        if (changes.masterToggle !== undefined) {
            isExtensionActive = changes.masterToggle.newValue;
            if (!isExtensionActive) {
                CSS_KEYS.forEach(k => document.documentElement.classList.remove(k));
            } else {
                CSS_KEYS.forEach(k => {
                    if (globalSettings[k]) document.documentElement.classList.add(k);
                });
            }
        }

        for (let [key, { newValue }] of Object.entries(changes)) {
            globalSettings[key] = newValue;
            
            if (isExtensionActive && CSS_KEYS.includes(key)) {
                if (newValue) {
                    document.documentElement.classList.add(key);
                } else {
                    document.documentElement.classList.remove(key);
                }
            }
        }

        const overlay = document.getElementById('puretube-intent-overlay');
        if (overlay) {
            if (changes.theme) {
                overlay.setAttribute('data-theme', changes.theme.newValue === 'light' ? 'light' : 'dark');
            } else if (changes.darkMode !== undefined) {
                overlay.setAttribute('data-theme', changes.darkMode.newValue === false ? 'light' : 'dark');
            }
            
            if (changes.language) {
                const newLang = changes.language.newValue || 'tr';
                const t = PURETUBE_TEXTS[newLang] || PURETUBE_TEXTS['tr'];
                
                const h2 = overlay.querySelector('h2');
                const input = overlay.querySelector('#puretube-intent-input');
                const btn = overlay.querySelector('#puretube-intent-btn');
                
                if (h2) h2.textContent = t.title;
                if (input) input.placeholder = t.desc;
                if (btn) btn.textContent = t.btn;
            }
        }
    }
});

function checkIntentFilter(settings) {
    try {
        if (!isExtensionActive || !settings.intentFilter) return;

        const url = window.location.href;
        if (url !== "https://www.youtube.com/" && !url.startsWith("https://www.youtube.com/?")) {
            return;
        }

        if (sessionStorage.getItem('pureTubeIntentPassed') === 'true') return;
        
        if (document.getElementById('puretube-intent-overlay')) return;

        const currentLang = settings.language || 'tr';
        const t = PURETUBE_TEXTS[currentLang] || PURETUBE_TEXTS['tr'];
        
        let currentTheme = 'dark'; 
        if (settings.theme === 'light' || settings.darkMode === false) {
            currentTheme = 'light';
        }

        const overlay = document.createElement('div');
        overlay.id = 'puretube-intent-overlay';
        overlay.setAttribute('data-theme', currentTheme); 
        
        overlay.innerHTML = `
            <div class="puretube-intent-box">
                <div class="puretube-intent-logo">
                    <svg width="64" height="64" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="128" height="128" rx="28" fill="#007BFF"/>
                        <path d="M 46 34 L 34 34 L 34 46 M 82 34 L 94 34 L 94 46 M 94 82 L 94 94 L 82 94 M 34 82 L 34 94 L 46 94" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                        <polygon points="52,46 52,82 84,64" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h2>${t.title}</h2>
                <input type="text" id="puretube-intent-input" placeholder="${t.desc}" autocomplete="off">
                <button id="puretube-intent-btn">${t.btn}</button>
            </div>
        `;
        
        const appendOverlay = () => {
            if (!document.body) {
                setTimeout(appendOverlay, 100); 
                return;
            }
            if (document.getElementById('puretube-intent-overlay')) return;
            
            document.body.appendChild(overlay);

            const input = overlay.querySelector('#puretube-intent-input');
            const btn = overlay.querySelector('#puretube-intent-btn');

            if (!input || !btn) return; 

            setTimeout(() => { if (input) input.focus(); }, 100);

            const unlockAndSearch = () => {
                const rawIntent = input.value.trim();
                const intentLower = rawIntent.toLowerCase();
                
                if (rawIntent.length < 5 || /^[a-z]$/i.test(rawIntent) || rawIntent.includes('asdf')) {
                    input.style.border = "2px solid #ff4444";
                    input.value = "";
                    input.placeholder = t.error;
                    return;
                }

                const blacklist = ["oyun", "komik", "kedi", "şaka", "müzik", "şarkı", "dizi", "film", "magazin", "gıybet", "kavga", "minecraft", "valorant", "pubg", "komedi", "vlog", "tiktok", "game", "funny", "cat", "prank", "music", "song", "series", "movie", "gossip", "fight", "comedy", "shorts", "meme"];

                let isBlacklisted = false;
                let blockedWord = "";
                const words = intentLower.split(/\s+/);
                
                for (let word of words) {
                    if (blacklist.includes(word)) {
                        isBlacklisted = true;
                        blockedWord = word;
                        break;
                    }
                }

                if (isBlacklisted) {
                    input.style.border = "2px solid #ff4444";
                    input.style.backgroundColor = "#fff0f0";
                    input.value = "";
                    input.placeholder = `Uyarı: "${blockedWord}" araştırma odaklı değil!`;
                    
                    const box = overlay.querySelector('.puretube-intent-box');
                    if(box && typeof box.animate === 'function') {
                        box.animate([
                            { transform: 'translateX(0)' }, { transform: 'translateX(-10px)' },
                            { transform: 'translateX(10px)' }, { transform: 'translateX(-10px)' },
                            { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }
                        ], { duration: 400, iterations: 1 });
                    }
                    return; 
                }

                sessionStorage.setItem('pureTubeIntentPassed', 'true'); 
                
                try {
                    chrome.storage.local.get(['focusCount'], (res) => {
                        let count = res.focusCount || 0;
                        chrome.storage.local.set({ focusCount: count + 1 });
                    });
                } catch(err) { console.log(err); }

                overlay.remove(); 
                window.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(rawIntent);
            };

            btn.addEventListener('click', unlockAndSearch);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') unlockAndSearch();
            });
        };

        appendOverlay();

    } catch (error) {
        console.error("Niyet Filtresi Hatası:", error);
    }
}
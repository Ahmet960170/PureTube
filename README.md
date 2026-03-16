<div align="center">
  <img src="icon.png" alt="PureTube Logo" width="120">
  <h1>🚀 PureTube</h1>
  <p><b>YouTube'u Bir Zaman Tuzağından Çıkarıp, Profesyonel Bir Öğrenme Merkezine Dönüştürün.</b></p>

  <img src="https://img.shields.io/badge/TEKNOFEST-2026-red?style=for-the-badge" alt="TEKNOFEST 2026">
  <img src="https://img.shields.io/badge/Kategori-İnsanlık_Yararına_Teknolojiler-blue?style=for-the-badge" alt="Kategori">
  <img src="https://img.shields.io/badge/Seviye-Lise-orange?style=for-the-badge" alt="Lise Seviyesi">
  <br>
  <img src="https://img.shields.io/badge/Manifest-V3-success?style=flat-square&logo=google-chrome" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Dil-i18n_(TR_|_EN_|_ES_|_DE)-lightgrey?style=flat-square" alt="i18n">
  <img src="https://img.shields.io/badge/Gizlilik-100%25_Yerel_Veri-brightgreen?style=flat-square" alt="Privacy">
</div>

---

## 📌 Projenin Amacı ve Vizyonu
Günümüzde öğrencilerin araştırma yapmak veya ders dinlemek amacıyla girdikleri YouTube'da, yapay zeka destekli öneri algoritmaları ve **Shorts** videoları yüzünden saatlerini kaybetmesi (Doomscrolling) büyük bir problemdir. 

**PureTube**, kullanıcıyı platformun bağımlılık yapıcı unsurlarından koruyan, **"En Az Ayrıcalık" (Least Privilege)** prensibiyle çalışan ve tamamen çevrimdışı (offline) işlem yapan profesyonel bir odaklanma asistanıdır.

---

## ✨ Temel Özellikler ve Mühendislik Yaklaşımı

### 🎯 1. Akıllı Niyet Filtresi (Intent Shield)
YouTube'a girildiğinde platformu doğrudan açmaz. Ekranı buğulayarak kullanıcının amacını (niyetini) yazmasını zorunlu kılar.
* **Algoritmik Denetim:** Eğlence odaklı kelimeleri (oyun, dizi, komik vb.) veya anlamsız harf dizilerini (asdf) tespit edip girişi engeller. Kullanıcıyı bilinçli bir arama yapmaya zorlar.

### 🔒 2. İrade Kilidi (Friction Design)
Öğrencinin ders çalışmaktan sıkılıp eklentiyi kapatmak istemesi durumunda devreye girer.
* **Bilişsel Sürtünme:** Şalterin kapanmasını geçici olarak durdurur ve kullanıcının ekrandaki uzun bir metni ("odağımı bozmayı kabul ediyorum") kusursuz bir şekilde yazmasını ister. Bu "sürtünme anı", kullanıcının dürtüsel kararından vazgeçmesini sağlar.

### 🧹 3. Zero-Cost Görsel Arınma (DOM Manipulation)
YouTube'un karmaşık arayüzünü performansı düşürmeden temizler.
* JavaScript ile eleman silip sayfayı kilitlemek yerine, **CSS Specificity (`!important`)** hiyerarşisi kullanılarak *Shorts, Önerilen Videolar, Yorumlar, Bitiş Ekranları ve Canlı Sohbet* anında gizlenir.

### 👁️ 4. Kapsayıcı Tasarım (A11Y - Erişilebilirlik)
* **Disleksi Dostu Mod:** Özel font ailesi ve artırılmış harf/satır boşlukları ile okuma güçlüğü çeken kullanıcılara destek sağlar.
* **Renksiz Mod (Dopamin Kontrolü):** Ekranı tamamen siyah-beyaz yaparak parlak renklerin beyinde yarattığı dopamin salınımını düşürür, platformu "sıkıcı" ama verimli hale getirir.

### 🌍 5. Global Mimari (i18n Localization)
Proje içine gömülü (hardcoded) hiçbir sabit metin bulunmaz. Chrome'un **i18n API'si** kullanılarak tarayıcı diline göre asenkron (`async/await`) olarak **Türkçe, İngilizce, İspanyolca ve Almanca** dillerinde anında çalışır.

---

## 🛠️ Kurulum Rehberi (Geliştirici Modu)

Bu eklenti Chrome Web Mağazası'na yüklenmeden önce yerel bilgisayarınızda test etmek için tasarlanmıştır.

1. Bu depoyu sağ üstteki yeşil **"Code"** butonuna basarak `Download ZIP` seçeneğiyle indirin ve bir klasöre çıkartın.
2. Google Chrome tarayıcısını açın ve adres çubuğuna `chrome://extensions/` yazın.
3. Sağ üst köşedeki **"Geliştirici Modu" (Developer mode)** anahtarını aktif hale getirin.
4. Sol üstte beliren **"Paket açılmamış öğe yükle" (Load unpacked)** butonuna tıklayın.
5. İndirip zip'ten çıkardığınız klasörü seçin.
6. Sağ üstteki yapboz (eklentiler) ikonuna tıklayarak PureTube'u sabitleyin ve hemen YouTube'a girerek test edin!

---

## 📁 Klasör Hiyerarşisi (Directory Structure)
```text
PureTube/
 ├── _locales/           # i18n Dinamik Dil Motoru Dosyaları (TR, EN, ES, DE)
 ├── manifest.json       # MV3 Güvenlik ve İzin Mimarisi (Kök Dosya)
 ├── background.js       # Service Worker (Olay Güdümlü Arka Plan İşlemleri)
 ├── content.js          # DOM Enjeksiyonu ve Niyet Filtresi Algoritması
 ├── styles.css          # YouTube UI Gizleme Kuralları (Zero-Cost)
 ├── popup.html/css/js   # Eklenti Arayüzü, Akordeon Menü ve Ayar Motoru
 ├── welcome.html/js     # İlk Kurulum (Onboarding) Karşılama Ekranı
 └── icon.png            # Yüksek Çözünürlüklü Vektörel Logolar

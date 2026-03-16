# PureTube: YouTube Odak ve İrade Asistanı

<p align="center">
  <img src="https://img.shields.io/badge/TEKNOFEST-2026-red?style=flat-square">
  <img src="https://img.shields.io/badge/İnsanlık_Yararına_Teknolojiler-Lise-blue?style=flat-square">
  <img src="https://img.shields.io/badge/Manifest-V3-success?style=flat-square">
</p>

Selam! Ben [Adın Soyadın]. Bu projeyi TEKNOFEST 2026 İnsanlık Yararına Teknolojiler yarışması için geliştirdim.

Hepimizin başına mutlaka gelmiştir: YouTube'a bir matematik konu anlatımı izlemek veya araştırma yapmak için gireriz ama algoritma bizi öyle bir yakalar ki, bir saat sonra kendimizi arka arkaya Shorts videoları kaydırırken buluruz. PureTube'u tam olarak bu "dijital dikkat dağınıklığını" çözmek ve YouTube'u sadece bir öğrenme merkezine dönüştürmek için kodladım.

## Projenin Arkasındaki Mühendislik ve Mantık

Sadece "şunu gizle, bunu kapat" diyen basit bir eklenti yapmak istemedim. Kodları yazarken işin içine biraz psikoloji ve modern yazılım mimarisi katmaya çalıştım:

* **Niyet Filtresi (Intent Shield):** YouTube'u açtığınızda site hemen yüklenmez. Karşınıza çıkan puslu ekrana o anki "niyetinizi" (örn: türev soru çözümü) yazmanız gerekir. Sistem arka planda küçük bir analiz yapar; oyun, dizi, kedi gibi eğlence kelimelerini veya "asdf" gibi rastgele tuşlamaları tespit ederse içeri girmenize izin vermez.
* **İrade Kilidi (Friction Design):** Diyelim ki ders çalışırken sıkıldınız ve eklentiyi kapatıp Shorts izlemeye karar verdiniz. PureTube buna hemen izin vermiyor. Şalteri indirmek istediğinizde ekrana bir kilit penceresi geliyor ve "odağımı bozmayı kabul ediyorum" cümlesini eksiksiz yazmanızı istiyor. UI/UX literatüründe "Bilişsel Sürtünme" (Cognitive Friction) denilen bu küçük engel, kullanıcının o anki dürtüsel kararını sorgulamasını sağlıyor.
* **Sıfır Maliyetli (Zero-Cost) Gizleme:** YouTube'un arayüzünü (Shorts, önerilenler, yorumlar, bitiş ekranları) gizlerken JavaScript kullanıp DOM elementlerini silmek tarayıcıyı çok yorar. Bunun yerine doğrudan CSS `!important` etiketleriyle sayfa hiyerarşisini ezdim. Tarayıcıda hiçbir performans kaybı yaşanmıyor.
* **Erişilebilirlik ve Dopamin Kontrolü:** Koda disleksi (okuma güçlüğü) yaşayan kullanıcılar için özel bir font seçeneği ekledim. Ayrıca isteyenler YouTube'u tamamen siyah-beyaz formata çevirebiliyor; böylece parlak renklerin beyinde yarattığı dopamin salınımı azalarak platform "sıkıcı" ama asıl amacına uygun hale geliyor.
* **Global Ölçeklenebilirlik (i18n API):** Kodların içine tek bir sabit metin bile gömmedim. Chrome'un i18n API'sini kullanarak sistemi Türkçe, İngilizce, İspanyolca ve Almanca dillerine duyarlı hale getirdim.

## Kendi Tarayıcınızda Nasıl Test Edebilirsiniz?

Jüri üyelerimiz veya kodu incelemek isteyen geliştiriciler için kurulum çok basit:

1. Bu sayfanın sağ üstündeki yeşil **"Code"** butonuna tıklayıp **"Download ZIP"** diyerek projeyi bilgisayarınıza indirin ve bir klasöre çıkartın.
2. Google Chrome'u açıp adres çubuğuna `chrome://extensions/` yazın.
3. Sağ üstten **"Geliştirici Modu"nu** (Developer mode) açın.
4. Sol üstteki **"Paket açılmamış öğe yükle"** (Load unpacked) butonuna tıklayıp indirdiğiniz klasörü seçin.
5. Sağ üstteki uzantılar menüsünden (yapboz ikonu) PureTube'u sabitleyin. Şimdi YouTube'a girip test edebilirsiniz!

---
*Bu açık kaynaklı proje, teknolojiyi zamanımızı çalan değil, zamanımızı yönetmemizi sağlayan bir araca dönüştürmek amacıyla kodlanmıştır.*

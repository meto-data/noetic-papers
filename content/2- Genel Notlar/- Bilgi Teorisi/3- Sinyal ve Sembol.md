---
draft: true
---

**Sembol**: Gözlemlenebilir bir sinyalin basit bir süre boyunca değişmeyen durumu. İster ateş ister ses ister elektrik akımı: Sinyal hareketi bir durumdan başka bir duruma geçmekten ibarettir. Sembol oranıysa, 1 saniyeye sığabilen sinyal hareketi sayısıdır.


# Bilgi ve İletişimin Temelleri: Racona Giriş

Bu not, dijital bilginin nasıl fiziksel bir sinyale dönüştüğünü, bu süreçteki temel kavramları ve modern teknolojinin bu işi nasıl yaptığını en basit, en akılda kalıcı haliyle açıklar.

## BÖLÜM 1: Her Şeyin Başladığı Yer - Mors'tan Önceki Amelelik

### ### Telgrafın En Büyük Derdi: Tek Hattan Alfabe Yollamak
*   **Problem:** Elimizde tek bir elektrik kablosu var. Bu kablo sadece iki şey anlar: **"Elektrik Var"** ya da **"Elektrik Yok"**. Peki bu iki durumla koca bir alfabeyi karşıya nasıl geçireceksin?
*   **İlk Çözüm (Alman Usulü):** Wilhelm Weber adında bir fizikçi ve ekibi, **Galvanometre** (içinden elektrik geçince ibresi oynayan bir alet) kullanmayı akıl etti.
    *   **Mantık:** Elektriği bir yönde verirsek ibre **sağa**, ters yönde verirsek **sola** oynasın. Al sana iki farklı temel hareket!
    *   **Kodlama:** Sık kullanılan harflere kısa kodlar verdiler (örn: `Sağa sapma` = A, `Sola sapma` = E). Az kullanılan harflere ise daha uzun kombinasyonlar (`sağ-sağ-sağ` = K gibi).
    *   **Neden Boka Sardı?:** Sistem aşırı yavaştı (dakikada ~9 harf). Sinyalleri hızlandırmaya çalıştıklarında, ibrenin salınımı bitmeden yeni sinyal geliyor ve her şey birbirine giriyordu. Buna **"Sinyal Oranı Düşüklüğü"** denir.

## BÖLÜM 2: Sahneye Morse'un Girmesi ve Devrim

### ### Samuel Morse'un Dahi Fikri: Yön Değil, Süre!
*   Morse, "İbrenin yönüyle uğraşmak yerine, sinyalin **ne kadar sürdüğüyle** oynayalım" dedi ve oyunu değiştirdi.
*   İki temel sinyal yarattı:
    *   **Nokta (dit):** Çok kısa süreli bir elektrik darbesi.
    *   **Çizgi (dah):** Noktanın yaklaşık 3 katı uzunlukta bir elektrik darbesi.

### ### Morse Alfabesinin Asıl Sırrı: Ritmin Gücü
*   Morse'u dahi yapan şey sadece nokta ve çizgi değildi; aralara koyduğu **boşluklardı (es).** Boşluklar olmadan Mors kodu anlamsız bir vızıltıdır.
*   **Üç Temel Boşluk Kuralı:**
    1.  **Harf İçi Boşluk:** Bir harfi oluşturan nokta ve çizgiler arasında **1 birimlik** boşluk. (Örn: R harfindeki `.-.` arasındaki boşluklar).
    2.  **Harfler Arası Boşluk:** Bir kelimedeki harfler arasında **3 birimlik** boşluk. (Örn: `LOW` kelimesindeki L ile O arasındaki boşluk).
    3.  **Kelimeler Arası Boşluk:** Cümledeki kelimeler arasında **7 birimlik** boşluk.

## BÖLÜM 3: Temel Kavramlar - Bilgiyi Nasıl Tartarız?

Bu üç kavramı anlarsan, her şeyi anlarsın. Zıtlarıyla birlikte düşünelim.

### ### Bit: Soyut Karar
*   **Nedir?:** Bilginin en küçük, bölünemez parçası. **1 (Evet/Var)** ya da **0 (Hayır/Yok)** kararından ibarettir. Fiziksel bir şey değildir.
*   **Zıttı:** Yoktur, çünkü kendisi zaten bir zıtlıktır (1 vs 0).

### ### Sinyal: Fiziksel Taşıyıcı
*   **Nedir?:** Bilgiyi taşıyan fiziksel olayın kendisi. Kablodaki elektrik akımı, havadaki ses dalgası, fenerin ışığı... Bunlar sinyaldir.
*   **Zıttı:** **Gürültü (Noise).** Gürültü de fiziksel bir dalgadır ama bilgi taşımaz, tam tersi var olan sinyali bozar.

### ### Sembol: Anlamlı Paket
*   **Nedir?:** Bir veya daha fazla bit'i temsil eden, önceden üzerinde anlaşılmış **anlamlı bir sinyal durumudur.** Sinyali kullanarak yaptığın anlamlı bir harekettir.
	* **Gözlemlenebilir bir sinyalin basit bir süre boyunca değişmeyen durumu** = sembol.
*   **Örnek:** "Feneri kısa yakıp söndürmek" bir semboldür ve bu 'E' harfi anlamına gelebilir.
*   **Zıttı:** **Anlamsız Sinyal.** Feneri rastgele sallamak bir sinyaldir, ama bir anlamı (sembolü) yoktur.

## BÖLÜM 4: Hızın Matematiği - Baud ve Bit Olayı

### ### 8 Bitlik "A" Harfi (`01000001`) Nasıl Gider?

#### #### Yöntem 1: Amele Yöntemi (1 Sembol = 1 Bit)
*   **Kural:** Elektrik darbesi **VARSA = 1**, **YOKSA = 0**.
*   **Sonuç:** 8 bitlik "A" harfini yollamak için tam **8 kere** "var/yok" durumu yaratırsın. 8 bit = 8 sembol = 8 sinyal darbesi.

#### #### Yöntem 2: Usta Yöntemi (1 Sembol > 1 Bit)
*   **Kural:** Farklı voltaj seviyeleri belirleyelim.
    *   `00` için: **1 Volt** gönder.
    *   `01` için: **2 Volt** gönder.
    *   `10` için: **3 Volt** gönder.
    *   `11` için: **4 Volt** gönder.
*   **Sonuç:** "A" harfini (`01` `00` `00` `01`) yollamak için sadece **4 kere** sinyal gönderirsin: (2 Volt) - (1 Volt) - (1 Volt) - (2 Volt).
*   **Kârımız Ne?:** Aynı bilgiyi **yarı sayıda sinyal hareketiyle** yolladık. Tek bir sinyal darbesine (sembole) daha fazla bit sığdırdık.

2

## BÖLÜM 5: Modern Dünya - Wi-Fi ve Seksi Dans Figürleri (QAM)

Günümüzdeki modemler de tam olarak "Usta Yöntemi"ni kullanır. PC'nin içindeki saf 1'ler ve 0'lar, modem tarafından gruplanır ve her gruba özel, karmaşık bir analog sinyal atanır.

### ### Wi-Fi Standartları ve Gruplama Mantığı
*   Her yeni Wi-Fi standardı (Wi-Fi 4, 5, 6), tek bir sinyal darbesine daha fazla bit sığdırmak için daha karmaşık kodlama şemaları (QAM) kullanır.
*   **Wi-Fi 4 (16-QAM):** Bitleri **4'erli** gruplar. Tek sinyal darbesi (sembol) ile 4 bit taşır.
*   **Wi-Fi 5 (256-QAM):** Bitleri **8'erli** gruplar. Tek sinyal darbesi ile 8 bit taşır.
*   **Wi-Fi 6 (1024-QAM):** Bitleri **10'arlı** gruplar. Tek sinyal darbesi ile 10 bit taşır.

### ### İşin Cilvesi: Hız ve Hassasiyet Takası
*   **Problem:** Tek seferde ne kadar çok bit yollamaya çalışırsan (örn: 1024-QAM), yaratman gereken sinyal durumları o kadar hassas ve birbirine yakın olur.
*   **Sonuç:** Bu hassas sinyaller, en ufak bir gürültüden veya sinyal zayıflığından (mesela modemden uzaklaşınca) anında bozulur ve alıcı tarafından yanlış anlaşılabilir.
*   **Akıllı Modem Davranışı:** Modem, sinyal kalitesi düştüğünde hata yapmamak için otomatik olarak **vites düşürür.** Hızlı ve hassas olan 1024-QAM'den, daha yavaş ama daha dayanıklı olan 256-QAM'e veya 16-QAM'e geçer. Hızın düşer ama bağlantın stabil kalır.

---

Peki, madem bu hassas sinyaller gürültüden ve mesafeden bu kadar kolay etkileniyor, o zaman biz bu **hızı artırmak ve bu kadar yüksek QAM seviyelerini mümkün kılmak için ne halt ediyoruz?** Bu işin bir çözümü, bir hilesi yok mu?

*(...devamı bir sonraki derste...)*
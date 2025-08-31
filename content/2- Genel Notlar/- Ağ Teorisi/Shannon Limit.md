
### 1. Bilgi Dediğin Şey Sürprizdir (Nadir Olay → Çok Bilgi)

Bu en temel kural. Düşün şimdi:

- **Olay 1:** Sabah kalktın, güneş doğudan doğdu.
    
    - **Olasılığı ne?** %100'e yakın.
        
    - **Sana kattığı bilgi ne?** Sıfır. Zerre şaşırmazsın. "Vay amk yine mi doğudan doğdu" demezsin. Bu siktiriboktan bir bilgidir.
        
- **Olay 2:** Yolda yürürken arkadaşın aradı, "Kanka 5 dakikaya oradayım" dedi.
    
    - **Olasılığı ne?** Belki %50. Gelebilir de, yarım saat gecikebilir de.
        
    - **Sana kattığı bilgi ne?** Biraz bilgi var. En azından yola çıktığını öğrendin.
        
- **Olay 3:** Milli piyango aldın ve SANA ÇIKTI!
    
    - **Olasılığı ne?** Milyonda bir falan. Neredeyse imkansız.
        
    - **Sana kattığı bilgi ne?** ANASINI SİKTİMİN BİLGİSİ! Hayatını değiştiren, devasa bir sürpriz. İşte bu çok değerli bir bilgi.
        

**Sonuç:** Bir olayın olma ihtimali ne kadar azsa, o olay gerçekleştiğinde sana verdiği "bilgi" o kadar fazladır. Yani **Bilgi, olasılıkla ters çalışır.**

### 2. Olasılıklar Orospu Çocuğu Gibi Çarpılır, Ama Bilgiler Adam Gibi Toplanır

İşte bütün meselenin kilitlendiği yer burası. Burayı anlarsan, gerisi çorap söküğü.

Diyelim ki hilesiz bir parayı iki kez havaya atıyoruz.

- İlk atışta TURA gelme olasılığı nedir? **1/2**
    
- İkinci atışta TURA gelme olasılığı nedir? **1/2**
    

Peki, iki kere üst üste TURA gelme olasılığı nedir?  
Olasılıkları çarparsın: (1/2) * (1/2) = **1/4**.

Tamam, bu cepte. Şimdi "bilgi" açısından bakalım.  
İlk TURA geldiğinde bir miktar "bilgilendin". İkinci TURA geldiğinde, bir o kadar daha "bilgilendin".  
Senin beynin, toplam bilgiyi nasıl algılar? İki olaydaki bilgileri **toplarsın**, değil mi? Yani;  
(İlk Turanın Bilgisi) + (İkinci Turanın Bilgisi) = (Toplam Bilgi)

Ahanda sıçtık. Elimizde şöyle bir durum var:

- **Olasılıklar ÇARPILIYOR.**
    
- **Bilgiler TOPLANIYOR.**
    

İşte bu iki amına kodumun zıt işlemini birbirine bağlayacak bir kahraman lazım.

### 3. Kahraman Sahneye Çıkıyor: LOGARİTMA!

Matematikte öyle bir fonksiyon var ki, sen ona çarpım olarak verdiğin şeyleri, sana toplama olarak geri veriyor. Bu sihirli pezevengin adı **LOGARİTMA**.

Hatırla liseden: **log(a * b) = log(a) + log(b)**

Gördün mü? Orospu çocuğu çarpımı aldı, toplama yaptı! Tam aradığımız adam.

Şimdi yazı tura örneğimize geri dönelim ve bilgi miktarını log(1/olasılık) olarak tanımlayalım. (Olasılıkla ters orantılı ya, o yüzden 1'e bölüyoruz). Taban olarak da genelde 2 kullanılır (bit hesabı için), ona takılma şimdilik.

- **Tek Tura Gelmesinin Bilgisi:**
    
    - Olasılık = 1/2
        
    - Bilgi = log₂(1 / (1/2)) = log₂(2) = **1 bit**
        
- **İki Kere Tura Gelmesinin Bilgisi:**
    
    - Olasılık = 1/4
        
    - Bilgi = log₂(1 / (1/4)) = log₂(4) = **2 bit**
        

Bak şimdi ne oldu!  
Bilgi(Tura) + Bilgi(Tura) = Toplam Bilgi  
1 bit + 1 bit = **2 bit**

Logaritma sayesinde, olasılıklar çarpılırken, bilgilerimiz mis gibi toplandı! Logaritma, bu iki farklı dünyanın arasında tercümanlık yapan bir anasının gözü alettir.

### Sonuç: O Sikindirik Formül Ne Anlama Geliyor?

**Toplam bilgi = Σ −pᵢ log₂(pᵢ)**

Bu formülü de Türkçeye çevirelim:

- **log₂(pᵢ):** Bu, i numaralı olayın bilgi/sürpriz değeri. Olasılık (p) 1'den küçük olduğu için bu sonuç negatif çıkar.
    
- **−log₂(pᵢ):** Başına bir eksi koyarız ki sonuç pozitif olsun, kafamız karışmasın. Bu işte log₂(1/pᵢ) yazmanın artistik yolu. Yani bu kısım, i olayının tek başına ne kadar bilgi taşıdığını söylüyor.
    
- **pᵢ:** Bu da o olayın gerçekleşme ihtimali.
    
- **pᵢ * (−log₂(pᵢ)):** Bir olayın bilgi değerini, kendi olma ihtimaliyle çarpıyoruz. Buna "ağırlıklı ortalama" denir. Yani sık olan olayların toplamdaki etkisi daha fazla, nadir olanlarınki daha az olsun diye yapıyoruz.
    
- **Σ (Sigma):** "Hepsini topla amk" demek. Yani sistemdeki bütün olası olaylar için bu hesabı yap ve sonuçları topla.
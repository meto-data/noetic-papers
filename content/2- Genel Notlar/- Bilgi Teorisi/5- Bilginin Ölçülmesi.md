

### Bilgi Teorisine Giriş: Videodan Analitik Notlar

- #### Temel Kavram: Bilgi ve Değeri
    
    - Bir mesajın veya iletinin asıl değeri, onun fiziksel uzunluğuyla değil, taşıdığı **belirsizliği** ne kadar ortadan kaldırdığıyla ölçülür.
        
    - **Bilgiyi ölçmenin en temel yolu, o bilginin içerdiği tüm belirsizliği ortadan kaldırmak için gereken minimum "evet/hayır" sorusunun sayısını bulmaktır. Ne kadar çok soru gerekiyorsa, bilgi miktarı o kadar fazladır.**
        
- #### Bilginin Atomu: Bit
    
    - **Bit**, bilginin en temel ve en küçük birimidir.
        
    - Sadece iki olası durumu temsil edebilir: **1** (var, evet, doğru) veya **0** (yok, hayır, yanlış).
        
    - Her bir "evet/hayır" sorusunun net cevabı, **1 bit** değerinde bilgiye eşittir.
        
    - Terim, İngilizce'deki **"Binary Digit"** (İkili Rakam) ifadesinin birleşiminden türetilmiştir.
        
- #### İleti Uzayı: "S" Harfinin Sırrı
    
    - **S**, bir mesajın alabileceği toplam **olası ve birbirinden farklı durumların sayısını** ifade eden bir değişkendir.
        
    - **İngilizcesi Nedir?** Bu kavrama istatistik ve bilgi teorisinde **"Sample Space"** (Örneklem Uzayı) veya daha genel anlamda **"Set of possible Symbols/States"** (Olası Semboller/Durumlar Kümesi) denir.
        
    - **Neden "S" Harfi Kullanılıyor?** Tek bir zorunlu sebebi olmasa da, bu harfin seçilmesinin arkasında yatan en güçlü ve yaygın kabul gören nedenler şunlardır:
        
        - **S**ymbol (Sembol): Çünkü ileti uzayı, farklı sembollerden (harfler, sayılar, kartlar vb.) oluşur.
            
        - **S**et (Küme): Matematiksel olarak, olası tüm durumların oluşturduğu bir kümedir.
            
        - **S**tate (Durum): Her bir olası sonuç, sistemin bir "durumunu" temsil eder.
            
        - **S**ample Space (Örneklem Uzayı): İstatistik bilimindeki doğrudan karşılığıdır.  
            Yani "S" harfi, bu temel kavramları temsil etmek için evrensel bir kısaltma haline gelmiştir.
            
- #### Bilgiyi Hesaplama Formülü
    
    - Bir mesajın taşıdığı bilgi miktarını (bit cinsinden) hesaplamak için kullanılan temel formül şöyledir:
        
              `H = log₂(S)`
            
    - **H:** Aradığımız bilgi miktarı (bit olarak). Teknik adı **Hartley Bilgisi** veya **Entropi**'dir.
        
    - **S:** İleti uzayı, yani toplam olası durum sayısı.
        
    - **log₂:** 2 tabanında logaritma.
        
    - **Formülün Anlamı:** "Bir sonuca ulaşmak için, S kadar olasılığı olan bir havuzu, her adımda ikiye bölerek kaç adımda sıfıra indirebilirim?" sorusunun cevabıdır.
        
- #### Videodaki Örneklerin Analizi
    
    1. **Müşteri 1 (10 Yazı-Tura):**
        
        - Tek bir atış için ileti uzayı S=2'dir (Yazı veya Tura).
            
        - H = log₂(2) = 1 bit.
            
        - 10 bağımsız atış için toplam bilgi: 10 * 1 = **10 bit**.
            
    2. **Müşteri 2 (6 Harfli Kelime):**
        
        - Tek bir harf için S=26.
            
        - H = log₂(26) ≈ 4.7 bit. (Bu ortalama bir değerdir, çünkü 26 sayısı 2'nin tam kuvveti değildir.)
            
        - 6 harfli kelime için toplam bilgi: 6 * 4.7 ≈ **28.2 bit**.
            
    3. **Müşteri 3 (5 Kartlık Poker Eli):**
        
        - Tek bir kart için S=52.
            
        - H = log₂(52) ≈ 5.7 bit.
            
        - 5 kartlık el için toplam bilgi: 5 * 5.7 ≈ **28.5 bit**
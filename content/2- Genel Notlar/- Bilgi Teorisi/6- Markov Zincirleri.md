---
draft: true
---

### **Markov Zincirlerinin Doğuşu ve Felsefi Arka Planı**

#### **1. Zemin: Olasılığın Temelleri ve Yarattığı Felsefi Gerilim**

- **Büyük Sayılar Yasası (Bernoulli):**
    
    - **İlke:** Rastgele bir deneyi (yazı tura, zar atma vb.) yeterince çok tekrar edersen, sonuçların ortalaması beklenen matematiksel olasılığa çok yaklaşır.
        
    - **Örnek:** Bir parayı 1 milyon kez atarsan, tura gelme oranı %50'ye çok yakın olur.
        
    - **Kritik Şart:** Bu yasanın çalışması için her bir deneyin bir öncekinden **bağımsız** olması gerekir. Bir zar atışının sonucu, bir sonraki atışı etkilemez.
        
- **Merkezi Limit Teoremi (Galton'un Fasulye Makinesi):**
    
    - **İlke:** Çok sayıda bağımsız ve rastgele değişkenin toplamı, her zaman çan eğrisi şeklinde bilinen "Normal Dağılım"a yakınsar.
        
    - **Anlamı:** Tamamen rastgele görünen olayların bile toplamında öngörülebilir, evrensel bir düzen vardır. Kaosun içinde bir düzen gizlidir.
        

#### **2. Fırtınanın Kopuşu: Pavel Nekrasov'un İtirazı ve Korkuları**

- **Kimdir?:** Sadece bir din adamı değil, aynı zamanda Moskova Matematik Ekolü'nün başındaki saygın bir matematikçi.
    
- **Temel Argümanı:** Büyük Sayılar Yasası ve Merkezi Limit Teoremi'ni insan toplumuna uygulamak tehlikelidir ve felsefi olarak yanlıştır.
    
- **İtiraz Noktaları:**
    
    - **1. Matematiksel İtiraz (Teknik Olarak Haklı):** "Sizin teorileriniz **bağımsızlık** varsayımına dayanıyor. Ama gerçek dünyadaki sosyal olaylar (suç oranları, ekonomik krizler vb.) birbirinden bağımsız değildir. Her olay, bir öncekinden etkilenir. Sistemin bir hafızası vardır."
        
    - **2. Felsefi/Teolojik Korku (Asıl Derdi):** "Eğer insan davranışlarını ve toplumsal olayları istatistiksel olarak öngörebileceğinizi iddia ederseniz, bu **'İstatistiksel Kadercilik'** olur. Bu durumda bireyin **özgür iradesinin**, ahlaki seçimlerinin ve Tanrı'nın rolünün bir anlamı kalmaz."
        
    - **Özetle Nekrasov:** İnsan ruhunu ve toplumu, öngörülebilir bir formüle indirgeyen bu yaklaşıma karşı çıkıyordu. Bağımlılığın, matematiğin öngörü gücünü kırdığına ve insan iradesi için bir alan açtığına inanıyordu.
        

#### **3. Karşı Hamle: Andrey Markov'un Dehası**

- **Kimdir?:** Nekrasov'un rakibi olan St. Petersburg Matematik Ekolü'nden bir dahi. Bu tartışmayı hem rakibini alt etmek hem de matematiğin sınırlarını genişletmek için bir fırsat olarak gördü.
    
- **Stratejisi:** Nekrasov'un "gerçek dünya bağımlıdır" iddiasını reddetmek yerine, onu kabul etti ve üzerine gitti. Adeta, "Evet, dünya bağımlıdır ve ben bu bağımlılığın bile matematiğini yapabilirim" dedi.
    
- **İcadı: Markov Zinciri**
    
    - **Markov Özelliği (Temel Kural):** Bir sistemin gelecekteki durumunu tahmin etmek için, onun bütün geçmişini bilmek gerekmez. Sadece **mevcut durumunu** bilmek yeterlidir.
        
        - **Anlamı:** Sistemin bir hafızası vardır, ancak bu hafıza "kısa sürelidir". Sadece bir önceki adımı hatırlar.
            
        - **Videodaki Örnek:** Bir sonraki fasulyeyi hangi bardaktan çekeceğin, sadece en son çektiğin fasulyenin rengine bağlıdır; ondan önceki 50 çekilişe değil.
            
    - **Nekrasov'a Cevabı:** Markov, bu "kısa süreli hafızaya" sahip, birbirine bağlı olaylar dizisinin bile, yeterince tekrarlandığında **öngörülebilir bir denge durumuna** ulaştığını matematiksel olarak kanıtladı.
        
    - **Özetle Markov:** Olayların birbirine bağlı olması, onların da altında yatan bir düzen olmadığı anlamına gelmez. Bağımlılığın kendisi de modellenebilir bir matematiktir.
        

#### **4. Kavganın Mirası: Bilgi Teorisinin Doğuşu (Claude Shannon)**

- **Bağlantı Noktası:** Markov'un icat ettiği bu "bağımlı olaylar matematiği" (Markov Zinciri), yıllar sonra Claude Shannon tarafından bambaşka bir alanda kullanıldı.
    
- **Shannon'ın Gözlemi:** Dil, rastgele bir harf yığını değildir. Harflerin ve kelimelerin sıralanışı, bir önceki harfe/kelimeye güçlü bir şekilde **bağlıdır**. ("q" harfinden sonra neredeyse her zaman "u" gelmesi gibi).
    
- **Uygulama:** Shannon, dili bir **Markov Zinciri** olarak modelledi. Bu sayede, bir mesajdaki belirsizliği (entropiyi) ölçebildi ve **Bilgi Teorisi**'ni kurdu.
    
- **Sonuç:** Bugün kullandığımız veri sıkıştırma (ZIP), internet protokolleri, arama motorları ve yapay zeka gibi teknolojilerin temelinde, Markov'un Nekrasov'a ders vermek için geliştirdiği bu deha ürünü yatar.
    

---

**ÖZET (Bir Ay Sonra Bakılacak Kısım):**

- **Tartışma:** "Büyük Sayılar Yasası" gibi istatistiksel kanunlar, olayların birbirinden **bağımsız** olmasını gerektirir.
    
- **Nekrasov (Papaz):** "İnsan toplumu bağımlı olaylardan oluşur, bu yüzden matematiğiniz burada işlemez ve özgür irade vardır."
    
- **Markov (Matematikçi):** "Yanılıyorsun. Bağımlı olayların bile kendi matematiği vardır (Markov Zinciri) ve bu sistemler de uzun vadede öngörülebilir bir dengeye ulaşır."
    
- **Sonuç:** Markov haklı çıktı ve icadı, Claude Shannon tarafından **Bilgi Teorisi**'ni yaratmak için kullanılarak modern teknolojinin temelini oluşturdu.
    
- **Düşündürücü Soru:** Nekrasov'un 100 yıl önceki "istatistiksel kadercilik" korkusu, bugün davranışlarımızı tahmin eden ve yönlendiren algoritmalarla gerçeğe mi dönüşüyor?
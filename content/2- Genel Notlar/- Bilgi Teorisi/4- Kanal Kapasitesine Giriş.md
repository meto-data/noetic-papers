---
draft: true
---

## BÖLÜM 1: Temel Problem ve Akıllıca Çözüm

### Kapasiteyi Artırma İhtiyacı
*   **Problem:** Tek bir fiziksel hat (kablo) üzerinden, yeni hatlar döşemeden, daha fazla bilgiyi daha hızlı bir şekilde nasıl gönderebiliriz?
*   **Temel Çözüm Fikri:** Sadece iki durumlu ("Var/Yok" veya "Açık/Kapalı") bir sistem kullanmak yerine, gönderilen sinyalin farklı özelliklerini kullanarak daha fazla "durum" veya "seçenek" yaratmak.

### Farklı Sinyal Durumları Yaratmak
*   Bu fikir, sinyalin tek bir özelliğine bağlı kalmamayı içerir. Videodaki örnekler bu mantığı açıklar:
    *   **Renk Tonları:** Sadece siyah ve beyaz değil, grinin farklı tonlarını kullanmak. Her ton, ayrı bir bilgiyi temsil eder.
    *   **Fiziksel Kuvvet:** Bir tele sadece vurmak değil, "hafif", "orta" ve "şiddetli" gibi farklı kuvvetlerde vurarak farklı anlamlar yüklemek.
    *   **Frekans Değişimi:** Telin gerginliğini değiştirerek "tiz" (yüksek frekans) veya "tok" (düşük frekans) sesler çıkarmak.
*   **Ana Fikir:** Tek bir sinyal darbesiyle (sembol) birden fazla bit'lik bilgi taşıyabilmek için, ayırt edilebilir sinyal durumlarının sayısını artırmak.

## BÖLÜM 2: Edison'un "Dörtlü Telgraf" Devrimi

### Fikrin Pratiğe Dökülmesi
*   Thomas Edison, bu fikri "Dörtlü Telgraf" (Quadruplex Telegraph) sistemiyle hayata geçirmiştir.
*   Amacı, tek bir telgraf hattı üzerinden aynı anda karşılıklı olarak ikişer mesaj göndererek hattın kapasitesini dörde katlamaktı.

### Edison'un Yöntemi: İki Özelliği Birleştirmek
*   Edison, bir elektrik sinyalinin **aynı anda iki farklı özelliğini** manipüle etmiştir:
    1.  **Yön:** Akımın ileri yönde mi (+) yoksa geri yönde mi (-) aktığı.
    2.  **Şiddet (Genlik):** Akımın gücü; zayıf mı yoksa güçlü mü olduğu (bunu zayıf ve güçlü iki farklı pil kullanarak başarmıştır).

### Sonuç: 4 Farklı Sembol
*   Bu iki özelliği birleştirerek, tek bir sinyal darbesiyle gönderilebilecek **4 farklı ve ayırt edilebilir sinyal durumu (sembol)** yaratmıştır:
    *   **+3 Volt:** Güçlü pille, ileri yönde akım.
    *   **+1 Volt:** Zayıf pille, ileri yönde akım.
    *   **-1 Volt:** Zayıf pille, geri yönde akım.
    *   **-3 Volt:** Güçlü pille, geri yönde akım.

### Kapasite Artışı
*   Daha önce "var/yok" ile tek darbede 1 bit taşınırken, Edison'un sistemi bu 4 farklı sembol sayesinde tek bir darbede **2 bitlik** bilgi taşıyabilir hale gelmiştir.
    *   `00` = -3V
    *   `01` = -1V
    *   `10` = +1V
    *   `11` = +3V
*   Böylece, sinyalin saniyedeki değişim hızı (Baud Rate) aynı kalsa bile, taşınan gerçek bilgi miktarı (Bit Rate) artırılmıştır.

## BÖLÜM 3: Fiziksel Gerçeklik: Gürültünün Limitleyici Etkisi

### "Neden Milyonlarca Seviye Kullanmıyoruz?" Sorusu
*   Madem seviye (sembol) sayısını artırmak hızı artırıyor, neden +1V, +1.001V, +1.002V gibi milyonlarca farklı voltaj seviyesi kullanmıyoruz?

### Cevap: Gürültü (Noise)
*   **Gürültü:** Her fiziksel iletişim kanalında (kablo, hava vb.) kaçınılmaz olarak bulunan, ısıdan veya diğer elektromanyetik etkileşimlerden kaynaklanan rastgele ve istenmeyen sinyal dalgalanmalarıdır.
*   **Etkisi:** Eğer yarattığınız sinyal seviyeleri (semboller) birbirine çok yakınsa, ortamdaki gürültü bu sinyalleri kolayca bozabilir.
*   **Örnek:** Siz `+1.001V` gönderirsiniz, ama araya giren gürültü bunu `+1.002V`'a dönüştürebilir. Bu durumda alıcı, mesajı tamamen yanlış anlar.
*   **Tasarım Kuralı:** Güvenilir bir iletişim için, kullanılan semboller (sinyal seviyeleri), gürültüye rağmen alıcı tarafından birbirine karıştırılmayacak kadar **ayrı ve birbirinden uzak** olmalıdır. Bu, bir sistemin hızını ve kapasitesini sınırlayan temel fiziksel bir limittir.

## BÖLÜM 4: Kapasitenin Matematiksel Formülasyonu

Bir iletişim sisteminin toplam kapasitesi, iki temel parametreye dayanır:

*   **1. Sembol Oranı (Baud Rate - N):** Sistemin saniyede kaç tane sembol (sinyal darbesi) gönderebildiğidir.
*   **2. Sembol Uzayı (Symbol Space - S):** Her bir darbede kullanılabilecek farklı ve ayırt edilebilir sembol sayısıdır. (Edison'un sisteminde S=4 idi).

### Karar Ağacı Mantığı
*   Bu ilişki bir karar ağacı gibi düşünülebilir:
    *   1 sembol gönderildiğinde, `S` tane olası mesaj vardır.
    *   2 sembol gönderildiğinde, `S * S = S²` tane olası mesaj vardır.
    *   **N** sembol gönderildiğinde, `S` üzeri `N` (**S^N**) tane farklı ve einzigartig mesaj kombinasyonu oluşturulabilir.

Bu **S^N** değeri, sistemin belirli bir sürede ne kadar farklı bilgi taşıyabildiğini, yani **iletişim kapasitesini** gösterir.
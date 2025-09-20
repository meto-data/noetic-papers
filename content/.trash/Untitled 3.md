
Sen, kullanıcıların videoda anlatılan  [ANA KONU VE ALT KONULAR]  kavramlarını derinlemesine anlamalarını, temel bileşenlerini tanımalarını, aralarındaki farkları (eğer varsa) ayırt edebilmelerini ve pratik senaryolarda nasıl uygulanacağını öğrenmelerini sağlamak için tasarlanan bir AI'sin. Uygulama; kavram tanımları, interaktif oyunlar, senaryo bazlı analizler ve testlerle desteklenecektir.

**Spesifikasyonlar:**

1.  **Ana Konu ve Alt Konulara Giriş:**
    *   Videodan çıkarılan ana konu ve alt konuların kısa bir özeti.
    *   Öğrenme hedeflerinin net bir şekilde belirtilmesi.

2.  **Etkileşimli Kavramlar Sözlüğü:**
    *   Videoda geçen veya konuyla ilgili kritik  [ANA KONU VE ALT KONULAR]  ile ilişkili temel terimlerin (örneğin,  [ÖRNEK_TERİM_1] ,  [ÖRNEK_TERİM_2] ,  [ÖRNEK_TERİM_3] , vb.) tanımlarını içeren bir sözlük.
    *   Kullanıcılar sözlükte arama yapabilmeli ve terimleri kategorilere (eğer varsa) göre filtreleyebilmelidir.
    *   Her terim için kısa, anlaşılır bir açıklama ve mümkünse videodan bir kesit veya görselle desteklenmelidir.

3.  **Bileşen/Süreç Tanıma Oyunu:**
    *    [ANA KONU VE ALT KONULAR]  içindeki önemli bileşenleri, adımları veya ilgili kavramları içeren bir diyagram, akış şeması veya etkileşimli alan.
    *   **Oyun Türleri (en az ikisi):**
        *   **Sürükle-Bırak Eşleştirme:** Kullanıcılar, kavram/bileşen adlarını doğru yerlere sürükleyip bırakmalıdır. (Örn:  [KAVRAM_A]  ↔  [AÇIKLAMA_A] ).
        *   **Doğru Sıralama:** Bir sürecin adımlarını doğru sıraya dizme.
        *   **Resim/Diyagram Üzerinde Etiketleme:** Verilen bir görseldeki boşluklara doğru terimleri yerleştirme.
    *   Oyun, videodaki anlatıma uygun olarak tasarlanmalıdır.

4.  **Senaryo Bazlı Uygulama/Karşılaştırma:**
    *   Videodaki bilgiler ışığında,  [ANA KONU VE ALT KONULAR] ın pratik uygulamalarını veya karşılaştırmalı analizlerini içeren çeşitli dijital/gerçek hayat senaryoları sunulmalıdır.
    *   Her senaryo için kullanıcıya, hangi kavramın/yöntemin/teknolojinin daha uygun olduğu veya senaryonun nasıl çözümleneceği sorulmalıdır.
    *   Kullanıcının cevabından sonra, sistem doğru cevabı ve nedenleriyle birlikte detaylı bir açıklama sunmalıdır. Videodan ilgili kısımlara atıfta bulunulabilir.

5.  **Bilgi Pekiştirme Testleri:**
    *   **Kısa Testler:** Her ana bölümün sonunda veya genel olarak konuyla ilgili 5-10 soruluk kısa testler.
        *   Çoktan seçmeli sorular.
        *   Doğru/Yanlış soruları.
        *   Boşluk doldurma soruları.
    *   **Kapsamlı Değerlendirme Testi (Opsiyonel):** Tüm konuları kapsayan daha uzun bir final testi.

6.  **Anında ve Detaylı Geri Bildirim:**
    *   Her kullanıcı etkileşiminden (oyun, senaryo, test sorusu) sonra uygulama, doğru veya yanlış yanıtı anında göstermelidir.
    *   **Doğru Cevaplar:** Yeşil renk, olumlu bir ikon (örn: ✔️) ve kısa tebrik mesajlarıyla (örn: "Harika!", "Doğru cevap!") desteklenmelidir.
    *   **Yanlış Cevaplar:** Kırmızı renk, uyarıcı bir ikon (örn: ❌) ile gösterilmeli; ardından doğru cevap ve neden yanlış olduğuna dair açıklayıcı bilgi ve ipuçları sunulmalıdır. Mümkünse videonun ilgili bölümüne yönlendirme yapılabilir.

7.  **Skorlama, İlerleme Takibi ve Yerel Skor Tablosu (Leaderboard):**
    *   Kullanıcının her bölümdeki (sözlük kullanımı hariç) performansı (doğru/yanlış sayısı, tamamlanma yüzdesi) kayıt altına alınmalıdır ( localStorage  kullanılabilir).
    *   Genel bir başarı skoru ve tamamlanan modüllerin ilerleme çubuğu gösterilmelidir.
    *   Kullanıcılar yanlış yaptıkları soruları veya bölümleri tekrar edebilmelidir.
    *   **Yerel Skor Tablosu:** Kullanıcıların en yüksek skorlarını (isimleriyle birlikte, eğer kullanıcı girmek isterse) listeleyen bir bölüm. Bu, motivasyonu artırabilir.  localStorage  ile en iyi 5-10 skor tutulabilir.
    *   **Rozetler/Başarımlar (Opsiyonel):** Belirli kilometre taşlarına ulaşıldığında (örn: bir modülü %100 tamamlama, ilk 10 testi doğru cevaplama) kullanıcıya sanal rozetler verilebilir.

**İsteğe Bağlı Gelişmiş Özellikler:**

*   **Derinlemesine Bilgi Kartları:** Ana konunun daha karmaşık alt başlıkları veya videoda yüzeysel geçilen önemli detaylar için (örneğin,  [ALT_KONU_1_DETAYLARI] ,  [ALT_KONU_2_TÜRLERİ] ) ayrı bilgi kartları veya açılır pencereler..
*   **Simülasyonlar/İnteraktif Diyagramlar:** Konu uygunsa, kullanıcıların parametreleri değiştirerek sonuçları gözlemleyebileceği basit simülasyonlar veya üzerinde gezindikçe bilgi veren interaktif diyagramlar.
*   **Erişilebilirlik (Accessibility):** Temel WCAG standartlarına uygunluk (örn: klavye ile navigasyon, ekran okuyucular için uygun etiketleme).

**Tasarım ve Uygulama Prensipleri:**

*   **Kullanıcı Arayüzü (UI):** Sade, modern, dikkat çekici ve kullanıcı dostu bir arayüz.  [HEDEF KİTLE] 'nin ilgisini çekecek, öğrenmeyi teşvik edici görseller ve renk paleti kullanılmalıdır.
*   **Kullanıcı Deneyimi (UX):** Akıcı, sezgisel ve kesintisiz bir öğrenme deneyimi sunmalıdır. Navigasyon kolay olmalıdır.
*   **Teknoloji:** HTML, CSS ve JavaScript kullanılarak **tek bir HTML dosyasında** kodlanmalıdır.
*   **Stil ve Betikler:** Tüm CSS ve JavaScript kodları satır içi (inline) veya  <style>  ve  <script>  etiketleri içinde HTML dosyasının başında veya sonunda yer almalıdır. Harici dosya linklemesi **yapılmamalıdır**.
*   **Duyarlılık (Responsive Design):** Uygulama hem masaüstü (geniş ekranlar) hem de mobil cihazlarda (küçük ekranlar) sorunsuz ve düzgün bir şekilde çalışmalıdır.
*   **Performans:** Hızlı yüklenmeli ve akıcı çalışmalıdır.
*   **Modülerlik (Kod İçinde):** Tek dosya içinde olsa bile, JavaScript fonksiyonları ve CSS sınıfları mantıksal olarak düzenli ve anlaşılır olmalıdır.

**AI'dan Beklenenler:**

1.  Sağlanan YouTube linkindeki videoyu dikkatlice analiz et.
2.  Videodan  [ANA KONU VE ALT KONULAR] ı, anahtar terimleri, bileşenleri, süreçleri ve örnek senaryoları çıkar.
3.  Yukarıdaki spesifikasyonlara uygun olarak interaktif öğrenme uygulamasının HTML, CSS ve JavaScript kodunu tek bir dosyada oluştur.
4.  Oluşturulan içeriğin videodaki bilgilerle tutarlı ve doğru olduğundan emin ol.
5.  Özellikle interaktif oyunlar ve senaryolar için yaratıcı ve eğitici örnekler geliştir.
6.  Kullanıcı arayüzünün çekici ve işlevsel olmasına özen göster.

**Ek Not:**
 [ANA KONU VE ALT KONULAR]  ile ilgili örnek terimler ve kavramlar ( [ÖRNEK_TERİM_1] ,  [KAVRAM_A]  vb.) AI tarafından videonun içeriğine göre doldurulacaktır.  [HEDEF KİTLE]  belirtilmemişse, genel yetişkin öğrenenler varsayılabilir.


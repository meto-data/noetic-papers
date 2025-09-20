Instructions


Bu çalışma alanındaki tüm etkileşimlerde, daha önce sağlanan İngilizce-Türkçe kelime kartı uygulaması için detaylı teknik plana öncelik ver ve ona bağlı kal. Yanıtlarını oluştururken aşağıdaki ek yönergeleri izle:

1. **Kod Açıklamaları:** Üretilen kod bloklarına, özellikle algoritmik veya kritik işlevsellik içeren kısımlara, ne işe yaradıklarını açıklayan **Türkçe yorum satırları** ekle. Bu, kodun hem insanlar hem de potansiyel olarak başka AI'lar tarafından daha kolay anlaşılmasını sağlar.
    
2. **Belirsizlik Yönetimi:** Teknik planda bir nokta belirsizse veya birden fazla yoruma açıksa, varsayım yapmak yerine **soru sorarak netleştirme iste** veya **olası yorumları/seçenekleri belirterek** ilerle. Bu, hatalı kod üretimini en aza indirir.
    
3. **Odak Noktası:** Ana odak, verilen plana göre **çalışan, güvenli ve verimli kod üretmek** olsun. Kullanıcı arayüzü estetiği veya çok alternatifli mimari önerileri, özellikle talep edilmedikçe ikincil önceliktir.
    
4. **Dil Tutarlılığı:** Kod içi yorumlar, değişken isimlendirme önerileri (eğer yapılıyorsa) ve genel açıklamalar **Türkçe** olmalıdır. Ancak, kodun kendisindeki anahtar kelimeler (örn: function, if, echo, SQL komutları) ve İngilizce kelimelerin (en_word gibi) geçtiği yerler doğal olarak orijinal dilinde kalacaktır.
    
5. **Adım Adım Yaklaşım:** Eğer istenirse veya gerekliyse, karmaşık görevleri (örneğin, study.php'nin tam işlevselliği) **mantıksal alt adımlara bölerek** sun. Her adımın hangi dosya veya fonksiyonla ilgili olduğunu açıkça belirt.
    
6. **Teknolojik Bağlılık:** Belirtilen teknoloji yığınına (PHP, MySQL/MariaDB, JS, HTML, CSS) ve kütüphane/framework kullanılmaması (veya belirtilmemiş olması) durumuna sadık kal. Ek kütüphane önerme ihtiyacı duyarsan, bunun nedenini açıkla ve onay iste.
    
7. **Kurulum Rehberi (Başlangıç Seviyesi):** Tüm kodları ve açıklamaları tamamladıktan sonra, **son kısımda**, bu tür teknolojilere hiç aşina olmayan bir kullanıcının uygulamayı kendi bilgisayarında (localhost) nasıl çalıştırabileceğini **adım adım anlatan basit bir kurulum rehberi** ekle. Bu rehber aşağıdaki konuları kapsamalıdır:
    
    - **Yerel Sunucu Yazılımı:** XAMPP (veya benzeri WAMP/MAMP) gibi bir paketin ne olduğu ve neden gerektiği.
        
    - **Kurulum:** XAMPP'nin indirilip kurulması (kısa yönlendirme).
        
    - **Servisleri Başlatma:** XAMPP Kontrol Panelinden Apache ve MySQL servislerinin nasıl başlatılacağı.
        
    - **Dosyaları Yerleştirme:** Uygulama dosyalarının (oluşturulan kelime-kartlari klasörünün) XAMPP'ın htdocs klasörüne nasıl kopyalanacağı.
        
    - **Veritabanı Oluşturma:** Tarayıcı üzerinden localhost/phpmyadmin adresine gidilerek yeni bir veritabanının (örn: kelime_db) nasıl oluşturulacağı.
        
    - **Tabloları Oluşturma:** Oluşturulan veritabanı seçiliyken, sağlanan SQL CREATE TABLE komutlarının phpMyAdmin'in "SQL" sekmesine yapıştırılıp nasıl çalıştırılacağı.
        
    - **(Opsiyonel) İlk Veri Girişi:** Başlangıç kategorisi ve birkaç kelime için örnek INSERT INTO komutlarının yine phpMyAdmin SQL sekmesinden nasıl çalıştırılabileceği veya manuel veri girişinin nasıl yapılabileceği.
        
    - **Uygulamayı Açma:** Tarayıcıya localhost/kelime-kartlari/ yazılarak uygulamaya nasıl erişileceği.
        
    - **Olası Sorunlar:** Kısaca port çakışması veya güvenlik duvarı gibi olası basit sorunlara değinme.
        



---

Prompt


Tamam, anladım. İsteğini, başka bir yapay zeka modelinin (Claude gibi) anlayıp doğrudan kod üretebileceği bir formata dönüştürüyorum. İşte talimatlar:

---

**PROJE TANIMI: İNGİLİZCE-TÜRKÇE KELİME KARTI UYGULAMASI OLUŞTURMA TALİMATLARI**

**HEDEF:** Localhost üzerinde çalışacak, PHP, MySQL/MariaDB, HTML, CSS ve JavaScript kullanarak bir İngilizce-Türkçe kelime öğrenme (flashcard) uygulaması oluştur. Uygulama, Anki/Quizlet benzeri bir mantıkla çalışacak, kelimeleri kategorilere ayıracak ve kullanıcının öğrenme durumunu takip edecektir.

**TEKNOLOJİ YIĞINI:**

- **Web Sunucusu:** Apache (XAMPP/WAMP/MAMP gibi bir paket varsayımıyla)
    
- **Backend:** PHP (>= 7.4 önerilir)
    
- **Veritabanı:** MySQL
    
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
    

**VERİTABANI MİMARİSİ (MySQL/MariaDB):**

Aşağıdaki SQL CREATE TABLE ifadelerini kullanarak belirtilen veritabanı yapısını oluştur:

      `-- Kategoriler Tablosu CREATE TABLE categories (     category_id INT AUTO_INCREMENT PRIMARY KEY,     category_name VARCHAR(100) NOT NULL UNIQUE,     parent_category_id INT NULL, -- Basitlik için başlangıçta kullanılmayabilir     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     FOREIGN KEY (parent_category_id) REFERENCES categories(category_id) ON DELETE SET NULL -- Eğer alt kategoriler kullanılırsa );  -- Kelimeler Tablosu CREATE TABLE words (     word_id INT AUTO_INCREMENT PRIMARY KEY,     en_word VARCHAR(255) NOT NULL UNIQUE,     tr_word VARCHAR(255) NOT NULL,     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );  -- Kelime-Kategori İlişki Tablosu CREATE TABLE word_categories (     word_category_id INT AUTO_INCREMENT PRIMARY KEY,     word_id INT NOT NULL,     category_id INT NOT NULL,     FOREIGN KEY (word_id) REFERENCES words(word_id) ON DELETE CASCADE,     FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,     UNIQUE KEY word_category_unique (word_id, category_id) );  -- Öğrenme Durumu Tablosu CREATE TABLE learning_status (     status_id INT AUTO_INCREMENT PRIMARY KEY,     word_id INT NOT NULL,     category_id INT NOT NULL,     -- 'new': Hiç görülmedi, 'learning': Çalışılıyor/Bilinmiyor, 'known': Biliniyor     status ENUM('new', 'learning', 'known') NOT NULL DEFAULT 'new',     last_reviewed TIMESTAMP NULL,     correct_streak INT DEFAULT 0,     incorrect_streak INT DEFAULT 0,     FOREIGN KEY (word_id) REFERENCES words(word_id) ON DELETE CASCADE,     FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE,     UNIQUE KEY user_word_category_unique (word_id, category_id) -- Her kelimenin bir kategoride tek bir durumu olmalı );  -- Örnek Kategori Ekleme (Başlangıç için) INSERT INTO categories (category_name) VALUES ('Bilişim Terimleri'); -- (Not: Kullanıcı daha sonra 'Veritabanları', 'BT Altyapısı' gibi alt kategorileri ekleyebilir veya direkt bu isimlerle kategori oluşturabilir.)`
    

**DOSYA YAPISI:**

Aşağıdaki dizin yapısını ve dosyaları oluştur:

      `/kelime-kartlari/ ├── index.php             # Ana sayfa, kategori listesi ve başlatma seçenekleri ├── study.php             # Kelime çalışma arayüzü ├── view_status.php       # Belirli durumdaki kelimeleri listeleme sayfası ├── css/ │   └── style.css         # Temel CSS stilleri ├── js/ │   └── script.js         # Frontend JavaScript (AJAX, DOM manipülasyonu) ├── includes/ │   ├── db_connect.php    # Veritabanı bağlantı (PDO kullanımı zorunlu) │   └── functions.php     # (Opsiyonel) Yardımcı PHP fonksiyonları └── api/                  # Backend AJAX endpoint'leri     ├── get_categories.php  # Kategorileri JSON olarak döndürür     ├── get_word.php      # Çalışılacak sıradaki kelimeyi JSON olarak döndürür     ├── update_status.php # Kelime öğrenme durumunu günceller     └── get_words_by_status.php # Duruma göre kelimeleri JSON olarak döndürür`
    

IGNORE_WHEN_COPYING_START

content_copy download

Use code [with caution](https://support.google.com/legal/answer/13505487).

IGNORE_WHEN_COPYING_END

**FONKSİYONEL GEREKSİNİMLER:**

1. **includes/db_connect.php:**
    
    - PDO kullanarak MySQL veritabanı bağlantısını kur.
        
    - Bağlantı bilgilerini (host, dbname, user, pass) değişkenlerden al.
        
    - UTF8MB4 karakter setini kullan.
        
    - Hata modunu PDO::ERRMODE_EXCEPTION olarak ayarla.
        
    - Bağlantı nesnesini ($pdo) diğer PHP dosyalarında kullanılabilir yap.
        
2. **index.php:**
    
    - db_connect.php'yi dahil et.
        
    - api/get_categories.php'yi çağırarak veya doğrudan veritabanından kategorileri çek.
        
    - Sol tarafta bir menüde kategorileri listele. Her kategori adı bir link olmalı (index.php?category_id=X veya view_status.php?category_id=X gibi).
        
    - Sayfanın ana içeriğinde, seçili bir kategori varsa (URL parametresi ile), o kategorinin adını ve bir "Çalışmaya Başla" butonu (study.php?category_id=X'e link veren) göster. Ayrıca "Bildiklerim" (view_status.php?category_id=X&status=known) ve "Tekrar Etmem Gerekenler" (view_status.php?category_id=X&status=learning) linklerini göster.
        
3. **api/get_categories.php:**
    
    - db_connect.php'yi dahil et.
        
    - categories tablosundan tüm kategorileri (category_id, category_name) çek.
        
    - Sonuçları JSON formatında döndür. Content-Type: application/json header'ını ayarla.
        
4. **study.php:**
    
    - URL'den category_id parametresini al.
        
    - Temel HTML yapısını (kelime kartı alanı, butonlar) oluştur.
        
    - js/script.js dosyasını dahil et.
        
    - Sayfa yüklendiğinde veya çalışma başladığında, script.js aracılığıyla api/get_word.php'den ilk kelimeyi yüklemesini tetikle.
        
5. **js/script.js:**
    
    - **Kelime Getirme Fonksiyonu (fetchNextWord(categoryId)):**
        
        - api/get_word.php?category_id=X adresine fetch API ile GET isteği yap.
            
        - Gelen JSON yanıtını işle.
            
        - Yanıt başarılı ve kelime içeriyorsa (word_id, en_word, tr_word):
            
            - en_word'ü HTML'de ilgili alana yaz.
                
            - tr_word'ü başka bir alana yaz ama başlangıçta gizle (CSS ile display: none veya visibility: hidden).
                
            - word_id'yi ve category_id'yi daha sonra kullanmak üzere (örn: bir HTML data attribute'unda) sakla.
                
            - "Cevabı Göster" butonunu aktif et, "Bildim"/"Olmadı" butonlarını pasif et.
                
        - Yanıt kelime içermiyorsa (örn: { "message": "..." }):
            
            - Kullanıcıya uygun bir mesaj göster ("Bu kategoride çalışılacak yeni/tekrar edilecek kelime kalmadı.").
                
    - **Cevabı Göster Fonksiyonu:**
        
        - Gizlenmiş tr_word'ü göster.
            
        - "Cevabı Göster" butonunu pasif et, "Bildim"/"Olmadı" butonlarını aktif et.
            
    - **Durum Güncelleme Fonksiyonu (updateStatus(wordId, categoryId, status)):**
        
        - api/update_status.php adresine fetch API ile POST isteği yap.
            
        - İstek gövdesinde (body) word_id, category_id ve yeni status ('known' veya 'learning') bilgilerini JSON formatında gönder. Content-Type: application/json header'ını ayarla.
            
        - Başarılı yanıt ({ "success": true }) alındığında fetchNextWord(categoryId) fonksiyonunu çağırarak bir sonraki kelimeyi yükle.
            
        - Hata durumunda konsola veya kullanıcıya bilgi ver.
            
    - **Event Listener'lar:**
        
        - Sayfa yüklendiğinde (study.php için) ilk kelimeyi getirmeyi tetikle.
            
        - "Cevabı Göster", "Bildim", "Olmadı" butonlarının tıklama olaylarını dinle ve ilgili JavaScript fonksiyonlarını çağır.
            
6. **api/get_word.php:**
    
    - db_connect.php'yi dahil et.
        
    - GET parametresi olarak category_id'yi al.
        
    - Öncelik sırasına göre çalışılacak kelimeyi bul:
        
        1. learning_status tablosunda ilgili category_id için status = 'new' olan bir kelime var mı? Varsa, words tablosuyla JOIN yaparak word_id, en_word, tr_word bilgilerini al. (Birden fazla varsa rastgele veya en eski olanı seçebilirsin).
            
        2. Eğer 'new' yoksa, status = 'learning' olan bir kelime var mı? Varsa, (belki last_reviewed'a göre en eski olanı veya incorrect_streak'i yüksek olanı önceliklendirerek) bilgilerini al.
            
    - Kelime bulunursa, JSON formatında { "word_id": X, "en_word": "...", "tr_word": "..." } döndür.
        
    - Çalışılacak kelime bulunamazsa, JSON formatında { "message": "Çalışılacak kelime bulunamadı." } döndür.
        
    - Content-Type: application/json header'ını ayarla.
        
7. **api/update_status.php:**
    
    - db_connect.php'yi dahil et.
        
    - POST isteği ile gelen JSON verisini (word_id, category_id, status) al (file_get_contents('php://input') ve json_decode).
        
    - **Veritabanı İşlemi:**
        
        - learning_status tablosunda word_id ve category_id'ye uyan bir kayıt var mı kontrol et.
            
        - **Varsa:** Kaydı UPDATE et. status'ü gelen değere, last_reviewed'ı NOW() veya CURRENT_TIMESTAMP'a ayarla. Gelen status'e göre correct_streak veya incorrect_streak'i güncelle (doğruysa correct artar/incorrect sıfırlanır, yanlışsa tam tersi).
            
        - **Yoksa:** Yeni bir kayıt INSERT et. word_id, category_id, gelen status, last_reviewed = NOW() ve uygun streak değerleri ile.
            
        - **Güvenlik:** Mutlaka PDO Prepared Statements kullan.
            
    - İşlem başarılıysa JSON { "success": true } döndür.
        
    - Hata oluşursa JSON { "success": false, "message": "Hata açıklaması" } döndür.
        
    - Content-Type: application/json header'ını ayarla.
        
8. **view_status.php:**
    
    - db_connect.php'yi dahil et.
        
    - URL'den category_id ve status ('known' veya 'learning') parametrelerini al.
        
    - api/get_words_by_status.php'yi çağırarak veya doğrudan veritabanından ilgili kelimeleri çek.
        
    - Sayfada, seçilen kategori ve durum için kelimeleri (İngilizce - Türkçe) bir liste veya tablo halinde göster.
        
9. **api/get_words_by_status.php:**
    
    - db_connect.php'yi dahil et.
        
    - GET parametreleri olarak category_id ve status'ü al.
        
    - learning_status tablosunu words tablosuyla JOIN yaparak, verilen category_id ve status'e uyan tüm kelimelerin en_word ve tr_word bilgilerini çek.
        
    - Sonuçları bir JSON dizisi olarak döndür [ { "en_word": "...", "tr_word": "..." }, ... ].
        
    - Content-Type: application/json header'ını ayarla.
        
10. **css/style.css:**
    
    - Temel sayfa düzeni (örn: sol menü, ana içerik alanı).
        
    - Kelime kartı görünümü (border, padding vs.).
        
    - Buton stilleri.
        
    - Menü link stilleri.
        
    - Gizli/görünür elemanlar için class (örn: .hidden { display: none; }).
        

**VERİ GİRİŞİ:**

- Başlangıç kelimeleri (words tablosu), kategoriler (categories) ve kelimelerin kategorilere atanması (word_categories) SQL INSERT komutları ile manuel olarak yapılacaktır. AI'nin bunun için kod üretmesi GEREKMEZ.
    

**BEKLENTİ:**

Yukarıdaki talimatlara uygun olarak tüm PHP, HTML, CSS ve JavaScript dosyalarının kodlarını üret. Kodlar temiz, okunabilir ve güvenlik (özellikle SQL Injection'a karşı PDO Prepared Statements kullanımı) önlemleri alınmış olmalıdır. AJAX iletişimi için JSON formatı kullanılmalıdır.

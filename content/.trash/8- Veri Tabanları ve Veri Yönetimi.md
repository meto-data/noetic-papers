### 1- [[Etkin Bilgi Sistemi Nedir?]]
Etkin bir bilgi sisteminin temel amacı kullanıcılara **doğru**, **zamanlı** ve **amaca uygun** bilgileri sağlamaktır. <br>
- **Doğruluk**: Bilgi hatasız olmalı.
- **Zamanlılık**: Bilgi, **[[karar verici]]** ihtiyaç duyduğu anda hazır olmalı.
- **Amaca Uygunluk**: Bilgi, verilecek kararla ilgili ve gerekli olmalı.
- **Sorun**: Eski sistemler ve kötü veri organizasyonu bu hedeflere ulaşmayı engeller.


> [!definition] Karar Verici
> **Karar verici**, bir organizasyon veya süreçle ilgili bir seçim yapmak, bir yargıya varmak veya bir eylem planı belirlemekle sorumlu olan kişi veya gruptur.

### 2-  [[Veri Hiyerarşisi (Temel Kavramlar - Dosya Düzenleme Kabulleri)]]
1. **Bit**: En küçük veri birimi (0 veya 1).
2. **Bayt**: 8 bitten oluşur, bir karakteri (harf, sayı, sembol) temsil eder.
3. **Alan (Field)**: İlişkili karakterler grubu (Örn: "Adı", "Soyadı", "Yaşı" alanları). Bir özelliği (attribute) temsil eder.
4. **Kayıt (Record)**: İlişkili alanlar grubu. Bir öğeyi (entity) (Örn: bir öğrenci, bir ürün, bir müşteri) tanımlar.
5. **Dosya (File)**: Aynı türden kayıtların bir araya gelmesiyle oluşur. Aynı türden kayıtlar topluluğu (Örn: Öğrenci Dosyası, Müşteri Dosyası).
6. **Veri Tabanı (Database)**: İlişkili dosyalar topluluğu (Geleneksel yapının üstesinden gelmek için geliştirilen modern yaklaşımdır, hiyerarşinin en üstüdür).

- Bir kayıt bir öğeyi (entity) tanımlar. Öğe ise bir kişi, alan veya bilgiye çevrilip saklanabilecek bir olay olabilir. Her bir karakteristik veya belirli bir öğeyi tanımlayan duruma özellik (attribute) denir. Bu özelliklerin alabileceği belirli değerler öğenin alanlarında görülmektedir.


### 3- [[Geleneksel Dosya Ortamının Yapısı ve Temel Sorunu]]
- **Yapı**: Merkezî bir planlama olmadan her departman (Muhasebe, İK vb.) kendi ihtiyaçları için bağımsız olarak kendi veri dosyalarını işleyen programları geliştirir.
- **Sonuç**: Şirket genelinde aynı veya benzer veriler farklı departmanlar tarafından farklı formatlarda, birden çok dosyada tutulur. Bu durum şirket çapında çok sayıda ana dosyanın oluşturulması, saklanm
ası ve farklı birimlerce birbirinden bağımsız olarak işletilmesi anlamına gelir ve bu da yönetimi epey zorlaştırır ve ciddi sorunlara yol açar.
### 4- **[[Geleneksel Dosya Ortamının Problemleri]]**
#### **a)** [[Veri Tekrarı (Redundancy) ve Tutarsızlığı (Inconsistency)]]

##### Tekrar

Aynı verinin birden fazla dosyada gereksiz yere saklanması depolama alanını boşa harcar. 

> [!example] Örneğin
> Müşteri adresinin hem satış hem muhasebe dosyasında olması.

##### Tutarsızlık

Aynı verinin farklı dosyalarda farklı değerlere sahip olması veya farklı kodlama kullanılması, bilginin **doğruluğunu** ve **güvenilirliğini** zedeler.

> [!example] Örneğin
> Bir dosyada adres güncellenirken öbürünce güncellenmemesi, bir departman XL derken diğer departmanın Extra Large demesi.


#### b) [[Program-Veri Bağımlılığı]]
**Tanım**: Veri dosyalarının formatı (yapısı ve nasıl saklandığı), o veriyi kullanan programlara *sıkı sıkıya* bağlıdır.
**Sonuç**: Veri formatında yapılacak en küçük bir değişiklik (posta kodunu 5 haneden 7 haneye çıkarmak gibi), o veriyi kullanan tüm programların değiştirilmesini gerektirir. Bu çok masraflı ve zaman alıcıdır.

#### c) [[Esneklik Yoksunluğu]]

**Tanım**: Sistem, sadece önceden planlanmış, rutin raporlar üretebilir.
**Sorun**: Anlık (ad-hoc) veya beklenmedik bilgi ihtiyaçlarına cevap veremez. Farklı dosyalardaki verileri birleştirip yeni bir rapor almak çok zordur, özel programlama gerektirir ve uzun sürer.

#### d) [[Zayıf Veri Güvenliği]]

**Tanım**: Veriler farklı yerlerde dağınık olduğu ve merkezî bir kontrol olmadığı için, verilere kimin eriştiğini, kimin değiştirdiğini yönetmek ve takip etmek zordur.
**Sonuç**: Yetkisiz erişim ve değişiklik riski artar.

#### e) [[Veri Paylaşımı ve Erişilebilirlik Sorunu]]

**Tanım**: Farklı departmanların dosyalarındaki bilgiler birbirinden izole olduğundan ilişkilendirmek ve bölümler arasında paylaştırmak çok zordur.
**Sonuç**: Bilgi organizasyon içerisinde serbestçe akamaz. Kullanıcılar farklı yerlerde farklı değerler bulursa veriye güvenmezler. Zamanında ve doğru bilgiye erişim engellenir.

## Veri Yönetimine Veri Tabanı Yaklaşımı
### 1- [[Veri Tabanı Yaklaşımının Amacı ve Tanımı]]
**<mark style="background: #ABF7F7A6;">Amaç</mark>**  $\to$ Geleneksel dosya ortamının yol açtığı problemleri çözmek.
**<mark style="background: #ABF7F7A6;">Tanım</mark>**  $\to$ Veri tabanı, **gereksiz verileri kontrol ederek** ve veriyi merkezileştirerek birçok uygulamaya **etkili bir şekilde hizmet etmek için organize edilmiş bir veri topluluğudur**.
**<mark style="background: #ABF7F7A6;">Temel Fikir</mark>**  $\to$ Her uygulama için ayrı dosyalar oluşturmak yerine, veri **tek bir merkezî yerde (veri tabanında)** saklanır ve farklı uygulamalar bu merkezî veri kaynağından yararlanır.

### 2- [[Veri Tabanı Yönetim Sistemleri (VTYS -DBMS-)]]
**<mark style="background: #ABF7F7A6;">Tanım</mark>** $\to$ VTYS, veriyi **merkezî bir şekilde yöneten**, uygulama programlarının veriye **erişimini sağlayan** ve verinin **tutarlılığını** korumaya yardımcı olan yazılımdır.
**<mark style="background: #ABF7F7A6;">Görevi</mark>** $\to$ Fiziksel veri depolama (verinin diskte nasıl durduğu) ile uygulama programları (veriyi kullanan yazılımlar) arasında bir **arayüz** görevi görür. Uygulama bir veri istediğinde (örn: brüt maaş), VTYS o veriyi bulup uygulamaya sunar. <br>

> [!DIAGNOSI]   <font size="+2">En Önemli Faydası (!): Mantıksal ve Fiziksel Görünüm Ayrımı </font>
> **Fiziksel Görünüm**: Verinin disk gibi fiziksel ortamlarda gerçekte nasıl saklandığı ve yapılandırıldığıdır. <br>
> **Mantıksal Görünüm**: Verinin, kullanıcılar veya programcılar tarafından algılandığı ve anlaşıldığı şeklidir. Kullanıcının iş ihtiyacına göre düzenlenmiş veri görüntüsüdür. <br>
> **VTYS'nin Rolü**: VTYS, programcıları ve kullanıcıları verinin fiziksel olarak nerede saklandığını bilme zorunluluğundan kurtarır. Aynı fiziksel veri tabanından farklı kullanıcıların veya uygulamaların ihtiyaçlarına göre *farklı mantıksal görünümler* sunar ve böylelikle **program-veri bağımsızlığı**'nı sağlar.
 

### 3- [[VTYS Geleneksel Dosya Problemlerini Nasıl Çözer]]?
**<mark style="background: #ABF7F7A6;">Veri Tekrarı ve Tutarsızlığı Azaltma</mark>** $\to$  Veriyi merkezileştirerek aynı bilginin farklı yerlerde tekrar tekrar saklanmasını minimize eder. Tamamen yok etmese de, tekrarı kontrol altına alarak **tutarsızlık riskini büyük ölçüde azaltır**.
**<mark style="background: #ABF7F7A6;">Program-Veri Bağımsızlığı</mark>** $\to$  Mantıksal ve fiziksel görünüm ayrımı sayesinde verinin fiziksel depolanma şekli değişse bile  (VTYS tarafından yönetilir), uygulamaların kullandığı mantıksal görünüm aynı kalabilir. Bu da programların sürekli değiştirme ihtiyacını azaltır.
**<mark style="background: #ABF7F7A6;">Geliştirilmiş Veri Erişimi ve Esneklik</mark>** $\to$  Merkezî ve tutarlı veriye erişim kolaylaşır. Kullanıcılar ve programcılar **anlık (ad-hoc) sorgulamalarla** ihtiyaç duydukları bilgilere daha kolay ulaşabilirler. Farklı veri parçalarını birleştirmek kolaylaşır.
**<mark style="background: #ABF7F7A6;">Gelişmiş Güvenlik</mark>** $\to$  Merkezî kontrol sayesinde, verilere kimin erişebileceği ve hangi işlemleri yapabileceğini yönetmek daha kolaydır.
**<mark style="background: #ABF7F7A6;">Veri Paylaşımı</mark>** $\to$  Verinin merkezî olması, farklı departmanlar ve uygulamalar arasında veri paylaşımını doğal olarak kolaylaştırır.
**<mark style="background: #ABF7F7A6;">Düşük Maliyetler</mark>** $\to$  Program geliştirme ve bakım maliyetleri, veri tekrarının azalması ve program-veri bağımsızlığı sayesinde düşer.

### 4- [[İlişkisel Veri Tabanı Modeli]]
- ~={blue}**Yapı**=~: Verileri iki boyutlu **tablolar** hâlinde saklar. Bu tablolar *satır* ve *sütun*'lardan oluşur.
	- **Tablo (Table/Relation)**: Bir varlık türü hakkındaki verileri tutar (örn: TEDARİKÇİLER tablosu). Gelenekseldeki "Dosya"ya benzer.
	- **Satır (Row/Record/Tuple)**: Tablodaki tek bir kaydı temsil eder (örn: Bir tedarikçinin bilgileri).
	- **Sütun (Column/Field/Attribute)**: Bir özelliğe karşılık gelir (örn: Tedarikçi No, Tedarikçi Adı).
- **<mark style="background: #FFF3A3A6;">Anahtar Alanlar (Keys - Önemli!)</mark>**: Tabloları ilişkilendirmek ve kayıtlara erişmek için kullanılır.
	- **~={green}Birincil Anahtar (Primary Key)=~**: Bir tablodaki her satırı (kaydı) **benzersiz (unique)** şekilde tanımlayan alan veya alanlar grubudur (örn: TEDARİKÇİLER tablosundaki `Tedarikçi No`). **Tekrarlanamaz ve boş olamaz!**
	- ~={green}**Yabancı Anahtar ([[Foreign Key]])=~**: Bir tablodaki alanın, başka bir tablonun *Birincil Anahtarı* olmasıdır. **İki tablo arasında~={orange} ilişki kurmayı=~ sağlar** (örn: PARÇA tablosundaki `Tedarikçi No` alanı, TEDARİKÇİLER tablosuna işaret eden bir *Yabancı Anahtar*'dır). 
- **Popüler İlişkisel VTYS Yazılımları**: Access, MySQL, MS SQL Server, Oracle, DB2.

### 5- [[İlişkisel VTYS'deki Temel İşlemler (Veri Çekme)]]
**Amaç**: Tablolardaki verilerden kullanıcıların ihtiyaç duyduğu bilgiyi üretmek.
- **Üç Temel İşlem**:
	1. `SEÇME (SELECT)`: Belirli bir kritere uyan **satırları (kayıtları)** tablodan alır (örn: Şehri 'İstanbul' olan tedarikçileri seçmek).
	2. `İZDÜŞÜM (PROJECT)`: Tablodan yalnızca belirli **sütunları (alanları)** alır (örn: Tedarikçilerin sadece Adı ve Telefon No sütunlarını almak).
	3. `BİRLEŞTİRME (JOIN)`: İki veya daha fazla tabloyu, ilişkili alanlar (genellikle PK-FK) üzerinden **birleştirerek** tek bir sonuç tablosu oluşturur (örn: Belirli bir parçayı~={yellow} (`PARÇA` tablosu)=~ hangi tedarikçinin ~={yellow}(`TEDARİKÇİLER` tablosu)=~ sağladığını bulmak için `Tedarikçi No` üzerinden birleştirme yapmak).
### 6- [[Diğer Veri Tabanı Modelleri (Kısa Bilgi)]]
#### -  [[Hiyerarşik ve Ağ VTYS]]
- Daha eski modellerdir.
- **Hiyerarşik:** Ağaç yapısı, bire-çok (1:N) ilişkiler.
- **Ağ**: Daha esnek, çoka-çok (M:N) ilişkilere izin verir.
- Genel olarak ilişkisel VTYS'den **daha az esnektir**ler, anlık sorgulamaları ve doğal dil sorgularını desteklemede zayıftırlar. Yani uygulamalarda pek tercih edilmezler.
#### - [[Nesneye Yönelik VTYS (NYVTYS / OODBMS)]]
**Amaç**: Sadece metin/sayı değil, **karmaşık veri türlerini** (resim, video, ses, grafik, program nesneleri vb.) ve bunlarla ilişkili prosedürleri (metotları) saklamak için tasarlanmıştır.
**Kullanım Alanı**: Özellikle web uygulamaları, multimedya, CAD/CAM gibi alanlarda popüler.
**Karşılaştırma**: İlişkisel VTYS'ye göre daha karmaşık verileri yönetebilir ancak yüksek hacimli basit işlemlerde (transaction) daha yavaş olabilir.
**Hybrid (Melez) Modeller**: Hem ilişkisel hem de nesneye yönelik özellikler sunan sistemler de vardır.

### VTYS Yetenekleri
#### 1- [[Veri Tanımlama (Data Definition)]]
- Veri tabanının yapısını (tablolar, alanlar, veri tipleri vb.) oluşturur ve tanımlar. Veritabanının iskeletini çizer.
- **Nerede Saklanır?** $\to$ **Veri Sözlüğü**'nde tutulur. 
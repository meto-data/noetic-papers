- **Tanım:** Stok kontrol sistemleri, envanterdeki ürünler için sipariş verme zamanını ve miktarını belirlemek ve izlemek için kullanılan yöntemlerdir.
- **Temel Amaç:** Malzeme veya ürün ihtiyaçlarının "istenilen zamanda", "istenilen miktarda", "istenilen yerde" ve "istenilen kalitede" karşılanmasını sağlamaktır. Bu, hizmet seviyesi ile maliyet arasında bir denge kurmayı hedefler.
- **Cevap Aranan Sorular:** Bu sistemler temel olarak "hangi malzemeler stoklanacak?" ve "ne kadar stok bulundurulacak?" sorularına yanıt arar.
- **Önemi (Denge):** Amaç, ne stoksuz kalma riskini (müşteri kaybı, üretim durması) ne de aşırı stok maliyetini (depolama, bağlı sermaye, eskime) yaşamak; ikisi arasında optimum bir denge kurmaktır.
- **Ana Sınıflandırma:** Stok kontrol sistemleri genel olarak iki ana gruba ayrılır:
	1. **Sürekli Gözden Geçirme Sistemleri** (Continuous Review Systems)
	2. **Periyodik Gözden Geçirme Sistemleri** (Periodic Review Systems)

# [[Stok Kontrol Sistemleri]] (Inventory Control Systems)

## [[Sürekli Gözden Geçirme Sistemleri]] (Continuous Review System / Q-System)
- **İzleme:** Stok seviyeleri sürekli (anlık) olarak, her stok hareketi (giriş, çıkış, satış vb.) kaydedilerek takip edilir. Genellikle teknolojik sistemler (barkod, [[RFID (Radio Frequency Identification)]] vb.) kullanılır.
- **Sipariş Ne Zaman Verilir?** Stok miktarı, önceden belirlenmiş kritik bir seviye olan Yeniden Sipariş Noktası (Reorder Point - ROP)'na düştüğü anda sipariş tetiklenir.
- **Ne Kadar Sipariş Verilir?** Sipariş miktarı genellikle önceden belirlenmiş sabit bir miktardır (örn: Ekonomik Sipariş Miktarı). Bu nedenle "Sabit Miktar Sistemi" (Q-Sistemi) olarak da bilinir.

##### **[[Yeniden Sipariş Noktası]]** (Reorder Point - ROP)
- Stok yenileme ihtiyacını belirlemek için kullanılan stok seviyesidir. Stok yeniden sipariş noktasına ulaştığında, satıcı ikmal için tedarikçiye yeni satın alma siparişleri verebilir

> [!warning] Uyarı
>  Eldeki stoğun, **"Dikkat! Yeni sipariş verme zamanı geldi, yoksa mal bitecek!"** alarmını çaldığı **miktar seviyesidir.**

## [[Periyodik Gözden Geçirme Sistemi]] (Periodic Review System / P-System)
- **İzleme:** Stok seviyeleri belirli, sabit zaman aralıklarında (örn: her hafta Cuma günü, her ayın 1'i gibi) kontrol edilir veya sayılır.
- **Sipariş Ne Zaman Verilir?** Siparişler her zaman bu belirli gözden geçirme anlarında verilir. Stok seviyesinin belirli bir noktanın altına düşüp düşmediğine bakılır.
- **Ne Kadar Sipariş Verilir?** Sipariş miktarı değişkendir. Amaç, mevcut stok seviyesini, önceden belirlenmiş bir Hedef Stok Seviyesi (Order-Up-To Level)'ne tamamlayacak kadar sipariş vermektir. Bu nedenle "Sabit Periyot Sistemi" (P-Sistemi) olarak da bilinir.



## [[Malzeme Gereksinim Planlaması]] (Material Requirements Planning - MRP)
- **Tanım:** Müşterinin doğrudan talep ettiği **bitmiş mamul** (Bağımsız Talep) için oluşturulan Üretim Ana Planına (MPS) dayanarak; bu **mamulü** meydana getirmek için gerekli olan tüm alt parçaların, bileşenlerin ve hammaddelerin (Bağımlı Talep) **"Neye ihtiyaç var?", "Ne kadar ihtiyaç var?"** ve **"Ne zaman ihtiyaç var?"** sorularını yanıtlayarak tedarik/üretim zamanlamasını planlayan bir sistemdir.


> [!important] MRP, aşağıdaki üç soruyu yanıtlamak için tasarlanmıştır: 
> 1. Neye ihtiyaç var?  
> 2. Ne kadar ihtiyaç var? 
> 3. Ne zaman gerekli?


> [!important] MRP, bu soruları yanıtlamak için üç ana adımdan oluşur: 
>1. Eldeki malzemelerin ve bileşenlerin stok kayıtlarını çıkarmak
>2. Hangi malzemelere ihtiyaç duyulduğunu belirlemek
>3. İlgili malzemelerin üretimlerini veya satın alımlarını planlamak

 


- **Nasıl Çalışır:** MRP'nin temel mantığı, son ürün olan **'bitmiş mamulün'** ne zaman teslim edileceği hedefiyle işe başlamaktır. Bu **mamulün** reçetesi olan Ürün Ağacını (BOM - Bill of Materials) ve eldeki mevcut stok bilgilerini kullanır. **Mamulün** teslim tarihinden **geriye doğru** bir hesaplama yaparak, onu oluşturan her bir parçanın (bağımlı talep) kendi üretim veya tedarik süresini (lead time) dikkate alır. Böylece her bir parçanın **tam ihtiyaç duyulduğu anda** (ne çok erken stok maliyeti yaratacak şekilde, ne de çok geç üretimi aksatacak şekilde) hazır olmasını sağlayacak satın alma veya üretim planlarını (zamanını ve miktarını) otomatik olarak oluşturur.
- **Amacı ve Önemi:** Temel ilkesi, bağımsız talebi olan **'bitmiş mamulden'** yola çıkarak, ona bağımlı olan diğer tüm malzemeleri **doğru zamanda, doğru miktarda ve en düşük maliyetle** hazır bulundurmaktır. Bu sayede gereksiz stoklar (ve maliyetleri) önlenir, üretimde malzeme eksikliğinden kaynaklanan duruşlar ve gecikmeler engellenir, işletmenin müşteri taleplerine zamanında ve verimli bir şekilde yanıt vermesi sağlanır.

#### [[Bağımsız Talep]] (Independent Demand)
- **Tanım:** Müşterinin doğrudan talep edilen üründür.
- **Örnek:** Müşterinin doğrudan bilgisayar talep etmesi.

#### [[Bağımlı Talep]] (Dependent Demand)
- **Tanım:** Bağımsız talebi olan bir üst seviye ürüne bağlı olarak ortaya çıkan parçaların, bileşenlerin veya ham maddelerin talebidir.
- **Örnek:** Anakart, CPU vb.

### MRP Örneği
- **Hedef:** 1 adet masayı 30 Nisan'da müşteriye teslim etmek.
- **Gerekenler (ve Tedarik Süreleri):**
    - 1 Masa tablası (2 gün)
    - 4 Masa ayağı (3 gün)
    - 8 Vida (1 gün)
- **MRP'nin Yaptığı Hesap:**
    1. Teslimat 30 Nisan'da ise, montajın en geç 29'unda bitmesi gerekir.
    2. MRP, bu montaj tarihinden **geriye doğru** parçaların ne zaman hazır olması gerektiğini hesaplar:
        - Ayaklar (3 gün sürdüğü için): 29 Nisan'dan 3 gün önce = **26 Nisan**
	        - Tabla (2 gün sürdüğü için): 29 NisanM'dan 2 gün önce = **27 Nisan**
        - Vidalar (1 gün sürdüğü için): 29 Nisan'dan 1 gün önce = **28 Nisan**
- **Sonuç:** MRP, her parçanın tam ihtiyaç duyulduğu tarihte (ne erken ne geç) tedarik edilmesini veya üretilmesini planlar. Böylece **gereksiz stok birikmez** ve **üretim aksamaz**.

## [[Tam Zamanında Üretim]] (Just-in-Time -JIT)
- **Tanım:** Ürünlerin veya parçaların tam ihtiyaç duyulduğu anda ve yalnızca ihtiyaç duyulan miktarda üretildiği/tedarik edildiği; temel amacı stokları ve israfı (maliyetleri) ortadan kaldırarak üretim verimliliğini ve kârı artırmak olan bir üretim ve stok yönetim felsefesi/sistemidir.
- **Açıklama:** Geleneksel "itme" sisteminin aksine "Çekme" esasına dayanır. Müşteri talebi üretimi tetikler. Başarısı, güvenilir tedarikçilere sorunsuz iç üretim akışına büyük ölçüde bağlıdır. Minimum (ideali sıfır) stok hedeflenir.

#### [[İtme Sistemi]] (Push System)
- **Tanım:** Üretimin, gelecekteki talebe yönelik tahminlere dayanarak yapıldığı ve üretilen ürünlerin/parçaların bir sonraki aşamaya veya stoğa (talep henüz gelmeden) "itildiği" geleneksek bir üretim yaklaşımıdır.
- **Açıklama:** "Önce üret, sonra sat/kullan" yaklaşımı vardır. Talep belirsizliğine karşı genellikle tampon stoklar tutulur. Tahminler yanlışsa aşırı stok veya stoksuz kalma riski taşır. Genellikle MRP gibi planlama sistemleri kullanılır.

#### [[Çekme Sistemi]] (Pull System)
- **Tanım:** Üretimin veya malzeme hareketinin, <strong style="color:#000">gerçekleşen anlık talebe</strong> (müşteri siparişi veya bir sonraki üretim istasyonunun ihtiyacı) göre tetiklendiği bir üretim/malzeme akış yaklaşımıdr.
- **Açıklama:** "Önce talep gelsin/ihtiyaç olsun, sonra üret/getir" yaklaşımı vardır. Bir sonraki aşama (müşteri veya istasyon), bir önceki aşamadan yalnızca ihtiyaç duyduğu kadar malzemeyi/parçayı "çeker". **JIT sisteminin çalışma prensibidir ve stokları en aza indirmeyi amaçlar.**

#### [[Kanban]]
- **Tanım:** Özellikle [[Tam Zamanında Üretim|JIT]] ve [[Çekme Sistemi|çekme]] sisteminin uygulanmasında kullanılan, bir sonraki işleme/üretime ne zaman başlanılacağını, neyin/ne kadar üretileceğini veya taşınacağını bildiren, genellikle <u>görsel bir sinyalizasyon ve iş akışı </u> yönetim yöntemidir.


# Stok Modelleri (Inventory Models)
- Stok modelleri, özü itibariyle iki kritik soruya cevap aramak için tasarlanmış matematiksel yaklaşımlardır:
	1. **Bir ürün için ne zaman yeni sipariş verilmeli?**
	2. **Sipariş verilecekse, miktarı ne kadar olmalı?**
- Bu modellerin olayı şudur: İşletmeler stok tutarken epey masrafa girerler, işte bu masrafları minimize edecek <span style="color:#008B8B">en akıllıca stok politikasını</span> bulmaya çalışıyorlar. Bu modeller talebin ne kadar olduğu, maliyetlerin yapısı, ürünün depoya nasıl girdiği gibi faktörlere göre karmaşıklaşabiliyor. Ama amaç hep aynı: <span style="color:#008B8B">en az masrafla en doğru stok kararını vermek.</span>

### [[Stoklarla İlgili Maliyet Bileşenleri]] (Cost Components Related to Inventory)
#### 1- **[[Birim Satın Alma Maliyeti]]** (Unit Purchase Cost -*C* )
- **Tanım:** Malzeme için ödenen ana fiyat ve malzemenin işletmeye getirilmesi için yapılan diğer ek satın alma masraflarının toplamıdır.
- **Açıklama:** Ürünün etiketteki fiyatı gibidir ama sadece o değildir; üzerine kargo (navlun), sigorta, gümrük vergisi (tarife), hatta bazen malı kontrol etme (inceleme , test) masrafları da eklenebilir. Yani "<span style="color:#008B8B; font-weight:bolder">Bu mal bana kaça geldi?</span>" sorunun cevabıdır.
#### 2- **[[Sipariş Verme Maliyeti]]** (Ordering Cost -*A* )
- **Tanım:** Her yeni sipariş verildiğinde veya üretim için her yeni parti hazırlandığında katlanılan <span style="color:#008B8B; font-weight:bolder">sabit işlem masrafıdır.</span>
- **Açıklama:** Bu maliyet, kaç tane ürün sipariş ettiğimizden/ürettiğimizden **bağımsızdır**. Sadece "sipariş verme" ya da "üretime hazırlık yapma" eyleminin **kendisi için ödenilen paradır**. Söz gelişi, çevrim içi alışverişlerdeki kargo ücreti gibi.
- **Analoji** Herakleitos der ki "Panta rhei" (her şey akar), ve yine der ki "Aynı derede iki kere yıkanılmaz." Her yeni sipariş, bir önceki siparişten farklı yeni bir "akışa giriş" eylemidir ve bu eylemin kendisine has bir maliyeti vardır. O "giriş kapısı" her açıldığında bir bedel ödenir.
#### 3- [[Stokta Bulundurma Maliyeti]] (Holding Cost - Carrying Cost -*H* )
- **Tanım:** Bir birim ürünü, bir **yıl** boyunca depoda tutmanın veya taşımanın getirdiği toplam masraftır. Bu masraf; stoğa bağlanan paranın maliyeti (fırsat/faiz), depo giderleri (kira, sigorta, vergi), malzeme aktarma/sayım masrafları ve stokların eskimesi, bozulması, çalınması veya hasar görmesi gibi kayıpları içerir.

#### 4- [[Stok Dışı Kalma Maliyeti]] (Stockout Cost / Shortage Cost)
- **Tanım:** Depoda veya rafta ürün kalmadığı için müşteri talebinin karşılanamaması durumunda ortaya çıkan her türlü **doğrudan ve dolaylı zarardır.**

## [[Ekonomik Sipariş Maliyeti]] (Economic Order Quantity -EOQ) 
- **Tanım:** Sipariş verme ve stokta tutma maliyetlerini dengeleyerek toplam ilgili stok maliyetini en aza indiren ideal sipariş miktarıdır.
- **Açıklama:** "Her seferinde kaç tane sipariş vermeliyim?" sorusuna matematiksel bir cevap verir.

## $$Q^* = \sqrt{ \frac{2AD}{H} }$$
### [[EOQ Varsayımları]]
1. **Talep Sabit ve Biliniyor** (D): Müşteri talebi yıl boyunca hiç değişmez, hep aynı hızdadır ve ne kadar olacağı kesinlikle bilinir.
2. **Sipariş Miktarı ve Sabit** (Q): Her siparişte aynı miktarda ($Q^*$) mal alınır.
3. **Birim Fiyat Sabit** (C): Aldığın malın fiyatı değişmez, toplu alımda indirim falan olmaz.
4. **Temin Süresi Sabit ve Biliniyor** (L): Siparişi verdiğin andan malın sana ulaşmasına kadar geçen süre hep aynıdır ve ne kadar olduğunu bilirsin.
5. **Stokta Bulundurma Maliyeti** (H) **Ortalama Stok Üzerinden Hesaplanır:**  $\frac{Q}{2}$ üzerinden hesaplanılan ortalama stok düzeyi kullanılır.
6. **Sipariş Verme Maliyeti** (A) **Sabit ve Sipariş Miktarından Bağımsızdır:** Her siparişin masrafı aynıdır, kaç tane aldığından etkilenmez.
7. **Tüm Talep Karşılanır (Stoksuz Kalma Yok)**: Model, depoda malın hiç bitmeyeceğini varsayar.
8. **Tüm Sipariş Aynı Anda Teslim Edilir:** Verilen siparişin tamamı tek seferde "pıt" diye depoya girer. Kısım kısım gelmez.

##### **[[Yıllık Sipariş Sayısı]]** (Number of Orders -*N* )
### $N=\frac{D}{Q^*}$

##### **[[Çevrim Süresi|Siparişler Arası Geçen Süre / Çevrim Süresi]]** (Time Between Orders / Order Cycle Time -*T* )
### $T = \frac{Q^*}{D}$

##### **[[Yeniden Sipariş Noktası]]** (Reorder Point -*ROP* )
### $\text{ROP} = d \times L \space \space (\text{d = temin süresindeki talep,} \space \text{  L = temin süresi})$

##### **[[Yıllık Toplam Stok Maliyeti]]** (Total Annual Cost -or- Total Relevant Cost -*TM* )
#### $$TM = \left( \frac{D}{Q^*}A \right) + \left({\frac{Q^*}{2}H}\right) + \left (D \times C) \text{ (eğer malın maliyeti de istenirse}\right)$$


- **Tanım:** Müşterinin doğrudan talep ettiği **bitmiş mamul** (Bağımsız Talep) için oluşturulan Üretim Ana Planına (MPS) dayanarak; bu **mamulü** meydana getirmek için gerekli olan tüm alt parçaların, bileşenlerin ve hammaddelerin (Bağımlı Talep) **"Neye ihtiyaç var?", "Ne kadar ihtiyaç var?"** ve **"Ne zaman ihtiyaç var?"** sorularını yanıtlayarak tedarik/üretim zamanlamasını planlayan bir sistemdir.


> [!important] MRP, aşağıdaki üç soruyu yanıtlamak için tasarlanmıştır: 
> 1. Neye ihtiyaç var?  
> 2. Ne kadar ihtiyaç var? 
> 3. Ne zaman gerekli?


> [!important] MRP, bu soruları yanıtlamak için üç ana adımdan oluşur: 
>4. Eldeki malzemelerin ve bileşenlerin stok kayıtlarını çıkarmak
>5. Hangi malzemelere ihtiyaç duyulduğunu belirlemek
>6. İlgili malzemelerin üretimlerini veya satın alımlarını planlamak

 


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
        - Tabla (2 gün sürdüğü için): 29 Nisan'dan 2 gün önce = **27 Nisan**
        - Vidalar (1 gün sürdüğü için): 29 Nisan'dan 1 gün önce = **28 Nisan**
- **Sonuç:** MRP, her parçanın tam ihtiyaç duyulduğu tarihte (ne erken ne geç) tedarik edilmesini veya üretilmesini planlar. Böylece **gereksiz stok birikmez** ve **üretim aksamaz**.
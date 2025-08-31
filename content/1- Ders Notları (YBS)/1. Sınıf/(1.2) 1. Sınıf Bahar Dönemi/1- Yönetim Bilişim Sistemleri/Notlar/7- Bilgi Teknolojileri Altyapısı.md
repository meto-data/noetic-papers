---
Ders: YBS
Dönem: II. Dönem
Hafta: VII. Hafta
Konu: Bilgi Teknolojileri Altyapısı
Kavramlar: "```dataview\rLIST from outgoing([[]])\r```"
---

## [[İkili Sayı Sistemi]] (Binary Digit Systems)
- 1 veya 0 (Binary) = Bit
- Byte = 8 bit
- Kilobyte = 1024 byte
- Megabyte = 1024 kilobyte
- Gigabyte = 1024 megabyte
- Terabyte = 1024 gigabyte
- Petabyte = 1024 terabyte
- Exabyte = 1024 petabyte
### **BT Altyapısının Tanımı ve Önemi:** (KESİNLİKLE BİL!)
- BT altyapısı, bir işletmenin bilgi sistemlerini çalıştırmak için kullandığı temel teknolojik kaynaklardır.
- **Yazılım, donanım ve hizmetleri kapsar!!!**
- Bu kaynaklar donanım, yazılım, danışmanlık, eğitim ve uygulama gibi işletmenin geneli tarafından paylaşılan hizmetleri kapsar.
- BT altyapısı, müşterilere hizmet sunmak, tedarikçilerle çalışmak ve iç süreçleri yönetmek için bir temel platform sağlar.

![[bt_alt.png]]

### Bilgi Teknolojileri Altyapısının 7 Bileşeni
- BT altyapısı, bir kurumun yazılım uygulamaları ve fiziksel aygıtlarının birleşiminden ulaşır. Bu altyapı aynı zamanda işletme çapında finanse edilen hizmetleri, teknik ve beşeri kaynakları da içerir. Bu hizmetler şunları kapsar:
	1. **Bilgisayar Donanım Platformları** (Çalışanlar, müşteriler, aygıtlar için)
		- İstemci, sunucu, mainframe
	2. **İşletim Sistemi Platformları**
	3. **Kurumsal Yazılım Sistemleri**
		- SAP, Oracle
	4. **Veri Yönetimi ve Depolama** (Kurumsal veri saklama ve analiz)
		- Oracle, IBM, Microsoft SQL Server, MySQL (Open Source)
	5. **Ağ/İletişim Altyapısı** (Video, veri, ses bağlantıları)
	6. **İnternet Platformları**
	7. **Danışmanlık ve Sistem Entegrasyon Hizmetleri** 


- Bu hizmet platformları bakış açısı, bilgi teknolojileri altyapısı yatırımlarının sağladığı işletme değerinin anlaşılmasını kolaylaştıracaktır. Örneğin; maliyeti yaklaşık 1000 lira olan 3 GHz hızında bir bilgisayarı veya yüksek hızlı internet bağlantısının işletme değerini, bunları kimin kullanacağını ve nasıl kullanılacağını bilmeksizin anlamak çok zordur.

## Bilgi Teknolojileri Altyapısının Gelişimi ve Beş Aşama

### İstemci-Sunucu Devri (1983 - Günümüz)
##### **İstemci-Sunucu Mimarisinin İşleyişi ve Özellikleri**  
- İstemci-sunucu modelinde, hesaplama işlemleri iki temel bileşen arasında paylaştırılır:
	- **İstemci**, kullanıcı etkileşimini sağlayan (masaüstü/dizüstü bilgisayar gibi) giriş noktasıdır.
	- **Sunucu**, ağ üzerinden gelen istekleri işleyen, veri depolayan, web sayfalarını barındıran ve ağ faaliyetlerini yöneten güçlü bir makine veya yazılımdır.
##### **Temel İşleyiş:**
1. İstemci, sunucuya bir istek gönderir (örneğin, web sayfası veya veri talebi).
2. Sunucu bu isteği işler, gerekli verileri veya hizmeti sağlar.
3. İşlem, iki taraf arasında dağıtılarak merkeziyetçi bir yapı oluşturulur.
##### **Sunucu Türleri ve Gelişimi:**
- Sunucular hem fiziksel makineler (çok işlemcili, yüksek kapasiteli PC’ler) hem de yazılımsal uygulamalar (web sunucuları, uygulama sunucuları) olabilir.
- **Çok Katmanlı Mimari (N Katmanlı Mimari):** Büyük işletmelerde, işlemler farklı sunucu katmanlarına dağıtılır. Örneğin:
    - **Web Sunucusu:** İstemciye web sayfalarını iletir.
    - **Uygulama Sunucusu:** İş mantığını işler (örneğin, veritabanı sorguları).
    - Bu katmanlar aynı makinede veya ayrı sistemlerde bulunabilir.
**Avantajlar ve Etkiler:**
- Merkezi sistemlere kıyasla düşük maliyetli, dağıtık bir yapı sunar.
- İşletmelerde hesaplama kapasitesini ve uygulama çeşitliliğini artırmıştır.
    
**Tarihsel ve Pazar Bağlamı:**
- 1980’lerde Novell Netware, istemci-sunucu ağlarında öncüydü.
- Günümüzde Microsoft Windows (Server, Vista, XP, 7) yerel ağ pazarının %78’ini kontrol eder.

![[istemci-sunucu.png]]

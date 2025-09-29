- **[[Veri Tabanı]]**: Verilerin sistematik olarak tanımlanmış bir yapıda depolandığı, erişildiği, güncellendiği, taşınabildiği, daha geniş kapsamıyla 'bütüncül bir şekilde' yönetildiği bir veri kümesidir. Başka bir tanımla **veriyi düzenli, erişilebilir, ve yönetilebilir şekilde saklayan sistemdir.**
- **[[VTYS]] (Veri Tabanı Yönetim Sistemi)**: Bir veri tabanını oluşturmak, üzerinde istenilen bilgiyi aramak, gerektiğinde bilgi eklemek/silmek/değiştirmek ve veri tabanı ile ilgili her türlü işletimsel gereksinimleri karşılamak için kullanılan geniş kapsamlı yazılım sistemidir. Birbirleri ile ilişkili veri ve programlar topluluğundan oluşmaktadır.

#### Veri Modeli (Data Model)
- Verileri mantıksal düzeyde düzenlemek için kullanılan yapı, kavram ve işlemler topluluğu.
- Her VTYS belirli bir veri modeli kullanır.
- Veri tabanını tasarlayan kişi, veri modelinin yapılarını ve kavramlarını kullanarak mantıksal düzeydeki düzenlemeleri oluşturur. Sonra o veri modelini kullanan bir VTYS üzerinde bu düzenlemelere göre veri tabanı oluşturulur.
- Günümüzde en yaygın olarak "ilişkisel veri modeli" kullanılır.
#### Veri Tabanı Mimarisi
- Veri tabanı mimarisi üç seviyeden oluşur:
##### 1- İç (Fiziksel) Seviye
- Verilerin nasıl saklanacağı ve bilgisayar tarafından nasıl işleneceği ile ilgilenen seviyedir. Veri tabanının performansı bu seviyenin iyi planlanmış olmasına bağlıdır.
	- **Örneğin**: InnoDB (MySQL, MariaDB), MyIsam (MySQL)
##### 2- Kavramsal Seviye
- İç seviye ile dış seviye arasındaki iletişimi sağlayan seviye.
##### 3- Dış (Alt) Seviye
- Kullanıcıların verileri gördüğü ya da veri eklemek-silmek-değiştirmek için kullandığı ekranlar dış seviyede yer alır.

### Neden VTYS
- VTYS yaklaşımında *veri girişi* ve *depolanması* **veriye erişen uygulama programlarından** bağımsızdır. 
- Buna mukabil klasik dosya kullanımında, *kayıt desenleri* ve *dosya yapılarında* ortaya çıkabilecek **en ufak bir değişiklik** bile uygulama programlarının değiştirilmesine neden olmaktadır.
#### VTYS Kullanmanın Avantajları
- Gereksiz veri tekrarını önler.
- Tüm uygulamaların gereksinim duyduğu veriler **birbirleriyle bütünleşik** yapıdadır. Dolayısıyla veri kaynağı *tek* olarak tasarlanır, veri tekrarı da önlenmiş olur. 
	- **Örneğin**: Türkiye'deki il kodları ve isimleri hem personel alt sisteminde hem de pazarlama alt sisteminde ayrı ayrı tutulmaz.
- **[[Veri bütünlüğü]]** (data integrity) sağlanır (bkz. **[[integrity]]**)
	- Verinin doğruluğu ve tutarlılığı.
- Veri bütünlüğü için bazı kısıtlamalar tanımlanabilir.
	- **Örneğin**: Öğrenci bilgileri girilirken doğduğu il koduna $100$ değeri girilirse yanlış bilgi nedeniyle bu isteğin yerine getirilmemesi istenebilir.
- Verilerin güvenliği sağlanır.
- Tüm verilere her kullanıcının kolayca erişebilmesi her zaman istenmeyen bir durumdur (bkz. **[[availability]]**).
	- Her kullanıcıya çeşitli yetkiler atanarak tekil olarak yahut kategoriye tâbi tutarak erişebileceği, değiştirebileceği ve silebileceği veriler ayrı ayrı tanımlanabilir. 
		- **Örneğin**: Pazarlama bölümünde çalışan bir kullanıcının diğer personelin özlük bilgilerine ulaşması engellenebilir.
- Yapılan erişimlerde tutarsızlıkların ortaya çıkmasını önler.
- İki veya daha fazla kullanıcı aynı anda aynı veri üzerinde değişiklik yapmak istediğinde yetkiye `VE/VEYA` kimin önce eriştiğine bakarak birine öncelik verir diğerlerini bekletir.
- Veriler üzerinde merkezî denetim sağlar.
- Kullanıcılar işletim sistemi komutları veya genel amaçlı programlama dilleri ile yazılmış uygulama programlarını kullanarak doğrudan veri tabanındaki verilere erişemezler veya değiştiremezler.
- Veri tabanı kullanımı yalnız VTYS (DBMS - Data Base Management System) olarak adlandırılan yazılım sistemi aracılığıyla mümkündür.
- Veri tabanının bilgisayar belleklerindeki fiziksel yapısı kullanıcılardan gizlenir.
- Kullanıcılara daha yalın mantıksal yapılar sunulur.
- VTYS, bir anlamda yüksek düzeyli programlama dili derleyicisi gibi davranarak kullanıcının soyut terimler kullanarak veri tabanıyla ilişki kurmasını sağlar. Böylece kullanıcı sistem tarafından kullanılan karmaşık veri gösterimleri ve algoritmaların ayrıntılarıyla uğraşmadan neyin yapılmasını istediğini belirterek isteklerini ortaya koyabilir.
- Veri tabanı sisteminin kendi kendini tanıyabilmesi.
	- Veri tabanı sistemleri yalnızca veriye değil, verinin özelliklerini, kısıtları ve ilişkileri de tanımlar (meta-data).
		- Meta dosya tabanlı sistemlerde uygulamanın içindedir, bu nedenle uygulamalar yalnızca tek bir veri tabanı ile çalışabilir.
- Uygulamalarla verinin izolasyonu.
- Dosya tabanlı uygulamalarda dosya değiştiği anda bağlı tüm uygulamalar değişmelidir.
- Veri tabanı sistemine bağlı uygulamalarda veri ile uygulama birbirinden bağımsızdır.
- Verinin farklı görünüşlerine ulaşım (*views*).
	- Farklı kullanıcılar verinin farklı bölümlerine farklı sorgularla ulaşabilir.
	- **Örneğin**: Bir kullanıcı yalnızca öğrenci not bildirimi bir diğeri ise öğrencinin alması gereken dersleri listeleyebilir.
- İhtiyaca göre veri tutma.
- Dosya bazlı sistemlerde aynı veri birden çok kullanıcı tarafından tutuluyor olabilir. DBMS sistemlerinde aynı veri tek bir merkezden idare edilir ve ortak veriler kullanıcılar arasında paylaşılır.
- Yedekleme ve geri yükleme özelliği.
	- Veriler düzenli olarak yedeklenebilir ve herhangi bir arıza durumunda geri yüklenebilir.
- Farklı arayüzler kullanabilme
	- Kullanıcılara ve verinin çeşidine göre farklı arayüzler aracılığıyla veriye erişilebilir.
- Farklı veriler birbirleriyle ilişkilendirilebilir.
- Tetikçiler (**[[triggers]]**) ve saklı yordamlar (**[[stored procedures]]**)
	- Veri belli bir şekle geldiğinde otomatik olarak belli değişikliklerin gerçekleşmesi sağlanabilir.
- Standartların belirlenebilmesi.
	- Raporlama, iş akışları gibi standartlar ortak veri tabanı kullanımı ile kurumlar içinde uygulanabilir.
- Hızlı uygulama geliştirme süreleri.
	- Dosya bazlı uygulamalar geliştirmek veri tabanı uygulamaları geliştirmekten daha uzun sürmektedir.
- Esneklik
	- Veri tabanındaki verilerin değişmesine gerek kalmadan yeni yapılar eklenip çıkarılabilir.
- Doğru bilgiye anlık ulaşabilmek
	- Güncel veriye kullanıcılar aynı anda ulaşabilir, yapılan değişiklikleri görebilir.

### ACID (Atomicity, Consistency, Isolation, Durability)
- **[[Atomicity]] (Atomiklik)**: İşlem ya tamamen yapılır ya hiç yapılmaz.
- **[[Consistency]] (Tutarlılık)**: İşlem sonunda veri tüm kurallara uygun olmalı.
- **[[Isolation]] (Yalıtım)**: Eş zamanlı çalışan işlemler birbirine karışmamalı.
- **[[Durability]] (Dayanıklılık-Kalıcılık)**: İşlem tamamlandıysa veri kalıcı olmalı, sistem arıası gibi durumlarda bile kalıcı olmasının garanti edilmesi.
Veri Tabanı Yönetim Sistemi (VTYS) veri tabanlarını oluşturmak, yönetmek, sorgulamak ve bakımını yapmak için geliştirilmiş kapsamlı bir yazılım sistemidir. Geleneksel dosyalama sorunlarına çözüm getirir.

VTYS'nin en temel özelliği mantıksal ve fiziksel veri bağımsızlığıdır. 
-   Mantıksal Veri Bağımsızlığı  , Veri tabanının genel mantıksal yapısında, diğer bir deyişle kavramsal şemada yapılan yeni bir tablo veya sütun eklemek gibi değişikliklerin mevcut uygulama programlarını etkilememesi veya minimum düzeyde etkilemesidir. Uygulamalar, verinin mantıksal yapısına göre yazılır.
-   Fiziksel Veri Bağımsızlığı ise  ,verinin disk üzerinde fiziksel olarak nasıl saklandığına dair yapılan değişikliklerin, uygulama programlarını ve verinin mantıksal görünümünü etkilememesidir. Örneğin, veri tabanı farklı bir depolama teknolojisine geçirilebilir ve bu durum uygulamaların yeniden yazılmasını gerektirmez.

Bu ayrım sayesinde sistemin esnekliği artar, bakım kolaylaşır ve teknolojik adaptasyon hızlanır.

Bu önemli ayrım sayesinde, sistem genelinde esneklik artar, bakım süreçleri önemli ölçüde kolaylaşır ve yeni teknolojilere adaptasyon süreci hızlanır.

Veri bağımsızlığının yanı sıra, VTYS'ler bir dizi kritik işlevi daha yerine getirir:

- Uygulama programları ile fiziksel veri dosyaları arasında bir   arayüz   görevi üstlenirler.
    
- Veri   tekrarını   ve buna bağlı olarak ortaya çıkabilecek   tutarsızlıkları   etkin bir şekilde kontrol eder veya azaltırlar.
    
- Veri   güvenliğini   (yetkilendirme mekanizmaları aracılığıyla) ve veri   bütünlüğünü   (verinin doğruluğu ve tutarlılığı anlamında) sağlarlar.
    
- Birden fazla kullanıcının aynı anda sisteme erişimini, yani   eş zamanlı erişimi   yöneterek olası veri çakışmalarını önlerler.
    
- Düzenli   yedekleme   ve ihtiyaç durumunda verilerin   kurtarılması   için gerekli hizmetleri sunarlar.
    
- Son olarak, veri tanımlama işlemleri için   DDL (Data Definition Language)   ve veri manipülasyonu (örneğin sorgulama, güncelleme) için   DML (Data Manipulation Language)   – ki bunun en bilinen örneği   SQL'dir   – gibi standartlaşmış diller sağlarlar.
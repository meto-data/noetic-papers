---
draft: true
---

Esas amaç veriyi verimli tutmak, en az yer kaplayacak şekilde tutmaktır.

### Veri Tabanı Problemleri
- **Redundancy** (Gereksiz veriyi tutmamak)
- **Inconsistency** (Tutarlı veri tutmak, bir kısmı farklı içeriken bir kısmı farklı içerik olmamalı)
- **Accessing**: Her seferinde yeni programların yazılması
- **Verinin izole edilmesi**: Çok sayıda dosya ve formatta tutuluyor olması
- **Integrity**: Koşulların bağlanması
- **Atomicity** (Bir veritabanı işleminin ya tamamen yapılması ya da hiç yapılmaması. Veriyi yarım yamalak bırakmamak)
- **Concurrency** (Birden fazla kullanıcı aynı anda veriyle çalışıyorsa çakışma ve tutarsızlık olmamalı, birden fazla işin birbiriyle çakışmadan senkronize olarak çalışması)
- **Security** (Veriler yetkisiz kişilerden korunmalı)

### Abstraction (Soyutlama)
- Veri tabanında veriyi üç farklı seviyede düşünmek. 
- **Physical**: Disk (Verinin gerçekte disk üzerinde nasıl tutulduğunu gösterir -dosya blokları, indeksler, veri sayfaları vesaire)
	- Nasıl saklanıyor?
- **Logical**: Relationships (Verinin ilişkilerini ve yapısını gösterir -tablolar, kolonlar vesaire)
	- Verinin yapısı ne?
- **View**: Hides datatypes, grants (Kullanıcının görebileceği kısmı gösterir)
	- Kullanıcıya ne gösteriliyor?

### Instance & Schema
- **Schema**
	- Physical Schema: Verinin disk üzerinde nasıl tutulduğunu gösterir.
	- Logical Schema: Verinin mantıksal yapısı ve ilişkileri -tablolar, kolonlar, kurallar.
- **Instance**: Şemaya göre o an veri tabanında bulunan veri. Tabloların o anki satırları.
- **Physical Data Independence**: (Fiziksel verinin bağımsızlığı problemi) Şema ve instance ayrıldığı için fiziksel değişiklikler mantıksal yapıyı etkilemez. 

### DB Langs
- **DML** (Data Manipulation Language)
	- Sorgular, SQL
- **DDL** (Data Definition Language)
	- `CREATE TABLE, ALTER TABLE, DROP TABLE`
	- Data Dictionary (contains metadata)
		- Database schema
		- Integrity constraints
			- Primary key
			- Referential integrity (foreign key)



	![[657e0b36-65e3-46f2-9d7d-1f378d92857d.png]]
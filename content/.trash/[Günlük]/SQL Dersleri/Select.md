
```sql
select *from Personeller

Select 'Metin' Adı,  'Selayet' Soyadı

Select Adi İsimler, SoyAdi Soyisimler from Personeller

Select 2023 [Türkiye Yüzyılı]

```


```sql
SELECT Adi + ' ' + soyAdi [Personel Bilgileri] from Personeller

SELECT Adi + '       ' + Convert(nvarchar, IseBaslamaTarihi) [Personel İşe Başlama Tarihi] from Personeller

SELECT Adi + '       ' + CAST(IseBaslamaTarihi as nvarchar) [Personel İşe Başlama Tarihi] from Personeller
```
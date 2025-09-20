

```sql
SELECT *FROM Personeller where sehir = 'London'

SELECT *FROM Personeller where sehir = 'London' AND Extension<500

<> -- Eşit değilse
```


```sql
select *from Personeller where YEAR(IseBaslamaTarihi) > 1992

select *from Personeller where DAY(DogumTarihi) <>29

select Adi + ' ' + SoyAdi + ' ' + CAST(DAY(DogumTarihi) as nvarchar) [Personel Bilgileri Bro] from Personeller where DAY(DogumTarihi) BETWEEN 1 AND 15

```
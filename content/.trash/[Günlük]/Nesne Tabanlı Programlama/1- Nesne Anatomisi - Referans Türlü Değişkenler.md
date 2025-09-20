- **Yaklaşım:** Bir olguya, bir yapıya, bir inşaya yaklaşma biçimidir. Yaklaşım dediğimiz olay, o işi/olguyu hangi felsefeyle ele aldığımızı anlatır.
- Object orianted, yazılım geliştirme mesleğinde/sanatında, yazılımı geliştirme yaklaşımımızı ortaya koyar. 
- Nesne Tabanlı Programlama, bir programlama dili, teknoloji, yapı değildir -bir yaklaşımdır.
	- Kodu sistematik hâle getiren ve kodun inşa sürecini kompleks dillerdeki yaklaşımdakilerden daha sistematik/kısa hâle getiren bir yaklaşımdır.


## Nesne Tabanlı Programlama
- Gerçek hayatı, programlama için simüle eden nesneleri baz alan bir programlama tekniğidir.
- Her şey bir nesnedir.
	- Bu felsefe üzerine oturtulmuş bir yaklaşımdır.
- Nesneler kendi aralarında haberleşebilirler.

### Nesnenin Anatomisi
- Bir class'tan birden çok nesne üretilip modelleme yapılabilir.

![[nesne.svg]]
### Nesne Kavramı
- Nesne, nesnellik felsefesine dayanan bir kavramdır. Kainattaki her bir şeyi nesne olarak görmek ve o şekilde yorumlamaktır.
- Nesneler, referans türlü değerlerdir.

### Referans Türlü Değerler

| STACK                                                                                                                                                                                                                | HEAP                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Değer türlü değişkenler ve değerleri tutulur.                                                                                                                                                                        | Sadece nesneler tutulur. |
| Referanslar tutulur.                                                                                                                                                                                                 |                          |
| `int a =5`, `bool b =true`                                                                                                                                                                                           |                          |
| Yaşım, boyum vb.                                                                                                                                                                                                     | Ben                      |
| **(Nesne1)** R1 $\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space \to$R1 referansı $\to$ | Nesne 1                  |
| **(Nesne2)** R2 $\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space \to$R2 referansı $\to$ | Nesne 2,                 |
| **(Nesne3)** R3 $\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space\space \space\space\space\space\space \to$R3 referansı $\to$ | Nesne 3                  |
- Normal şartlarda biz (developer) stack'e doğrudan erişme hakkına sahibiz ancak Heap'e erişim hakkımız bulunmamaktadır.
- Heap'teki nesnelere biz direkt erişemesekte Stack'teki referanslara erişebilmekteyiz. Biz de bu yüzden Stack'te heap'teki nesneleri işaret eden referanslar tanımlarız. Haliyle Stack'teki referans'a erişebilir ve dolaylı olarak da o referans aracılığıyla heap'teki nesneye erişmiş oluruz.
	- Nesnelere/classlara bu yüzden referans türlü değerler denmesinin sebebi işte budur.
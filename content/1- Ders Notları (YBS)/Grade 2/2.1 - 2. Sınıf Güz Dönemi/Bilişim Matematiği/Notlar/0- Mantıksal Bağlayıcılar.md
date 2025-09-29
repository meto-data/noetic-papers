### Kesişim (Conjunction)
- İki basit önerme aralarına 've' kelimesi koyarak bağlanabilir. Bunun sonucunda oluşan **[[bileşke önerme|bileşke önermeye]]** iki basit önerme bileşeninin kesişimi denir. Eper $p$ ve $q$ iki basit önerme ise $p \land q$ (veya $p.q$) $p$ ve $q$'nun birleşimini temsil eder.

>	p: Güneş parlıyor.
>	q: Köpekler havlar.
>	$p \land q$: Güneş parlıyor ve köpekler havlar.

- $p \land q$ sadece p ve q'nun her ikisinin de doğru olduğu zaman doğrudur:

| $p$ | $q$ | $p \land q$ |
| --- | --- | ----------- |
| T   | T   | T           |
| T   | F   | F           |
| F   | T   | F           |
| F   | F   | F           |


---

### Birleşim (Disjunction)
- "Veya" kelimesi iki basit önermeyi birleştirmek için kullanılabilir. Oluşan bileşke önerme iki basit önermenin birleşimi olarak adlandırılır. Dâhili ve hârici olmak üzere iki çeşit birleşim vardır. Gerçek hayatta kullandığımız "veya" ile kafa karıştırıcı olabilir.



- $p$ ve $q$ birer önerme ise $p \lor q$, $p$ ve $q$'nun dâhili birleşimini temsil eder. Bu bileşke önerme bileşenlerinden herhangi birisi veya her ikisinin doğru olması durumunda doğru aksi takdirde yanlıştır. 

| $p$ | $q$ | $p \lor q$ |
| --- | --- | ---------- |
| T   | T   | T          |
| T   | F   | T          |
| F   | T   | T          |
| F   | F   | F          |

- $p$ ve $q$'nun hârici birleşimi ise $p\underline\lor q$  şeklinde gösterilir. Bu bileşke önerme sadece bir bileşenin doğru olması durumunda doğrudur. 

| $p$ | $q$ | $p \lor q$ |
| --- | --- | ---------- |
| T   | T   | F          |
| T   | F   | T          |
| F   | T   | T          |
| F   | F   | F          |

- İki basit önerme "*veya*" kullanılarak bağlanırken hangi tip birleşimin kullanılacağı cümlenin genel durumundan anlaşılır. Örneğin, *'Yarın felsefe çalışacağım ya da matematik çalışacağım.'* cümlesi iki işin birden yapılmayacağı anlamı taşıdığından harici birleşimdir. Diğer taraftan, *'Stoa felsefesini öğrenmek isteyen kişi Herakleitos'un maddeci geleneğini bilmeli veya Zenon'un madde görüşünü bilmelidir.'* cümlesindeki kişi iki koşuldan birini sağlamalı izlenimi verdiğinden dâhili birleşimdir.

### Koşullu Önermeler
- Koşullu önerme bağlayıcısı $\to$ işareti ile sembolize edilir. Normal dildeki karşılığı "*Eğer* ..."'dir.

>	p: Kahvaltı yaptım.
>	q: Öğlen yemeği yemem.
>	p $\to$ q: Eğer kahvaltı yaparsam öğlen yemeği yemem.
>	p $\to$ q: Ne zaman kahvaltı yapsam öğlen yemeği yemem
>	p $\to$ q: Kahvaltı yapmam öğlen yemeği yemeyeceğim anlamına gelir
>	...


| $p$ | $q$ | $p \to q$ |
| --- | --- | --------- |
| T   | T   | T         |
| T   | F   | F         |
| F   | T   | T         |
| F   | F   | T         |

- Koşullu önermelerde $p$ önermesi *öncül* ve $q$ önermesi *ardıl* olarak adlandırılır. $p$ önermesi $q$ için **[[yeterli koşul]]**, $q$ ise $p$ için **[[gerekli koşul]]**'dur.


### Çift Yönlü Koşullu Önermeler
- Çift yönlü koşullu bağlayıcı $\leftrightarrow$ sembolü ile gösterilir ve 'ancak ve ancak ... ise ...' şeklinde ifade edilir.

>	p: Kahvaltı yaptım.
>	q: Öğlen yemeği yedim.
>	p $\leftrightarrow$ q: Ancak ve ancak öğlen yemeği yemezsem kahvaltı yaparım.
>	p $\leftrightarrow$ q: Ancak ve ancak kahvaltı yaparsam öğlen yemeği yemem.


| $p$ | $q$ | $p \leftrightarrow q$ |
| --- | --- | --------------------- |
| T   | T   | T                     |
| T   | F   | F                     |
| F   | T   | F                     |
| F   | F   | T                     |

#### Örnekler (Doğruluk Tablosu Oluşturma)

##### $\neg p \lor q$  için doğruluk tablosu oluşturun.

| $p$ | $q$ | $\neg p$ | $\neg p \lor q$ |
| --- | --- | -------- | --------------- |
| T   | T   | F        | T               |
| T   | F   | F        | F               |
| F   | T   | T        | T               |
| F   | F   | T        | T               |

##### $\neg p  \land\neg q$ için doğruluk tablosu oluşturun.

| $p$ | $q$ | $\neg p$ | $\neg q$ | $\neg p  \land\neg q$ |
| --- | --- | -------- | -------- | --------------------- |
| T   | T   | F        | F        | F                     |
| T   | F   | F        | T        | F                     |
| F   | T   | T        | F        | F                     |
| F   | F   | T        | T        | T                     |

##### $\neg q \rightarrow p$ için doğruluk tablosu oluşturun.

| $q$ | $p$ | $\neg q$ | $\neg q \rightarrow p$ |
| --- | --- | -------- | ---------------------- |
| T   | T   | F        | T                      |
| T   | F   | F        | T                      |
| F   | T   | T        | T                      |
| F   | F   | T        | F                      |
##### $\neg p \leftrightarrow \neg q$ için doğruluk tablosu oluşturun.

| $p$ | $q$ | $\neg p$ | $\neg q$ | $\neg p \leftrightarrow \neg q$ |
| --- | --- | -------- | -------- | ------------------------------- |
| T   | T   | F        | F        | T                               |
| T   | F   | F        | T        | F                               |
| F   | T   | T        | F        | F                               |
| F   | F   | T        | T        | T                               |

### Totolojiler ve Çelişkiler
###### **[[Totoloji]] ($t$)**: 
Basit bileşenlerin doğruluk değeri ne olursa olsun doğru olan bileşke önerme. 
- Söz gelişi, insanlar erkektir veya kadındır önermesi her zaman doğrudur. O nedenle bu önerme bir totolojidir.
###### **[[Çelişki]] ($f$)**: 
Basit bileşenlerinin doğruluk değeri ne olursa olsun yanlış olan bileşke önerme.
- Totoloji $t$ ile, çelişki $f$ ile gösterilir.

### Mantıksal Eşdeğerlik ve Mantıksal Anlam
- İki önerme, kendilerini oluşturan bileşenlerinin tüm doğruluk değeri kümesi için aynı doğruluk değerine sahipse bu iki önerme **mantıksal eşdeğer**dir denir. P ve Q iki bileşik önerme olsun, P ve Q mantıksal eşdeğerse $P \equiv Q$ şeklinde gösterilir. Totolojiler ve çelişkilerde olduğu gibi mantıksal eşdeğerlilik de P ve Q'nun yapılarının sonucudur.

- **Örnek**: $\overline p \lor \overline q$  ve $\overline{p \land q}$ 'nun mantıksak eşdeğer olduğunu gösteriniz:


| $p$ | $q$ | $\overline p$ | $\overline q$ | $p \land q$ | $\overline{p \land q}$ | $\overline p \lor \overline q$ |
| --- | --- | ------------- | ------------- | ----------- | ---------------------- | ------------------------------ |
| T   | T   | F             | F             | T           | F                      | F                              |
| T   | F   | F             | T             | F           | T                      | T                              |
| F   | T   | T             | F             | F           | T                      | T                              |
| F   | F   | T             | T             | F           | T                      | T                              |

- İki önerme arasında oluşabilecek bir diğer yapıya-bağımlı ilişki de mantıksal anlamdır. Eğer bir P önermesi her doğru olduğunda Q önermesi de doğru oluyorsa, P önermesi mantıksal olarak Q önermesi anlamına gelir. Ancak bunun tersi doğru değildir, yani Q, P yanlış olduğunda da doğru olabilir. Mantıksal anlam $\vdash$ ile sembolize edilir. P $\vdash$ Q, P mantıksal olarak Q anlamına gelir demektir.

- **Örnek**: $q \vdash (p \lor q)$ olduğunu gösteriniz. (**q önermesini doğru kılan tüm yorumlamalar altında, ($p\lor q$) önermesi de zorunlu olarak doğrudur**)

| $p$ | $q$ | $p\lor q$ |
| --- | --- | --------- |
| T   | T   | T         |
| T   | F   | T         |
| F   | T   | T         |
| F   | F   | F         |


- P $\vdash$ Q ile P$\rightarrow$ Q bir totolojidir ifadeleri benzer ifadelerdir.  
- $P \vdash Q$ ilişkisinin geçerli olması, tanım gereği (P=T, | Q=F) durumunun **yasaklanmış** olduğu anlamına gelir. P doğru iken Q hiçbir durumda yanlış değildir. Bu da sadece $P \rightarrow Q$'nun yanlış olduğu durumda mümkün olduğundan $P \rightarrow Q$ bir totoloji olmalıdır.
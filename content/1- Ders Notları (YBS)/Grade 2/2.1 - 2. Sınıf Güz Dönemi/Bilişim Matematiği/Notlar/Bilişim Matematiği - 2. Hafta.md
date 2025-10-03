---
title: Bilişim Matematiği - 2. Hafta
type: learning
ders: "[[Bilişim Matematiği]]"
konu: Mantık
created: "[[2025-10-03]]"
tags:
  - ders/bilişim_matematiği
  - ders/bilişim_matematiği/mantık
HUB:
  - "[[hub-it-math]]"
  - "[[hub-discrete-math]]"
cssclasses:
  - ders-notu
---

- **Not**: Ders hârici bir anlatım için [[1- Buders Önermeler]] ve [[1- Temeller (Mantık)]] notlarına bakılması tavsiye edilir. Ayriyeten daha detaylı kaynak ve konu anlatımı için [[ATLAS/1- Ders Notları (YBS)/Grade 2/2.1 - 2. Sınıf Güz Dönemi/0---Ayrık Matematik/index|Ayrık Matematik]] kısmına bakmanız iyi olacaktır. <br>
- **Not 2**: Ders anlatımında önermenin yahut bağlaçların olumsuzu alınırken $'$ işareti kullanıldı $(p' \text{ gibi})$. $\neg p$, $\overline p$, ~$p$ veya $p'$ ile ifade etmek arasında hiçbir fark olmadığı için notlarda $\neg p$ şeklinde bir olumsuzlamayı tercih ettim. Eğer öğretmenin yaptığı gibi olumsuzlama yapmak istiyorsanız aklınızda bulunsun, $p'$ şeklinde yapmanız daha uygun olacaktır. <br>
- **Not 3**: Buradaki pek çok yerde ders notlarına sadık kalmıyorum. Mantık konusu epey önemli bir konudur. Esas çıkış noktasına Aristoteles desek şaşmayız herhalde, zira mantığın babası Aristoteles'tir. Aristoteles'in Organon serisini ve günümüze tesirini araştırırsanız iyi olur. Bu dersteki mantık kriptografinin de temelini oluşturmaktadır. Şu an bu cümleleri dijitalde kurabiliyorsam bunu Claude Shannon'un bilgi teorisine borçluyum, onun da bilgi teorisine esasında bu mantık yatar. Bunu geçelim, felsefede dâhi mantığı kullanıyoruz ki, zaten mantığın çıkış noktası esasında felsefedir. Bu tür sebeplerden dolayı notları biraz daha detaylandırmayı ve yüzeysel de olsa programlamadaki karşılıklarını göstermeyi daha uygun gördüm.

---
<br>

<h2 style="text-align:center"><span style="color:darkblue; text-align:center">Ünite 2: Mantık</span> | <span style="color:#bf3f36">03.10.2025</span></h2>


- **[[Önerme]]**: Doğru **ya da** yanlış, **kesin** hüküm bildiren ifade

### **[[Doğruluk Değeri]]** (Truth Value)
- Bir önerme ele aldığımızda, bu önerme ya doğrudur (**1**) ya da yanlıştır (**0**)
- Bir önermenin denkliği $\equiv$ sembolü ile gösterilir. Mesela $p \equiv 1$ veya $q \equiv 0$ gibi.
### **[[Denk Önermeler]]**
- Doğruluk değerleri aynı olan önermelerdir

>[!example] Örnek
> $p$: Türkiye'nin başkenti Ankara'dır.  <br>
> $q$: $-3$'ün karesi $9$'dur. <br>
> Rahatlıkla söyleyebiliriz ki, $p \equiv q$

### **[[Bir Önermenin Olumsuzu| Bir Önermenin Olumsuzu (Değili)]]** (Negation of a Proposition)
- Bir önermenin doğruluk değerini değiştirir.
	- $p$: Türkiye'nin başkenti Ankara'dır. $p \equiv 1$
	- $\neg p$: Türkiye'nin başkenti Ankara değildir. $\neg p \equiv 0$
	- $p$: $(-5)^2 = 25$'tir. $p \equiv 1$
	- $\neg p$: $(-5)^2 \not = 25$  $\neg p \equiv 0$
### [[Doğruluk Tablosu]] (Truth Table)
- Önerme sayısına *n* dersek, $2^n$ tane doğruluk değeri ortaya çıkar.
- $p$ ve $q$ olmak üzere $2$ önermemiz var diyelim, bu durumda $4$ adet doğruluk değeri ortaya çıkacaktır.

| $p$ | $q$ |
| :-: | :-: |
|  1  |  1  |
|  1  |  0  |
|  0  |  1  |
|  0  |  0  |


- Eğer $r$ önermesini de eklersek, bu sefer $3$ adet önermemiz olacağı için $8$ adet doğruluk değeri ortaya çıkacaktır. Bir önermenin olumsuzu ya da bağlaçlarla birbirine bağlanması bu sayıya dâhil değildir. Örneğin tabloya $\neg p$ önermesini eklersek hâlâ diğer önermelerin sayısına göre tablodaki değerler $4$ ya da $8$ olacaktır. Sadece ilave bir satır eklenir o kadar.

| **$p$** | **$q$** | **$r$** |               **$\neg p$**               |
| :-----: | :-----: | :-----: | :--------------------------------------: |
|  **1**  |    1    |    1    | <span style="color:darkred">**0**</span> |
|  **1**  |    1    |    0    | <span style="color:darkred">**0**</span> |
|  **1**  |    0    |    1    | <span style="color:darkred">**0**</span> |
|  **1**  |    0    |    0    | <span style="color:darkred">**0**</span> |
|  **0**  |    1    |    1    | <span style="color:darkred">**1**</span> |
|  **0**  |    1    |    0    | <span style="color:darkred">**1**</span> |
|  **0**  |    0    |    1    | <span style="color:darkred">**1**</span> |
|  **0**  |    0    |    0    | <span style="color:darkred">**1**</span> |

## [[Bileşik Önerme ve Bağlaçlar]] (Compound Propostion and Logical Operators)

- **[[Bileşik Önerme]]**: İki veya daha fazla önermenin bağlaçlar yardımıyla birleştirilmesiyle ortaya çıkan yeni önerme.

### a) [["VE" Bağlacı]] ($\land$) (AND)
- Yazılımda gördüğümüz `&&` operatörü esasında $\land$ bağlacıdır.

```csharp
int sayi = 1;

if(sayi%2 == 0 && sayi<10){
sayi+=1;
}
else{
sayi+=3
}
```

- Buradan da anlaşılacağı üzere, eğer `sayi`'nin 2 ile modu $0$ değerini veriyorsa **VE** `sayi` $10$'dan küçükse, bu koşul sağlandığı sürece `sayi` değişkenine $1$ ekliyor. Eğer bu koşulu sağlamıyorsa $3$ ekliyor.
- Yani **hem** `sayi`'nın 2 ile modu $0$ olmalı **hem de** 10'dan küçük olmalı. Doğruluk tablosunda $\land$ bağlacını şöyle gösterebiliriz:

| $p$ | $q$ | $p \land q$ |
| --- | --- | ----------- |
| $1$ | $1$ | $1$         |
| $1$ | $0$ | $0$         |
| $0$ | $1$ | $0$         |
| $0$ | $0$ | $0$         |

- Matematikçiler daha ziyade bunu çarpma işlemi olarak da ele alıyor. 0 etkisiz eleman olduğu için neyle çarparsan 0 gelecektir gibi bir mantık. Bu şekilde de anlaşılabilir tabii.

##### Associative Laws (Birleşme Kuralları)
> Aynı operatörler arasında gruplamanın önemi yoktur.

- $(p \lor q) \lor r \equiv p \lor (q \lor r)$  
- $(p \land q) \land r \equiv p \land (q \land r)$

#### Örnek 1:  $[\neg p \land (p \land q)] \land (\neg 0 \land p) \equiv ?$

##### $[\left(\neg p \land p) \land q\right] \land (1 \land p)$
##### $\space \space (0 \land q) \land (p)$
##### $\space \space \space \space 0 \land p \equiv 0$

### [["VEYA" Bağlacı]] ($\lor$) (OR)
- Yazılımda gördüğümüz `||` operatörüne karşılık gelir

```csharp
int sayi = 2;

while(sayi%2 == 0 || sayi%3==0){
sayi+=1;
}
```

- Eğer `sayi`'nin $2$ ile modu $0$'a eşitse **VEYA** `sayi`'nin $3$ ile modu $0$'a eşitse, sayıyı $1$ artırıyor. Yani ikisinden birini sağlaması yeterli. Olumsuz olduğu tek durum ikisinin de doğruluk değerinin $0$ olduğu durumdur.


| $p$ | $q$ | $p \lor q$ |
| --- | --- | ---------- |
| $1$ | $1$ | $1$        |
| $1$ | $0$ | $1$        |
| $0$ | $1$ | $1$        |
| $0$ | $0$ | $0$        |

- Matematikçiler bunu toplama işlemi olarak da ele alıyor tabii. 

#### Örnek: Aşağıda verilen önermelerin en sade hâlini yazınız.
##### A) $(p \lor 1) \land (q \lor \neg q)$
- $1 \land 1 \equiv 1$
	- Mantıken $(q \lor \neg q)$ önermesinin doğruluk değeri $1$ olacaktır.  
##### B) $(q \lor 0) \lor (\neg q \lor 1)$
- $q \lor 1 \equiv 1$
##### C) $(p \land \neg p) \lor (q \land 0)$
- $0 \lor 0 \equiv 0$

#### Örnek: $p \equiv \neg q \equiv r \equiv 0$ ise
##### $\left[(\neg p \land r) \lor (q \land \neg r) \right] \lor \left[(\neg p \land \neg r) \land \neg (\neg q) \right] \space \text{ ifadesinin en sade hâli nedir?}$

###### $\neg p \equiv q \equiv \neg r \equiv 1$

###### $\equiv [(1 \land 0) \lor (1 \land 1)] \lor [(1 \land 1) \land 1]$
- $\equiv (0 \lor 1) \lor (1) \equiv  1$
#### Örnek (<span style="color:darkred">Sınavda çıkabilir</span>): $\left[\neg (\neg p \land r) \land r\right] \lor \neg (\neg p \lor r) \equiv ?$
- $\equiv [(p \lor \neg r) \land r] \lor (p \land \neg r)$
	- $\equiv [(r \land \neg r) \lor (r \land p)] \lor (p \land \neg r)$
		- $\equiv (0 \lor r \land p) \lor (p \land \neg r) \equiv (r \land p) \lor (p \land \neg r)$
			- $\equiv p \land (r \lor \neg r) \equiv p \land 1 \equiv p$
#### [["YA DA" Bağlacı]] $(\oplus \space \text{   ya da }\space\space \veebar)$ (exclusive or)

| $p$ | $q$ | $p \veebar q$ |
| --- | --- | ------------- |
| 1   | 1   | 0             |
| 1   | 0   | 1             |
| 0   | 1   | 1             |
| 0   | 0   | 0             |

#### Örnek: $p \lor q \equiv 0 \space , \space q \lor r \equiv 1$ ise $(p \veebar \neg q) \land (\neg p \veebar r) \equiv ?$
- $p=0 \space , \space q=0 \space , \space r=1$
- $(0 \veebar 1) \land (1 \veebar 1) \equiv 1 \land 0 \equiv 0$
#### Örnek: $(p \lor \neg p) \veebar (q \land \neg q) \equiv =$
- $1 \veebar 0 \equiv 1$


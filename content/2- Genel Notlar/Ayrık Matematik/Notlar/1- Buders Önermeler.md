## Önermeler Matematiği
#### [[Doğruluk Değeri]] (Truth Value)
- Bir önerme ele aldığımızda, bu önerme ya doğrudur **(D/True) - 1** ya da yanlıştır **(Y/False) - 0**
- Önerme sayısına *n* dersek, $2^n$ tane doğruluk değeri ortaya çıkar.

#### Bir Önermenin Olumsuzu (Negation of a Proposition)
- $p:$ Türkiye'nin başkenti İstanbul'dur. (Yanlış) önerme $\to$ 0
 **Olumsuzu**: 
  - $\neg p:$ Türkiye'nin başkenti İstanbul değildir. (Doğru) önerme $\to$ 1


- Bir önermenin doğruluk değerini değiştirir. $\overline p, \space \space \neg p, \space \space  ~p,\space \space  p` \space$ şekillerinde gösterilebilir.

#### Açık Önerme (Open Proposition)
- Önermenin fonksiyon hâline getirilmiş biçimidir.
$$p, q, r,\space \dots \space\space\space \to \space\space\space p(x), q(x), r(x),\space \dots$$

$p(x): \space x+1<5$
	$p(1): 2<5$
		$p(1) \equiv 1$
	$p(5): 6<5$
		$p(5) \equiv 0$

---

##### Soru: $p(x): x+3<7$ önermesinin olumsuzu nedir?

###### $\space\space\space$$\neg p(x): x+3\ge7$

##### Bileşik Önerme (Compound Proposition) ve Bağlaçlar (Logical Operators)

**[[Bileşik Önerme]]**: İki veya daha fazla önermenin bağlaçlar yardımıyla birleştirilmesiyle ortaya çıkan yeni önerme.
<br><br>
##### [["VE" Bağlacı]] $(\land)$ (AND)
##### [["VEYA" Bağlacı]] $(\lor)$ (OR)

##### Dağılma Özellikleri
- $p\land (q\land r) \equiv (p\land q) \lor (p \land q)$
- $p \lor (q \land r) \equiv (p\lor q) \land (p \lor r)$
##### Parantezi Kaldırma
- $p \land (q \land r) \equiv p \land q \land r$
- $p \lor (q\lor r) \equiv p \lor q \lor r$
##### De Morgan Kuralları
- $\neg (\land) \equiv \lor \space\space\space\space\space\space \neg (\lor) \equiv \land$
- $\neg (p \lor q) \equiv \neg p \land \neg q$
- $\neg(p \land q) \equiv \neg p \lor \neg q$

###### Örnek: $(p \lor q) \land (p \land \neg q) \text{  ifadesinin en sade hâlini yazın.}$
- $p \lor (q \land \neg q)$
	- $p \lor 0 \equiv p$
###### Örnek: $p \lor (q \lor \neg p) \text{  ifadesinin en sade hâlini yazın.}$
- $p \lor q \lor \neg p$
	- $p \lor \neg p \lor q \equiv p \lor \neg p \lor q$
		- $p \lor \neg p \equiv 1$
			- $q \lor 1 \equiv 1$
###### Örnek: $p \lor (\neg q \land r) \text{  ifadesini olumsuzlayın.}$
- $\neg p \land (q \lor \neg r)$


##### [["İSE" Bağlacı ]] $(\implies)$ (if)
##### Karşıtı (Converse), Tersi (Inverse) ve Karşıt Tersi (Contrapositive)

$$p \implies q$$

###### Karşıtı:  $q \implies p \text { (önermeler yer değiştirir)}$ 
###### Tersi: $\neg p \implies \neg p \text{( İlgili önermenin olumsuzu değil, tersidir!!! İki önermenin de olumsuzu alınır.)}$
###### Karşıt Tersi: $\neg q \implies \neg p (\text{ İki önerme hem yer değiştirir hem de olumsuzu alınır.})$
- Karşıt tersi ile oluşturulmuş önermenin doğruluk değeri $p \implies q$'nun doğruluk değeri aynıdır.
- İspat yaparken $p \implies q$'yu ispat etmekte zorlandığımızda contrapositive yazarak ispatlama tekniği vardır. Karşıt tersini ispatlamak aynı zamanda kendisini ispatlamaktır.

##### [["ANCAK VE ANCAK" Bağlacı]] $(\iff)$ (if and only if)
##### [["YA DA" Bağlacı]] $(\oplus \space \text{   ya da }\space\space \veebar)$ (exclusive or)


---

- **[[Totoloji]] (Tautology)**: Sonucu $1$ çıkan bileşik önermelere denir.
- **[[Çelişki]] (Contradiction)**: Sonucu 0 çıkan bileşik önermelere denir.


---

#### Mantıksal Olarak Eşdeğer (Logically Equivalent)
- İki bileşik önermenin doğruluk değerleri *her koşul altında* aynı sonucu veriyorsa, bu iki bileşik önerme birbiriyle **mantıksal olarak eşdeğer** denir.

1. Doğruluk tablosu kullanımı ile tespit edilebilir (Truth Table).pk
2. Sadeleştirme yolu ile tespit edilebilir (Simplification).

---
#### Niceleyiciler
##### $\forall \text{: Her}$ $\space \space \space \exists \text{: Bazı}$
#### $\neg (\forall) \equiv \exists \space \space \space \neg (\exists) \equiv \forall$

##### $\text{Her } x \in \mathbb{R} \to \forall \space x  \in \mathbb{R}$
##### $\text{Bazı } x \in \mathbb{R} \to \exists \space x \in \mathbb{R}$
##### Örnek: <br>$\forall x \in \mathbb{N}, x<5$ <br>$\exists x \in \mathbb{R}, 2x-3=7$
- $\forall x \in \mathbb{N} \equiv 0$
- $\exists x \in \mathbb{R} \equiv 1$

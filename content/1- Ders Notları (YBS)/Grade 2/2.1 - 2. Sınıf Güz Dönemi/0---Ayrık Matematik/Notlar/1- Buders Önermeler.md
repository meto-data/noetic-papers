## Önermeler Matematiği
#### Doğruluk Değeri (Truth Value)
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
##### [["ANCAK VE ANCAK" Bağlacı]] $(\iff)$ (if and only if)
##### [["YA DA" Bağlacı]] $(\oplus \space \text{   ya da }\space\space \veebar)$ (exclusive or)
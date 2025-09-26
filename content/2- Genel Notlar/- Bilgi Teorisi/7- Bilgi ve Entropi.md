---
draft: true
---

#### Makine 1: Dengeli
- Adalet timsali makine... A, B, C, ve D harflerini basma olasılığı hepsinde eşit.
### $p(A) = p(B) = p(B) = p(D)$<br>
- Yani bir sonraki harfin ne geleceği konusunda hiçbir fikrin yok. Tam bir belirsizlik ortamı, her an her şey olabilir.

### Makine 2: Kaypak Kardeş
- Bu makine tam bir torpilci. 
	- **A** basma olasılığı: $p(A) = 0.50$ (Resmen A'ya yürüyor bu)
	- **B** basma olasılığı: $p(B) = 0.125$
	- **C** basma olasılığı: $p(C) = 0.125$
	- **D** basma olasılığı: $p(D) = 0.25$
- Muhtemelen A gelecek. Kıyak geçiyor çünkü A'ya.

## Ne ulan bu bilgi?

- Bilgi, bir sistem hakkındaki belirsizliği ortadan kaldıran şeydir. Bu belirsizliği ortadan kaldırma eylemi nicel olarak ölçülebilir.
- Bilgiyi "EVET/HAYIR" sorularıyla ölçeriz.
	- Bir olayın gerçekleştiğini öğrendiğimizde ne kadar "bilgi" edindiğimiz o olayın ne kadar "sürpriz" olduğuna bağlıdır.
<br>
- Bir sonraki harfi %100 bilmek için ortalama kaç tane "evet/hayır" sorusu sorman gerekiyorsa o sistemin entropisi de odur.

## Ne ulan bu entropi?
- Bir bilgi kaynağının sahip olduğu **ortalama belirsizlik veya öngörülemezlik miktarının** sayısal bir ölçüsü.
- Bir sonraki sembolün ne olacağını tahmin etmeye çalışırken sormamız gereken "evet/hayır" sorularının **ağırlıklı ortalamasıdır**. 
	- Bu ortalama her bir olası sonucun gerçekleşme olasılığı dikkate alınarak hesaplanır. 
- Sembolü **H** harfidir.
- Yani **entropi, bir bilgi kaynağından bir sembol gelmeden önce o sembolün ne olabileceğine dair sahip olduğumuz belirsizliğin genel bir ölçüsüdür.** Yüksek entropi = yüksek öngörülemezlik.
## Ne ulan bu bit?
- En temel belirsizlik birimidir.
- Shannon bu birimi tanımlarken mümkün olan en basit belirsizlik durumunu ele almıştır: **adil bir yazı tura atışı**. Yazı gelme olasılığı da %50, tura gelme olasılığı da %50'dir. İşte bu tek bir yazı tura atışının sonucundaki belirsizlik miktarı, tam olarak 1 bit olarak tanımlanmıştır.
## Makine 1
- 4 tane eşit olasılık var. En mantıklı soru ihtimalleri yarıya indirmektir, 2 soruda bu iş biter.
- Demek ki ortalama 2 soru gerekiyor. Sistemin entropisi, yani ürettiği bilgi/belirsizlik sembol başına **2 bit**.
### Makine 2
- Burada olasılıklar farklı olduğu için daha kurnaz davranacağız. Ortalamayı bulmak için gereken soru sayısını, o harfin gelme olasılığıyla çarpacağız ve toplayacağız.
	- **A** için 1 soru gerekiyor: $0.50 \times 1 \text{ soru} = 0.5$
	- **D** için 2 soru gerekiyor: $0.25 \times \text{2 soru} = 0.5$
	- **B** için 3 soru gerekiyor: $0.125 \times \text{3 soru} = 0.375$
	- **C** için 3 soru gerekiyor: $0.125 \times \text{3 soru} = 0.375$
	- **Toplam Ortalama Soru Sayısı:** $0.5+0.5+0.375+0.375 = 1.75$
- Bu makine için ortalama **1.75** soru yetiyor. Entropisi sembol başına **1.75 bit**.
- Yani, makine 2 daha az belirsizdir. Çünkü çıktısı daha tahmin edilebilir. Bu sebeple onu çözmek için daha az soruya, yani daha az bilgiye ihtiysacımız var. **Daha çok belirsizlik = Daha çok bilgi (entropi)**.

---

- Bu "ortalama soru sayısı" ya da "sekme sayısı" denilen mevhum aslında **entropi**nin ta kendisi. Bir sembolü bulmak için gereken sekme sayısı, o sembolün olasılığıyla *($p$)* ilişkilidir.
<br>
- Önce belirli bir seviyedeki **çıktı sayısı/mümkün olan sonuç sayısı *$(N)$* ile sekme sayısı *$(S)$*** arasındaki ilişkiyi yazalım. Her sekme olasılığı ikiye böldüğü için bu logaritmik bir ilişkidir:
### $$S = \log_{2}(N)$$
- Her soru ihtimali **ikiye bölüyorsa**, gereken **soru sayısı = sekme sayısı**dır.
- $N$ = Seçenek sayısı (örn. 4 harf: A,B,C,D)
- $S$ = Bu 4 harften birini bulmak için gereken evet/hayır sorusu.

<br>
- Her sembol eşit olasılıklıysa, **her biri** $\frac{1}{N}$ ihtimalle gelir. Bu durumda Shannon'ın entropi formülü şöyle olur:

## 1- Genel Entropi Formülü
#### $$H = -\sum_{i=1}^{N}p_{i} \cdot \log_{2}(p_{i}) \space \space = \space \space \sum_{i=1}^{N}p_{i}\cdot \log_{2}\left( \frac{1}{p_{i}} \right) $$
- Bu formül her türlü olasılık dağılımı için geçerlidir — eşit olsun veya olmasın fark etmez.
- $p_i$: Her sembolün (A, B, C, D...) olasılığı
- $N$: Farklı sembol sayısı (**örnek:** A, B, C, D varsa $N = 4$)
- $H$: **Entropi** (sistem başına ortalama bilgi miktarı)
- $i$: 1'den $N$'ye kadar giden sıra numarası
- $p_{i}$: $i$. sembolün olasılığı (örnek: $p_1 = p(A) = 0.25$) 
### Özel Durum: Eşit Olasılık Varsa

#### Adım 1 – Eşit Olasılık Varsayımı

- Eğer **her sembol eşit olasılıklıysa**, yani her sembolün olasığı aynıysa, her $i$ için $p_{i} = \frac{1}{N}$ olur.
#### Adım 2 – Yerine yaz:
##### $$H= -\sum_{i=1}^{N}\frac{1}{N}\cdot \log_{2} \left(\frac{1}{N}\right)$$
#### Adım 3 – Her terim aynı olduğundan sabiti dışarı al:
##### $$H = -\log_{2}\left( \frac{1}{N} \right) \cdot \sum_{i=1}^{N} \frac{1}{N}$$
### Adım 4 – Toplamı hesapla

$$ \text{Şimdi }  \space \sum_{i}^{N} \frac{1}{N} = 1 \space\text{ çünkü } N \space \text{ tane } \space\frac{1}{N}\space  \space \text{ var.} \space N \text{ tane } \space \frac{1}{N} \space\text{olduğundan:}$$

##### $$\sum_{i=1}^{N} \frac{1}{N} = \frac{N}{N} = 1$$
- Mesela $N=2$ için $2 \times \frac{1}{2} = 1$ olacaktır. Her işlem için aynı sonucu vereceğinden etkisiz eleman konumunda denilebilir. O yüzden bu ifadeyi denklemden kaldırabiliriz. 

#### Adım 5 – Denklemi nihayetine erdir:

##### $$H=- \log_{2}{\left(\frac{1}{N}\right)} = \log_{2}{\left(N\right)}$$
- Bu denklem aynı zamanda maksimum entropiyi de verir.
- **Maksimum entropi** = Bir sistemin taşıyabileceği en yüksek bilgi miktarıdır. Tüm seçenekler eşit şansa sahipse sistem zaten olabilecek en kaotik haldedir eşit olmadığı hallere kıyasen. Dolayısıyla:
#### $$H_{max} = \log_{2}\left(N\right)$$

**Bağlantı Linki**: **[Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference)**


**[AIStudio](https://aistudio.google.com)** üzerinden (AIStudio olması şart değil) **[[temperature]]** değerini 0 yapsanız bile aynı soruları sorduğunuzda ekseriyetle farklı cevaplar alacağınızı göreceksiniz. İlkin yukarıda sağlanılan temperature bağlantısına bir göz atın derim ve oradaki bağlantılara da, konuyu orada detaylıca elimden geldiğince anlatmaya çalıştım. Metin biraz kısa gözüküyor ancak aslında öyle değil. Bağlantıları aktif kullanmaya karar verdim artık, pek çok bilgi o bağlantıların içinde gizli, direkt olarak burada anlatmadım. Bağlantılar aracılığıyla hem alakalı olanları görmek hem de bağlamı anlamak daha kolay olacaktır diye düşünüyorum, o yüzden her iç bağlantı açılıp incelenmeli.

Makaleye göre esas sorun **[[floating-point sayıları]]**'nın toplama sırasında farklı sıralarda sonuç vermesi.<br>
- Matematikte: $(a+b) + c =  a + (b+c)$
- Bilgisayarda: $(a+b) +c$ *!=*  $a+ (b+c)$

Mesela: <br>
```python
(0.1 + 1e20) - 1e20  # sonuç 0
0.1 + (1e20 - 1e20)  # sonuç 0.1
``` 
<br>
Peki neden böyle? Bunun sebebi bilgisayarın sayıları sabit sayıda basamakla (hassas/precision) tutmasıdır. Çok büyük ve çok küçük sayıları toplarken bazı değerler yuvarlandığı için bilgi kayboluyor bir nevi.

##### Batch invariance, determinizm, non-determinizm
Makalede asıl sorun **[[batch invariance]]** eksikliği olarak tanımlanıyor. Aynı örnek farklı **[[Batch]]** boyutlarında işlendiğinde **[[kernel]]** farklı davranabiliyor. Özellikle GPU/TPU gibi paralel donanımlarda kritik burası. **[[batch invariance]]** kısmını ve oradaki bağlantıları didik didik edin örnek için. Özetle kullanıcı perspektifinde sunucunun yükü değiştikçe batch boyutu değişir, batch boyutu değiştikçe bize gelen sonuç değişir. Yani kısaca girdiyi modele verdiğimizde sonucu hesaplama süreci deterministik işliyor, ancak kullanıcı seviyesinde farklı zamanlarda farklı batch boyutlarıyla sunucuya istek gönderildiği için non-determinist/belirsiz olabiliyor. Başka bir ifadeyle farklı yanıt vermesinin sebebi sunucunun o anki yoğunluğunun rastgele olması ve bu yoğunluğun da sonucu değiştirmesidir.


[[yazı]]

# > en son batch invariance'de kaldım devam edecem.


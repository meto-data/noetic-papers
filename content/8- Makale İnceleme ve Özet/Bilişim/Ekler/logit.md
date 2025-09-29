Modelin normalize edilmemiş ham çıktı skorları. Bunlar olasılık değildir.

- Mesela diyelim ki;
	- yumurta $\to 2.3$
	- pizza $\to -0.7$ 
 

- **[[softmax fonksiyonu|Softmax]]** uygularsak:
	- $\text{yumurta: }e^{2.3} ≈ 9.97$
	- $\text{pizza: } e^{-0.7} ≈ 0.50$
	- $\text{Toplam: } 10.47$

**Olasılıklar**:
- Yumurta: $\frac{9.97}{10.47} ≈ 0,95$
- Pizza: $\frac{0.50}{10.47} ≈ 0,05$


- **Logit değerleri**: modelin ham tahmini. Yumurta diğerinden daha güçlü aday demek istiyor.
- **Softmax Sonrası**: Tahminler olasılığa çeviriliyor. %95 ihtimale yumurta %5 ihtimalle pizza diyecek denilebilir. Eğer temperature $0.1$ olsaydı yumurta neredeyse garanti olarak seçilirdi. Buna mukabil temperature 2 olsaydı %5 ihtimalli pizza bile fazlaca seçilebilirdi.
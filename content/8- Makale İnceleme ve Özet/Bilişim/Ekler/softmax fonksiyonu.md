$$p_i = \frac{e^{z_i}}{\sum_{j} e^{z_j}}$$

Bir vektör içerisindeki gerçek sayı değerlerini (misal **[[logit]]** değerleri) **olasılık dağılımına** çeviren bir fonksiyon. <br> <br>
Girdi olarak $(z_1, z_2, \dots , z_K)$ gibi değerler alır, çıktı olaraksa $(p_1, p_2, \dots , p_K)$ üretir.

$$p_i = \frac{e^{z_i}}{\sum_{j} e^{z_j}}$$
$z_i$: *i*. sınıfın/logit’in ham skoru <br>
$e^{z_i}$: üstel fonksiyon, büyük sayıları daha baskın hale getirir <br>
$\sum_{j} e^{z_j}$: normalizasyon sabiti, yani tüm olasılıkların toplamını 1 yapar.

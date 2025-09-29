Bir kerede işlenen örnek sayısı. Yani veri topluluğu veya kümesi. 

Örnekler:

```python
batch_size = 1  # GPU tek çekirdek ile işlem yapar
```

Tek örnek işliyorsak buna **online** işlem diyoruz.

```python
batch_size = 4  # 4 örnek aynı anda işleniyor
ornekler = [
    "Selamünaleyküm dünya", 
    "Önermenin olumsuzlaması", 
    "Makale incelemek güzel iş abi", 
    "logos mythos pathos doritos"
]
```

- GPU 4 çekirdeğe dağıtır ve paralel işler.
    

```python
batch_size = 32  # 32 örnek aynı anda işleniyor
```

- Batch ne kadar büyükse GPU'yu o kadar verimli kullanabiliriz ancak çok büyük batch belleği zorlayabilir. YZ sunucuları verimli olmak için kullanıcıların istekleri tek tek işlemez. Onları batch adı verilen gruplar hâlinde bir araya getirir ve hepsini tek seferde işler. YZ modellerinde kullanılan kerneller de batch boyutuna göre farklı çalışıyor.
    
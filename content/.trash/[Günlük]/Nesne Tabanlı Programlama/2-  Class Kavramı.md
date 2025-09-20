R1. OOP'de bir nesne oluşturabilmek için ilkin o objenin modellenmesi/tanımlanması gerekmektedir.
1. Bir objenin modelini/tanımını oluşturabilmek için class (sınıf) yapısı kullanılır.
2. Field, property, indexed, metodlar: 

- Class'lar bir referans türüdür.


# Sınıf Nerelerde Oluşturulur?
## 1- Namespace İçerisinde
- En yaygın kullanım şeklidir (%99.9)
- Bir `namespace` bloğunun içinde tanımlanır.
- Aynı `namespace` içindeki diğer sınıflar tarafından doğrudan, farklı `namespace`'lerdeki sınıflar tarafından ise `namespace` adı belirtilerek veya `using` direktifi ile erişilebilir.

```csharp
namespace BenimProjem
{
    class MyClass { } // Namespace içinde
}
```
## 2- Namespace Dışarısında
- Bir sınıf, herhangi bir `namespace` bloğunun dışında, dosyanın en üst seviyesinde de tanımlanabilir.
- Bu durumda sınıf, global `namespace`'e ait olur ve her yerden doğrudan ismiyle erişilebilir.
- Çok nadir kullanılır.
```csharp
using System; // using direktifleri en üstte

class MyClass2 { } // Namespace dışında

namespace BenimProjem
{
    // ...
}
```
## 3- Class İçerisinde (Nested Type -İç İçe Sınıflar)
- Bir sınıf, başka bir sınıfın içinde de tanımlanabilir. Buna "Nested Type" veya "İç İçe Sınıf" denir.
- İçteki sınıf, dıştaki sınıfa mantıksal olarak bağlı olduğunda veya sadece dıştaki sınıf tarafıdnan kullanılacaksa tercih edilebilir.

> [!important] Önemli
> Bir sınıf tanımlamasında, tanımlandığı yerde (aynı `namepsace` içinde, aynı `namespace` dışında global alanda veya aynı dış `class` içinde) **aynı isimde birden fazla `class` tanımlanamaz.**


```csharp
class DisSinif
{
    class IcSinif // Nested Type
    {

    }
}
```


# Sınıf ile Nesne Modeli Tasarlama
- **Nesnenin İhtiyaç Duyduğu Yapılar:** Bir sınıfı tasarlarken, o sınıftan üretilecek nesnelerin hangi verilere (fields/properties) ve hangi davranışlara (methods) sahip olacağını belirtiriz.

```csharp
class OrnekModel
{
    // Fields (Alanlar - Nesnenin verilerini tutar)
    int a;
    int b;

    // Method (Davranış - Nesnenin yapabileceği bir eylem)
    public void X()
    // Method (Davranış - Başka bir eylem, değer döndüren)
    public int Y()
    {
        return a * b; // Alanları kullanarak bir hesaplama yapar
    }
}
```


- OrnekModel sınıfından bir nesne üretildiğinde (örneğin `nesne1`), bu `nesne1`'in kendine ait a ve b değerleri olur.
- `nesne1.a = 5;` `nesne1.b = 10;` gibi değerler atanabilir.
- `nesne1.X()` çağrıldığında, `nesne1`'in a ve b değerleri kullanılır.
- `nesne1.Y()` çağrıldığında, yine `nesne1`'in a ve b değerleri ile işlem yapılır.
	- Başka bir nesne (`nesne2`) üretilirse, onun da kendi a ve b değerleri olur (örneğin `nesne2.a = 20;` `nesne2.b = 2;`).

# Sınıf Modelinden Referans Noktası Oluşturma

### Bellek Yapısı (Stack ve Heap)
- **[[Stack]]**, değişkenlerin (ve değer türlerinin değerlerinin) ve referansların (adreslerin) tutulduğu bellek gövdesidir. Hızlı erişim için kullanılır.
- **[[Heap]]**, nesnelerin kendilerinin (yani sınıf modellerinden üretilen somut örneklerin) tutulduğud daha büyük bellek bölgesidir.
### Referans Noktası Nedir?
- Heap'te oluşturulan bir nesneye erişebilmek için Stack'te o nesnenin adreasini tutan bir değişkene ihtiyaç vardır. Bu değişkene **referans noktası** (veya kısaca referans) denir.
- Bir sınıf tanımlandığında, o sınıfın adı aynı zamanda bir **referans türü** hâline gelir.
### Referans Noktası Oluşturma

```csharp

class OrnekModel
{
(...)
}
Ornekmodel w; // Stack'te 'w' adında bir referans noktası oluşturuyor
//w şimdilik herhangi bir nesneyi işaret etmiyor, yani (null değere sahip).
```

- Yukarıdaki işlem, `OrnekModel` türünden bir nesneyi işaret edebilecek `w` adında bir referans oluşturuyor.
- Başlangıçta `w`, herhangi bir nesneyi işaret etmediği için değeri `null` olur. 

### Referans ve Nesne Ayrımı
- `Ornekmodel w;` ifadesi sadece bir <u>referans noktası</u> oluşturur, **nesne oluşturmaz**.
- Nesne oluşturma işlemi (genellikle `new` anahtar kelimesi ile yapılır) ayrı bir adımdır ve bu işlem sonrasında heap'te bir **nesne örneği** yaratılır ve adresi <u>referans noktası</u>na atanır. 
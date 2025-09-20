Yapay Zekâ -> Makine Öğrenmesi -> Derin Öğrenme -> GenerativeAI

- İlkin hiyerarşiyi şöyle belirliyoruz: Yapay Zekâ hepsini kaplayan bir küme olmak üzere sırasıyla makine öğrenmesini, makine öğrenmesi derin öğrenmeyi, derin öğrenme de üretken yapay zekâ'yı kapsamaktadır.

Makine öğrenmesi algoritmaları: Veriye bakıp veriden kurallar çıkartan sistemler.

Derin Öğrenme: Yapay sinir ağlarının biraz daha gelişmişi, karmaşık yapay sinir ağları. Üretken yapay zekâ bunun özel bir hâlidir.

Genel tanımı bu olsa bile üretken yapay zekâya insan müdahalesi olmadan kendi öğrendiği kurallar kendi çıkarttığı kurallarla üreten her şeyde verilebilecek bir isimdir. Bugün tanım böyledir ancak yarın farklı olabilir...

Yarın genai tanımını birileri yaptığında yz'deki ml algoritmalarını kullanmadan, yapay sinir ağı vs. kullanmadan da üretim tekniği geliştirebilirse -ki çalışmalar var- o da yz'nin altında yine genai olarak geçecek.


Generator (Üreteç)? Discriminative (Eleştirmen-Ayrıştırıcı-Eleyici)?

Generator sürekli bir şeyler üretmeye çalışır. Discriminative ise sürekli iyi değil, güzel değil şeklinde bir eleme/eleştiri/ayrıştırma yapmakta. Discriminative'in amacı gerçeğe yakın olmasını sağlamak. Benim ürettiğim/seçtiğim/beğendiğim bu sonuç gerçeğe yakın mı değil mi, amacı bu. Generator'un gerçeğe yakınlıkla ilgili bir fikri yok, yalnızca bildiği kadar üretiyor, üretmekten sorumlu. G'nin ürettiği içerik D ile ayrıştırılır. Rekabet içerisindedirler, genAI böyle ortaya çıkmakta.

Biz bir resim üretmeye çalıştığımızda o resmi üretmeye çalışan bir G var. Bir sürü farklı gerçek algısı olduğu için hepsine benzetmeye çalışır G. D ise bunları eleyerek seçim yapıyor, döngü hâlinde. Bunun sonucunda genai ortaya çıkıyor.

#### Multi Modal
Üretken zekâ yapısal olmayan verilerde güçlüdür. Unstructured data.  :
- Metin Üretimi
- Görsel Üretimi (Imagen4, DALL-E, Midjourney, Sora vb.)
- Ses Üretimi (Ses klonlama, TTS)
- Video Üretimi (Veo3, Runway)

#### Makine Öğrenmesi
- Klasik modellemede bizim girdilerimiz veri ve el yapımı modeldir. Bunlar bilgisayarda işlenir ve sonuç verir. Kural seti denilebilir. Misal bir şirkette herkese %10 zam yapılması lazım. İlk kişiyi artırıp yazar ikinciyi artırıp yazar... Klasik bir süreç ve kural setidir bu.
- Makine öğrenmesi ise bu kuralları çıkartan sistemdir. Elimizde veriler ve beklenen sonuç verdir, ona göre makine öğrenmesinin bir karar vermesini bekleriz. Misal şirketimizin %10 büyümesini istiyor, %10 büyümesi için nasıl aksiyonlar almamız ve neler yapmamız gerekir? Şirket verisi üstünden bunlar çıkarsanır. Bu kurallar çıkartırıp model oluşturulunca o model üzerinden tahminler de yapılabilir. Nasıl ki biz 190 boyunca 110 kilo birisini düşününce kafamızda bir şeyler canlanıyorsa, bu canlanan üzerinden tahminler yapabiliyorsak makine öğrenmesi de benzer şekilde bunu gerçekleştirebilir. Yeni veri ve model ile.
![[Pasted image 20250831180244.png]]

Derin öğrenmede ise bir girdi var. Bir resim diyelim. Bu resmi yapay sinir ağına koyduğumuzda bu kişinin ismi "Metin" dersek bunu öğrenir. Bu öğrenme üstünden onun birsürü resmini de verdiğimide arkadaki ilişki ağı (mesela gözler arasındaki mesafenin buruna oranı, kaşların uzaklığı ve çenesinin konumu arasındaki mesafe gibi...) bir şeyler hesaplar ve bununla ilgili veri üretir. Bu veriyi de bir kural olarak öğrenir ve sonrasında bu resme benzer başka bir resim verdiğimizde ve kişinin ismini sorduğumuzda onun ismini döndürebilecek bir yapıya ulaşıyor.

Bu sırada yapay sinir ağlarının da genai'lerin de inputu olarak çok sayıda resim ve çok sayıda etiketleme alması gerekmekte. YBS okuyan ve felsefe denemeleri yazan bir erkek üret denildiğinde daha önce etiketli olarak almış olduğu verilerden bir şeyler üretiyor. Resimden etikete giden yol bu sefer etiketten resme gider.
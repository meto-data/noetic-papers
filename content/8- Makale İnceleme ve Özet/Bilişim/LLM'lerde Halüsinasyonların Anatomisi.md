- **Halüsinasyonlar**: Dil modellerinin ürettiği, temelinde birer hata olan ancak yüzeysel olarak inandrııcı görünen ifadelerdir. İlgili hatalar dil modellerinin eğitim verileri, dış gerçeklikle çelişen (dışsal halüsinasyonlar) ya da kullanıcının istemiyle çelişen (içsel halüsinasyonlar) olası yanlışlıklar olarak tanımlanıyor.
##### Dışsal Halüsinasyonlar (Extrinsic Hallucinations)
- Dil modelinin **eğitim verileriyle veya dış gerçeklikle çelişen** bilgiler üretmesi. Model kendi öğrendiği bilgilerle veya genel olarak kabul görmüş gerçeklerle uyumsuz, ancak yine de inandırıcı görünen ifadeler ortaya koyar. 	
- Söz gelişi, Adam Kalai'nin doktora tezinin başlığı neydi sorusuna ChatGPT, DeepSeek, Gemma, Llama gibi modeller, farklı ve hepsi yanlış olan tez başlıkları ve yıllar üretmiştir.
##### İçsel Halüsinasyonlar (Intrinsic Hallucinations)
- Dil modelinin **kullanıcı istemiyle (prompt)** **çelişen** bilgiler üretmesidir. Kullanıcının doğrudan sorduğu veya talep ettiği şeyin aksine kendi içinde tutarsız ve hatalı bir çıktı verir.
- Söz gelişi, "DEEPSEEK" kelimesinde kaç tane D harfi var sorusuna DeepSeek-V3 "2" veya "3" gibi yanlış yanıtlar vermiştir. 

Temel sorun modellerin belirsizlik durumunda "bilmiyorum" demek yerine istatistiksel olarak en olası görünen yanıtı tahmin etmeye programlanmış olmasıdır.

### **Bölüm 1:** Halüsinasyonların Kökeni – Ön Eğitim (Pre-training)

- Halüsinasyonların temeli modellerin devasa veri setleri üzerinden dilin istatistiksel yapısını öğrendiği ön eğitim aşamasında atılır. Eğitim verisi tamamen hatasız olsa bile optimizasyon sürecinin kendisi hata üretmeye eğilimlidir.

#### **1.1.** Ön Eğitimin Amacı ve Temel Mekanizma
- Ön eğitimin temel hedefi dilin olasılık dağılımını $(p)$ öğrenerek $(p̂)$ adında bir model dağılımı oluşturmaktır. Bu genellikle **[[çapraz entropi kaybı]]nı (cross-entropy loss) minimize etmek** gibi istatistiksel bir amaçla yapılır. Bu süreç modelin bir ifadenin doğruluğuna dair verdiği olasılık tahmininin (güveninin) o ifadenin gerçekte doğru olma sıklığıyla eşleşmesi anlamına gelen **kalibrasyona (calibration)** yol açar. İyi eğitilmiş bir temel model doğası gereği kalibre olur.

#### **1.2.** Teknik Çerçeve: "Is-It-Valid" (IIV) İndirgemesi
- İlgili makalenin merkezî teknik argümanı üretim probleminin zorluğunu daha basit olan ikili sınıflandırma (binary classification) problemine indirgemek.
- **IIV Problemi:** "Bu ifade geçerli mi?" (+/-) sorusunu cevaplayan bir sınıflandırıcıdır. Eğitim verileri yanıtların geçerli (+) veya hatalı (-) olarak etiketlendiği çok sayıda örnekten oluşur. 
- Dil modelleri çoğu zaman doğruluk veya başarı oranı gibi doğru-yanlış ikilemine dayalı ikili metriklerle değerlendirilir. Bu derecelendirmede belirsizlik göstermek veya yanıtı boş bırakmak alt-optimal sayılır (optimumun altında kalan, en iyi olmayan) ve “bilmiyorum” türü yanıtlar cezalandırılır. Modelin puanı aşırı özgüvenli bir “en iyi tahmini” vermesiyle maksimize edilir.
- **İlişki:** Modelin üretimdeki hata oranı, IIV sınıflandırmasındaki hata oranından daha düşük olamaz. Matematiksel olarak `(üretim hatası) ≥ 2 * (IIV hatası)`. Bu ifade bir konsepti sınıflandırmak zorsa, o konsept hakkında doğru metin üretmenin kaçınılmaz olarak daha da zor olduğu anlamına gelir.
#### **1.3.** Ön Eğitimdeki Hata Faktörleri

- **Epistemik Belirsizlik**: Doğum günleri gibi altında öğrenilebilir bir desen olmayan keyfî gerçekler yüksek bir IIV hata oranına neden olur. Model bu bilgileri ezberlemek zorundadır. Eğitim verilerinde yalnızca bir kez görünen (singleton) bir gerçek istatistiksel olarak gürültüden farksızdır ve modelin bu konuda halüsinasyon görme olasılığı yüksektir.
- **Kötü Modeller**: Model mimarisinin öğrenilmeye çalışılan kavramı temsil etmek için yetersiz olmasıdır (misal trigram modellerinin uzun vadeli dilbilgisi bağımlılıklarını yakalayamaması). Bu durum model ailesinin optimal hata oranını $(\space opt(G)\space)$ yükseltir ve kaçınılmaz olarak üretim hatalarına yol açar.
- **Dağılım Kayması (Distribution Shift)**: Model, eğitimde gördüğü veri dağılımının dışında (Out-of-Distribution, [[OOD]]) bir istemle karşılaştığında performansı düşer. BU da IIV sınıflandırıcısının yeni ve beklenmedik durumlarda hata yapmasına neden olur, bu da doğrudan halüsinasyon olarak yansır.
	-  OOD, modelin eğitimde görmediği veya çok nadir gördüğü veri türü demek.  Yani model öğrenirken gördüğü veri dağılımının dışında bir örnekle karşılaştığında performansı düşer, hatalı yanıt verebilir.
- **GIGO (Garbage In, Garbage Out)**: Büyük veri setleri genellikle çok sayıda olgusal hata içerir. Kalitesiz veya hatalı veriyle eğitilen sistemlerin kaçınılmaz olarak hatalı veya değersiz çıktılar üretmesi durumudur.
- **Hesaplama Zorluğu**: Kriptografik bir şifreyi çözmek gibi hesaplama açısından zor problemler modelin doğru yanıtı bulmasını engeller.

### **Bölüm 2:** Halüsinasyonların Kalıcılığı - Değerlendirme ve Teşvik Mekanizmaları

- Ön eğitim hatalarının kökenini açıklarken bu hataların neden eğitim sonrası (post-training) aşamada devam ettiği ve hatta pekiştirildiği sorusu **sosyo-teknik** bir problemdir. Sorun modellerin yeteneklerinde değil, onları değerlendiren teşvik yapısındadır.

#### **2.1.** İkili Değerlendirme Problemi
- Mevcut dil modeli değerlendirmelerinin (benchmark) büyük çoğunluğu **ikili (binary) bir derecelendirme mantığına dayanır**:
	- Doğru cevap: $+1$ puan.
	- Yanlış cevap veya "Bilmiyorum" (abstention): $0$ puan
#### **2.2.** Rasyonel Davranış Olarak Halüsinasyon
- Bu puanlama sistemi altında, bir model rasyonel bir ajan gibi davranarak beklenen puanını maksimize etmeye çalışır. 
	- "Bilmiyorum" demek garanti $0$ puan anlamıne geldiği için, emin olunmasa bile bir tahminde bulunmanın beklenen değeri, doğru olma olasılığı sıfırdan büyük olduğu sürece her zaman sıfırdan büyüktür. 
- Bu nedenle belirsizliği kabul etmek **alt-optimal (sub-optimal)** bir stratejidir. Model en yüksek puanı almak için sürekli sınav çözme modunda kalır ve en olası tahmini üreterek bir nevi kumar oynar.. Bu durum aşırı özgüvenli ve yanlış ifadelerin üretilmesini doğrudan teşvik eder.

### Çözüm?
- Çözüm sosyo-teknik bir çözüm. Tüm yapay zekâ camiasının değerlendirme sistemini kökünden değiştirmesi gerekiyor. MMLU, GPQA gibi popüler benchmarkların kuralları değiştirilmeli. Yanlış cevaplara negatif puan verilmeli, istemler modele hangi güven seviyesinin üzerinde cevap vermesi gerektiğini açıkça belirteli (örn: yanlış cevap -3 puan olduğu için yalnızca %75'ten fazla eminsen cevap ver gibi).
- Bu değişiklik modelleri basit doğruluk maksimizasyonundan risk-ayarlı bir karar verme sürecine yönlendirecektir. Bu da **davranışsal kalibrasyon (behavioral calibration)** olarak adlandırılır ve modelleri bilmediklerini dürüstçe kabul etmeye teşvik ederek daha güvenilir sistemlerin önünü açar.


##### **Kaynakça**

Kalai, A. T., Nachum, O., Vempala, S. S. ve Zhang, E. (2025). Why language models hallucinate. _arXiv preprint arXiv:2509.04664_.


### **1. Asıl Sorun: HTTP ile Gerçek Zamanlı İletişim Yapmaya Çalışmak**

- İlkin Websocket'in neden var olduğunu anlayabilmek için ondan öncesini irdeleyelim. Bir kere HTTP tek yönlü çalışır; istemci sunucuya sorar, sunucu yanıt verir. Ammâ bazı uygulamalar var ki -sohbet, canlı skor, bildirim vn.
- Gerçek zamanlı iletişim için HTTP protokolünün tek başına yetersiz kaldığını biliyoruz. Zaten bu yüzden "polling" (sorgulama) denilen yöntemler kullanılıyor.

#### 1- [[Short Polling]] (Kısa Sorgulama)
- **Mantık:** İstemci (client), sunucuya (server) belirli aralıklarla (örn: her saniye, milisaniye vb.) "Yeni bir veri var mı?" diye sürekli bir istek gönderir.
- **Diyagram:** İstemciden/Tarayıcı (client), sunucuya sürekli giden `GET / updates` istekleri ve sunucudan dönen (çoğunlukla boş olan) `response (200 OK)` yanıtları.
- **Dezavantajları:**
	1. Her istek için yeni bir bağlantı oluşturmak gereksiz yük.
	2. Real-time değildir, zira en iyi ihtimalle sorgulama aralığı kadar gecikme olur.
#### 2- [[Long Polling]] (Uzun Sorgulama)
- **Mantık:** İstemci, sunucuya bir istek gönderir. Sunucu, yeni bir veri gelene kadar bu isteği bekletir (askıya alır). Veri geldiği anda yanıt gönderir ve bağlantıyı kapatır. İstemci yanıtı alır almaz hemen yeni bir istek gönderir.
- **Diyagram:** İstemcinin isteği gönderdiği, sunucunun bu isteği bir süre beklettiği (`request suspend`) ve yeni bir olay(`some data event`) olduğunda yanıt verdiği diyagram işte.
- **Dezavantajları:** Short Polling'e göre daha iyi olsa da hâlâ mükemmel değildir. Sunucuda bekleyen istekler kaynak tüketir ve karmaşık bir yapıya sahiptir.


> Bu kısımdan sonrasına daha başlanılmadı.
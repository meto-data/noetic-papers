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


> Bu kısımdan sonrasına daha başlanılmadı. YZ notları bunlar:
### **2. Çözüm: WebSocket! (Asıl Mesele)**

İşte bu verimsizliği çözmek için WebSocket devreye giriyor. Olay şöyle işliyormuş:

- **El Sıkışma (Handshake):** Bu kısım çok havalı. İş bildiğin normal bir HTTP isteğiyle başlıyor.
    
    1. **Client:** Sunucuya içinde Connection: Upgrade başlığı olan özel bir GET isteği atıyor. Yani diyor ki, "Kanka, normal konuşmayı bırakalım, WebSocket'e geçelim mi?"
        
    2. **Server:** "Olur, bana uyar" derse, 101 Switching Protocols yanıtını dönüyor.
        
- **Tünel Açılıyor (DataFrame / Full-Duplex):**
    
    - Bu el sıkışma tamamlandıktan sonra, HTTP devreden çıkıyor ve aralarında kalıcı, **çift yönlü bir iletişim kanalı (tünel)** açılıyor.
        
    - Artık ne client'ın sürekli bir şey sormasına ne de server'ın isteği bekletmesine gerek var. İkisi de bu tünel üzerinden istedikleri zaman birbirlerine veri yollayabiliyorlar. Tamamen eş zamanlı!
        

**Kısacası WebSocket'in Güzellikleri:**

- Tek bir bağlantı kuruluyor, sürekli aç/kapa derdi yok.
    
- **Gerçekten** gerçek zamanlı iletişim sağlıyor. Gecikme minimum.
    
- Gereksiz istekler olmadığı için bant genişliğini (bandwidth) çok verimli kullanıyor.
    
- Çok daha ölçeklenebilir (scalable).
    

#### **3. Peki Her Yerde Kullanmalı mıyım? (Hayır!)**

Her teknoloji gibi bu da sihirli değnek değil. Eğer yaptığım projede **gerçek zamanlı bir iletişim ihtiyacı yoksa** WebSocket kullanmak kodu gereksiz yere karmaşıklaştırabilir. Düşük trafikli, nadiren güncellenen bir şey için normal HTTP yeterli.

#### **4. Demodan Aklımda Kalanlar (Ortak Çizim Tahtası)**

Bu demo, konuyu tam olarak anlamamı sağladı:

1. İki farklı tarayıcı açtık, ikisi de server'a bağlandı ve server ikisine de farklı birer renk atadı (biri yeşil, diğeri mor).
    
2. **Mor olan** bir çizgi çizdiğinde, bu çizim verilerini (draw olayı) server'a **yayınladı (emit)**.
    
3. **Server**, bu draw olayını aldı ve kendisine bağlı olan **yeşil olana da gönderdi (broadcast)**.
    
4. **Yeşil olan**, server'ı dinlediği için (on) gelen bu çizim verisini aldı ve kendi ekranına mor çizgiyi çizdi.
    
5. Aynı şey yeşil çizim yaptığında mor için de geçerli oldu. İşte bu kadar!
    

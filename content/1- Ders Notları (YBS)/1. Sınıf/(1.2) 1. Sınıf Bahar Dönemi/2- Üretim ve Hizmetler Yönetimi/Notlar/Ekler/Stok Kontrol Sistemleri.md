## [[Sürekli Gözden Geçirme Sistemleri]] (Continuous Review Systems)
- **İzleme:** Stok seviyeleri sürekli (anlık) olarak, her stok hareketi (giriş, çıkış, satış vb.) kaydedilerek takip edilir. Genellikle teknolojik sistemler (barkod, [[RFID (Radio Frequency Identification)]] vb.) kullanılır.
- **Sipariş Ne Zaman Verilir?** Stok miktarı, önceden belirlenmiş kritik bir seviye olan Yeniden Sipariş Noktası (Reorder Point - ROP)'na düştüğü anda sipariş tetiklenir.
- **Ne Kadar Sipariş Verilir?** Sipariş miktarı genellikle önceden belirlenmiş sabit bir miktardır (örn: Ekonomik Sipariş Miktarı). Bu nedenle "Sabit Miktar Sistemi" (Q-Sistemi) olarak da bilinir.

##### **[[Yeniden Sipariş Noktası]]** 
- Stok yenileme ihtiyacını belirlemek için kullanılan stok seviyesidir. Stok yeniden sipariş noktasına ulaştığında, satıcı ikmal için tedarikçiye yeni satın alma siparişleri verebilir

> [!warning] Uyarı
>  Eldeki stoğun, **"Dikkat! Yeni sipariş verme zamanı geldi, yoksa mal bitecek!"** alarmını çaldığı **miktar seviyesidir.**

## [[Periyodik Gözden Geçirme Sistemi]] (Periodic Review System)
- **İzleme:** Stok seviyeleri belirli, sabit zaman aralıklarında (örn: her hafta Cuma günü, her ayın 1'i gibi) kontrol edilir veya sayılır.
- **Sipariş Ne Zaman Verilir?** Siparişler her zaman bu belirli gözden geçirme anlarında verilir. Stok seviyesinin belirli bir noktanın altına düşüp düşmediğine bakılır.
- **Ne Kadar Sipariş Verilir?** Sipariş miktarı değişkendir. Amaç, mevcut stok seviyesini, önceden belirlenmiş bir Hedef Stok Seviyesi (Order-Up-To Level)'ne tamamlayacak kadar sipariş vermektir. Bu nedenle "Sabit Periyot Sistemi" (P-Sistemi) olarak da bilinir.


| **Özellik**      | **Sürekli Gözden Geçirme (Q)**          | **Periyodik Gözden Geçirme (P)**   |
| ---------------- | --------------------------------------- | ---------------------------------- |
| **Kontrol**      | Anlık, her işlemde                      | Belirli aralıklarla                |
| **Sipariş Anı**  | Stok Yeniden Sipariş Noktası'na düşünce | Sabit periyot sonunda              |
| **Sipariş Mik.** | Sabit                                   | Değişken (Hedef seviyeye tamamlar) |

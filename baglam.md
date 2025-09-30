Konuşma Özeti
Başlangıç: Maceramız quartz.config.ts dosyasını yapılandırmakla başladı. Site başlığını "🧠 Veri İmparatorluğu" olarak değiştirdik, Google Analytics etiketini ekledik, site adresini (noetic-papers.vercel.app) belirledik ve eklenti (plugin) listesini daha sade ve işlevsel hâle getirdik.
Tema ve Özelleştirme:
İlk başta, config dosyası üzerinden manuel olarak seçilebilen birkaç statik renk paleti ekledik.
Bu özelliği bir adım ileri taşıyarak, kullanıcıların site üzerinden interaktif olarak tema seçebileceği bir ayarlar menüsü geliştirdik. Bu menü, karanlık mod düğmesinin yanına modern bir dişli (⚙️) ikonu olarak yerleştirildi.
Kullanıcıların seçtiği tema, yazı tipi ve yazı tipi boyutu gibi ayarlar, tarayıcının yerel hafızasında (localStorage) saklanarak site içi gezintilerde ve sonraki ziyaretlerde kalıcı olması sağlandı.
GitHub, Obsidian, Nord gibi popüler temalardan esinlenerek 18'den fazla renk paleti ekledik.
Hata Giderme ve Geliştirmeler:
Kritik Hata: Sitedeki tüm interaktif öğelerin (gezgin, grafik görünümü, tema seçimi) aniden çalışmayı durdurduğu büyük bir sorun yaşadık. Sorunun settings.inline.ts dosyasındaki bir kodlama hatasından kaynaklandığını tespit edip düzelterek sitenin işlevselliğini geri kazandırdık.
Font Boyutu: Yazı tipi boyutu ayarının sadece paragrafları değil, aynı zamanda linkleri ve sol paneldeki klasör isimlerini de etkilemesini sağladık.
Grafik Görünümü: Performans optimizasyonu talebin üzerine, grafik görünümündeki 300 düğüm limitini kaldırdık.
İptal Edilen Özellikler:
Otomatik Sözlük (Glossary): Notlardan terimleri otomatik olarak çekip bir sözlük sayfası oluşturan bir özellik denedik. Ancak beklendiği gibi otomatik çalışmayınca talebin üzerine bu özelliği tamamen kaldırdık.
Odak Modu: Sayfa genişliğini ayarlama ve bir "odak modu" ekleme denemesi yaptık, fakat beğenilmeyince hemen geri aldık.
Mevcut Geliştirme: Dosya Ağacı (Tree View):
İstek: Ayarlar ikonu yanına eklenecek bir butonla açılacak, Linux'taki tree komutuna benzer bir dosya ve klasör ağacı görünümü istedin. Bu görünümün Ekler, Görseller gibi belirli klasörleri hariç tutması ve istatistik (X klasör, Y dosya) göstermesi gerekiyordu.
İlk Hata ve Çözümü: Özellik ilk başta "0 klasör 0 dosya" hatası verdi. Bunu, sistemdeki tüm dosyaların listesini içeren window.contentIndex verisini doğru okuyacak şekilde düzelttim.
Son Geliştirmeler (Şu anki durum):
Alt Dosya Sayısı: Hariç tutulan klasörlerin (Ekler vb.) içindeki dosya sayısını ayrıca sayıp "Alt Dosya" olarak gösterdik.
Detaylı Bakış: Ağaç görünümüne "Detaylı Bakış" butonu ve "Derinlik" seçici ekledik. Bu özellik, notların klasörlere göre dağılımını, her notun kelime sayısını hesaba katarak yüzdesel olarak gösteriyor. Böylece, az ama içerik dolu notların olduğu klasörlerin önemi daha doğru yansıtılıyor. Bu dağılım, seçilen derinliğe göre gruplanarak çubuk grafiklerle sunuluyor.
Oluşturulan/Değiştirilen Dosyalar:
quartz/components/FileTree.tsx: Özelliğin arayüzünü (modal, butonlar) içeren React bileşeni.
quartz/components/scripts/filetree.inline.ts: Tüm mantığın çalıştığı JavaScript dosyası. Ağacı oluşturur, istatistikleri hesaplar ve kelime ağırlıklı detaylı analizi yapar.
quartz/components/styles/filetree.scss: Modal, ağaç görünümü ve detaylı bakış grafiklerinin tüm CSS stilleri.
quartz.layout.ts ve quartz/components/index.ts: Yeni bileşeni siteye entegre etmek için güncellendi.
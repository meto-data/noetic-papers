**`-r` / `--recursive`**: Alt dizinlerde de arama yapar, tüm klasörlerde dosyaları tarar. <br>
grep --o(nly-matching)<br>


`-h` / `--no-filename`: Bulunan satırları yazdırırken dosya adını göstermez. Sadece satır metni çıkar. <br>

`-l` / `--files-with-matches`: İçinde aranan desen geçen dosya adlarını listeler (satırları değil).<br>
`-i` / `--ignore-case`: Büyük-küçük harf farkını yok sayar.<br>

`-v` / `--invert-match`: Aranan desenin **olmayan** satırlarını gösterir. <br>
`-n` / `--line-number`: Bulunan satırların başında satır numarasını yazdırır.<br>

`--include="PATTERN"`: Recursive aramada sadece isimleri "**PATTERN**" ile eşleyen dosyalarda ara.<br>
`--exclude="PATTERN"`: Recursive aramalarda isimleri "**PATTERN**" ile eşleşen dosyaları atla.<br>
`-c` / `--count`: Aranan desenin kaç kere geçtiğini dosya bazında sayar, satır satır göstermez.<br>
`-E` / `--extended-regexp`: Regex gücünü aşar. Misal, **`+`, `?`, `{}`** gibi geklişmiş regex özelliklerini kullanmaya izin verir.
	Söz gelişi, `greğ -E "a+b"` $\to$ a'nın 1 veya daha fazla kez tekrarını arar, sonra b.<br>
`-F` / `--fixed-strings`: Regex'i kapatır, düz metin arar. Misal, (`.`,`*`,`+`) gibi özel karakterler sadece harf gibi davranır.
	Söz gelişi, **`grep -F "a+b"`** $\to$ tam olarak "a+b" metnini arar, regex olarak değil. 


## Regex Komutları


```bash
grep -E "^error" file.txt
```
➡️ `error` ile **başlayan** satırlar

---

```bash
grep -E "jpg$" file.txt
```
➡️ `jpg` ile **biten** satırlar

---

```bash
grep -E "a.b" file.txt
```
➡️ `a` + herhangi bir karakter + `b` içeren satırlar (örn. `a+b`, `aab`)

---

```bash
grep -E "a+b" file.txt
```
➡️ `a`’nın **bir ya da daha fazla tekrarını** + `b` içeren satırlar (örn. `ab`, `aab`, `aaab`)

---

```bash
grep -E "a*b" file.txt
```
➡️ `a` sıfır ya da daha çok kez + `b` içeren satırlar (örn. `b`, `ab`, `aaab`)

---

```bash
grep -E "a?b" file.txt
```
➡️ `a` en fazla bir kez + `b` (örn. `b`, `ab`, ama `aab` değil)

---

```bash
grep -E "(dog|cat)" file.txt
```

➡️ `dog` veya `cat` içeren satırlar

---

```bash
grep -E "[0-9]" file.txt
```
➡️ Sayı içeren satırlar

---

```bash
grep -E "^[A-Z]" file.txt
```
➡️ Büyük harfle **başlayan** satırlar

---

```bash
grep -E "[^a-zA-Z0-9]" file.txt
```
➡️ Sadece harf ve rakam dışı karakter içeren satırlar (yani özel karakter içerenler)

---

```bash
grep -E "(ab)+" file.txt
```
➡️ `ab`, `abab`, `ababab`... gibi tekrar eden `ab` desenlerini içeren satırlar

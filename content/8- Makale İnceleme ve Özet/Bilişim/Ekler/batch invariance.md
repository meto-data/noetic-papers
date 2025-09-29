Bir **[[kernel]]**'in her örneğe verdiği sonucun **[[Batch]]** boyutundan etkilenmemesi. Aynı örnek tek başına işlendiğinde yahut 32 örnekten oluşan batch'in içinde işlendiğinde  sonucu aynı olmalı. <br>
<br>
Eğer batch invarience yoksa kernel örnekleri farklı sırada veya farklı bloklarda işler, küçük sayısal farklar oluşabilir burada. Bu farklar GPU'da **[[floating-point sayıları|floating point]]** hesaplamalarının **[[non-associativity]]**'siyle birleşince sonuçlar değişken olur. 


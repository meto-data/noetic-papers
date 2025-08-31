# Network Transmissions (Ağ İletimleri)

## Network Basics (Ağ Temelleri)
- **Medium** (Ortam): Ortam, bağlanılan sistem, iletişim ortamı.
- **Hosts**, connected by a medium. 
	- Cihazlar, bir iletişim ortamı aracılığıyla birbirlerine bağlıdır.
- Hosts send and receive signals.
- Medium transmits the signals across space
		- İletişim ortamı sinyalleri mekân boyunca iletir..
- Simplest transmission is a pulse (1 bit)
	- En basit iletim bir darbe (1 bit)’tir.

### Transmission
- The Internet is designed to move information from place to place.

![[Pasted image 20250720182623.png]]

#### Transmission Rate
- How should ve measure transmission rate?
- **[[Latency]]**: Time to accomplish task (i.e., download)
	- Complete download (data file, web page, image)
	- Streaming downlaod (video, music)
- **[[Signal Speed]]**: Velocity of waves (e.g., 70-80% light)
- **[[Transfer Rate]]**: Amount of information in unit time.
		*Birim zamanda aktarılan veri miktarıdır (örneğin, saniyede kaç megabit - Mbps). Genellikle "bant genişliği" olarak adlandırılır.*
	- Informally called "**[[bandwidth]]**"
	- FCC 2010 broadband
#### Measuring Transmission Rate
- Transmission rate $\neq$ speed of the signals.
- Count numbers of signals reaching endpoint
	- Fast signals travelling far apart?
	- Slow signals travelling close together?



|                           | Signal Speed | Signal Speed | Signal Speed        |
| ------------------------- | ------------ | ------------ | ------------------- |
| **Transmission Capasity** |              | **Low**      | **High**            |
| **Transmission Capasity** | **Low**      | Dirt Road    | Single lane highway |
| **Transmission Capasity** | **High**     | Traffic Jam  | Expressway          |
- Aktarım hızı ile sinyal hızı aynı şey değildir. Çok şeritli bir otoyolda (yüksek kapasite) yavaş giden arabalar (düşük sinyal hızı) olabilir.

#### Broadband
**Q.** How can we increase data transfer rate?
![[Pasted image 20250720183849.png]]
1. **Sinyal Hızını Artırmak:** Işık hızı gibi fiziksel limitlere tabidir.

2. **Sinyalleri Sıklaştırmak:** Veriyi daha sık göndermek. Bu durum, sinyallerin birbirine karışma riskini (çarpışma) artırır ve bunun da bir limiti vardır (Shannon Limiti).

3. **Ek Kanallar Eklemek:** En yaygın yöntemdir. Otoyola yeni şeritler eklemek gibidir ancak maliyetlidir.
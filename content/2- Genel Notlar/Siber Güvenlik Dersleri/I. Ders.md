
## **CISSP CBK (Common Body of Knowledge - Ortak Bilgi Bütünü)**
#### 1- <span style="color:darkcyan">Risk Definition</span>
- **New Definition:** Risk is now defined as an event that has a negative impact (e.g., data breach)
- **Old Definition**: The likelihood of a negative event happening (still used in the workplace)
- **Hazard/Tehlike (New)**: A natural disaster (e.g., earthquake, tornado)
#### 2- <span style="color:darkcyan">Risk Perspectives</span>
- **[[Asset-Based]] (Varlık Bazlı)**: Focuses on what can happen to your assets. 
- **[[Outcomes-Based]] (Sonuç Bazlı)**: Focuses on risks to desired outcomes (e.g., profit, sales).
- **[[Process-Based]] (Süreç Bazlı)**: Focuses on safety-related outcomes of process changes.
- **[[Threat-Based]] (Tehdit Bazlı)**: Focuses on threat actors who can exploit vulnerabilities.

### 3- <span style="color:darkcyan">Risk Choices</span>
A new **[[preliminary]]** step has been added:
1. **[[Prioritize]] (Önceliklendirme)**: Prioritize risk based on their impact on human safety first.
2. **[[Decide what to do]]**: Then choose one of the four options (Mitigate -azalt-, Accept, Transfer, Avoid)

### 4- <span style="color:darkcyan">SETA</span> (Security, Education, Training, and Awareness)
- The acronym is now SETA (formerly SATE).
- **Education:** To increase knowledge and understanding.
- **Training:** To improve skills and proficiency for specific tasks.
- **Awareness:** How familiar someone is with security policies.2

### 5- <span style="color:darkcyan">Due Diligence & Due Care</span> (Gerekli Özen & Gerekli Dikkat)
##### **[[Due Diligence]]**
- The "legwork" or research. Performing SETA evaluations is an act of due diligence.
##### **[[Due Care]]**
- The "action". Providing the SETA program to employees is an act of due care.

### 6- <span style="color:darkcyan">NDAs</span> (Non-Disclosure Agreements - Gizlilik Sözleşmeleri)
- Also Known As (AKA):
	- **Confidentiality Agreements** (CAs) <span style="color:darkblue; font-weight:bold">Gizlilik Sözleşmeleri</span>
	- **Confidential Disclosure Agreements** (CDAs) <span style="color:darkblue; font-weight:bold">Gizli Bilgi Açıklama Anlaşmaları</span>
	- **Proprietary Information Agreements** (PIAs) <span style="color:darkblue; font-weight:bold">Ticarî/Sahipli Bilgi Anlaşmaları</span>
	- **Secrecy Agreements** (SAs) <span style="color:darkblue; font-weight:bold">Sır Tutma Anlaşmaları</span>

### 7- <span style="color:darkcyan">GDPR Privacy Tenets</span> (GDPR Gizlilik İlkeleri)
- <span style="color:darkred"><strong>Purpose limitation</strong></span>: Data collected only for a stated purpose
- <span style="color:darkred"><strong>Data minimization</strong></span>: Data used only for a stated purpose.
	- Veriler yalnızca belirtilen amaç için kullanılır.
- <span style="color:darkred"><strong>Accurary:</strong></span> Proving a method for correction.
- <span style="color:darkred"><strong>Storage limitation</strong></span>: Don't keep data longer than needed.
- <span style="color:darkred"><strong>Integrity/Confidentiality</strong></span> **(Bütünlük/Gizlilik)**: No unauthorized modifications or viewing. 
- <span style="color:darkred"><strong>Accountability</strong></span>: The ability to demonstrate compliance.
	- Uyum sağlayabildiğini gösterebilme yeteneği. Bkz. **[[Hesap Verilebilirlik ve Kontrol]]**



---


## [[CIA Model]] 
#### <span style="color:darkred">Confidentiality</span> (Gizlilik)
- Only those who are authorised have access to the data. Only the right people can see the information. It's about privacy.
	- **Data encryption**
	- **Access control using usernames and passwords**
	- **Identification (Tanımlama)**
	- **Authentication (Doğrulama)**
	- **Authorization (Yetkilendirme)**

#### <span style="color:darkred">Integrity</span> (Bütünlük)
- There are no unauthorized modifications to the data or that there are authorized changed only the data. It's about preventing information from being corrupted, altered, etc. **by unathorized persons**.
	- **Digital signatures**
	- **Granting modification permissions only to spesific users**
	- **Using hashing algorithms to verify file integrity**
	- **Checksum**
#### <span style="color:darkred">Availability</span> (Erişilebilirlik)
- Making the data accessiple to authorized entities. You can access your information when you need it.
	- **Regular data backups**
	- **Using redundant hardware (e.g., backup servers) to prevent system failures**
		- **[[Redundancy]] (Yedeklilik)**: Systems that will be activated in the event of a disaster.
	- **Protecting against Denial-of-Service (DoS) attacks

### Additional Functions
#### <span style="color:darkblue">Authentication</span> (Kimlik Doğrulama)
- Making sure that the **[[individual]]** is who they say they are or the entity is who they say they are.
	- **Example:** Passwords, fingerprints, security keys.
#### <span style="color:darkblue">Non-Repudiation</span> (İnkâr Edilemezlik)
- Provides proof of the origin of data and the integrity of a transaction. It prevents a person from later denying that they performed an action (e.g., sent a message or authorized a payment).
	- **Example:** Digital signatures, detailed log files that record who performed an action and when.
- Önerme sayısına *n* dersek, $2^n$ tane doğruluk değeri ortaya çıkar.
- $p$ ve $q$ olmak üzere $2$ önermemiz var diyelim, bu durumda $4$ adet doğruluk değeri ortaya çıkacaktır.

| $p$ | $q$ |
| :-: | :-: |
|  1  |  1  |
|  1  |  0  |
|  0  |  1  |
|  0  |  0  |


- Eğer $r$ önermesini de eklersek, bu sefer $3$ adet önermemiz olacağı için $8$ adet doğruluk değeri ortaya çıkacaktır. Bir önermenin olumsuzu ya da bağlaçlarla birbirine bağlanması bu sayıya dâhil değildir. Örneğin tabloya $\neg p$ önermesini eklersek hâlâ diğer önermelerin sayısına göre tablodaki değerler $4$ ya da $8$ olacaktır. Sadece ilave bir satır eklenir o kadar.

|  **$p$**  | **$q$** | **$r$** |                 **$\neg p$**                 |
| :---: | :-: | :-: | :--------------------------------------: |
| **1** |  1  |  1  | <span style="color:darkred">**0**</span> |
| **1** |  1  |  0  | <span style="color:darkred">**0**</span> |
| **1** |  0  |  1  | <span style="color:darkred">**0**</span> |
| **1** |  0  |  0  | <span style="color:darkred">**0**</span> |
| **0** |  1  |  1  | <span style="color:darkred">**1**</span> |
| **0** |  1  |  0  | <span style="color:darkred">**1**</span> |
| **0** |  0  |  1  | <span style="color:darkred">**1**</span> |
| **0** |  0  |  0  | <span style="color:darkred">**1**</span> |


---
ders: "[[<% tp.file.folder() %>]]"
tags:
type: ders_notu
created: '[[<% tp.date.now("YYYY-MM-DD") %>]]'
---

# <% tp.file.title %>
    
<%* 
    tp.hooks.on_all_templates_executed(async () => { 
        const file = tp.file.find_tfile(tp.file.path(true)); 
        // Klasör adını alıp küçük harfe çevirip boşlukları '_' ile değiştiriyoruz.
        const klasorAdi = tp.file.folder().split("/").pop().toLowerCase().split(" ").join("_");
        // Dosya adını alıp işliyoruz.
        const dosyaAdi = tp.file.title.toLowerCase().split(" ").join("_");
        
        // Etiketi oluşturuyoruz: ders/klasor_adi/dosya_adi
        await app.fileManager.processFrontMatter(file, (frontmatter) => { 
            frontmatter["tags"] = `ders/${klasorAdi}/${dosyaAdi}`; 
        }); 
    }); 
-%>


const currentFolder = tp.file.folder();
const newFilePath = `${currentFolder}/Ekler/${tp.date.now("YYYY-MM-DD-HHmmss")}`;
await tp.file.create_new("", newFilePath);
%>
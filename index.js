const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const sourceDirectory = './source';
const targetDirectory = './target';
const listFilePath = 'list.txt';

const copyFile = promisify(fs.copyFile);

try {
    // Membaca isi dari file list.txt
    const listData = fs.readFileSync(listFilePath, 'utf8');
    const filesInSourceDirectory = fs.readdirSync(sourceDirectory);
    const fileEntriesInList = listData.split('\n').map(entry => entry.trim());

    // Iterasi melalui setiap file di direktori sumber
    filesInSourceDirectory.forEach(async (file) => {
        const sourcePath = path.join(sourceDirectory, file);

        // Mencari apakah nama file ada di data list.txt
        const match = fileEntriesInList.find(entry => {
            const [fileName] = entry.split('|');
            return fileName === file;
        });

        if (match) {
            // Mendapatkan nama file target
            const [, targetFileName] = match.split('|');
            const targetPath = path.join(targetDirectory, targetFileName);

            // Menyalin dan merename file ke folder target
            try {
                await copyFile(sourcePath, targetPath);
                console.log(`${file} berhasil disalin dan direname menjadi ${targetFileName} di ${targetDirectory}`);
            } catch (err) {
                console.error(`Error saat menyalin dan merename ${file}:`, err);
            }
        } else {
            console.log(`Tidak ada kesesuaian ditemukan untuk ${file}`);
        }
    });
} catch (err) {
    console.error('Error:', err);
}
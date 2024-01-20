const fs = require('fs');
const path = require('path');

const sourceDirectory = '/path/to/your/source/directory';
const targetDirectory = '/path/to/your/target/directory';
const listFilePath = '/path/to/your/list.txt';

try {
    const listData = fs.readFileSync(listFilePath, 'utf8');
    const filesInSourceDirectory = fs.readdirSync(sourceDirectory);
    const fileNamesInList = listData.split('\n').map(name => name.trim());

    filesInSourceDirectory.forEach((file) => {
        if (fileNamesInList.includes(file)) {
            const sourcePath = path.join(sourceDirectory, file);
            const targetPath = path.join(targetDirectory, file);

            // Memindahkan file ke folder target
            fs.rename(sourcePath, targetPath, (err) => {
                if (err) {
                    console.error(`Error moving ${file}:`, err);
                } else {
                    console.log(`${file} moved to ${targetDirectory}`);
                }
            });
        } else {
            console.log(`No match found for ${file}`);
        }
    });
} catch (err) {
    console.error('Error:', err);
}

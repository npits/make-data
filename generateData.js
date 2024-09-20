const fs = require('fs');
const { faker } = require('@faker-js/faker');

const totalRows = 10000000; // Total number of rows to generate
const filePath = 'data.json';
const writeStream = fs.createWriteStream(filePath);

writeStream.write('['); // Start of JSON array

let rowIndex = 1;

// Function to generate a single row
function generateRow(id) {
    return {
        id,
        title: faker.lorem.words(2),
        author: faker.person.firstName(),
        genre: faker.music.genre(),
        date: new Date(faker.date.between({ from: '2000-01-01', to: Date.now() })),
        syno: faker.lorem.words(50)
    };
}

// Function to write rows one at a time
function writeNextRow() {
    if (rowIndex > totalRows) {
        writeStream.write(']'); // End of JSON array
        writeStream.end();
        console.log('Data generated!');
        return;
    }

    const row = generateRow(rowIndex);
    const json = JSON.stringify(row, null, 2);

    // Write row to file, adding a comma except for the first row
    if (rowIndex > 1) {
        writeStream.write(',' + json);
    } else {
        writeStream.write(json);
    }

    rowIndex++;

    // Use process.nextTick to avoid blocking the event loop for long
    setImmediate(writeNextRow);
}

// Start writing rows
writeNextRow();

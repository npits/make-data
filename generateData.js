const { faker } = require('@faker-js/faker');
const fetch = require('node-fetch'); // If using Node.js, or native `fetch` in the browser

const totalRows = 10000000;  // 10 million books
const batchSize = 20000;      // Number of books per batch
const apiUrl = 'http://127.0.0.1:8080/books/load';  // Replace with your API URL

// Function to generate a single book
function generateBook(id) {
    return {
        id,
        title: faker.lorem.words(2),
        author: faker.person.firstName(),
        genre: faker.music.genre(),
        date: new Date(faker.date.between({ from: '2000-01-01', to: Date.now() })),
        syno: faker.lorem.words(50)
    };
}

// Function to generate a batch of books
function generateBatch(startIndex, size) {
    const batch = [];
    for (let i = 0; i < size; i++) {
        const id = startIndex + i; //generates id
        batch.push(generateBook(id));
    }
    return batch;
}

// Function to post a batch of books to the API
async function postBatchToApi(batch) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(batch)
        });

        if (!response.ok) {
            throw new Error(`Failed to post batch: ${response.statusText}`);
        }

        console.log(`Batch of ${batch.length} books posted successfully.`);
    } catch (error) {
        console.error('Error posting batch to API:', error);
    }
}

// Function to process all batches progressively
async function processBatches() {
    let processed = 0;

    while (processed < totalRows) {
        const batch = generateBatch(processed, batchSize);
        await postBatchToApi(batch);  // Wait for the batch to be posted before proceeding to the next
        processed += batchSize;
        console.log(`Processed ${processed} / ${totalRows}`);
    }

    console.log('All books have been processed and posted to the API.');
}

// Start processing batches
processBatches();


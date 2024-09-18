const fs = require('fs');
const { faker } = require('@faker-js/faker');

const rows = 1000000;
const data = [];
//const formatter = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });

for(let i=1; i<=rows; i++) {
    data.push({
        id: i,
        title: faker.lorem.words(2),
        author: faker.person.firstName(),
        genre: faker.music.genre(),
        date: new Date(faker.date.between({ from: '2000-01-01', to: Date.now() })),
        syno: faker.lorem.words(50)
    });
}

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Data generated!');



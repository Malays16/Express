const express = require('express');
const { v4: uuid } = require('uuid');

class Book {
    constructor(id = uuid(), title, description, authors, favorite, fileCover, fileName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

const stor = {
    books: []
};

const app = express();
app.use(express.json());

app.get('/api/books', (_, res) => {
    const {books} = stor;
    res.json(books);
});

app.post('/api/user/login', (_, res) => {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books/:id', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(book => book.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

app.post('/api/books/', (req, res) => {
    const { books } = stor;
    const { id = uuid(), title, description, authors, favorite, fileCover, fileName } = req.body;

    const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const { books } = stor;
    const { title, description } = req.body;
    const { id } = req.params;
    const idx = books.findIndex(book => book.id === id);

    if (idx !== -1){
        books[idx] = {
            ...books[idx],
            title,
            description
        };

        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(book => book.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json({status: 'Ok'});
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
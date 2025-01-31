// frontend/src/components/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        genre: "",
        price: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/api/books")
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/books", newBook)
            .then(response => {
                setBooks([...books, response.data]);
                setNewBook({ title: "", author: "", genre: "", price: "" });
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="App">
            <h1>Bookstore</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={newBook.title} onChange={handleChange} placeholder="Title" required />
                <input type="text" name="author" value={newBook.author} onChange={handleChange} placeholder="Author" required />
                <input type="text" name="genre" value={newBook.genre} onChange={handleChange} placeholder="Genre" required />
                <input type="number" name="price" value={newBook.price} onChange={handleChange} placeholder="Price" required />
                <button type="submit">Add Book</button>
            </form>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        {book.title} by {book.author} - ${book.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

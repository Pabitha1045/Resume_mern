import React, { useEffect, useState } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:5000/api/books');
            const data = await response.json();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Bookstore</h2>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <strong>{book.title}</strong> by {book.author} - ${book.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;

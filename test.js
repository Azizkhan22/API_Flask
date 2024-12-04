const API_URL = 'http://127.0.0.1:5000/api/books'; // Replace with your Flask API URL

// Fetch and display all books
async function fetchBooks() {
  try {
    const response = await fetch(API_URL); // GET request to the API
    const books = await response.json();

    const booksList = document.getElementById('books-list');
    booksList.innerHTML = ''; // Clear existing content

    books.forEach(book => {
      const listItem = document.createElement('li');
      listItem.textContent = `${book.title} by ${book.author} (Published: ${book.published_date})`;
      booksList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Add a new book
async function addBook(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const publishedDate = document.getElementById('published_date').value;

  const newBook = {
    id: Date.now(), // Generate a unique ID (replace with actual backend logic if needed)
    title,
    author,
    published_date: publishedDate
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    });

    if (response.ok) {
      alert('Book added successfully!');
      fetchBooks(); // Refresh the list of books
    } else {
      console.error('Failed to add book:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding book:', error);
  }
}

// Attach event listeners
document.getElementById('add-book-form').addEventListener('submit', addBook);

// Initial fetch of books when the page loads
fetchBooks();

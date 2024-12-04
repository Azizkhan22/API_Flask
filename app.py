from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data (In-memory data storage)
books = [
    {"id": 1, "title": "1984", "author": "George Orwell", "published_date": "1949-06-08"},
    {"id": 2, "title": "To Kill a Mockingbird", "author": "Harper Lee", "published_date": "1960-07-11"}
]

# Endpoint to get all books (GET request)
@app.route('/api/books', methods=['GET'])
def get_books():
    return jsonify(books)  # Convert the books list to JSON and return it

# Endpoint to get a single book by ID (GET request)
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((book for book in books if book['id'] == book_id), None)
    if book:
        return jsonify(book)
    else:
        return jsonify({'message': 'Book not found'}), 404

# Endpoint to add a new book (POST request)
@app.route('/api/books', methods=['POST'])
def add_book():
    new_book = request.get_json()  # Get the JSON data from the request body
    books.append(new_book)  # Add the new book to the in-memory list
    return jsonify(new_book), 201  # Return the newly added book and a 201 status

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

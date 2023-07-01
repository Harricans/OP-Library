let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read ? "Yes" : "No"}</td>
        <td>
            <button class='remove-btn' data-index='${index}'>Remove</button>
            <button class='toggle-read-btn' data-index='${index}'>Toggle Read</button>
        </td>
        `;
    bookList.appendChild(row);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
}

document.getElementById("new-book-btn").addEventListener("click", () => {
  const form = document.getElementById("new-book-form");
  const newBookBtn = document.getElementById("new-book-btn")
  newBookBtn.style.display = "none";
  form.style.display = "block";
});

document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const readInput = document.getElementById("read");

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
    readInput.checked
  );

  addBookToLibrary(newBook);
  displayBooks();

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;

  const form = document.getElementById("new-book-form");
  const newBookBtn = document.getElementById("new-book-btn")
  newBookBtn.style.display = "block";
  form.style.display = "none";

});

document.getElementById("book-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const index = parseInt(e.target.dataset.index);
    removeBook(index);
    displayBooks();
  }

  if (e.target.classList.contains("toggle-read-btn")) {
    const index = parseInt(e.target.dataset.index);
    toggleReadStatus(index);
    displayBooks();
  }
});

// Manually adding a few books to the library for testing
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 324, false);
const book3 = new Book("1984", "George Orwell", 328, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayBooks();

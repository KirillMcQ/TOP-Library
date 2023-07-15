let myLibrary = [];
let bookGrid = document.querySelector(".booksGrid");
let indexCount = 0;

function Book(title, author, pagesRead, didRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pagesRead = pagesRead;
  this.didRead = didRead;
}

function addBookToLibrary(obj) {
  // do stuff here
  obj.arrayIndex = indexCount;
  indexCount++;
  myLibrary.push(obj);
}

function displayBook(book) {
    // display books
    console.log(book);
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('bookCard');
    wrapperDiv.setAttribute("data-arrayIndex", book.arrayIndex);
    console.log(wrapperDiv.getAttribute("data-arrayIndex")); 
        
    let titleAuthorDiv = document.createElement('div');
    titleAuthorDiv.classList.add('titleAuthor');

    let bookTitle = document.createElement('h1');
    bookTitle.innerText = `${book.title}`;
    titleAuthorDiv.appendChild(bookTitle);

    let bookAuthor = document.createElement('h3');
    bookAuthor.innerText = `${book.author}`;
    titleAuthorDiv.appendChild(bookAuthor);

    wrapperDiv.appendChild(titleAuthorDiv);

    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete this entry";
    deleteButton.classList.add("deleteButton");

    deleteButton.addEventListener("click", () => {
        console.log(`Delete element ${book.arrayIndex}`);
        wrapperDiv.style.display = "none";
        myLibrary.pop(book.arrayIndex);
    });
    wrapperDiv.appendChild(deleteButton);

    let toggleReadBtn = document.createElement('button');
    toggleReadBtn.innerText = "Toggle Read";
    toggleReadBtn.classList.add("toggleReadBtn");
    toggleReadBtn.style.backgroundColor = book.didRead ? "red" : "green";
    wrapperDiv.appendChild(toggleReadBtn);

    let pagesReadDidRead = document.createElement('div');
    pagesReadDidRead.classList.add('pagesReadDidRead');

    let didRead = document.createElement('h3');
    didRead.innerText = book.didRead ? "Read" : "Not Read";
    pagesReadDidRead.appendChild(didRead);

    toggleReadBtn.addEventListener("click", () => {
        console.log(`Toggle read on element ${book.arrayIndex}`);
        didRead.innerText = didRead.innerText==="Read" ? "Not read" : "Read";
        toggleReadBtn.style.backgroundColor = toggleReadBtn.style.backgroundColor==="red" ? "green" : "red";
    });

    let pagesRead = document.createElement('h3');
    pagesRead.innerText = `Pages read: ${book.pagesRead}`;
    pagesReadDidRead.appendChild(pagesRead);

    wrapperDiv.appendChild(pagesReadDidRead);

    bookGrid.append(wrapperDiv);
}


myLibrary.forEach(function (book) {
    displayBook(book);
});


let addNewCard = document.querySelector(".addNewCard");
let modal = document.getElementById("myModal");
let closeBtn = document.querySelector(".close");
let bookForm = document.getElementById("bookForm");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

addNewCard.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let titleInput = document.getElementById("title").value;
    let authorInput = document.getElementById("author").value;
    let pagesInput = document.getElementById("pages").value;
    let readInput = document.getElementById("read").checked;


    let newBook = new Book(titleInput, authorInput, pagesInput, readInput);

    addBookToLibrary(newBook);

    displayBook(newBook);

    closeModal();

    bookForm.reset();
});
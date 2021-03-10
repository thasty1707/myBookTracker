let myLibrary = [];

function Book(title, author, bookLength, haveReadYet){
    this.title = title
    this.author = author
    this.pages = bookLength
    this.readIt = haveReadYet
};

//Test book data
const theHobbit = myLibrary.push(new Book("The Hobbit","JRR Tolkien",274,"Yes"));
const readyPlayer1 = myLibrary.push(new Book("Ready Player One", "Ernest Cline", 372, "Yes"));

//Function to add new books to the Library
function addBookToLibrary(){    
    //Pull values of input fields
    let bookTitle = document.getElementById("bookTitle").value;
    let bookAuthor = document.getElementById("bookAuthor").value;
    let bookLength = document.getElementById("bookLength").value;
    let readStatus = document.getElementById("readYet").value;

    //Check input and use values to push new object into myLibrary object
    if(bookTitle == ""){
        alert("Please enter a title for the new book!");
        return;
    }else if(bookAuthor == ""){
        alert("Please enter an author for the new book!");
        return;
    }else if(bookLength == ""){
        alert("Please enter the number of pages for the new book!");
        return;
    }else{
        myLibrary.push(new Book(bookTitle, bookAuthor, bookLength, readStatus));
    };

    //Reset input fields
    resetInput();
    console.log(myLibrary);
};



//Function to clear form fields; called after adding new Book to Library
function resetInput(){
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookLength").value = "";
    document.getElementById("readYet").value = "";
};

function listBooks(){
    //Variables for the table to list books on page
    let bookTable = document.getElementById("tableOfBooks");

    for(let i = 0; i < myLibrary.length; i++){
        let newBook = myLibrary[i];
        newRow = document.createElement("tr");
        bookProperties = ['title', 'author', 'pages', 'readIt'];

        for (let j = 0; j < bookProperties.length; j++){
            cell = document.createElement('td');
            cell.innerHTML = newBook[bookProperties[j]];
            
            newRow.appendChild(cell);
        };
        bookTable.appendChild(newRow);
    };
};
listBooks();

//Remove spaces from a title
let titleId1 = myLibrary[0].title.replace(/\s+/g, '');

let addBookBtn = document.getElementById("addBook").addEventListener('click',addBookToLibrary);


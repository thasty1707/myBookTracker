let bookTable = document.getElementById("tableOfBooks");

let myLibrary = [];
let deleteButton = document.getElementById("deleteBook")

function Book(title, author, bookLength, haveReadYet){
    this.title = title
    this.author = author
    this.pages = bookLength
    this.readIt = haveReadYet
};

//Test book data

// const theHobbit = myLibrary.push(new Book("The Hobbit","JRR Tolkien","274 pages", "<input type='checkbox' checked=true;>"));
// const readyPlayer1 = myLibrary.push(new Book("Ready Player One", "Ernest Cline", "372 pages", "<input type='checkbox' checked=true;>"));

//Function to add new books to the Library
function addBookToLibrary(){    
    //Pull values of input fields
    let bookTitle = document.getElementById("bookTitle").value;
    let bookAuthor = document.getElementById("bookAuthor").value;
    let bookLength = String(document.getElementById("bookLength").value + " pages");
    let readStatus = "";

    let readYetBox = document.getElementById("readYet");
    if(readYetBox.checked === true){
        readStatus = "true"
    }else{
        readStatus = "false"
    };


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

    // let bookTable = document.getElementById("tableOfBooks");
    // let newRow = document.createElement("tr");
    // newRow.className = "bookRow";
    // newRow.setAttribute('id',(myLibrary.length - 1))
    // let newBook = myLibrary[myLibrary.length - 1];
    // let bookProperties = ['title', 'author', 'pages'];
    
    // firstCell = document.createElement('td');
    // firstCell.innerHTML = (myLibrary.length);
    // newRow.appendChild(firstCell);
    
    // for(let i = 0; i < (bookProperties.length + 1); i++){
    //     cell = document.createElement('td');
    //     cell.innerHTML = newBook[bookProperties[i]];
    //     newRow.appendChild(cell);
    // };

    // if(readStatus == "true"){
    //     cell.innerHTML = "<input type='checkbox' id='checkbox' checked=true;>";
    //     newRow.appendChild(cell);
    // }else{
    //     cell.innerHTML = "<input type='checkbox';>";
    //     newRow.appendChild(cell);
    // };

    // let lastCell = document.createElement('td');
    // lastCell.innerHTML = "<button class='deleteBook';><strong>X</strong></button>";
    // newRow.appendChild(lastCell);

    // bookTable.appendChild(newRow);
    createBookTable();
    //Reset input fields after new entry
    resetInput();
};


const createBookTable = () => {

    while (bookTable.firstChild){
        bookTable.removeChild(bookTable.firstChild);
    };

    let newBookTable = document.createElement('table');
    newBookTable.setAttribute('id', 'tableOfBooks');

    let bookTableHead = document.createElement('thead');
    bookTableHead.className = 'bookHeaders';

    let bookTableHeaderRow = document.createElement('tr');
    bookTableHeaderRow.className = 'bookRow';

    let bookHeaders = ["Book No\.", "Title", "Author", "Length", "Read", "Delete"]
    bookHeaders.forEach(header => {
        let bookHeader = document.createElement('th');
        bookHeader.innerText = header;
        bookTableHeaderRow.appendChild(bookHeader);
    });

    bookTableHead.append(bookTableHeaderRow);
    bookTable.append(bookTableHead);

    let bookTableBody = document.createElement('tbody');
    bookTableBody.className = 'bookTableBody';
    
};

//Function to clear form fields; called after adding new Book to Library
function resetInput(){
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookLength").value = "";
    if(document.getElementById("readYet").checked == true){
        document.getElementById("readYet").checked = false;
    };
};

function listCurrentBooks(){
    //Variables for the table to list books on page
    let bookTable = document.getElementById("tableOfBooks");
    
    for(let i = 0; i < myLibrary.length; i++){
        let newBook = myLibrary[i];
        newRow = document.createElement("tr");
        newRow.className = "bookRow";
        newRow.setAttribute('id',i)
        bookProperties = ['title', 'author', 'pages', 'readIt'];

        //Add cell to show Number of books
        firstCell = document.createElement('td');
        firstCell.innerHTML = i + 1;
        newRow.appendChild(firstCell);

        for (let j = 0; j < bookProperties.length; j++){
            cell = document.createElement('td');
            cell.innerHTML = newBook[bookProperties[j]];

            newRow.appendChild(cell);
        };

        let lastCell = document.createElement('td');
        lastCell.innerHTML = "<button class='deleteBook';><strong>X</strong></button>";

        newRow.appendChild(lastCell);

        bookTable.appendChild(newRow);
    };
}; 
// listCurrentBooks();

function deleteBook(){
    
}

//Remove spaces from a title
// let titleId1 = myLibrary[0].title.replace(/\s+/g, '');

let addBookBtn = document.getElementById("addBook").addEventListener('click',addBookToLibrary);

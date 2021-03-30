const bookTable = document.getElementById("tableOfBooks");

let myLibrary = [];

function Book(title, author, bookPages, haveReadYet){
    this.title = title
    this.author = author
    this.pages = bookPages;
    this.readIt = haveReadYet
};

//Function to add new books to the Library
function addBookToLibrary(){   
    //Pull values of input fields
    let bookTitle = document.getElementById("bookTitle").value;
    let bookAuthor = document.getElementById("bookAuthor").value;
    let bookLength = document.getElementById("bookLength").value;
    let readStatus;

    let readYetBox = document.getElementById("readYet");
    if(readYetBox.checked === true){
        readStatus = true;
    }else{
        readStatus = false;
    };

     //Check input and use values to push new object into myLibrary object
    if(!bookTitle){
        document.getElementById("bookTitle").setAttribute('class','inputError');
        alert("Please enter a title for the new book.");
        document.getElementById("bookTitle").focus();
        return;
    }else if(!bookAuthor){
        document.getElementById("bookAuthor").setAttribute('class','inputError');
        alert("Please enter an author for the new book.");
        document.getElementById("bookAuthor").focus();
        return;
    }else if(!bookLength){
        document.getElementById("bookLength").setAttribute('class','inputError');
        alert("Please enter the number of pages for the new book.");
        document.getElementById("bookLength").focus();
        return;
    }else if(isNaN(bookLength) === true){
        document.getElementById("bookLength").setAttribute('class','inputError');
        alert("Please use only numbers for the Number of Pages.");
        document.getElementById("bookLength").value = "";
        document.getElementById("bookLength").focus();
        return;
    }else{
        myLibrary.push(new Book(bookTitle, bookAuthor, bookLength, readStatus));
    };

    //Hide form
    hideForm();

    //list books with new entry
    listBooks();
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

function listBooks(){
    //Variables for the table to list books on page
    let bookTable = document.getElementById("tableOfBooks");
    
    //Clear the bookTable before refilling
    while(bookTable.firstChild){
        bookTable.removeChild(bookTable.firstChild);
    };

    //Create headers and append to bookTable
    let tableHeaders = ['\#', 'Title', 'Author', 'Pages', 'Read', 'Delete']

    let bookTableHead = document.createElement('thead');
    bookTableHead.setAttribute('id', 'bookTableHead');

    let bookTableHeaderRow = document.createElement('tr');
    bookTableHeaderRow.setAttribute('id', 'bookHeaderRow');

    tableHeaders.forEach(header => {
        let bookHeader = document.createElement('th');
        bookHeader.innerText = header;
        bookTableHeaderRow.append(bookHeader);
    });

    bookTableHead.append(bookTableHeaderRow);
    bookTable.append(bookTableHead);

    //Loop through myLibrary array ato fill the bookTable
    for(let i = 0; i < myLibrary.length; i++){
        //Variable to get book info
        let newBook = myLibrary[i];
        //Variable to create rows on the bookTable
        newRow = document.createElement("tr");
        newRow.className = "bookRow";
        newRow.setAttribute('id', i)

        //object to help with looping
        bookProperties = ['title', 'author', 'pages'];

        //Create a cell in the first column of the bookTable number the book in each newRow
        firstCell = document.createElement('td');
        firstCell.innerHTML = "<p class='bookNum'>" + (i + 1) + "</p>";
        firstCell.className = "bookNum"
        newRow.appendChild(firstCell);

        //Create cells that match the properties of bookProperties in each newRow
        for (let j = 0; j < bookProperties.length; j++){
            cell = document.createElement('td');
            cell.className = bookProperties[j];
            cell.innerHTML = "<p class=" + bookProperties[j] + ">" + newBook[bookProperties[j]] + "</p>";

            newRow.appendChild(cell);
        };
        
        //Create a checkbox input for the readIt property of each newBook
        let readStatus = myLibrary[i].readIt;
        let readYetCell = document.createElement('td')
        readYetCell.className = 'readBookYet';
               
        let readYetBox = document.createElement('input');
        readYetBox.type = "checkbox";
        readYetBox.className = "checkBox";


        

        //Append checkbox to each newRow and dynamically change status of input
        if(readStatus === true){
            //Set status of checkbox to "checked"
            readYetBox.click();
            readYetCell.append(readYetBox);
            newRow.appendChild(readYetCell);
        }else{
            //Leaves status of checkbox as 'unchecked'
            readYetCell.append(readYetBox);
            newRow.appendChild(readYetCell);
        };

        

        //Create a delete button for each newBook as an option to remove a book from myLibrary and bookTable
        let lastCell = document.createElement('td');
        lastCell.className = 'deleteBtnCell';
        deleteBtn = "<button class='deleteBook'><strong>X</strong></button>";
        // lastCell.addEventListener('click',deleteBook);
        lastCell.innerHTML = deleteBtn;
        //Append delete button to newRow
        newRow.appendChild(lastCell);

        //Append each newRow to bookTable
        bookTable.appendChild(newRow);
    };

    //Add eventListener to each checkbox in the bookTable
    let checkboxes = document.querySelectorAll('.checkBox');
    checkboxes.forEach(checkbox => checkbox.addEventListener('change',changeReadYet));
    
    //add eventListener to each deleteButton in the bookTable
    let deleteButtons = document.querySelectorAll(".deleteBook");
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deleteBook));

    myLibraryStats();
}; 

//Function to remove books from myLibrary and bookTable
function deleteBook(){
    if(myLibrary.length > 0){
        let thisCell = this.parentNode;
        let thisRow = thisCell.parentNode;
        let bookIndex = thisRow.id;
        myLibrary.splice(bookIndex, 1);
        listBooks();
    }else{
        return;
    }
};

//Function to show form to enter a new book
function showForm(){
    let bookForm = document.getElementById("addBookForm");
    bookForm.removeAttribute('class','hiddenForm');
    bookForm.setAttribute('class','visibleForm');
    document.getElementById("bookTitle").focus();
    document.getElementById("newBook").style.display = 'none';
};

//Function to hide form after entering a new book
function hideForm(){
    let bookForm = document.getElementById("addBookForm");
    bookForm.removeAttribute('class','visibleForm');
    bookForm.setAttribute('class','hiddenForm');
    document.getElementById("newBook").style.display = '';
    //Clear input when form is hidden
    resetInput();
};

//Function to remove inputError class from input fields on change
function removeErrorClass(){
    this.removeAttribute('class','inputError');
};

//Function to read checkboxes in table and change readIt value in array for that book
function changeReadYet(){
    let thisCell = this.parentNode
    let thisRow = thisCell.parentNode;
    let bookIndex = thisRow.id;

    if(this.checked === true){
        myLibrary[bookIndex].readIt = true;
    }else{
        myLibrary[bookIndex].readIt = false;
    };
    console.log(myLibrary[bookIndex]);
    myLibraryStats();
};

function myLibraryStats(){
    let numRead = myLibrary.filter(function(item){
        return item.readIt;
    }).length;
        
    let numUnread = myLibrary.filter(function(item){
        return !item.readIt;
    }).length;;

    document.getElementById('totalBooks').innerText = "Total Books: " + myLibrary.length;
    document.getElementById('totalRead').innerText = "Books Read: " + numRead;
    document.getElementById('totalUnread').innerText = "Books Unread: " + numUnread;
}

//Call function to list books stored in myLibrary, if any
listBooks();

//Clear form on page load or reload
resetInput();



const addBookBtn = document.getElementById("addBook").addEventListener('click',addBookToLibrary);
const newBookBtn = document.getElementById("newBook").addEventListener('click',showForm);
const cancelFormBtn = document.getElementById("cancelBook").addEventListener('click',hideForm);

const bookInputs = document.querySelectorAll('.inputFields').forEach(inputField => inputField.addEventListener('input',removeErrorClass))

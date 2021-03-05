// const viewTitle = document.getElementById("viewTitle").innerText;
// const viewAuthor = document.getElementById("viewAuthor").innerText;
// const viewLength = document.getElementById("viewLength").innerText;
// const viewStatus = document.getElementById("viewReadStatus").innerText;


let myLibrary = [];

function Book(title, author, bookLength, haveReadYet){
    this.title = title
    this.author = author
    this.pages = bookLength
    this.readIt = haveReadYet
};

//Function to add new books to the Library
function addBookToLibrary(){
    //Pull values of input fields
    let bookTitle = document.getElementById("bookTitle").value;
    let bookAuthor = document.getElementById("bookAuthor").value;
    let bookLength = document.getElementById("bookLength").value;
    let readStatus = document.getElementById("readYet").value;

    //Use values to push new object into myLibrary object
    myLibrary.push(new Book(bookTitle,bookAuthor,bookLength,readStatus));

    //Alert to user of book just entered
    alert("Book Added\: " + bookTitle +", by " + bookAuthor + ", " + bookLength + " pages. " +
        "\r\n" + "Read?: " + readStatus);

    //Check to make sure it works
    console.log(myLibrary);

    resetInput();
};

//Function to clear form fields; called after adding new Book to Library
function resetInput(){
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookLength").value = "";
    document.getElementById("readYet").value = "";
}

function viewBook(){

};

//Toggle hiding/showing dropdown menu content
// function showTitles(){
//     document.getElementById("titleMenu").classList.toggle("show");
// };

let addBookBtn = document.getElementById("addBook").addEventListener('click',addBookToLibrary);

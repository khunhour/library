let myLibrary = [];

function book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementsByName("readOrNot");
const test = document.querySelector(".test");
const submitButton = document.querySelector("#submit");


let readStatus;
let currentIndex;
//when you click add new book this happen
const submit = document.getElementById("format");
submit.addEventListener("submit", submitForm);

function submitForm(e){
    let processedBook = processInfo();
    if(e.target.children[5].children[0].className ==="edit"){
        editBookInLibrary(processedBook);
        submitButton.classList.remove("edit");
        submitButton.textContent="Add Book";
    }
    else{
        addBookToLibrary(processedBook);
    }
    displayCards();
    hideForm();
    e.preventDefault();
}

//when you click cancel on form it dissapear without inserting value
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", hideForm);

//show pop up form when click new book, event
const newBook = document.getElementById("newBook");
newBook.addEventListener("click", showForm);

//show pop up form function
function showForm(){
    const form = document.getElementById("form");
    form.style.display = "flex";
}
//hide pop up form function
function hideForm(){
    const form = document.getElementById("form");
    title.value="";
    pages.value="";
    author.value="";
    form.style.display = "none";
}
//process entered info and add to object constructor
function processInfo(){

    //checking read or unread button is check on form
    for(i = 0; i< read.length; i++){
        if(read[i].checked){
            readStatus = read[i].value;
        }
    }
    const addBook = new book(title.value, author.value, pages.value, readStatus);
    return addBook;
}


//add processed book into library
function addBookToLibrary(book){
    myLibrary.push(book);
}


//edit book meaning remove the old book and added the updated book into that index
function editBookInLibrary(book){
    myLibrary.splice(currentIndex,1, book);
}


//display all the objects in the array
function displayCards(){
    const error = document.querySelector('.noBooks');
    const content = document.querySelector(".content");
    content.textContent="";
    let i=0;           //for each id and dataset incase want to delete or edit
    myLibrary.forEach((object) => {
        
        const card = document.createElement('div');
        card.classList.add("card");
        
        card.innerHTML = `<div class="info">
                                <div>Title: ${object.title}</div>
                                <div>Author: ${object.author}</div>
                                <div>Pages: ${object.pages}<div>
                                <div class="flexButton" data-index=${i}>
                                    <button id="readButton" class="readButton">${object.read === "Read"? "Read" : "Not Yet Read"}</button>
                                    <div class="editDelete">
                                        <button class="readButton edit">Edit</button>  
                                        <button class="readButton red">Delete</button>
                                    </div>
                                </div>
                            <div>`;
        content.appendChild(card);
        i++;
    });

    //a feature to display no books when there is no books

    if(content.innerHTML===""){
        error.style.display = "block";
    }
    else{
        error.style.display = "none";
    }
    //add event listener to all read buttons
    const buttons = document.querySelectorAll('.readButton');
    buttons.forEach((button) =>{
        button.addEventListener("click", changeButton);
    });
    //add event listener to all delete buttons
    const deletes = document.querySelectorAll('.red');
    deletes.forEach((item) =>{
        item.addEventListener("click", deleteValue);
    });

    //add event listener to all edit buttons
    const edit = document.querySelectorAll(".edit");
    edit.forEach((item) =>{
        item.addEventListener("click", editValue);
    });
}
//change read status function
function changeButton(e){
    currentIndex = e.target.parentNode.dataset.index;
    if(myLibrary[currentIndex].read === "Not Yet Read"){
        myLibrary[currentIndex].read = "Read";
    }
    else{
        myLibrary[currentIndex].read = "Not Yet Read";
    }
    displayCards();
}
//delete card function
function deleteValue(e){
    currentIndex = e.target.parentNode.parentNode.dataset.index;
    myLibrary.splice(currentIndex,1);
    displayCards();
}
//edit value of card info
function editValue(e){
    currentIndex = e.target.parentNode.parentNode.dataset.index;

    title.value = myLibrary[currentIndex].title;
    pages.value = myLibrary[currentIndex].pages;
    author.value = myLibrary[currentIndex].author;

    for(i = 0; i< read.length; i++){        //read.length is 2 inputs with radio buttons
        if(myLibrary[currentIndex].read === read[i].value){
            read[i].checked = true;
        }
    }
            
    const submitButton = document.querySelector("#submit");
    submitButton.classList.add("edit");
    submitButton.textContent="Edit";
    showForm();
}


function stat(){

}
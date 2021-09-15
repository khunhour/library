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
let readStatus;

//when you click add new book this happen
const submit = document.getElementById("submit");
submit.addEventListener("click", ()=>{
    let processedBook = processInfo();
    addBookToLibrary(processedBook);
    displayCards();
    hideForm();
});

//when you click cancel on form it dissapear without inserting value
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", ()=>{
    hideForm();
});

//show pop up form when click new book, event
const newBook = document.getElementById("newBook");
newBook.addEventListener("click", (e) =>{
    showForm();
});

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

//display all the objects in the array
function displayCards(){
    const content = document.querySelector(".content");
    content.textContent="";
    let i=0;           //for each id and dataset incase want to delete or edit
    myLibrary.forEach((object) => {
        
        const card = document.createElement('div');
        card.classList.add("card");
        
        card.innerHTML = "<div class='info'>Title : " + object.title +"</br>"+ "Author : " + object.author + "</br>" + "Pages : "+ object.pages + "</br></div>";

        if(object.read === "Read"){
            card.innerHTML += `<div class="flexButton"><button id="${i}" class="readButton">${object.read}<img src="images/checkmark.png" alt="checkmark"></button>`+`<button data-index-number="${i}" class="readButton red">Delete</button></div>`;
        }
        else{
            card.innerHTML += `<div class="flexButton"><button id="${i}" class="readButton">${object.read}</button>`+`<button data-index-number="${i}" class="readButton red">Delete</button></div>`;
        }
        content.appendChild(card);
        i++;
    });
    //add event listener to all read buttons
    const buttons = document.querySelectorAll('.readButton');
    buttons.forEach((button) =>{
        button.addEventListener("click", () =>{
            changeButton(button.id);
        });
    });
    //add event listener to all delete buttons
    const deletes = document.querySelectorAll('.red');
    deletes.forEach((item) =>{
        item.addEventListener("click", () =>{
            deleteValue(item.dataset.indexNumber);
            console.log(item.dataset.indexNumber);
        })
    })
}
//change read status function
function changeButton(buttonID){
    if(myLibrary[buttonID].read === "Not Yet Read"){
        myLibrary[buttonID].read = "Read";
    }
    else{
        myLibrary[buttonID].read = "Not Yet Read";
    }
    displayCards();
}
//delete card function
function deleteValue(index){
    myLibrary.splice(index,1);
    displayCards();
}
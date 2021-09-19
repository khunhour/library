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
const submitButton = document.querySelector("#submit");
const totalBooks = document.querySelector("#totalBooks");
const totalRead = document.querySelector("#totalRead");
const totalUnread = document.querySelector("#totalUnread");
const noBooks = document.querySelector('.noBooks');
const content = document.querySelector(".content");

let readStatus;
let currentIndex;

updateStat();
//when you click add new book this happen
const submit = document.getElementById("format");
submit.addEventListener("submit", submitForm);

//when you click cancel on form it dissapear without inserting value
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", hideForm);

//show pop up form when click new book, event
const newBook = document.getElementById("newBook");
newBook.addEventListener("click", showForm);

function submitForm(e){
    let processedBook = processInfo();
    if(e.target.children[5].children[0].className ==="edit"){   //check if its an edit or adding new book because use same button
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

//show pop up form function
function showForm(){
    const form = document.getElementById("form");
    form.style.display = "flex";
}
//hide pop up form function
function hideForm(){
    submitButton.classList.remove("edit");      //in case cancel when edit, edit button still there so remove
    submitButton.textContent="Add Book";

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

function updateStat(){
    let readNum=0;
    let unreadNum=0;
    for(i=0; i<myLibrary.length;i++){
        if(myLibrary[i].read === "Read"){
            readNum++;
        }
        else{
            unreadNum++;
        }
    }
    totalBooks.textContent = `Total Books: ${myLibrary.length}`;
    totalRead.textContent = `Read: ${readNum}`;
    totalUnread.textContent = `Unread: ${unreadNum}`;
}

//display all the objects in the array
function displayCards(){

    updateStat();
    content.textContent="";
    let index=0;           //for each id and dataset incase want to delete or edit
    myLibrary.forEach((object) => {
        
        const card = document.createElement('div');
        card.classList.add("card");
        card.dataset.cardNumber = `${index}`;       //add data index number to each card
        content.appendChild(card);

        const info = document.createElement('div');
        info.classList.add("info");
        card.appendChild(info);

        let infoArray = [`Title: ${object.title}`, `Author: ${object.author}`,`Pages: ${object.pages}`];
        for(i=0; i<infoArray.length; i++){
            const div = document.createElement('div');
            div.textContent = infoArray[i];
            info.appendChild(div);
        }

        const flexButton = document.createElement('div');
        flexButton.classList.add("flexButton");
        flexButton.dataset.index = `${index}`;
        info.appendChild(flexButton);

        const readButton = document.createElement("button");
        readButton.classList.add("button");
        readButton.setAttribute("id","readButton");
        readButton.textContent = `${object.read === "Read"? "Read" : "Not Yet Read"}`;
        flexButton.appendChild(readButton);

        const editDelete = document.createElement('div');
        editDelete.classList.add("editDelete");
        flexButton.appendChild(editDelete);

        const edit = document.createElement("button");
        let buttonArray = ["edit","delete"];
        for(i=0; i<buttonArray.length; i++){
            const btn = document.createElement('button');
            btn.textContent = buttonArray[i];
            btn.classList.add("button", buttonArray[i]);
            editDelete.appendChild(btn);
        }
        index++;

        //the above code with create element is the same as the code below but for security reasons, innerHTML is not used
        // card.innerHTML = `<div class="info">
        //                         <div>Title: ${object.title}</div>
        //                         <div>Author: ${object.author}</div>
        //                         <div>Pages: ${object.pages}<div>

        //                         <div class="flexButton" data-index=${i}>
        //                             <button id="readButton" class="button">${object.read === "Read"? "Read" : "Not Yet Read"}</button>
        //                             <div class="editDelete">
        //                                 <button class="button edit">edit</button> 
        //                                 <button class="button delete">delete</button>
        //                             </div>
        //                         </div>
        //                     <div>`;
    });
    checkBookExist();
    //add event listener to all read buttons
    const buttons = document.querySelectorAll('#readButton');
    buttons.forEach((button) =>{
        button.addEventListener("click", changeButton);
    });

    //add event listener to all delete buttons
    const deletes = document.querySelectorAll('.delete');
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
    console.log(currentIndex);
    if(myLibrary[currentIndex].read === "Not Yet Read"){
        myLibrary[currentIndex].read = "Read";
    }
    else{
        myLibrary[currentIndex].read = "Not Yet Read";
    }
    const change = document.querySelector(`[data-index = "${currentIndex}"]`);
    change.firstChild.textContent = myLibrary[currentIndex].read;
    updateStat();
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

//display no books found if there's no book function
function checkBookExist(){
    if(content.innerHTML===""){
        noBooks.style.display = "block";
    }
    else{
        noBooks.style.display = "none";
    }
}
let myLibrary = [];
let newEntry = false;

function Book (title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function () {
        const readMessage = this.haveRead ? 'have read' : 'have not read yet';
        return title + ' by '+ author + ', ' + numPages +' pages, ' + readMessage;
    }
    this.getInfoArray = function () {
        const arr = [this.title, this.author, this.numPages, this.haveRead ? 'Yes' : 'No'];
        return arr;
    }
}


//new-entry addition functions
function addBookToLibrary(title, author, numPages, haveRead) {
    myLibrary.push(new Book(title, author, numPages, haveRead));
}

function addBook() {
    changeNewEntryState();
}

function submitNewBook () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const numPages = document.querySelector('#pages').value;
    const haveRead = document.querySelector('#read').checked;
    if(title && author && numPages && !isNaN(numPages)) {
        addBookToLibrary(title, author, numPages, haveRead);
        changeNewEntryState();
        render();
    }
    else {
        alert("Invalid submission: Please fill out all portions of the form correctly");
    }
}

function changeNewEntryState() {
    const container = document.querySelector('#new-entry-container');
    const form = container.querySelector('#new-entry-form');
    if(newEntry) {
        form.reset();
    }
    document.querySelector('body').classList.toggle('dim-background');
    document.querySelector('#entries').classList.toggle('dim');
    container.classList.toggle('hide');
    newEntry = !newEntry;
}


//entry editing functions
function remove(e) {
    const index = e.target.parentNode.parentNode.dataset.index;
    if(confirm("Are you sure you want to delete the entry for: " + myLibrary[index].title)) {
        myLibrary.splice(index, 1);
        render();
    }
}

function changeReadState(e) {
    const index = e.target.parentNode.parentNode.dataset.index;
    myLibrary[index].haveRead = !myLibrary[index].haveRead;
    render();
}


//button creation helpers
function createRemoveBtn() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-button');
    removeBtn.addEventListener('click', remove);
    return removeBtn;
}


function createReadStateButton(bool) {
    const readBtn = document.createElement('button');
    readBtn.textContent = bool ? 'Mark Unread' : 'Mark Read';
    readBtn.classList.add('read-button');
    readBtn.addEventListener('click', changeReadState);
    return readBtn;
}

//main
function render() {
    const container = document.querySelector('#book-table');
    //remove old
    const prevEntries = container.querySelectorAll('.entry');
    prevEntries.forEach(entry => {
        container.removeChild(entry);
    });

    //add new
    for(let i = 0; i < myLibrary.length; i++) {
        const tr = document.createElement('tr');
        tr.classList.add('entry');
        tr.setAttribute('data-index', i);

        const infoArray = myLibrary[i].getInfoArray()
        for(let j = 0; j < 4; j++) {
            const info = document.createElement('td');
            info.textContent = infoArray[j];
            tr.appendChild(info);
        }
        const removeBtn = document.createElement('td');
        removeBtn.appendChild(createRemoveBtn());
        tr.appendChild(removeBtn);

        const readBtn = document.createElement('td');
        readBtn.appendChild(createReadStateButton(myLibrary[i].haveRead));
        tr.appendChild(readBtn);
        if(myLibrary[i].haveRead) {
            tr.classList.add('have-read');
        }
        container.appendChild(tr);
    }
}

//initial set up
document.querySelector('#add-button').addEventListener('click', addBook);
document.querySelector('#submit-button').addEventListener('click', submitNewBook);
document.querySelector('#new-entry-form-close').addEventListener('click', changeNewEntryState)
addBookToLibrary('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 327, false);
render();
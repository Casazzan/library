let myLibrary = [];
let newEntry = false;

function Book (title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function () {
        let readMessage = this.haveRead ? 'have read' : 'have not read yet';
        return title + ' by '+ author + ', ' + numPages +' pages, ' + readMessage;
    }
}

function addBookToLibrary(title, author, numPages, haveRead) {
    myLibrary.push(new Book(title, author, numPages, haveRead));
    render();
}

function createRemoveBtn() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-button');
    removeBtn.addEventListener('click', remove);
    return removeBtn;
}

function remove(e) {
    const index = e.target.parentNode.dataset.index;
    if(confirm("Are you sure you want to delete the entry for: " + myLibrary[index].title)) {
        myLibrary.splice(index, 1);
        render();
    }
}

function createReadStateButton(bool) {
    const readBtn = document.createElement('button');
    readBtn.textContent = bool ? 'Mark Unread' : 'Mark Read';
    readBtn.classList.add('read-button');
    readBtn.addEventListener('click', changeReadState);
    return readBtn;
}

function changeReadState(e) {
    const index = e.target.parentNode.dataset.index;
    myLibrary[index].haveRead = !myLibrary[index].haveRead;
    render();
}

function addBook() {
    changeNewEntryState();
    render();
}

function render() {
    //remove old
    const container = document.querySelector('.entries');
    while(container.firstChild) {
        container.removeChild(container.lastChild);
    }

    //add new
    for(let i = 0; i < myLibrary.length; i++) {
        const div = document.createElement('div');
        div.classList.add('entry');
        div.setAttribute('data-index', i);

        const info = document.createElement('p');
        info.textContent = myLibrary[i].info();
        div.appendChild(info);

        div.appendChild(createRemoveBtn());

        div.appendChild(createReadStateButton(myLibrary[i].haveRead));
        if(myLibrary[i].haveRead) {
            div.classList.add('have-read');
        }

        container.appendChild(div);
    }
}


function submitNewBook () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const numPages = document.querySelector('#pages').value;
    const haveRead = document.querySelector('#read').checked;
    if(title && author && numPages) {
        addBookToLibrary(title, author, numPages, haveRead);
        changeNewEntryState();
    }
    else {
        alert("Please fill out all portions of the form");
    }
}

function changeNewEntryState() {
    const form = document.querySelector('#new-entry-container');
    if(newEntry) {
        form.reset();
        form.classList.remove('show');
        form.classList.add('hide');

    }
    else {
        form.classList.remove('hide');
        form.classList.add('show');
    }
    newEntry = !newEntry;
}

function initialSetUp() {
    document.querySelector('#add').addEventListener('click', addBook);
    document.querySelector('#submit').addEventListener('click', submitNewBook);
    document.querySelector('#new-entry-container-close').addEventListener('click', changeNewEntryState)
    addBookToLibrary('the Hill', 'John', 120, true);
    render();
}

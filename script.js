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

function addBookToLibrary(title, author, numPages, haveRead) {
    myLibrary.push(new Book(title, author, numPages, haveRead));
}

function createRemoveBtn() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-button');
    removeBtn.addEventListener('click', remove);
    return removeBtn;
}

function remove(e) {
    const index = e.target.parentNode.parentNode.dataset.index;
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
    const index = e.target.parentNode.parentNode.dataset.index;
    console.log(index);
    myLibrary[index].haveRead = !myLibrary[index].haveRead;
    render();
}

function addBook() {
    changeNewEntryState();
}

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
    }
    form.classList.toggle('hide');
    newEntry = !newEntry;
}

function initialSetUp() {
    document.querySelector('#add').addEventListener('click', addBook);
    document.querySelector('#submit').addEventListener('click', submitNewBook);
    document.querySelector('#new-entry-container-close').addEventListener('click', changeNewEntryState)
    addBookToLibrary('the Hill', 'John', 120, true);
    addBookToLibrary('how to', 'jim', 150, false);
    render();
}

initialSetUp();
let myLibrary = [];

function Book (title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function () {
        let readMessage = haveRead ? 'have read' : 'have not read yet';
        return title + ' by '+ author + ', ' + numPages +' pages, ' + readMessage;
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
    addBookToLibrary('Title', 'auth', 70, false);
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


//TODO:
function submitNewBook () {

}

function changeNewEntryState() {
    
}

function initialSetUp() {
    document.querySelector('#add').addEventListener('click', addBook);
    document.querySelector('#submit').addEventListener('click', submitNewBook);
    document.querySelector('#new-entry-container-close').addEventListener('click', changeNewEntryState)
    addBookToLibrary('the Hill', 'John', 120, true);
    render();
}

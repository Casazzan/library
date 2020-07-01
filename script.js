let myLibrary = [];
let newEntry = false;

var firebaseConfig = {
    apiKey: "AIzaSyDeV6C3Et7N5rCtgFSoSTxqnXpoq6eBwI8",
    authDomain: "fir-library-6b7b7.firebaseapp.com",
    databaseURL: "https://fir-library-6b7b7.firebaseio.com",
    projectId: "fir-library-6b7b7",
    storageBucket: "fir-library-6b7b7.appspot.com",
    messagingSenderId: "204556789011",
    appId: "1:204556789011:web:27d1f5c01878b7c0d6e6e6",
    measurementId: "G-GTVJN0RQ2X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

//create references
const dbRef = firebase.database().ref();
const booksRef = dbRef.child('books');
booksRef.orderByChild("title");
booksRef.on('value', fillLocalLibrary);
//booksRef.once('value').then(fillLocalLibrary);

//new-entry addition functions
function addBookToLibrary(title, author, numPages, haveRead) {
    const key = booksRef.push( {title, author, numPages, haveRead} ).key;
    booksRef.child(key).update( {key, key});
}

function addBook() {
    changeNewEntryState();
}

function submitNewBook () {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const numPages = document.querySelector('#pages').value;
    const haveRead = document.querySelector('#read').checked ? 'Yes': 'No';
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
        booksRef.child(myLibrary[index].key).remove();
        render();
    }
}

function changeReadState(e) {
    const index = e.target.parentNode.parentNode.dataset.index;
    myLibrary[index].haveRead = myLibrary[index].haveRead == 'Yes' ? 'No': 'Yes';
    booksRef.child(myLibrary[index].key).update(myLibrary[index]);
}


//button creation helpers
function createRemoveBtn() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-button');
    removeBtn.addEventListener('click', remove);
    return removeBtn;
}


function createReadStateButton(haveRead) {
    const readBtn = document.createElement('button');
    readBtn.textContent = haveRead == 'Yes' ? 'Mark Unread' : 'Mark Read';
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

        const book = myLibrary[i];
        // for(const key in book) {
        //     const info = document.createElement('td');  Out of order
        //     info.textContent = book[key];
        //     tr.appendChild(info);
        // }
        let info = document.createElement('td');
        info.textContent = book.title;
        tr.appendChild(info);
        info = document.createElement('td')
        info.textContent = book.author;
        tr.appendChild(info);
        info = document.createElement('td')
        info.textContent = book.numPages;
        tr.appendChild(info);
        info = document.createElement('td')
        info.textContent = book.haveRead;
        tr.appendChild(info);

        const removeBtn = document.createElement('td');
        removeBtn.appendChild(createRemoveBtn());
        tr.appendChild(removeBtn);

        const readBtn = document.createElement('td');
        readBtn.appendChild(createReadStateButton(myLibrary[i].haveRead));
        tr.appendChild(readBtn);
        if(myLibrary[i].haveRead == 'Yes') {
            tr.classList.add('have-read');
        }
        container.appendChild(tr);
    }
}

function fillLocalLibrary(snap) {
    myLibrary = [];
    for(const key in snap.val()) {
        const bookObj = snap.val()[key];
        myLibrary.push(bookObj);
    }
    render();
}

//initial set up
document.querySelector('#add-button').addEventListener('click', addBook);
document.querySelector('#submit-button').addEventListener('click', submitNewBook);
document.querySelector('#new-entry-form-close').addEventListener('click', changeNewEntryState);
render();
function book (title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function () {
        let readMessage = haveRead ? 'have read' : 'have not read yet';
        return title + ' by '+ author + ', ' + numPages +' pages, ' + readMessage;
    }
}
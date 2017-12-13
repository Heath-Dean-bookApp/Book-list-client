'use strict';


page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:book_id', ctx => app.bookView.initSingleBookPage);
page('/books/new', ctx => app.bookView.initNewBookPage);

page();

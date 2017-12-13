'use strict';

page('/', app.bookView.initIndexPage);
page('/books/:book_id', app.bookView.initSingleBookPage);
page('/books/new', app.bookView.initNewBookPage);

page();

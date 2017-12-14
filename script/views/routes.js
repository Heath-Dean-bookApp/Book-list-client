'use strict';


page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initNewBookPage(ctx));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initSingleBookPage));


page();

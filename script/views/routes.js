'use strict';

if(window.location.pathname !== '/') {
  page.base('/book-list-client');
}


page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initNewBookPage(ctx));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initSingleBookPage));
page('/admin',
  (ctx, next) => app.adminView.verify(ctx, next),
  (ctx) => app.adminView.initAdminPage());

page();

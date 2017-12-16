'use strict';

// if(window.location.pathname !== '/') {
//   page.base('/book-list-client');
// }

page('/'
  , (ctx, next) => app.Book.fetchAll(() => app.bookView.initIndexPage(ctx, next))
  , (ctx, next) => app.adminView.verify(ctx, next)
);
page('/books/new'
  , ctx => app.bookView.initNewBookPage(ctx)
);
page('/books/:book_id/update'
  , (ctx, next) => app.Book.fetchOne(ctx, next)
  , ctx => app.bookView.updateBook(ctx)
);
page('/books/:book_id'
  , (ctx, next) => app.Book.fetchOne(ctx, () => app.bookView.initSingleBookPage(ctx, next))
  // , (ctx, next) => app.adminView.verify(ctx, next)
);
page('/admin'
  , ctx => app.adminView.initAdminPage()
);

page();

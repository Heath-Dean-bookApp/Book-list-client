'use strict';

// REMOVE THIS

var app = app || {};

(function(module) {
  const bookView = {};

  //shows all the books on the home page
  bookView.initIndexPage = function() {
    $('.container').hide();
    $('.book-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $(`#book-list`).append(book.toHtml()));
  }

  //shows just a single book
  bookView.initSingleBookPage = (ctx, next) => {
    $('.container').hide();
    $('.detail-view').show();
    $('.detail-view').empty();
    let template = Handlebars.compile($('#detail-view-template').text());
    console.log('ctx', ctx);
    $(`.detail-view`).append(template(ctx.book));
    console.log('single book page running');
    // $(`.admin`).hide();
    $('#delete').on('click', function(event) {
      event.preventDefault();
      app.Book.deleteBook(ctx);
    });
    $('#update').on('click', function(event) {
      event.preventDefault();
      // bookView.updateBook();
    }
    // next();
    )}

  //shows just the entry inputs for the new book.
  bookView.initNewBookPage = () => {
    $('.container').hide();
    $('.new-book-form').show();
    $('#new-form').on('submit', function(event) {
      event.preventDefault();

      let book = new app.Book({
        title: $('#book-title').val(),
        author: $('#book-author').val(),
        isbn: $('#book-isbn').val(),
        image_url: $('#book-image-url').val(),
        description: $('#book-description').val(),
      });

      app.Book.insertRecord(book);
    }
    )};

  // getting the info from the inputs for the book

  bookView.create = () => {
    var book;
    $('#new-form').empty();

    book = new app.Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-image-url').val(),
      description: $('#book-description').val(),
    });

    $('#new-form').append(book.toHtml());
  };

  // this is for updating the book.

  bookView.updateBook = (ctx) => {
    $('.container').hide();
    $('.update-book-form').show();
    $('#update-book-form input[name="title"]').val(ctx.titel);
    $('#update-book-form input[name="author"]').val(ctx.author);
    $('#update-book-form input[name="isbn"]').val(ctx.isbn);
    $('#update-book-form input[name="image_url"]').val(ctx.image_url);
    $('#update-book-form textarea').val(ctx.description);

    $('#update-book-form').on('submit', function(event) {
      event.preventDefault();

      let book = new app.Book({
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      });

      app.Book.update(book);

    }
    )};

  module.bookView = bookView;

}) (app)

// $(function() {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// })

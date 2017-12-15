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
    module.Book.all.map(book => $(`#book-list`).append(book.toHtml()));
  }

  //shows just a single book
  bookView.initSingleBookPage = (ctx) => {
    $('.container').hide();
    $('.detail-view').show();
    $('.detail-view').empty();
    let template = Handlebars.compile($('#detail-view-template').text());
    $(`.detail-view`).append(template(ctx));
    // $(`.admin`).hide();
    $('#delete').on('click', function(event) {
      event.preventDefault();
      module.Book.deleteBook(ctx);
    });
    $('#update').on('click', function(event) {
      event.preventDefault();
      bookView.updateBook(ctx);
    }
    )}

  //shows just the entry inputs for the new book.
  bookView.initNewBookPage = () => {
    $('.container').hide();
    $('.new-book-form').show();
    $('#new-form')[0].reset();
    $('#new-form').one('submit', function(event) {
      console.log('this is event', event);
      event.preventDefault();

      let book = {
        title: $('#book-title').val(),
        author: $('#book-author').val(),
        isbn: $('#book-isbn').val(),
        image_url: $('#book-image-url').val(),
        description: $('#book-description').val(),
      };

      module.Book.insertRecord(book);
    }
    )};

  // getting the info from the inputs for the book

  // bookView.create = () => {
  //   var book;
  //   $('#new-form').empty();
  //
  //   book = new module.Book({
  //     title: $('#book-title').val(),
  //     author: $('#book-author').val(),
  //     isbn: $('#book-isbn').val(),
  //     image_url: $('#book-image-url').val(),
  //     description: $('#book-description').val(),
  //   });
  //
  //   $('#new-form').append(book.toHtml());
  // };

  // this is for updating the book.

  bookView.updateBook = (ctx) => {
    $('.container').hide();
    $('.update-book-form').show();
    $('#update-form input[name="title"]').val(ctx.title);
    $('#update-form input[name="author"]').val(ctx.author);
    $('#update-form input[name="isbn"]').val(ctx.isbn);
    $('#update-form input[name="image_url"]').val(ctx.image_url);
    $('#update-form textarea').val(ctx.description);

    $('#update-form').on('submit', function(event) {
      event.preventDefault();
      let book = new module.Book({
        book_id: ctx.book_id,
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      });

      module.Book.update(book);

    }
    )};

  module.bookView = bookView;

}) (app)

// $(function() {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// })

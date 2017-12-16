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
  bookView.initSingleBookPage = (ctx, next) => {
    $('.container').hide();
    $('.detail-view').show();
    $('.detail-view').empty();
    let template = Handlebars.compile($('#detail-view-template').text());
    $(`.detail-view`).append(template(ctx.book));
    app.adminView.verify();
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

    $('.admin').hide();
    $('#new-form').one('submit', function(event) {
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

  // this is for updating the book.

  bookView.updateBook = (ctx) => {
    $('.container').hide();
    $('.update-book-form').show();
    $('#update-form input[name="title"]').val(ctx.book.title);
    $('#update-form input[name="author"]').val(ctx.book.author);
    $('#update-form input[name="isbn"]').val(ctx.book.isbn);
    $('#update-form input[name="image_url"]').val(ctx.book.image_url);
    $('#update-form textarea').val(ctx.book.description);

    $('#update-form').on('submit', function(event) {
      event.preventDefault();
      let book = new module.Book({
        book_id: ctx.params.book_id,
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      });
      module.Book.update(book);

    }
    )};

  //method to search for books
  bookView.initSearchFormPage = function() {
    console.log('search form page running');
    $('.container').hide();
    $('.search-view').show();

    $('#search-form').one('submit', function(event) {

      event.preventDefault();
      let book = {
        author: event.target.author.value || '',
        title: event.target.title.value || '',
        isbn: event.target.isbn.value || '',
      };
      console.log('this is book', book)
      module.Book.find(book, bookView.initSearchResultsPage);

      event.target.title.value = '';
      event.target.author.value = '';
      event.target.isbn.value = '';
    })
  }

  //method to display search results
  bookView.initSearchResultsPage = (callback) => {
    $('.container').hide();
    $('.search-results').show();
    $('#search-form').empty();
    app.Book.all.map(book => $('#search-results').append(book.toHtml()));
    $('.detail-link a').text('Add to List').attr('href', '/');
    $('#detail-link').on('click', function(e) {
      module.Book.findOne($(this).parent().parent().parent().data())
    });

  }
  module.bookView = bookView;

}) (app)

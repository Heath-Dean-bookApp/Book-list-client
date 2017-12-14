'use strict';

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
  bookView.initSingleBookPage = (ctx) => {
    $('.container').hide();
    $('.detail-view').show();
    $('.detail-view').empty();
    let template = Handlebars.compile($('#detail-view-template').text());
    $(`.detail-view`).append(template(ctx));
  }

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

  module.bookView = bookView;

}) (app)

// $(function() {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// })

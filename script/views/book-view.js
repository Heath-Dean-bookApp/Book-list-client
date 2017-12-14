'use strict';

var app = app || {};

(function(module) {
  const bookView = {};

  //shows all the books on the home page
  bookView.initIndexPage = function() {
    console.log('this is inside the initIndexPage');
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(book => $(`#book-list`).append(book.toHtml()));
  }

  //shows just a single book
  bookView.initSingleBookPage = function() {
    $('.container').hide();
    $('.detail-view-container').show();
    module.Book.all.map(book => $(`.detail-view`).append(book.toHtml()));
  }

  //shows just the entry inputs for the new book.
  bookView.initNewBookPage = () => {
    $('.container').hide();
    $('.new-book-form').show();
    $('#new-form').on('submit', bookView.submit);
  }


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

  bookView.submit = event => {
    event.preventDefault();
    let book = new app.Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-image-url').val(),
      description: $('#book-description').val(),
    });

    app.Book.insertRecord();

    window.location = '../';
  }

  module.bookView = bookView;
}) (app)

// $(function() {
//   app.Book.fetchAll(app.bookView.initIndexPage);
// })

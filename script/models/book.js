'use strict'

var __API_URL__ = 'http://localhost:3000';// local use only
// var __API_URL__ = 'https://hs-dm-booklist.herokuapp.com';// for deployed testing
var app = app || {};

(function(module) {
  function Book(bookDataObj) {

    Object.keys(bookDataObj).forEach(key => {this[key] = bookDataObj[key];
    }, this);
  }

  function errorCallback(err) {
    console.error(err);
    app.errorview.initErrorPage(err);
  }

  Book.all = [];

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.prototype.findOne = function(ctx){
    $.get(`${__API_URL__}/api/v1/books/find/${ctx.isbn}`)
      .then(results => Book.create)
      .catch(errorCallback);
  }

  Book.insertRecord = function(book) {
    // debugger;
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(console.log)
      .then(() => page('/'))

  };

  Book.loadAll = function(rows) {
    rows.sort((a,b) => a.title - b.title);
    Book.all = rows.map(row => new Book(row));
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }

  Book.fetchOne = (ctx, callback) => {
    app.adminView.verify();
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book =results[0])
      .then(callback)
      .catch(errorCallback);
  }

  Book.deleteBook = function(ctx, callback) {
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${ctx.params.book_id}`,
      method: 'DELETE'
    })

      .then(() => page('/'))
      .then(callback);
  };


  Book.update = function(book, callback) {
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${book.book_id}`,
      method: 'PUT',
      data: book
    })
      .then(console.log(200))
      .then(() => page('/'))
      .then(callback);
  };

  Book.find = (book, callback) => {
    $.get(`${__API_URL__}/api/v1/books/find`, book)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback)
  }

  Book.findOne = isbn => {
    $.get(`${__API_URL__}/api/v1/books/find/${isbn}`)
      .then(Book.create)
      .catch(errorCallback);
  }

  module.Book = Book;
}) (app)



// export PORT=3000
// export CLIENT_URL=http://localhost:8080
// export DATABASE_URL=postgres://localhost:5432/books_app

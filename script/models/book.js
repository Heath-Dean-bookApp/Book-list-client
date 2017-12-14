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
    module.errorview.initErrorPage(err);
  }

  Book.all = [];

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.insertRecord = function(book) {
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(console.log)
      .then(() => page('/'))

  };

  Book.loadAll = function(rows) {
    rows.sort((a,b) => a.title - b.title);
    Book.all = rows.map(row => new Book(row));
    console.log('load all book.all', Book.all);
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }

  Book.fetchOne = (ctx, callback) => {
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book =results[0])
      .then(callback)
      .catch(errorCallback);
  }

  Book.deleteBook = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  Book.updateBook = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        author_id: this.author_id
      }
    })
      .then(console.log)
      .then(callback);
  };

  module.Book = Book;
}) (app)

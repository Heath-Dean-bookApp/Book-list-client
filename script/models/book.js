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
    rows.map(row => Book.all.push(new Book(row)));
    console.log('load all book.all', Book.all);
  };

  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }

  Book.fetchOne = callback => {
    $.get(`${__API_URL__}/api/v1/books/:id`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  }

  module.Book = Book;
}) (app)

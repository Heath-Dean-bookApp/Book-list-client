'use strict'

// var __API_URL__ = 'http://localhost:3000';// local use only
var __API_URL__ = 'https://hs-dm-booklist.herokuapp.com';// for deployed testing
var app = app || {};

// (function(module) {
function Book(bookDataObj) {

  Object.keys(bookDataObj).forEach(key => {this[key] = bookDataObj[key];
  }, this);
}

Book.all = [];

// Book.prototype.toHtml = function() {
//   var template = Handlebars.compile($('#book-list-template').text());
//
//   return template(this);
// };

Book.loadAll = function(rows) {
  rows.sort((a,b) => a.title - b.title);
  rows.map(row => Book.all.push(new Book(row)));
  console.log('load all book.all', Book.all);
};

Book.fetchAll = function (callback) {
  $.get(`${__API_URL__}/api/v1/books`)
    .then(data => {
      Book.loadAll(data)
      if (callback) callback();
    })
};

$(document).ready(() => {
  Book.fetchAll();
});

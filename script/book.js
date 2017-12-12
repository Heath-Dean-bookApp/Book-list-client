
var __API_URL__ = 'http://localhost:3000/api/v1/books';
console.log('this is a test of book.js');

function Book(bookDataObj) {

  Object.keys(bookDataObj).forEach(key => {this[key] = bookDataObj[key];
  }, this);
}

Book.all = [];

Book.prototype.toHtml = function() {
  var template = Handlebars.compile($('#book-list-template').text());

  return template(this);
};

Book.loadAll = function(rows) {
  rows.sort((a,b) => a.title - b.title);
  rows.map(row => Book.all.push(new Book(row)));
  console.log('load all book.all', Book.all);
};

Book.fetchAll = function (callback) {
  $.get(__API_URL__)
    .then(data => {
      Book.loadAll(data)
      if (callback) callback();
    })
};

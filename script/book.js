
var __API_URL__ = 'http:localhost:3000';
console.log('this is a test of book.js');

function Book(bookDataObj) {

  Object.keys(bookDataObj).forEach(key => this[key] = bookDataObj[key]);
}

Book.all = [];

// Book.prototype.toHtml = function() {
//   var template = Handlebars.compile($('#book-list-template').text());
//
//   return template(this);
// };

Book.loadAll = bookData => {
  // rawData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  Book.all = bookData.map(bookObject => new Book(bookObject));
};

Book.fetchAll = () => {
  $.get(`${__API_URL__}/api/v1/books`)
    .then(
      Book.loadAll
      // callback();
    )
};

'use strict';

var errorView = {};
var app = app || {};

(function(module) {
  errorView.initErrorPage = (err) => {
    let template = Handlebars.compile($('#error-template').text());
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    $('#error-message').append(template(err));
  };
  module.errorView = errorView;
}) (app)

// errorView.errorCallback = (errorView) => {
//   errorView.initErrorPage(errorView);
// };

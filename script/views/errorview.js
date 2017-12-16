'use strict';


var errorView = {};
var app = app || {};


(function(module) {
  errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    $('#error-message').append(template(err));
    let template = Handlebars.compile($('#error-template').text());
  };
  module.errorView = errorView;
}) (app)

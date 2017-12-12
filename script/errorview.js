'use strict';

var errorView = {};

errorView.initErrorPage = (err) => {
  let template = Handlebars.compile($('#error-template'))
  $('.container').hide();
  $('.error-view').show();
  $('#error-message').empty();
  $('#error-message').append(template(err));
};

errorView.errorCallback = (errorView) => {
  errorView.initErrorPage(errorView);
};

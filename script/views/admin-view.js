'use strict';

var app = app || {};
var __API_URL__ = 'http://localhost:3000';

(function (module) {
  const adminView = {};

  adminView.initAdminPage = function() {
    $('.container').hide();
    $('.admin-view').show();
  };

  adminView.verify = function(next) {
    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = event.target.password.value;

      $.get(`${__API_URL__}/admin`, {token})
        .then(() => {
          localStorage.token = true;
        })
        .catch(() => page('/'));
    })
    if(!localStorage.token) $('.admin').hide();
      console.log('no password');
    else console.log('password:', localStorage.token)
    next();
  }

  module.adminView = adminView;
})(app)

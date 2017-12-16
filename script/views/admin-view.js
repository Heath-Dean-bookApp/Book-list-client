'use strict';

var app = app || {};
var __API_URL__ = 'http://localhost:3000';

(function (module) {
  const adminView = {};

  adminView.initAdminPage = function (ctx, next) {
    $('.container').hide();
    $('.admin-view').show();

    $('#admin-form').one('submit', function(event) {
      event.preventDefault();
      let token = event.target.password.value;
      localStorage.token = token;

      $.get(`${__API_URL__}/api/v1/admin`, {token})
        .then(res => {
          if (res) console.log('token')
          else console.log('no token');
          page('/');
        })
    })
  };

  adminView.verify = function() {
    if (!localStorage.token) {
      $('.admin').hide();
      console.log('NO, Does not have localStorage');
    } else {
      $('.admin').show();
      console.log('YES, Has localStorage');
    }
  }
  module.adminView = adminView;
})(app)

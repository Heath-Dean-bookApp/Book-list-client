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
      console.log('inside the adminPage');

      $.get(`${__API_URL__}/api/v1/admin`, {token})
        .then(console.log('inside the get'))
        .then(() => page('/'))
        // .then(res => {
        //   if (res) console.log('token')
        //   else console.log('no token');
        //   page('/');
        })
        .then(res => {
          page('/');
        })
    })
  };

  adminView.verify = function(ctx, next) {
    if (!localStorage.token) {
      $('.admin').addClass('admin-only');
    } else {
      console.log('admin verify running');
      $('.admin').show();
    }
  }

  module.adminView = adminView;
})(app)

'use strict';

$('.NavBut').click(function() {
  $(this).toggleClass('expanded').siblings('div').slideToggle();
});

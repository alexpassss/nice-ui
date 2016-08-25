$(function() {
  $('#accordion').accordion();

  $('.sortable, #main-container').sortable({
      revert: true,
      connectWith: '.connectedSortable',
      tolerance: 'pointer'
    })
    .disableSelection();

  $('.draggable-elem').draggable({
    connectToSortable: '.sortable',
    helper: 'clone',
    revert: 'invalid',
    stop: function(event, ui) {
      var $content = ui.helper.find('.content-box');
      $content.replaceAll(ui.helper).show();
    }
  });

  $('.draggable-block').draggable({
    connectToSortable: '.sortable',
    helper: 'clone',
    revert: 'invalid',
    stop: function(event, ui) {
      var content = ui.helper.find('.content-box').html();
      $(content).replaceAll(ui.helper).show();
    }
  });
  
  $('ul, li').disableSelection();
});

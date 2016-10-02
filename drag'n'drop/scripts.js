$(function() {

  $('#accordion').accordion({
    collapsible: true
  });

  var sortableOptions = {
      helper: 'clone',
      connectWith: '.connectedSortable',
      tolerance: 'pointer'
  };
  $('.sortable').sortable(sortableOptions);
  //   .disableSelection();


  $('.draggable-elem').draggable({
    connectToSortable: '.connectedSortable',
    helper: 'clone',
    revert: 'invalid',
    stop: function(event, ui) {
      if (ui.helper.parent().hasClass('sortable')) {
        var content = ui.helper.find('.content-box').html();
        $(content).replaceAll(ui.helper).show();

        reloadSortable();
      }
    }
  });


  // $('.column').resizable({
  //   resize: function(event, ui) {
  //     var parentSize = parseFloat(ui.element.parent().css('width'));
  //     var grid = Math.round(ui.size.width / parentSize * 12);

  //     for (var i = 1; i <= 12; i++) {
  //       ui.element.removeClass('col-md-' + i);
  //     }

  //     if (grid === 0) {
  //       grid = 1;
  //     } else if (grid > 12) {
  //       grid = 12;
  //     }

  //     ui.element.addClass('col-md-' + grid);
  //   },
  //   stop: function(event, ui) {
  //     ui.element.removeAttr('style');
  //   }
  // });


  $('.trash').droppable({
    tolerance: 'touch',
    over: function(event, ui) {
      $('.trash').addClass('garbage-bin-opened');
    },
    out: function(event, ui) {
      $('.trash').removeClass('garbage-bin-opened');
    },
    drop: function(event, ui) {
      var $trash = $('.trash');

      if (ui.draggable.hasClass('draggable-elem')) {
        $trash.removeClass('garbage-bin-opened');
        return;
      }

      $trash.removeClass('garbage-bin-opened');      
      var $notification = $('.trash__notification');
      
      ui.draggable.remove();      
      $notification.fadeIn();

      reloadSortable();

      setTimeout(function() {
        $notification.fadeOut();
      }, 1600);
    }
  });

  function reloadSortable() {
    $('.sortable')
      .sortable()
      .sortable('destroy')
      .sortable(sortableOptions);
  }

  $('ul, li').disableSelection();
});

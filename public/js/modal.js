(function ($, window, document) {
          var defaults = {
            slideFrom: 'left',
            overlay: true,
            closeKey: 27
          },
          modalTmp = $('<div class="modal"></div>').append('<a href="#" class="modal-close"><img style="width: 19px;" src="arrow.svg"></img></a>'),
          overlay = $(document.createElement('div')).addClass('modal-overlay').css('opacity', 0.8);
         
          $.modal = function (msg, options) {
            msg = $(msg).length ? $(msg).html() : msg;
         
            options = $.extend({}, defaults, options);
         
            var isOpen = true;
         
            if (!$('.modal').length) {
              modalTmp.appendTo('body');
            }
         
            modalTmp.append(msg).animate({
              top: '11%'
            });
         
            if (options.overlay) {
              if (!$('.overlay').length) {
                overlay.appendTo('body');
              }
              overlay.fadeIn();
            }
         
            $(document).on('modal:close', function () {
              modalTmp.stop().animate({
                top: '-100%'
              }, function () {
                $(this).contents().filter(function () {
                  return !$(this).is('.modal-close');
                }).remove();
              });
              overlay.fadeOut();
              isOpen = false;
            });
         
            $(document).on('click touchend', '.modal-overlay, .modal-close', function (e) {
              if (!isOpen || $(e.target).is('.modal')) return;
              $(this).trigger('modal:close');
            });
            $(document).keydown(function (e) {
              if (e.which !== options.closeKey) return;
              $(this).trigger('modal:close');
            });
          };
          // uncomment to replace the default `alert()`
          // window.alert = $.modal;
         })(jQuery, window, document);
         
         $('a').click(function () {
          $.modal();
         });
function openModal(title, textModal, imgModal) {
    setTimeout(function() {
        fullyLoaded();
    }, 1000);

    function fullyLoaded() {
        $("#loader").fadeOut("slow");
    }

    var defaults = {
            slideFrom: 'left',
            overlay: true,
            closeKey: 27
        },
        modalTmp = $('<div class="modal"><div id="loader"><div></div>').append('<div class="title">' + title + '</div><div class="textModal">' + textModal + '</div><img class="imgModal" src="' + imgModal + '"/><a href="#" class="modal-close"><img style="width: 26px;margin-left: -19em;opacity: 0.65;" src="public/img/arrow.png"></img></a>');
    overlay = $(document.createElement('div')).addClass('modal-overlay').css('opacity', 0.8);

    $.modal = function(msg, options) {
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

        $(document).on('modal:close', function() {
            modalTmp.stop().animate({
                top: '100%'
            }, function() {
                $(this).contents().filter(function() {
                    return !$(this).is('.modal-close');
                }).remove();
            });
            overlay.fadeOut();
            isOpen = false;
        });

        $(document).on('click touchend', '.modal-overlay, .modal-close', function(e) {
            if (!isOpen || $(e.target).is('.modal')) return;
            $(this).trigger('modal:close');
        });
        $(document).keydown(function(e) {
            if (e.which !== options.closeKey) return;
            $(this).trigger('modal:close');
        });
    };
    // uncomment to replace the default `alert()`
    // window.alert = $.modal;
}
$('a').click(function() {
    $.modal();
});

function changeValue() {
    $('#meuScore').text('0');
    $('#meuAumento').text('0.00');
    $('#meuSalario').text('4.086,00');
}
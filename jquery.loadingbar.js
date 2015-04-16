/* ===========================================================
 * jquery-loadingbar.js
 * ===========================================================
 * fork de https://github.com/peachananr/loading-bar
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Add a Youtube-like loading bar  
 * to all your AJAX links 
 *
 * https://github.com/peachananr/loading-bar
 *
 * ========================================================== */

(function($) {

    var defaults = {
        replaceURL: false,
        target: "#loadingbar-frame",
        direction: "right",
        clickNamespace: "loadingbar",
        effect: true,
        removeAfterSuccess: false,
        afterRender: function(data, target, el) {},

        /* Deafult Ajax Parameters  */
        async: true,
        cache: true,
        global: true,
        headers: {},
        statusCode: {},
        dataType: "html"
    };

    $.fx.step.textShadowBlur = function(fx) {
        $(fx.elem).prop('textShadowBlur', fx.now).css({
            textShadow: '0 0 ' + Math.floor(fx.now) + 'px black'
        });
    };


    $.fn.loadingbar = function(options) {
        var settings = $.extend({}, defaults, options);

        return this.each(function(index, element) {
            var el = $(element),
                href = el.attr("href"),
                target = (el.data("target")) ? el.data("target") : settings.target,
                type = (el.data("type")) ? el.data("type") : settings.type,
                datatype = (el.data("datatype")) ? el.data("datatype") : settings.dataType,
                clickNamespace = (el.data("namespace")) ? el.data("namespace") : settings.clickNamespace;

            // Se elimina y agrega el evento para evitar duplicados.
            el.off('click.' + clickNamespace).on('click.' + clickNamespace, function() {
                $.ajax({
                    type: type,
                    url: href,
                    async: settings.async,
                    cache: settings.cache,
                    global: settings.global,
                    headers: settings.headers,
                    statusCode: settings.statusCode,
                    dataType: datatype,
                    beforeSend: function() {
                        if ($("#loadingbar").length === 0) {
                            $("body").append("<div id='loadingbar'></div>");
                            $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));

                            switch (settings.direction) {
                                case 'right':
                                    $("#loadingbar").width((50 + Math.random() * 30) + "%");
                                    break;
                                case 'left':
                                    $("#loadingbar").addClass("left").animate({
                                        right: 0,
                                        left: 100 - (50 + Math.random() * 30) + "%"
                                    }, 200);
                                    break;
                                case 'down':
                                    $("#loadingbar").addClass("down").animate({
                                        left: 0,
                                        height: (50 + Math.random() * 30) + "%"
                                    }, 200);
                                    break;
                                case 'up':
                                    $("#loadingbar").addClass("up").animate({
                                        left: 0,
                                        top: 100 - (50 + Math.random() * 30) + "%"
                                    }, 200);
                                    break;
                            }

                        }
                    }
                }).always(function() {
                    switch (settings.direction) {
                        case 'right':
                            $("#loadingbar").width("101%").delay(200).fadeOut(400, function() {
                                $(this).remove();
                            });
                            break;
                        case 'left':
                            $("#loadingbar").css("left", "0").delay(200).fadeOut(400, function() {
                                $(this).remove();
                            });
                            break;
                        case 'down':
                            $("#loadingbar").height("101%").delay(200).fadeOut(400, function() {
                                $(this).remove();
                            });
                            break;
                        case 'up':
                            $("#loadingbar").css("top", "0").delay(200).fadeOut(400, function() {
                                $(this).remove();
                            });
                            break;
                    }

                }).done(function(data) {

                    if ($(target).length <= 0) {
                        console.log('El resultado no puede mostrarse porque no existe un target: "' + target + '"');
                    }

                    if (history.replaceState && settings.replaceURL === true) history.pushState({}, document.title, href);
                    if (settings.done) {
                        settings.done(data, target);
                    } else {
                        $(target).html(data);

                        if (settings.effect) {
                            $(target).hide().fadeIn();
                        }
                    }

                    if (settings.removeAfterSuccess) {
                        el.off('click.' + clickNamespace);
                    }

                    settings.afterRender(data, target, el);

                }).fail(function(jqXHR, textStatus) {
                    if (settings.fail) {
                        settings.fail(jqXHR, textStatus);
                    } else {
                        alert('Request failed: ' + textStatus);
                    }
                });
                return false;
            });

        });
    };

}(window.jQuery));

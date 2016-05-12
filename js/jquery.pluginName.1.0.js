/*
 *  plugin name:
 *  Description:
 */
;(function($) {
  var pluginName = '';

  $.fn[pluginName] = function(options) {
    options = $.extend({
      foo1 : ''
    }, options || {});

    init();

    function init() {

    }

    return this;
  };
})(jQuery);

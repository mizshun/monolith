var MONOLITH = MONOLITH || {};

(function ($, window, MONOLITH) {

  'use strict';

  var ML = MONOLITH,
  // ===================================
  // MONOLITH OBJECT
  // ===================================
  ML = {
    settings: {
    },

    METHODS: {
      init: function () {
        ML.METHODS.createClickableArea($('article'), 'h3');

        // スマートフォン
        if (UA.isSmartPhone) {
          window.console.log(UA); // todo 確認用 消去
          ML.METHODS.hideAddressBar();
        }
      },

      /**
       * ページ読み込み時アドレスバーを隠す
       */
      hideAddressBar: function () {
        setTimeout(function () {
          scrollTo(0, 1);
        }, 100);
      },

      /**
       * ドロップダウンアニメーションで要素を表示する
       * @param {jQueryObject} $this ドロップダウン表示する要素
       */
      dropdown: function ($this) {
        var $that = $this;
        var heightFlg = $that.height();
        var height = $that.find('ul').height();
        if (!heightFlg) {
          $that.queue([]).stop().animate({
            height: height
          }, {
            duration: 300
          });
        } else {
          $that.queue([]).stop().animate({
            display: 'none',
            height: 0
          }, {
            duration: 300
          });
        }
      }
    }
  };

  // INITIAL EXECUTE
  ML.METHODS.init();

  // ===================================
  // EXECUTE BY EVENT
  // ===================================
  // DROP DOWN OF GLOBAL NAVIGATION FOR MOBILE
  $btnMenu.on('click', $globalNav, function (eo) {
    ML.METHODS.dropdown(eo.data);
  });
}(jQuery, window, MONOLITH));

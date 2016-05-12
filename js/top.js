var MONOLITH = MONOLITH || {};

jQuery(function ($, window, MONOLITH) {

  'use strict';

  var ML = MONOLITH,

  // ===================================
  // DOM
  // ===================================
  $window  = ML.DOM.$window,
  $service = ML.DOM.$service = $('.service'),
  $article = ML.DOM.$article = $('article'),
  $bxslider = ML.DOM.$bxslider = $('.bxslider'),

  // ===================================
  // METHODS
  // ===================================
  /**
   * 要素の高さをあわせる
   * @param {jQueryObject} $this         高さをあわせる要素
   * @param {Mix}          paddingBottom 要素下の余白
   */
  adjustHeight = ML.METHODS.adjustHeight = function ($this, paddingBottom) {
    var $this     = $this,
        resHeight = 0,
        pb        = paddingBottom,
        hH, pH;
    // 高さを取得する
    $this
      .css({ paddingBottom: pb })
      .each(function () {
        hH = $(this).find('h3').outerHeight(true);
        pH = $(this).find('p').outerHeight(true);
        resHeight = Math.max(resHeight, hH + pH);
      })
      .height(resHeight);
  };

  // ===================================
  // EXECUTE BY EVENT
  // ===================================
  // 要素の高さをあわせる(オリエンテーション時にも)
  $window.on('load resize', function () {
    adjustHeight($service.find('.post-body'), 45);
  });

  // ===================================
  // PLUGIN
  // ===================================
  // recentWorks スライダー
  $('.bxslider').bxSlider({
    auto: true,
    speed: 500,
    pause: 5000
  });
}(jQuery, window, MONOLITH));

var MONOLITH = MONOLITH || {};

jQuery(function ($, window, MONOLITH) {

  'use strict';

  var ML = MONOLITH,

  // ===================================
  // DOM
  // ===================================
  $btnSubMenu = ML.DOM.$btnSubMenu = $('#btn-subMenu'),
  $blogSub    = ML.DOM.$blogSub    = $('.blog-sub'),

  // ===================================
  // METHODS
  // ===================================
  /**
   * アニメーションで要素を表示する (FIXED対策)
   * @param {jQueryObject} $this 表示する要素
   */
  openSub = ML.METHODS.openSub = function ($this) {
    // if (!$this.hasClass('open')) {
    //   setTimeout(function () { scrollTo(0, ML.DOM.$body.scrollTop() + 1); }, 100);
    // }
    $this.toggleClass('open');
    return false;
  };

  // ===================================
  // EXECUTE BY EVENT
  // ===================================
  // ブログサブナビゲーション開閉
  $btnSubMenu.on('click', $blogSub, function (e) {
    openSub(e.data);
  });

}(jQuery, window, MONOLITH));

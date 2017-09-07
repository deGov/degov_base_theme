/**
 * @file shariff-2click.js
 *
 * Changes the behavior of the Shariff sharing buttons in the header paragraph.
 */
(function ($, Drupal) {

  'use strict';

  /**
   * @todo.
   */
  Drupal.behaviors.nrw_base_theme = {
    attach: function (context, settings) {
      // Add an overlay to the sharing container to fake 2-click sharing buttons.
      $('.sharing li', context).once('sharing-overlay').each(function () {
        var sharing = $(this);
        var shariff = $('.shariff', sharing);
        var overlay = $('<div class="sharing-overlay"></div>').appendTo(sharing);


        // Sets shariff theme.
        var setTheme = function (theme) {

          var current_theme = shariff.attr('data-theme');

          if (current_theme !== theme) {
              sharing
              .removeClass('theme-grey')
              .addClass('theme-' + theme);
            shariff.attr('data-theme', theme)
          }
        };

        // Initialize shariff theme.
        setTheme('grey');

        // Switch shariff theme and remove overlay.
        overlay.click(function () {
          setTheme('colored');
          overlay.remove();
        });
      });
    }
  };
})(jQuery, Drupal);

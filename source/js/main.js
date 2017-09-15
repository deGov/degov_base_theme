// state class should be ".is-*****"

/* eslint-disable no-unused-vars, lines-around-comment*/
const Bootstrap = require('bootstrap-sass');
/* eslint-enable no-unused-vars, lines-around-comment */

const PhotoSwipe = require('photoswipe');
const PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');

(function ($, Drupal) {
  // Repeat parent element of dropdown as first element
  Drupal.behaviors.dropdown = {
    attach: function (context, settings) {
      $(context).find('.navbar-nav').once('dropdown').each(function () {
        $(this).find('ul.dropdown-menu').each(function () {
          const $rootA = $(this).siblings('a').first();
          const href = $rootA.attr('href');
          const text = $rootA.text();
          $(this).prepend('<li><a class="dropdown-parent-link" href="' + href + '">' + text + '</a></li>');
        });
      });
    }
  };

  // Footer menu open in responsive
  Drupal.behaviors.footerResposive = {
    attach: function (context, settings) {
      $('.nrw-menu-footer__header i').once('footer-clic').click(function () {
        $(this).closest('.nrw-menu-footer__col').toggleClass('is-open');
      });
    }
  };

  // Add current week in calendar
  Drupal.behaviors.currentWeek = {
    attach: function (context, settings) {
      $('.calendar--widget td.today').once('change-background').each(function () {
        $(this).closest('tr').children('td').addClass('current-week');
      });
    }
  };

  // same Datepicker in calendars
  Drupal.behaviors.datepickerCalendar = {
    attach: function (context, settings) {
      $(context).find('input[type="date"]').once('date-pricker').each(function () {
        $(this).datepicker({dateFormat: 'yy-mm-dd'}).attr('type', 'text');
      });
    }
  };

  // upper Menu
  Drupal.behaviors.upperMenu = {
    attach: function (context, settings) {
      $(context).find('.header__upper-menu--title').once('upper-menu-click').click(function () {
        $(this).parent().toggleClass('is-open');
      });
      $(window).resize(function () {
        if ($(window).width() > 720) {
          $('.header__upper-menu').removeClass('is-open');
        }
      });
    }
  };

  // Open/close search
  Drupal.behaviors.openSearch = {
    attach: function (context, settings) {
      $(context).find('.nrw-menu-header__icon.menu-search').once('upper-menu-click').click(function () {
        const $search = $('.nrw-menu-header__search');
        $search.toggleClass('is-open is-close').find('input').focus();
        if ($search.hasClass('is-open')) {
          $(this).attr('aria-expanded', 'true');
        } else {
          $(this).attr('aria-expanded', 'false').focus();
        }
      });
      $('.nrw-menu-header__search-close a', context).click(function (e) {
        $('.nrw-menu-header__icon.menu-search').focus();
        $('.nrw-menu-header__search').toggleClass('is-open is-close');
      });
      $('.nrw-menu-header__search-close i', context).click(function (e) {
        $('.nrw-menu-header__search').toggleClass('is-open is-close');
        $('.nrw-menu-header__icon.menu-search').focus();
      });
      $('.nrw-menu-header__search .fa-search', context).click(function (e) {
        const value = $('input.nrw-menu-header__search-text').val();
        window.location.href = '/suche?volltext=' + value;
      });
      $(document).once('press-enter').keypress(function (e) {
        if (e.which === 13) {
          if ($('.nrw-menu-header__search-text').is(':focus')) {
            const value = $('input.nrw-menu-header__search-text').val();
            window.location.href = '/suche?volltext=' + value;
          }
        }
      });
    }
  };

  // Language dropdown
  Drupal.behaviors.lang = {
    attach: function (context, settings) {
      $(context).find('#block-languageswitcher .active-lang').once('lang-click').click(function () {
        const isOpen = $(this).hasClass('open');
        $(this).toggleClass('open', !isOpen);
        $(this).siblings('ul').toggleClass('open', !isOpen);
      });

      $(context).find('#block-languageswitcher a').once('lang-link').each(function () {
        const hrefLang = $(this).attr('hreflang');
        $(this).text(hrefLang);
      });
    }
  };

  // Search
  Drupal.behaviors.navSearch = {
    attach: function (context, settings) {
      $('.block-search', context).once('nav-search').each(function () {
        const $container = $(this);

        // open when clicking on the button the first time
        $container.find('button').click(function () {
          if ($('body', context).hasClass('expanded-search')) {
            return true;
          }
          $(context).find('body').addClass('expanded-search');
          $container.find('input[type="search"]', $container).focus();

          $(document).on('click.hideSearch', '*', function (e) {
            if (!$(e.target).closest('.block-search').length) {
              $('body', context).removeClass('expanded-search');
              $(document).off('click.hideSearch');
            }
          });
          return false;
        });
      });
    }
  };

  // Add body class on scroll
  Drupal.behaviors.scroll = {
    attach: function (context, settings) {
      $(context).find('body').once('scroll-class').each(function () {
        const headerOffset = $('.navbar-secondary', context).outerHeight();
        const $body = $(this);
        $(window).scroll(function (event) {
          const scrollPos = $(window).scrollTop();
          $body.toggleClass('is-scrolling-past-navbar', scrollPos > headerOffset);
          $body.toggleClass('is-scrolling', scrollPos > 0);
        });
      });
      $(context).find('.scroll-to-top').click(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 500);
      });
    }
  };

  Drupal.behaviors.toolBarOffset = {
    attach: function (context, settings) {
      $(context).find('#toolbar-administration').each(function () {
        if ($(window).innerWidth() < 768) {
          return;
        }
        window.setTimeout(function () {
          const offset = $('#toolbar-bar').outerHeight() + $('#toolbar-item-administration-tray').outerHeight();
          const paddingTop = +($('body').css('padding-top').replace('px', ''));

          $('.header-wrapper').css('top', offset);
          $('body').attr('style', 'padding-top: ' + (offset + paddingTop) + 'px !important;');
        }, 100);
      });
    }
  };

  /**
   * Language selection behavior.
   */
  Drupal.behaviors.languageSelector = {
    attach: function (context, settings) {
      $('.language').once('language-selector').each(function () {
        // Open/Close the language menu on click.
        $(this).find('a.selector').click(function () {
          $('.language .options').toggleClass('is-open is-hidden');
        });
        // Open the language menu on tab focus.
        $(this).find('a').on('focusin', function(e) {
          // Do not open the language menu in case it is already open.
          // We have to do this extra check to support keyboard back tabbing.
          if (!$('.language .options').hasClass('is-open')) {
            $('.language .options').toggleClass('is-open is-hidden');
          }
        });
        // Close the language menu on focus out of the language items.
        $(this).find('a').on('blur', function(e) {
          if (!$(e.relatedTarget).hasClass('language-link')) {
            $('.language .options').toggleClass('is-open is-hidden');
          }
        });
      });
    }
  };

  Drupal.behaviors.photoswipe = {
    attach: function (context, settings) {
      $(context).find('.field--name-field-gallery-element-images').once('photoswipe-processed').each(function () {
        const modalContainer = document.querySelectorAll('.pswp')[0];
        const $fields = $(this).find('.field--item');
        const items = [];
        $fields.each(function (i) {
          const $link = $(this).find('a');
          const $img = $link.find('img');
          const width = $img.attr('width') * 3;
          const height = $img.attr('height') * 3;
          const href = $link.attr('href');
          items.push({
            w: width,
            h: height,
            src: href
          });
          $link.click(function (e) {

            const gallery = new PhotoSwipe(modalContainer, PhotoSwipeUiDefault, items, {
              index: i,
              getThumbBoundsFn: function (index) {
                const thumbnail = $(context).find('.field--name-field-gallery-element-images .field--item').eq(index).find('img')[0];
                const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                const rect = thumbnail.getBoundingClientRect();
                return {
                  x: rect.left,
                  y: rect.top + pageYScroll,
                  w: rect.width
                };
              }
            });
            gallery.init();
            e.preventDefault();
          });
        });
      });
    }
  };

  Drupal.behaviors.selectize = {
    attach: function (context, settings) {
      $('.webform-submission-form .form-select').selectric();
      $('.block-facets .facets-dropdown').selectric();
    }
  };

  Drupal.behaviors.resetform = {
    attach: function (context, settings) {
      $(context).find('.reset-form').once('reset-form').each(function () {
        $('.reset-form').click(function () {
          $(this).closest('.paragraph__content').find('form').trigger('reset');
        });
      });
      $(document).once('reset-form-press').keypress(function (e) {
        if (e.which === 13) {
          if ($('.reset-form a').is(':focus')) {
            $('.reset-form a').closest('.paragraph__content').find('form').trigger('reset');
          }
        }
      });
    }
  };

  Drupal.behaviors.datePopup = {
    attach: function (context, settings) {
      $(context).find('.form-type-date').once('date-popup').each(function () {
        $('i', this).click(function () {
          $(this).siblings('.form-date').focus();
        });
      });
    }
  };

  // Check heigh of image in contact person
  Drupal.behaviors.contactHeight = {
    attach: function (context, settings) {
      $('.region-content .media-contact').once('check-height').each(function () {
        const height = $(this).find('.media-contact__image-wrapper').height();
        $(this).find('.media-contact__info').css('height', height + 'px');
      });
    }
  };

  // Move popup always at the beginning at the dom.
  Drupal.behaviors.MoveEuCookieCompliancePopup = {
    attach: function (context, settings) {
      $('#sliding-popup').once('sliding-popup-moved').prependTo('body');
    }
  };

})(jQuery, window.Drupal);

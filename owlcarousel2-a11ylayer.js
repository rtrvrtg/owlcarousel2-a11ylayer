// Initialise OwlCarousel accessibility plugin
// Compatible with Owl Carousel 2.x

;(function($, window, document){
  var Owl2A11y = function(carousel) {
    this._core = carousel;
    this._initialized = false;

    this._core._options = $.extend(Owl2A11y.Defaults, this._core.options);

    this.$element = this._core.$element;

    this._handlers = {
      'initialized.owl.carousel': $.proxy(function(e) {
        this.setupRoot();
        if (e.namespace && !this._initialized) {
          this.setupKeyboard();
          this.setupFocus();
        }
        this.setCurrent();
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        this.setCurrent();
      }, this),
    };
    this.$element.on(this._handlers);
  };

  var focusableElems = function(elem) {
    return $(elem).find('a, input, select, button, *[tabindex]');
  };

  var focused = function(targ){
    var targ = $(targ);
    if (targ.attr('data-owl-carousel-focused') == 1) {
      return targ;
    }
    var closest = targ.closest('[data-owl-carousel-focused="1"]');
    if (closest.length > 0) return closest;
    return null;
  };

  var documentKeyUp = function(e) {
    var eventTarg = $(e.target),
    targ = focused(eventTarg),
    action = null;

    if (!!targ) {
      if (e.keyCode == 37 || e.keyCode == 38) {
        action = "prev";
      }
      else if (e.keyCode == 39 || e.keyCode == 40) {
        action = "next";
      }
      else if (e.keyCode == 13) {
        if (eventTarg.hasClass('owl-prev')) action = "prev";
        else if (eventTarg.hasClass('owl-next')) action = "next";
      }
      if (!!action) {
        targ.trigger(action + '.owl.carousel');
      }
    }
  };

  Owl2A11y.defaults = {};

  Owl2A11y.prototype.destroy = function() {
    this.$element.unbind('keyup', documentKeyUp)
                 .removeAttr('data-owl-access-keyup')
                 .removeAttr('data-owl-carousel-focusable')
                 .unbind('focusin')
                 .unbind('focusout');
  };

  Owl2A11y.prototype.setupRoot = function() {
    this.$element.attr('role', 'listbox');
  };

  Owl2A11y.prototype.setupKeyboard = function(){
    // Only needed to initialise once for the entire document
    if (!this.$element.attr('data-owl-access-keyup')) {
      this.$element.bind('keyup', documentKeyUp)
                   .attr('data-owl-access-keyup', '1');
    }
    this.$element.attr('data-owl-carousel-focusable', '1');
  };

  Owl2A11y.prototype.setupFocus = function(){
    // Only needed to initialise once for the entire document
    this.$element.bind('focusin', function(){
      $(this).attr('data-owl-carousel-focused', '1')
             .attr('aria-live', 'polite')
             .trigger('stop.owl.autoplay');
    }).bind('focusout', function(){
      $(this).attr('data-owl-carousel-focused', '0')
             .attr('aria-live', 'off')
             .trigger('play.owl.autoplay');
    });
  };

  Owl2A11y.prototype.setCurrent = function() {
    var current = this._core._current,
    targ = focused($(':focus')),
    stage = this._core.$stage;

    if (!!stage) {
      var offs = stage.offset();
      if (!!targ) {
        window.scrollTo(
          offs.left,
          offs.top - parseInt($('body').css('padding-top'), 10)
        );
      }
      $.each(stage.children(), function(index, item){
        var focusable = focusableElems(item);
        if (index == current) {
          $(item).attr('aria-hidden', 'false');
          focusable.attr('tabindex', '0');
        }
        else {
          $(item).attr('aria-hidden', 'true');
          focusable.attr('tabindex', '-1');
        }
      });
      if (!!targ) {
        setTimeout(function(){
          focusableElems(
            stage.children('.active')
          ).first().focus();
        }, 250);
      }
    }
  };

  $.fn.owlCarousel.Constructor.Plugins['Owl2A11y'] = Owl2A11y;
})(window.Zepto || window.jQuery, window,  document);

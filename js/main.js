function Constructor(config) {
    this.body = $(config.body);
    this.navigationButtom = $(config.navigationButtom);
    this.container = $(config.container);
    this.section = $(config.section);
    this.containersWrap = $(config.containersWrap);
    this.sectionOneIconBottom = $(config.sectionOneIconBottom);
    this.menuNavList = $(config.menuNavList);
    this.sliderMain = $(config.sliderMain);
    this.sliderSee = $(config.sliderSee);
    this.sliderMainItem = $(config.sliderMainItem);
    this.jsOpenMore = $(config.jsOpenMore);
    this.jsSliderClose = $(config.jsSliderClose);
    this.jsContentHover = $(config.jsContentHover);
    this.onepagePagination = $(config.onepagePagination);
    this.contactsForm = $(config.contactsForm);
}

//===============
// init
//===============
Constructor.prototype.init = function() {
    var _this = this;

    this.getNavigation();
    this.isSectionTitle();
    this.getScrollPage();
    this.getMenuNavScroll();
    this.getSliderMain();
    this.getSliderMainClick();
    this.getContactForm();
    this.getPopup();
    this.getTouch();
    this.getNoTouch();

};

//===============
// getNoTouch
//===============
Constructor.prototype.getNoTouch = function() {
    if(!Modernizr.touch) {
        $(window).on('load', function() {
            setTimeout(function() {
                $('body').addClass('activePagination');
            }, 2000);
        });
    }
};

//===============
// getTouch
//===============
Constructor.prototype.getTouch = function() {
    $('.menuNav, .menuNav__over').swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
            if(direction == 'left') {
                $('body').removeClass('active_nav');
            }
        }
    });

    $('.menuNav__over').on('click', function() {
        $('body').removeClass('active_nav');
    });

    if(Modernizr.touch) {
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            if(scrollTop >= window.innerHeight) {
                $('body').addClass('activeColorMenu');
            } else {
                $('body').removeClass('activeColorMenu');
            }
        });
    }
};

//===============
// getSliderMainClick
//===============
Constructor.prototype.isFocus = function() {
    var _this = this,
        inputName = this.contactsForm.find('input[name="name"]');

    if(!Modernizr.touch) {
        inputName.focus();
    }
};

//===============
// getSliderMainClick
//===============
Constructor.prototype.getSliderMainClick = function() {
    var _this = this,
        jsOpenMore = this.jsOpenMore;

    this.resetClass = function() {
        jsOpenMore.parents('.sliderContentMain').removeClass('openImagesList');
        jsOpenMore.removeClass('openItem');
    };

    jsOpenMore.find('.sliderSee').on('click', function(e) {
        e.stopPropagation();

        var self = $(this),
            selfMainContent = self.parents('.sliderContentMain'),
            selfItem = self.parents('.js-open-more'),
            b = jsOpenMore;

        selfMainContent.addClass('openImagesList');
        selfItem.addClass('openItem');

        jsOpenMore.on({
            mouseenter: function() {
                $("body").addClass("disabled-onepage-scroll");
                return b.bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(a) {
                    return a.stopPropagation()
                })
            },
            mouseleave: function() {
                $("body").removeClass("disabled-onepage-scroll");
                return b.unbind("mousewheel DOMMouseScroll MozMousePixelScroll")
            }
        }).trigger("mouseenter");

        return selfItem.one("click", function() {
            return selfItem.toggleClass("openItem")
        })
    });

    this.jsSliderClose.on('click', function() {
        jsOpenMore.parents('.sliderContentMain').removeClass('openImagesList');
        jsOpenMore.removeClass('openItem');
    });
};

//===============
// getSliderMain
//===============
Constructor.prototype.getSliderMain = function() {
    var _this = this;

    this.getSliderFunc = function() {
        this.sliderMain.bxSlider({
            auto: false,
            autoControls: false,
            pause: 5e3,
            slideMargin: 0,
            nextText: "",
            prevText: "",
            pager: false,
            infiniteLoop: true,
            responsive: true,
            onSlideNext: function() {
                _this.resetClass();
            },
            onSlidePrev: function() {
                _this.resetClass();
            }
        });
    };

    this.getSliderFunc();
};

//===============
// getMenuNavScroll
//===============
Constructor.prototype.getMenuNavScroll = function() {
    var _this = this;

    var link = this.menuNavList.find('a');

    link.on('click', function() {
        var self = $(this),
            selfAttr = +self.attr('data-id');

        if(!Modernizr.touch) {
            if(self.hasClass('active')) return false;
        }

        link.removeClass('active');
        self.addClass('active');
        _this.isFocus();
        _this.getScrollPageClick(selfAttr);

        return false;
    });
};

//===============
// getNavigation
//===============
Constructor.prototype.getNavigation = function() {
    var _this = this;

    this.navigationButtom.on('click', function() {
        _this.isFocus();

        if(!_this.body.hasClass('active_nav')) {
            _this.body.addClass('active_nav');
        } else {
            _this.body.removeClass('active_nav');
        }
    });
};

//=================
// isSectionTitle
//=================
Constructor.prototype.isSectionTitle = function() {
    $('.title_js').textillate({
        autoStart: true,
        minDisplayTime: 500,
        initialDelay: 300,
        in: {
            effect: "slideInDown",
            shuffle: true,
            delay: 20
        },
        out: {
            effect: 'hinge',
            delayScale: 1.5,
            delay: 0,
            sync: false,
            shuffle: false
        }
    });

    //$('.title_sub_js').textillate({
    //    autoStart: true,
    //    minDisplayTime: 500,
    //    initialDelay: 400,
    //    in: {
    //        effect: "slideInDown",
    //        shuffle: true,
    //        delay: 10
    //    },
    //    out: {
    //        effect: 'hinge',
    //        delayScale: 1.5,
    //        delay: 0,
    //        sync: false,
    //        shuffle: false
    //    }
    //});

    if(Modernizr.touch) {
       $('.title_js').textillate('start');
       //$('.title_sub_js').textillate('start');
    }
};

//=================
// getScrollPage
//=================
Constructor.prototype.getScrollPage = function() {
    var _this = this,
        menu = this.menuNavList;

    menu.find("a[data-id='" + 1 + "']").addClass('active');

    this.getScrollFunc = function() {
        if(!Modernizr.touch) {
            _this.containersWrap.onepage_scroll({
                sectionContainer: "section.container",
                easing: "ease",
                animationTime: 1000,
                pagination: true,
                paginationArray: ['Home', 'Why us?', 'Portfolio', 'EXTENSIONS', 'CUSTOM DEVELOPMENT' , 'EVENTS', 'MOBILE APP', 'EDUCATION', 'CONTACT US'],
                updateURL: false,
                responsiveFallback: false,
                direction: "horizontal",
                beforeMove: function(index) {
                    var title = $('.section.container[data-index="' + index + '"]');
                    title.find('.title_js').textillate('start');
                    //title.find('.title_sub_js').textillate('start');

                    _this.isFocus();
                    menu.find("a").removeClass('active');
                    menu.find("a[data-id='" + index + "']").addClass('active');

                    if(index !== 1) {
                        _this.body.addClass('activeColorMenu');
                    } else {
                        _this.body.removeClass('activeColorMenu');
                    }

                    setTimeout(function() {
                        _this.containersWrap.find('.section').removeClass('animateIn animateOut');
                    }, 1000);
                },
                afterMove: function(index) {

                },
                loop: false,
                keyboard: false
            });
        } else {
            $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
            _this.containersWrap.removeAttr('style');
            _this.containersWrap.find('.container').css({
                position: 'relative',
                top: 'auto',
                left: 'auto'
            });
        }
    };

    this.getScrollFunc();
    $(window).on('resize', _this.getScrollFunc.bind(this));

    this.sectionOneIconBottom.on('click', function() {
        if(!Modernizr.touch) {
            _this.containersWrap.moveTo(2);
        } else {
            _this.getScrollPageTouch(2);
        }
    })
};

//=================
// getScrollPageTouch
//=================
Constructor.prototype.getScrollPageTouch = function(index) {
    var sectionElement = $('#' + index).offset().top;
    if($(window).scrollTop() == sectionElement) return false;
    $('html, body').stop().animate({
        scrollTop: sectionElement
    }, 1000);
};

//=================
// getScrollPageClick
//=================
Constructor.prototype.getScrollPageClick = function(index) {
    if(!Modernizr.touch) {
        this.containersWrap.moveTo(index);
    } else {
        this.getScrollPageTouch(index);
    }
};

//=================
// getPopup
//=================
Constructor.prototype.getPopup = function() {
    var _this = this;
    this.popup = $('.popup');
    this.popupTitle = $('.popup h2');
    this.popupDescription = $('.popup p');
    this.popupClose = $('.popup__close');
    this.popupOver = $('.popup__over');

    this.hidePopup = function() {
        _this.popup.fadeOut(300);
        _this.popupOver.fadeOut(300);
    };

    this.showPopup = function() {
        _this.popup.fadeIn(300);
        _this.popupOver.fadeIn(300);
    };

    this.getClickHide = function(elements) {
        elements.on('click', function() {
            _this.hidePopup();

            return false;
        });
    };

    this.getClickShow = function(elements) {
        elements.on('click', function(e) {
            _this.showPopup();

            return false;
        });
    };

    this.getShowSend = function(title, description) {
        _this.popupTitle.text(title);
        _this.popupDescription.text(description);
        _this.showPopup();

        setTimeout(function() {
            _this.hidePopup();
        }, 3000);
    };

    this.getClickHide(this.popupClose);
    this.getClickHide(this.popupOver);
};

//=================
// getContactForm
//=================
Constructor.prototype.getContactForm = function() {
    var _this = this;

    this.contactsForm.validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required"
        },
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            message: "Please enter your message"
        },
        submitHandler: function(form) {
            var name = form.name.value,
                email = form.email.value,
                message = form.message.value;

            $.ajax({
                method: "POST",
                url: "send.php",
                data: { name: name, email: email, message: message, g_recaptcha_response: jQuery('#g-recaptcha-response').val() },
                dataType: 'json',
                success: function(e) {
                    _this.getShowSend(e.title, e.message);
                }
            })
        }
    });
};

//===============
// Load
//===============
$(function() {
    var constructor = new Constructor({
        body: 'body',
        navigationButtom: '.menuButton',
        container: '.container',
        section: 'section.container',
        containersWrap: '.containers-wrap',
        sectionOneIconBottom: '.sectionOne__iconBottom',
        menuNavList: '#menuNavList',
        sliderMain: '#sliderMain',
        sliderSee: '.sliderSee',
        sliderMainItem: '.sliderMain__item',
        jsOpenMore: '.js-open-more',
        jsSliderClose: '.js_slider_close',
        jsContentHover: '.js-contentHover',
        onepagePagination: '.onepage-pagination',
        contactsForm: '.contactsForm'
    });

    constructor.init();
});
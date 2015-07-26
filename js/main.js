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

    this.sliderMain.bxSlider({
        auto: false,
        autoControls: false,
        pause: 5e3,
        slideMargin: 0,
        nextText: "",
        prevText: "",
        pager: false,
        infiniteLoop: true,
        onSlideNext: function() {
            _this.resetClass();
        },
        onSlidePrev: function() {
            _this.resetClass();
        }
    });
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

        link.removeClass('active');
        self.addClass('active');

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
        if(!_this.body.hasClass('active_nav')) {
            _this.body.addClass('active_nav');
        } else {
            _this.body.removeClass('active_nav');
        }
    });
};

//=================
// isSectionActive
//=================
Constructor.prototype.isSectionTitle = function() {
    $('.title_js').textillate({
        autoStart: false,
        minDisplayTime: 500,
        initialDelay: 300,
        in: {
            effect: "slideInUp",
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

    $('.title_sub_js').textillate({
        autoStart: false,
        minDisplayTime: 500,
        initialDelay: 400,
        in: {
            effect: "slideInDown",
            shuffle: true,
            delay: 10
        },
        out: {
            effect: 'hinge',
            delayScale: 1.5,
            delay: 0,
            sync: false,
            shuffle: false
        }
    });

    if(Modernizr.touch) {
       $('.title_js').textillate('start');
       $('.title_sub_js').textillate('start');
    }
};

//=================
// getScrollPage
//=================
Constructor.prototype.getScrollPage = function() {
    var _this = this;
    if(!Modernizr.touch) {
        this.containersWrap.onepage_scroll({
            sectionContainer: "section.container",
            easing: "ease",
            animationTime: 1000,
            pagination: true,
            paginationArray: ['Home', 'Why us?', 'Portfolio', 'EXTENSIONS', 'CUSTOM DEVELOPMENT' , 'EVENTS', 'MOBILE APP', 'EDUCATION', 'CONTACT US'],
            updateURL: false,
            responsiveFallback: false,
            beforeMove: function(index) {
                var title = $('.section.container[data-index="' + index + '"]');
                title.find('.title_js').textillate('start');
                title.find('.title_sub_js').textillate('start');

                if(index !== 1) {
                    _this.body.addClass('activeColorMenu');
                } else {
                    _this.body.removeClass('activeColorMenu');
                }
            },
            afterMove: function(index) {

            },
            loop: true,
            keyboard: true,
            direction: "vertical"
        });
    }

    this.sectionOneIconBottom.on('click', function() {
        if(!Modernizr.touch) {
            _this.containersWrap.moveTo(2);
        } else {
            _this.getScrollPageTouch(2);
        }
    })
};

//=================
// getScrollPage
//=================
Constructor.prototype.getScrollPageTouch = function(index) {
    var sectionElement = $('#' + index).offset().top;
    if($(window).scrollTop() == sectionElement) return false;
    $('html, body').stop().animate({
        scrollTop: sectionElement
    }, 1000);
};

//=================
// getScrollPage
//=================
Constructor.prototype.getScrollPageClick = function(index) {
    if(!Modernizr.touch) {
        this.containersWrap.moveTo(index);
    } else {
        this.getScrollPageTouch(index);
    }
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
        onepagePagination: '.onepage-pagination'
    });

    constructor.init();
});
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
};

//===============
// getSliderMain
//===============
Constructor.prototype.getSliderMain = function() {
    var _this = this;

    this.sliderMain.owlCarousel2({
        items: 1,
        autoplay: false,
        nav: true,
        navText: ['',''],
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        mouseDrag: false,
        touchDrag: false,
        navSpeed: 2000,
        autoplaySpeed: 2000,
        loop: true,
        animateOut: 'fadeOut'
    });

    this.sliderSee.on('click', function() {
        $('.sliderMain__contentHover').hide();
        $('.sliderMain__logo').hide();

        $('.sliderMain__list').show();

        return false;
    })
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
        initialDelay: 0,
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
        initialDelay: 200,
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
};

//=================
// getScrollPage
//=================
Constructor.prototype.getScrollPage = function() {
    var _this = this;

    this.containersWrap.onepage_scroll({
        sectionContainer: "section.container",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        paginationArray: ['Home', 'Why us?', 'Portfolio'],
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

    this.sectionOneIconBottom.on('click', function() {
        _this.containersWrap.moveTo(2);
    })
};

//=================
// getScrollPage
//=================
Constructor.prototype.getScrollPageClick = function(index) {
    this.containersWrap.moveTo(index);
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
        sliderSee: '#sliderSee'
    });

    constructor.init();
});
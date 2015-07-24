function Constructor(config) {
    this.body = $(config.body);
    this.navigationButtom = $(config.navigationButtom);
    this.container = $(config.container);
    this.section = $(config.section);
    this.containersWrap = $(config.containersWrap);
}

//===============
// init
//===============
Constructor.prototype.init = function() {
    var _this = this;

    this.getNavigation();
    this.isSectionTitle();
    this.getScrollPage();

    $(window).on('scroll', function() {
        _this.isSectionActive();
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
        in: {
            effect: "slideInUp",
            shuffle: true
        }
    });

    $('.title_sub_js').textillate({
        autoStart: false,
        minDisplayTime: 500,
        in: {
            effect: "slideInUp",
            shuffle: true
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
        updateURL: false,
        responsiveFallback: false,
        beforeMove: function(index) {
            $('.title_js').textillate('out');
        },
        afterMove: function(index) {
            var title = $('.section.container[data-index="' + index + '"]');
            title.find('.title_js').textillate('start');
            title.find('.title_sub_js').textillate('start');
        },
        loop: true,
        keyboard: true,
        direction: "vertical"
    })
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
        containersWrap: '.containers-wrap'
    });

    constructor.init();
});
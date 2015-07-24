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
    this.getNavigation();
    this.isSectionActive();
    this.getScrollPage();
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
Constructor.prototype.isSectionActive = function() {
    var titleFunc = function(_this) {
        _this.section.each(function() {
            var self = $(this);

            if(self.hasClass('active')) {
                self.find('.title_js').textillate({
                    autoStart: true,
                    "in": {
                        effect: "rollIn",
                        shuffle: true
                    }
                });
            }
        });
    };

    titleFunc(this);
    //$(window).on('scroll', function() {
    //    titleFunc(_this);
    //});

};

//=================
// getScrollPage
//=================
Constructor.prototype.getScrollPage = function() {
    var _this = this;

    this.containersWrap.onepage_scroll({
        sectionContainer: "section.container",
        easing: "ease",
        animationTime: 1e3,
        pagination: true,
        updateURL: true,
        responsiveFallback: false,
        beforeMove: function(a) {

        },
        afterMove: function(a) {

        },
        loop: false,
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
        section: 'section',
        containersWrap: '.containers-wrap'
    });

    constructor.init();
});
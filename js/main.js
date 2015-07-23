function Constructor(config) {
    this.body = $(config.body);
    this.navigationButtom = $(config.navigationButtom);
    this.boxItem = $(config.boxItem);
}

Constructor.prototype.init = function() {
    this.getNavigation();
    this.getHeightBlocks();
};

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

Constructor.prototype.getHeightBlocks = function() {
    var _this = this;

    function setHeight() {
        var height = $(window).height();

        _this.boxItem.css({
            height: height
        })
    }

    setHeight();

    $(window).resize(function() {
        setHeight();
    });
};

$(function() {
    var constructor = new Constructor({
        body: 'body',
        navigationButtom: '.menuButton',
        boxItem: '.boxItem'
    });

    constructor.init();
});
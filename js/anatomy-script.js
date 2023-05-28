( function( $ ) {   // Đảm bảo thư viện jQuery được tải

    "use strict";

    // Kiểm tra xem có hỗ trợ cảm ứng hay không bằng cách kiểm tra thuộc tính "ontouchstart" và "MaxTouchPoints" và "msMaxTouchPoints"
    function isTouchEnabled() { 
    return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
    }

    $(document).ready(function () {                      // được gọi khi HTML đã được tải hoàn toàn và sẵn sàng cho việc tương tác 
        $("path[id^=\"basic_\"]").each(function (i, e) {  //  lặp qua tất cả các phần tử <path> có id bắt đầu bằng "basic_". Điều này cho phép xử lý các phần cơ bắp cơ bản trên trang web.
            addEvent($(e).attr('id'));
        });
    });

    function addEvent(id, relationId) {  // được sử dụng để thêm sự kiện và xử lý tương tác cho mỗi phần cơ bắp. Nó thực hiện các hành động như thay đổi màu sắc, hiển thị thông tin và điều hướng đến các liên kết tương ứng.
        var _obj = $('#' + id);
        $('#basic-wrapper').css({'opacity': '1'});

        _obj.attr({'fill': 'rgba(255, 0, 0, 0)', 'stroke': 'rgba(255, 102, 102, 1)'});
        _obj.attr({'cursor': 'default'});
        
        //Khi sử dụng trên các thiết bị cảm ứng, các sự kiện touchstart, touchend, touchmove được sử dụng để xử lý tương tác cảm ứng.

        if (basic_config[id]['active'] === true) {
            if (isTouchEnabled()) {
                var touchmoved;
                _obj.on('touchend', function (e) {
                    if (touchmoved !== true) {
                        _obj.on('touchstart', function (e) {
                            let touch = e.originalEvent.touches[0];
                            let x = touch.pageX - 10, y = touch.pageY + (-15);

                            let $basicatip = $('#tip-basic');
                            let basicanatomytipw = $basicatip.outerWidth(),
                                basicanatomytiph = $basicatip.outerHeight();

                            x = (x + basicanatomytipw > $(document).scrollLeft() + $(window).width()) ? x - basicanatomytipw - (20 * 2) : x
                            y = (y + basicanatomytiph > $(document).scrollTop() + $(window).height()) ? $(document).scrollTop() + $(window).height() - basicanatomytiph - 10 : y

                            if (basic_config[id]['target'] !== 'none') {
                                _obj.css({'fill': 'rgba(255, 0, 0, 0.7)'});
                            }
                            $basicatip.show().html(basic_config[id]['hover']);
                            $basicatip.css({left: x, top: y})
                        })
                        _obj.on('touchend', function () {
                            _obj.css({'fill': 'rgba(255, 0, 0, 0)'});
                            if (basic_config[id]['target'] === '_blank') {
                                window.open(basic_config[id]['url']);
                            } else if (basic_config[id]['target'] === '_self') {
                                window.parent.location.href = basic_config[id]['url'];
                            }
                            $('#tip-basic').hide();
                        })
                    }
                }).on('touchmove', function (e) {
                    touchmoved = true;
                }).on('touchstart', function () {
                    touchmoved = false;
                });
            }
            _obj.attr({'cursor': 'pointer'});
            // Các sự kiện như mouseenter, mouseleave, mousedown, mouseup, mousemove được sử dụng để phản hồi và xử lý tương tác chuột trên phần cơ bắp.
            // Biến basic_config chứa các cấu hình cho từng phần cơ bắp, bao gồm các thuộc tính như hover (mô tả khi di chuột qua), url (đường dẫn liên kết), target (cách mở liên kết), và active (trạng thái hiển thị).
            _obj.on('mouseenter', function () {
                $('#tip-basic').show().html(basic_config[id]['hover']);
                _obj.css({'fill': 'rgba(255, 0, 0, 0.3)'})
            }).on('mouseleave', function () {
                $('#tip-basic').hide();
                _obj.css({'fill': 'rgba(255, 0, 0, 0)'});
            })
            if (basic_config[id]['target'] !== 'none') {
                _obj.on('mousedown', function () {
                    _obj.css({'fill': 'rgba(255, 0, 0, 0.7)'});
                })
            }
            _obj.on('mouseup', function () {
                _obj.css({'fill': 'rgba(255, 0, 0, 0.3)'});
                if (basic_config[id]['target'] === '_blank') {
                    window.open(basic_config[id]['url']);
                } else if (basic_config[id]['target'] === '_self') {
                    window.parent.location.href = basic_config[id]['url'];
                }
            })
            _obj.on('mousemove', function (e) {
                let x = e.pageX + 10, y = e.pageY + 15;

                let $abasic = $('#tip-basic');
                let basicanatomytipw = $abasic.outerWidth(), basicanatomytiph = $abasic.outerHeight();

                x = (x + basicanatomytipw > $(document).scrollLeft() +
                    $(window).width()) ? x - basicanatomytipw - (20 * 2) : x
                y = (y + basicanatomytiph > $(document).scrollTop() + $(window).height()) ?
                    $(document).scrollTop() + $(window).height() - basicanatomytiph - 10 : y

                $abasic.css({left: x, top: y})
            })
        } else {
            _obj.hide();
        }
    }
})(jQuery);

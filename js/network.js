$(document).ready(function () {

// ----------------------------------------------------------------------------   internet   ----------------------------------------------------

    $('body').on('click', '#internet', function () {
        console.log('internet');
        $("#internet-list").animate({
            top: 'toggle'
        });
    });

    $('body').on('click', '#internet-list .close-icon-1', function () {
        $("#internet-list").animate({
            top: 'toggle'
        });
    });

    function interval() {

        $.ajax({
            data: '',
            type: "POST",
            url: '/network/show_status',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);

            $('#internet').html('');
            $('#ethernet-top').html('');
            let ethernet_top = '';

            if (data.ethernet[3].element_visible == 0 && data.ethernet[3].interface_power_onoff == 0 || data.ethernet[3].element_visible == 1 && data.ethernet[3].interface_power_onoff == 0) {
                $('#internet').append('<img src="/img/network_img/network-connection-color-grey.png" alt="network">');
                ethernet_top += `<img src="/img/network_img/ethernet-off.png" style="margin: 0 109px;" alt="ethernet-off">`;
                $('#hr_1').removeClass('border-style');
                $('#form-internet-on').addClass('d-block');
                $('#form-internet-on').removeClass('d-none');
                $('#form-internet-off').removeClass('d-block');
                $('#form-internet-off').addClass('d-none');
            } else if (data.ethernet[3].interface_power_onoff == 1 && data.ethernet[3].element_visible == 0) {
                $('#internet').append('<img src="/img/network_img/network-connection-color-red.png" alt="network">');
                ethernet_top += `<img src="/img/network_img/ethernet-on.png" style="margin: 0 109px;" alt="ethernet-on">`;
                $('#hr_1').addClass('border-style');
                $('#form-internet-on').addClass('d-none');
                $('#form-internet-on').removeClass('d-block');
                $('#form-internet-off').removeClass('d-none');
                $('#form-internet-off').addClass('d-block');
            } else if (data.ethernet[3].interface_power_onoff == 1 && data.ethernet[3].element_visible == 1) {
                $('#internet').append('<img src="/img/network_img/network-connection-color-blue.png" alt="network">');
                ethernet_top += `<img src="/img/network_img/ethernet-on.png" style="margin: 0 109px;" alt="ethernet-on">`;
                $('#hr_1').addClass('border-style');
                $('#form-internet-on').addClass('d-none');
                $('#form-internet-on').removeClass('d-block');
                $('#form-internet-off').removeClass('d-none');
                $('#form-internet-off').addClass('d-block');
            }



            $('#local-network').html('');
            if (data.ethernet[0].element_visible == 0 && data.ethernet[0].interface_power_onoff == 0 || data.ethernet[0].element_visible == 1 && data.ethernet[0].interface_power_onoff == 0) {
                $('#local-network').append('<img src="/img/network_img/local-network-color-grey.png" alt="local-network">');
                ethernet_top += `<img src="/img/network_img/ethernet-off.png" style="margin: 0 109px;" alt="ethernet-off">`;
                $('#hr_2').removeClass('border-style');
                $('#form-local-network-on').addClass('d-block');
                $('#form-local-network-on').removeClass('d-none');
                $('#form-local-network-off').removeClass('d-block');
                $('#form-local-network-off').addClass('d-none');
            } else if (data.ethernet[0].interface_power_onoff == 1 && data.ethernet[0].element_visible == 0) {
                $('#local-network').append('<img src="/img/network_img/local-network-color-red.png" alt="local-network">');
                ethernet_top += `<img src="/img/network_img/ethernet-on.png" style="margin: 0 109px;" alt="ethernet-on">`;
                $('#hr_2').addClass('border-style');
                $('#form-local-network-on').addClass('d-none');
                $('#form-local-network-on').removeClass('d-block');
                $('#form-local-network-off').removeClass('d-none');
                $('#form-local-network-off').addClass('d-block');
            } else if (data.ethernet[0].interface_power_onoff == 1 && data.ethernet[0].element_visible == 1) {
                $('#local-network').append('<img src="/img/network_img/local-network-color-blue.png" alt="local-network">');
                ethernet_top += `<img src="/img/network_img/ethernet-on.png" style="margin: 0 109px;" alt="ethernet-on">`;
                $('#hr_2').addClass('border-style');
                $('#form-local-network-on').addClass('d-none');
                $('#form-local-network-on').removeClass('d-block');
                $('#form-local-network-off').removeClass('d-none');
                $('#form-local-network-off').addClass('d-block');
            }


            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            });

            $('#dvr-network').html('');
            if (data.ethernet[1].element_visible == 0) {
                $('#dvr-network').append('<img src="/img/network_img/dvr-network-color-red.png" alt="dvr-network">');
                ethernet_top += `<img src="/img/network_img/ethernet-off.png" style="margin: 0 109px;" alt="ethernet-off">`;
                $('#hr_3').addClass('border-style');
            } else if (data.ethernet[1].element_visible == 1) {
                $('#dvr-network').append('<img src="/img/network_img/dvr-network-color-blue.png" alt="dvr-network">');
                ethernet_top += `<img src="/img/network_img/ethernet-on.png" style="margin: 0 109px;" alt="ethernet-on">`;
                $('#hr_3').addClass('border-style');
            }

            $('#dvr-server').html('');
            if (data.ethernet[2].element_visible == 0) {
                $('#dvr-server').append('<img src="/img/network_img/server-color-red.png" alt="server">');
                ethernet_top += `<img src="/img/network_img/ethernet-off.png" style="margin: 0 109px;" alt="ethernet-off">`;
                $('#hr_4').addClass('border-style');
            } else if (data.ethernet[2].element_visible == 1) {
                $('#dvr-server').append('<img src="/img/network_img/server-color-blue.png" alt="server">');
                ethernet_top += `<img src="/img/network_img/ethernet-on.png" style="margin: 0 109px;" alt="ethernet-on">`;
                $('#hr_4').addClass('border-style');
            }
            $('#ethernet-top').append(ethernet_top);


            $('#ethernet-bottom').html('');
            $('.bottom-block').html('');
            let network = '';
            let ethernet_bottom = '';
            for (let i = 0; i < data.wireless.length; i++) {
                if (data.wireless[i].element_visible == 0 && data.wireless[i].interface_power_onoff == 0) {
                    network += `<div class="inner-el-bottom-${1 + i} align-column text-center" data-toggle="tooltip" data-placement="top" title="Інтерфейс відсутній"><span class="number-${1 + i}">${1 + i}</span><img src="/img/network_img/wi-fi-search.png" alt="local-network" data-freq="${data.wireless[i].freq}" data-network-el="${data.wireless[i].network_element}" data-reg_count="${data.wireless[i].reg_count}" data-reg_online="${data.wireless[i].reg_online_count}" data-ssid="${data.wireless[i].ssid}"><span style="color: transparent">${data.wireless[i].reg_count} авто<br>${data.wireless[i].reg_online_count} в мережі</span></div>`;
                    ethernet_bottom += `<img src="/img/network_img/ethernet-off.png" style="margin-left: 10px;" alt="ethernet-off">`;
                    network += `<hr id="hr_${5 + i}">`;
                } else if (data.wireless[i].interface_power_onoff == 0 && data.wireless[i].element_visible == 1) {
                    network += `<div class="inner-el-bottom-${1 + i} align-column text-center"><span class="number-${1 + i}">${1 + i}</span><img class="wi-fi-on" src="/img/network_img/wi-fi-disconnected.png" data-toggle="modal" data-target="#network-modal-on" alt="local-network" data-freq="${data.wireless[i].freq}" data-network-el="${data.wireless[i].network_element}" data-reg_count="${data.wireless[i].reg_count}" data-reg_online="${data.wireless[i].reg_online_count}" data-ssid="${data.wireless[i].ssid}">${data.wireless[i].reg_count} авто<br>${data.wireless[i].reg_online_count} в мережі</div>`;
                    ethernet_bottom += `<img src="/img/network_img/ethernet-on.png" style="margin-left: 10px;" alt="ethernet-on">`;
                    network += `<hr id="hr_${5 + i}">`;
                } else if (data.wireless[i].interface_power_onoff == 1 && data.wireless[i].element_visible == 0) {
                    network += `<div class="inner-el-bottom-${1 + i} align-column text-center"><span class="number-${1 + i}">${1 + i}</span><img class="wi-fi-off" src="/img/network_img/wi-fi-search.png" data-toggle="modal" data-target="#network-modal-off" alt="local-network" data-freq="${data.wireless[i].freq}" data-network-el="${data.wireless[i].network_element}" data-reg_count="${data.wireless[i].reg_count}" data-reg_online="${data.wireless[i].reg_online_count}" data-ssid="${data.wireless[i].ssid}"><span style="color: transparent">${data.wireless[i].reg_count} авто<br>${data.wireless[i].reg_online_count} в мережі</span></div>`;
                    ethernet_bottom += `<img src="/img/network_img/ethernet-off.png" style="margin-left: 10px;" alt="ethernet-off">`;
                    network += `<hr id="hr_${5 + i}">`;
                } else if (data.wireless[i].interface_power_onoff == 1 && data.wireless[i].element_visible == 1) {
                    network += `<div class="inner-el-bottom-${1 + i} align-column text-center"><span class="number-${1 + i}">${1 + i}</span><img class="wi-fi-off" src="/img/network_img/wi-fi-connected.png" data-toggle="modal" data-target="#network-modal-off" alt="local-network" data-freq="${data.wireless[i].freq}" data-network-el="${data.wireless[i].network_element}" data-reg_count="${data.wireless[i].reg_count}" data-reg_online="${data.wireless[i].reg_online_count}" data-ssid="${data.wireless[i].ssid}">${data.wireless[i].reg_count} авто<br>${data.wireless[i].reg_online_count} в мережі</div>`;
                    ethernet_bottom += `<img src="/img/network_img/ethernet-on.png" style="margin-left: 10px;" alt="ethernet-on">`;
                    network += `<hr id="hr_${5 + i}">`;
                }
            }
            $('#ethernet-bottom').append(ethernet_bottom);
            $('.bottom-block').append(network);

            for (let i = 0; i < data.wireless.length; i++) {
                if (data.wireless[i].element_visible == 0 && data.wireless[i].interface_power_onoff == 0) {
                    $('#hr_' + (i + 5)).removeClass('border-style');
                } else if (data.wireless[i].interface_power_onoff == 0 && data.wireless[i].element_visible == 1) {
                    $('#hr_' + (i + 5)).addClass('border-style');
                } else if (data.wireless[i].interface_power_onoff == 1 && data.wireless[i].element_visible == 0) {
                    $('#hr_' + (i + 5)).addClass('border-style');
                } else if (data.wireless[i].interface_power_onoff == 1 && data.wireless[i].element_visible == 1) {
                    $('#hr_' + (i + 5)).addClass('border-style');
                }
            }

            $('.tooltip').each(function (a, b) {
                $(b).hide();
            });

        }).fail(function (data) {
        });

    }
    setInterval(interval, 3000);

    $("body").on('submit', '#form-internet-on', function (event) {
        event.preventDefault();
        console.log('internet on');
        $('#internet-connected').val(0);
        $('#network_element-on-internet').val("internet");
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/network/set_status',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#internet').html('');
            $('#form-internet-on').addClass('d-none');
            $('#form-internet-on').removeClass('d-block');
            $('#form-internet-off').removeClass('d-none');
            $('#form-internet-off').addClass('d-block');
            $('#internet').append('<img src="/img/network_img/network-connection-color-red.png" alt="network">');
            $('#hr_1').addClass('border-style');
            $("#internet-list .close-icon-1").click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $("body").on('submit', '#form-internet-off', function (event) {
        event.preventDefault();
        console.log('internet off');
        $('#internet-disconnected').val(1);
        $('#network_element-off-internet').val("internet");
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/network/set_status',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#internet').html('');
            $('#form-internet-on').addClass('d-block');
            $('#form-internet-on').removeClass('d-none');
            $('#form-internet-off').removeClass('d-block');
            $('#form-internet-off').addClass('d-none');
            $('#internet').append('<img src="/img/network_img/network-connection-color-grey.png" alt="network">');
            $('#hr_1').removeClass('border-style');
            $("#internet-list .close-icon-1").click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });


});

// ----------------------------------------------------------------------------   end   internet   ----------------------------------------------------
// ----------------------------------------------------------------------------   local   network   ----------------------------------------------------


$(document).ready(function () {

    $('body').on('click', '#local-network', function () {
        console.log('local-network');
        $("#local-network-list").animate({
            top: 'toggle'
        });
    });

    $('body').on('click', '#local-network-list .close-icon-1', function () {
        $("#local-network-list").animate({
            top: 'toggle'
        });
    });


    $("body").on('submit', '#form-local-network-on', function (event) {
        event.preventDefault();
        console.log('local-network on');
        $('#local-network-connected').val(0);
        $('#network_element-on-local-network').val("internet");
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/network/set_status',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#local-network').html('');
            $('#form-local-network-on').addClass('d-none');
            $('#form-local-network-on').removeClass('d-block');
            $('#form-local-network-off').removeClass('d-none');
            $('#form-local-network-off').addClass('d-block');
            $('#local-network').append('<img src="/img/network_img/local-network-color-blue.png" alt="local-network">');
            $('#hr_2').addClass('border-style');
            $("#local-network-list .close-icon-1").click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $("body").on('submit', '#form-local-network-off', function (event) {
        event.preventDefault();
        console.log('local-network off');
        $('#local-network-disconnected').val(1);
        $('#network_element-off-local-network').val("internet");
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/network/set_status',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#local-network').html('');
            $('#form-local-network-on').addClass('d-block');
            $('#form-local-network-on').removeClass('d-none');
            $('#form-local-network-off').removeClass('d-block');
            $('#form-local-network-off').addClass('d-none');
            $('#local-network').append('<img src="/img/network_img/local-network-color-grey.png" alt="local-network">');
            $('#hr_2').removeClass('border-style');
            $("#local-network-list .close-icon-1").click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });


});

// ----------------------------------------------------------------------------   end   local   network   ----------------------------------------------------

// ----------------------------------------------------------------------------   wi-fi   ----------------------------------------------------
$(document).ready(function () {


    $('body').on('click', '.wi-fi-on', function () {
        console.log('freq ==>', $(this).data('freq'));
        console.log('reg_count ==>', $(this).data('reg_count'));
        console.log('ssid ==>', $(this).data('ssid'));
        console.log('network_element ==>', $(this).data('network-el'));

        $('#reg_count').text($(this).data('reg_count'));
        $('#reg_online').text($(this).data('reg_online'));
        $('#ssid').text($(this).data('ssid'));
        $('#new-name-ssid').val($(this).data('ssid'));
        $('#network_element-wi-fi').val($(this).data('network-el'));
    });

    $('body').on('click', '.wi-fi-off', function () {
        console.log('ssid ==>', $(this).data('ssid'));

        $('#ssid-off').text($(this).data('ssid'));
        $('#network_element-wi-fi-off').val($(this).data('network-el'));
    });


    if (getCookie('dark-theme') == 'on') {
        $('#dark-theme-link').attr('href', '/css/dark-theme.css');
        $('.toggle.btn.btn-dark').trigger('click');

    }


    $("body").on('change', '#dark-theme-button', function () {
        if (getCookie('dark-theme') == 'on') {
            $('#dark-theme-link').attr('href', 'javascript:void(0);');
            let date = new Date;
            date.setDate(date.getDate() + 365);
            setCookie('dark-theme', 'off', {path: '/', expires: date.toUTCString()});
        } else {
            $('#dark-theme-link').attr('href', '/css/dark-theme.css');
            let date = new Date;
            date.setDate(date.getDate() + 365);
            setCookie('dark-theme', 'on', {path: '/', expires: date.toUTCString()});
        }
    });


    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;
        if (typeof expires === "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }

        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }


});
// ----------------------------------------------------------------------------   end   wi-fi   ----------------------------------------------------




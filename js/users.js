$(document).ready(function () {

    // ==================================================================    CAR    ===================================================================================
    $("#add_change_user_ok").hide();
    $("#add_change_user_err").hide();
    $('.loader').show();

    $.ajax({
        data: $($('#form_users')).serialize(),
        type: "POST",
        url: '/users',
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: 'json'
    }).done(function (data) {
        let dataUser = data;
        let dataArrUser = data.data;
        console.log('users1 ==>', dataUser);

        let dataPagUser = data.pages_nav;
        $('#userTable tbody tr').html('');

        let tr = "";
        for (let i = 0; i < dataArrUser.length; i++) {
            tr += '<tr class="item">';
            tr += `<td class="text-center">${i + 1}</td>`;
            tr += `<td class="text-center">${dataArrUser[i].first_name}</td>`;
            tr += `<td class="text-center">${dataArrUser[i].last_name}</td>`;
            tr += `<td class="text-center">${dataArrUser[i].tel}</td>`;
            tr += `<td class="text-center">${dataArrUser[i].username}</td>`;

            tr += `<td>   
                         <form class="users-setroles d-flex justify-content-center" method="post" >
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="перегляд статуса авто">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_loading_status") ? 'checked' : ''} id="${dataArrUser[i].username + 1}" value="view_loading_status"  name="view_loading_status">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 1}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="доступ до таблиці з файлами">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_video") ? 'checked' : ''} id="${dataArrUser[i].username + 2}" value="view_video"  name="view_video">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 2}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="завантаження файлів">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("dw_load_video") ? 'checked' : ''} id="${dataArrUser[i].username + 3}" value="dw_load_video"  name="dw_load_video">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 3}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="керування відеофайлами">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_video") ? 'checked' : ''} id="${dataArrUser[i].username + 4}" value="set_video"  name="set_video">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 4}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="керування користувачами">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_user") ? 'checked' : ''} id="${dataArrUser[i].username + 5}" value="set_user"  name="set_user">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 5}"></label>
                                </div>
                                
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="перегляд конфігурації авто та реєстраторів">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_config") ? 'checked' : ''} id="${dataArrUser[i].username + 6}" value="view_config"  name="view_config">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 6}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="редагування конфігурації авто та реєстраторів">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_config") ? 'checked' : ''} id="${dataArrUser[i].username + 7}" value="set_config"  name="set_config">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 7}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="перегляд конфігурації мережі">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_net_status") ? 'checked' : ''} id="${dataArrUser[i].username + 8}" value="view_net_status"  name="view_net_status">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 8}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="редагування конфігурації мережі">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_net_status") ? 'checked' : ''} id="${dataArrUser[i].username + 9}" value="set_net_status"  name="set_net_status">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 9}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="не використовується">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("empty_data") ? 'checked' : ''} id="${dataArrUser[i].username + 10}" value="empty_data"  name="empty_data">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 10}"></label>
                                </div>
                                   <input type="checkbox" class="to_send" checked name="id" value="${dataArrUser[i].id}" hidden>
                                   <input type="checkbox" class="to_send need_can_do "  checked name="need_can_do" value="" hidden>
                                <button type="submit" hidden></button>
                          </form>
                  </td>`;

            tr += `<td class="d-flex align-items-center justify-content-center">
                       <button type="button" class="btn btn-sm  bg-secondary text-white change_user" data-toggle="modal" data-target="#changeUserModal"  data-id="${dataArrUser[i].id}" data-first-name="${dataArrUser[i].first_name}" data-last-name="${dataArrUser[i].last_name}" data-tel="${dataArrUser[i].tel}" data-username="${dataArrUser[i].username}">Змінити</button>
                       <span class="mx-1"> / </span>
                       <form class="user_delete" method="post">
                           <input type="hidden" name="id" value="${dataArrUser[i].id}">
                           <button type="button" class="btn btn-sm  bg-secondary text-white del_user" data-id="${dataArrUser[i].id}">Видалити</button>
                       </form>
                   </td>`;
            tr += '</tr>';
        }
        $('#userTable tbody').append(tr);
        $('#pagination_user').html(`<ul class="col-md-6 justify-content-md-start pagination pag-left_user mt-2">
                                    <li>Показано з ${dataUser.record_from} по ${dataUser.record_to} із ${dataUser.record_count}</li>
                                  </ul>`);
        let ul_user = `<ul class="col-md-6 justify-content-md-end pagination mb-3 m-md-0">`;
        for (let i = 0; i < dataPagUser.length; i++) {
            ul_user += `<li class="page-item user"><button class="btn" data-href="${dataPagUser[i].p_number}" data-active="${dataPagUser[i].current}">${dataPagUser[i].p_name}</button></li>`;
        }
        ul_user += '</ul>';
        $('.pag-left_user').after(ul_user);
        $('[data-active="true"]').addClass('active-button');
        $('.tabs button:first').click();
        $("form").each(function (a, b) {
            $(b)[0].reset();
        });
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
        $('.loader').hide();
    }).fail(function (data) {
        console.log(data);
    });


    $("body").on('submit', '#form_users', function (event) { // +
        event.preventDefault();
        $('.loader').show();

        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/users',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            let dataUser = data;
            let dataArrUser = data.data;
            console.log('users2 ==>', dataUser);

            let dataPagUser = data.pages_nav;
            $('#userTable tbody tr').html('');

            let tr = "";
            for (let i = 0; i < dataArrUser.length; i++) {
                tr += '<tr class="item">';
                tr += `<td class="text-center">${i + 1}</td>`;
                tr += `<td class="text-center">${dataArrUser[i].first_name}</td>`;
                tr += `<td class="text-center">${dataArrUser[i].last_name}</td>`;
                tr += `<td class="text-center">${dataArrUser[i].tel}</td>`;
                tr += `<td class="text-center">${dataArrUser[i].username}</td>`;

                tr += `<td>   
                         <form class="users-setroles d-flex justify-content-center" method="post" >
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="перегляд статуса авто">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_loading_status") ? 'checked' : ''} id="${dataArrUser[i].username + 1}" value="view_loading_status"  name="view_loading_status">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 1}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="доступ до таблиці з файлами">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_video") ? 'checked' : ''} id="${dataArrUser[i].username + 2}" value="view_video"  name="view_video">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 2}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="завантаження файлів">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("dw_load_video") ? 'checked' : ''} id="${dataArrUser[i].username + 3}" value="dw_load_video"  name="dw_load_video">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 3}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="керування відеофайлами">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_video") ? 'checked' : ''} id="${dataArrUser[i].username + 4}" value="set_video"  name="set_video">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 4}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="керування користувачами">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_user") ? 'checked' : ''} id="${dataArrUser[i].username + 5}" value="set_user"  name="set_user">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 5}"></label>
                                </div>
                                
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="перегляд конфігурації авто та реєстраторів">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_config") ? 'checked' : ''} id="${dataArrUser[i].username + 6}" value="view_config"  name="view_config">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 6}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="редагування конфігурації авто та реєстраторів">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_config") ? 'checked' : ''} id="${dataArrUser[i].username + 7}" value="set_config"  name="set_config">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 7}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="перегляд конфігурації мережі">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("view_net_status") ? 'checked' : ''} id="${dataArrUser[i].username + 8}" value="view_net_status"  name="view_net_status">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 8}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="редагування конфігурації мережі">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("set_net_status") ? 'checked' : ''} id="${dataArrUser[i].username + 9}" value="set_net_status"  name="set_net_status">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 9}"></label>
                                </div>
                                <div class="custom-control custom-switch" data-toggle="tooltip" data-placement="top" title="не використовується">
                                  <input type="checkbox" class="custom-control-input" ${dataArrUser[i].can_do.includes("empty_data") ? 'checked' : ''} id="${dataArrUser[i].username + 10}" value="empty_data"  name="empty_data">
                                  <label class="custom-control-label" for="${dataArrUser[i].username + 10}"></label>
                                </div>
                                   <input type="checkbox" class="to_send" checked name="id" value="${dataArrUser[i].id}" hidden>
                                   <input type="checkbox" class="to_send need_can_do "  checked name="need_can_do" value="" hidden>
                                <button type="submit" hidden></button>
                          </form>
                  </td>`;

                tr += `<td class="d-flex align-items-center justify-content-center">
                       <button type="button" class="btn btn-sm  bg-secondary text-white change_user" data-toggle="modal" data-target="#changeUserModal"  data-id="${dataArrUser[i].id}" data-first-name="${dataArrUser[i].first_name}" data-last-name="${dataArrUser[i].last_name}" data-tel="${dataArrUser[i].tel}" data-username="${dataArrUser[i].username}">Змінити</button>
                       <span class="mx-1"> / </span>
                       <form class="user_delete" method="post">
                           <input type="hidden" name="id" value="${dataArrUser[i].id}">
                           <button type="button" class="btn btn-sm  bg-secondary text-white del_user" data-id="${dataArrUser[i].id}">Видалити</button>
                       </form>
                   </td>`;
                tr += '</tr>';
            }
            $('#userTable tbody').append(tr);
            $('#pagination_user').html(`<ul class="col-md-6 justify-content-md-start pagination pag-left_user mt-2">
                                    <li>Показано з ${dataUser.record_from} по ${dataUser.record_to} із ${dataUser.record_count}</li>
                                  </ul>`);
            let ul_user = `<ul class="col-md-6 justify-content-md-end pagination mb-3 m-md-0">`;
            for (let i = 0; i < dataPagUser.length; i++) {
                ul_user += `<li class="page-item user"><button class="btn" data-href="${dataPagUser[i].p_number}" data-active="${dataPagUser[i].current}">${dataPagUser[i].p_name}</button></li>`;
            }
            ul_user += '</ul>';
            $('.pag-left_user').after(ul_user);
            $('[data-active="true"]').addClass('active-button');
            $('.tabs button:first').click();
            $("form").each(function (a, b) {
                $(b)[0].reset();
            });
            $('.loader').hide();
        }).fail(function (data) {
        });
    });


    $('body').on('submit', '#user_add', function (event) { // запит додати user +
        event.preventDefault();
        // $('#car_add_lic_n').val($('#car_add_lic_n').val().toUpperCase());
        ;
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/users/add_edit',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log('data ok/err', data);
            console.log('data ok/err', data.comment);
            console.log('data ok/err', data.result);
            if (data.comment == "login already use" && data.result =="error") {
                $("#add_change_user_err").show('slow');
                setTimeout(() => $("#add_change_user_err").hide('slow'), 3000);
            } else if (data.comment == "user added" && data.result =="ok"){
                $("#add_change_user_ok").show('slow');
                setTimeout(() => $("#add_change_user_ok").hide('slow'), 3000);
            }
            $('#submit-form-user').click();
            $('#addUserModal .close').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $('body').on('click', '.change_user', function () { // клік по кнопці - змінити  user +
        $('#user_id').val($(this).data('id'));
        $('#change_first_name').val($(this).data('last-name'));
        $('#change_last_name').val($(this).data('first-name'));
        $('#change-phone-user').val($(this).data('tel'));
        $('#change-login-user').val($(this).data('username'));
    });

    $('body').on('submit', '#user_change', function (event) { // запит змінити user +
        event.preventDefault();
        // $('#car_edit_lic_n').val($('#car_edit_lic_n').val().toUpperCase());
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/users/add_edit',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            if (data.comment == "login already use" && data.result =="error") {
                $("#add_change_user_err").show('slow');
                setTimeout(() => $("#add_change_user_err").hide('slow'), 3000);
            } else if (data.comment == "user added" && data.result =="ok"){
                $("#add_change_user_ok").show('slow');
                setTimeout(() => $("#add_change_user_ok").hide('slow'), 3000);
            }
            $('#submit-form-user').click();
            $('#changeUserModal .close').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $("body").on('click', '.del_user', function () { // клік по кнопці - видалити user  +
        $(this).parents('.user_delete').submit();
    });

    $('body').on('submit', '.user_delete', function (event) { // запит видалити user +
        event.preventDefault();
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/users/delete',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            $('#submit-form-user').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $('body').on('submit', '.users-setroles', function (event) { // установка прав user +
        event.preventDefault();
        $('.loader').show();
        let data = '[';
        $(this).find('input:checked:not(.to_send)').each(function (a, b){
            data += '"' + $(b).attr('name') + '", ';
        });
        $(this).find('.need_can_do').val(data.slice(0, -2) + ']');
        console.log($(this).find('.to_send').serializeArray());

        $.ajax({
            data:  $(this).find('.to_send').serialize(),
            type: "POST",
            url: '/users/setroles',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            $('#submit-form-user').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });


    $("body").on('change', '.custom-control-input', function () { // установка прав +
        if ($(this).attr('checked')) {
            $(this).removeAttr('checked');
        } else {
            $(this).attr('checked', 'checked')
        }

        $(this).parents('form').find('button').click();
    });



    $('body').on('change', '#select-count-user', function () { // вибір кількості записів на сторінку user +
        $('#user_quantity-per-page').val($('#select-count-user').val());
        $('#submit-form-user').submit();
    });

    $("body").on('click', '.page-item.user button', function () { // клік по кнопці пагінації - вибір сторінки user +
        $('#user_page-number').val($(this).data('href'));
        $('#submit-form-user').submit();
    });


// ---------------------------------------------------------------------------------------------------------


// search
    $("body").on('keyup', '#searchInput_user', function () {   // запит в полі пошуку user +
        $('#user_quantity-per-page').val($('#select-count-user').val());
        $('#user_filter').val($('#searchInput_user').val().toUpperCase());
        $('#submit-form-user').click();
    });

    $('body').on('click', '#userTable th', function () {
        $('body,html').animate({
            scrollTop: 80
        }, 1000);
    });

// sorting table

    $('body').on('click', '#userTable .sort-table-user', function () { // сортування таблиці а-я user +
        // console.log('#mainTable th');
        $('#userTable .sort-table-user').each(function (a, b) {
            $(b).removeClass('headerSortUp headerSortDown');
            $(b).css('background-color', '#5a5c69');
        });
        $(this).css('background-color', '#8dbdd8');
        $('#user_sorting-direction-user').val('A-Я');
        $('#user_sorting-field-name').val($(this).data('sort'));
        $('#user_quantity-per-page').val($('#select-count-user').val());
        $('#user_page-number').val($('.btn.active-button').data('href'));
        $(this).addClass('headerSortUp');
        $('#submit-form-user').click();
    });

    $('body').on('click', '#userTable .sort-table-user.headerSortUp', function () { // сортування таблиці я-а user +
        $('#userTable .sort-table-user').each(function (a, b) {
            $(b).removeClass('headerSortUp headerSortDown');
            $(b).css('background-color', '#5a5c69');
        });
        $(this).css('background-color', '#8dbdd8');
        $('#user_sorting-direction-user').val('Я-А');
        $('#user_sorting-field-name').val($(this).data('sort'));
        $('#user_quantity-per-page').val($('#select-count-user').val());
        $('#user_page-number').val($('.btn.active-button').data('href'));
        $(this).addClass('headerSortDown');
        $('#submit-form-user').click();
    });
// end sorting table

});

// ==================================================================   END CAR    ===================================================================================
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {

    // change tabs
    $('.tab_content').each(function (a, b) {
        $(b).show();
    });


    $('body').on('click', '#select', function () { // сортування таблиці я-а user +

        console.log('test');
        $(".test").animate({
            left: '100px',
            top: '100px',
            height: '150px',
            width: '250px'
        });
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






























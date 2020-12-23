$(document).ready(function () {

    // ==================================================================    CAR    ===================================================================================
    $("#add_change_car_ok").hide();
    $("#add_change_car_err").hide();
    $("#add_change_reg_ok").hide();
    $("#add_change_reg_err").hide();
    $('.loader').show();

    $.ajax({
        data: $($('#form_cars')).serialize(),
        type: "POST",
        url: '/cars',
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: 'json'
    }).done(function (data) {
        let dataCar = data;
        let dataArrCar = data.data;
        console.log('car1 ==>', dataCar);

        // console.log('load def dataArrCar', dataArrCar);
        let dataPagCar = data.pages_nav;
        $('#carTable tbody tr').html('');

        let options = '';
        $('#cars-reg-cars').html('');
        for (let i = 0; i < dataCar.reg_list.length; i++) {
            options += `<option value="${dataCar.reg_list[i].r_ip}">`;
        }
        $('#cars-reg-cars').append(options);

        let tr = "";
        for (let i = 0; i < dataArrCar.length; i++) {
            tr += '<tr class="item">';
            tr += `<td class="text-center">${i + 1}</td>`;
            tr += `<td class="text-center">${dataArrCar[i].car_id}</td>`;
            tr += `<td class="text-center">${dataArrCar[i].licence_n}</td>`;
            tr += `<td class="text-center">${dataArrCar[i].self_n}</td>`;
            tr += `<td class="text-center">${dataArrCar[i].r_ip}</td>`;
            // tr += `<td class="text-center">${dataArrCar[i].reg_id}</td>`;
            // tr += `<td class="text-center">${dataArrCar[i].r_sn}</td>`;

            if ((dataArrCar[i].reg_id == null) || (dataArrCar[i].reg_id == 0) || (dataArrCar[i].reg_id == "")) {
                // console.log('test');

                tr += `<td class="text-center">
                        <button type="button" class="btn btn-sm  bg-secondary text-white assign_reg_add_car " data-toggle="modal" data-target="#carModal_add" data-reg-ip="${dataArrCar[i].r_ip}" data-car-name="${dataArrCar[i].licence_n}">Поставити реєстратор</button>
                        </td>`;
            } else {
                tr += `<td class="text-center">
                        <button type="button" class="btn btn-sm bg-secondary text-white assign_reg_rem_car " data-toggle="modal" data-target="#carModal_rem" data-reg-ip="${dataArrCar[i].r_ip}" data-car-id="${dataArrCar[i].car_id}" data-car-licence_n="${dataArrCar[i].licence_n}">Зняти реєстратор</button>
                        </td>`;
            }

            tr += `<td class="d-flex align-items-center justify-content-center">
                       <button type="button" class="btn btn-sm  bg-secondary text-white change_car" data-toggle="modal" data-target="#carModal" data-self="${dataArrCar[i].self_n}" data-lic_n="${dataArrCar[i].licence_n}" data-id="${dataArrCar[i].car_id}">Змінити</button>
                       <span class="mx-1"> / </span>
                       <form class="car_delete" method="post">
                           <input type="hidden" name="id" value="${dataArrCar[i].car_id}">
                           <button type="button" class="btn btn-sm  bg-secondary text-white del_car" data-id="${dataArrCar[i].car_id}">Видалити</button>
                       </form>
                   </td>`;
            tr += '</tr>';
        }
        $('#carTable tbody').append(tr);
        $('#pagination_car').html(`<ul class="col-md-6 justify-content-md-start pagination pag-left_car mt-2">
                                    <li>Показано з ${dataCar.record_from} по ${dataCar.record_to} із ${dataCar.record_count}</li>
                                  </ul>`);
        let ul_car = `<ul class="col-md-6 justify-content-md-end pagination mb-3 m-md-0">`;
        for (let i = 0; i < dataPagCar.length; i++) {
            ul_car += `<li class="page-item car"><button class="btn" data-href="${dataPagCar[i].p_number}" data-active="${dataPagCar[i].current}">${dataPagCar[i].p_name}</button></li>`;
        }
        ul_car += '</ul>';
        $('.pag-left_car').after(ul_car);
        $('[data-active="true"]').addClass('active-button');
        $('.tabs button:first').click();
        $("form").each(function (a, b) {
            $(b)[0].reset();
        });
        $('.loader').hide();
    }).fail(function (data) {
        console.log(data);
    });

    $('body').on('click', '.change_car', function () { // клік по кнопці - змінити авто +
        $('#car_edit_id').val($(this).data('id'));
        $('#car_edit_lic_n').val($(this).data('lic_n'));
        $('#car_edit_selph_n').val($(this).data('self'));
    });

    $('body').on('change', '#select-count-car', function () { // вибір кількості записів на сторінку +
        $('#car_quantity-per-page').val($('#select-count-car').val());
        $('#submit-form-car').submit();
    });

    $("body").on('click', '.page-item.car button', function () { // клік по кнопці пагінації - вибір сторінки +
        $('#car_page-number').val($(this).data('href'));
        $('#submit-form-car').submit();
    });

    // клік по кнопці - додати авто ==> модалка

    $("body").on('click', '.del_car', function () { // клік по кнопці - видалити авто +
        $('.car_del_id').val($(this).parents('.car_delete').submit());
    });


    $("body").on('submit', '#form_cars', function (event) { // +
        event.preventDefault();
        $('.loader').show();

        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/cars',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            let dataCar = data;
            console.log('car2 ==>', dataCar);
            let dataArrCar = data.data;
            // console.log('dataArrCar', dataArrCar);
            let dataPagCar = data.pages_nav;
            $('#carTable tbody tr').html('');

            let options = '';
            $('#cars-reg-cars').html('');
            for (let i = 0; i < dataCar.reg_list.length; i++) {
                options += `<option value="${dataCar.reg_list[i].r_ip}">`;
            }
            $('#cars-reg-cars').append(options);

            let tr = "";
            for (let i = 0; i < dataArrCar.length; i++) {
                tr += '<tr class="item">';
                tr += `<td class="text-center">${i + 1}</td>`;
                tr += `<td class="text-center">${dataArrCar[i].car_id}</td>`;
                tr += `<td class="text-center">${dataArrCar[i].licence_n}</td>`;
                tr += `<td class="text-center">${dataArrCar[i].self_n}</td>`;
                tr += `<td class="text-center">${dataArrCar[i].r_ip}</td>`;
                // tr += `<td class="text-center">${dataArrCar[i].reg_id}</td>`;
                // tr += `<td class="text-center">${dataArrCar[i].r_sn}</td>`;

                if ((dataArrCar[i].reg_id == null) || (dataArrCar[i].reg_id == 0) || (dataArrCar[i].reg_id == "")) {
                    // console.log('test');

                    tr += `<td class="text-center">
                        <button type="button" class="btn btn-sm  bg-secondary text-white assign_reg_add_car" data-toggle="modal" data-target="#carModal_add" data-reg-ip="${dataArrCar[i].r_ip}" data-car-name="${dataArrCar[i].licence_n}">Поставити реєстратор</button>
                        </td>`;
                } else {
                    tr += `<td class="text-center">
                        <button type="button" class="btn btn-sm  bg-secondary text-white assign_reg_rem_car" data-toggle="modal" data-target="#carModal_rem" data-reg-ip="${dataArrCar[i].r_ip}" data-car-id="${dataArrCar[i].car_id}" data-car-licence_n="${dataArrCar[i].licence_n}">Зняти реєстратор</button>
                        </td>`;
                }

                tr += `<td class="d-flex align-items-center justify-content-center">
                       <button type="button" class="btn btn-sm  bg-secondary text-white change_car" data-toggle="modal" data-target="#carModal" data-self="${dataArrCar[i].self_n}" data-lic_n="${dataArrCar[i].licence_n}" data-id="${dataArrCar[i].car_id}">Змінити</button>
                       <span class="mx-1"> / </span>
                        <form class="car_delete" method="post">
                           <input type="hidden" name="id" value="${dataArrCar[i].car_id}">
                           <button type="button" class="btn btn-sm  bg-secondary text-white del_car" data-id="${dataArrCar[i].car_id}">Видалити</button>
                       </form>
                   </td>`;
                tr += '</tr>';
            }
            $('#carTable tbody').append(tr);
            $('#pagination_car').html(`<ul class="col-md-6 justify-content-md-start pagination pag-left_car mt-2">
                                    <li>Показано з ${dataCar.record_from} по ${dataCar.record_to} із ${dataCar.record_count}</li>
                                  </ul>`);
            let ul_car = `<ul class="col-md-6 justify-content-md-end pagination mb-3 m-md-0">`;
            for (let i = 0; i < dataPagCar.length; i++) {
                ul_car += `<li class="page-item car"><button class="btn" data-href="${dataPagCar[i].p_number}" data-active="${dataPagCar[i].current}">${dataPagCar[i].p_name}</button></li>`;
            }
            ul_car += '</ul>';
            $('.pag-left_car').after(ul_car);
            $('.tabs button:first').click();
            $('[data-active="true"]').addClass('active-button');
            $('body,html').animate({
                scrollTop: 80
            }, 1000);
            $("form").each(function (a, b) {
                $(b)[0].reset();
            });
            $('.loader').hide();
        }).fail(function (data) {
        });
    });


    $('body').on('submit', '#cars_add', function (event) { // запит додати авто +
        event.preventDefault();
        $('#car_add_lic_n').val($('#car_add_lic_n').val().toUpperCase());
        ;
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/cars/add_edit',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log('data ok/err', data);
            console.log('data ok/err', data.comment);
            console.log('data ok/err', data.result);
            if (data.comment == "car already use" && data.result =="error") {
                $("#add_change_car_err").show('slow');
                setTimeout(() => $("#add_change_car_err").hide('slow'), 3000);
            } else if (data.comment == "car added" && data.result =="ok"){
                $("#add_change_car_ok").show('slow');
                setTimeout(() => $("#add_change_car_ok").hide('slow'), 3000);
            }

            $('#submit-form-car').click();
            $('#addCarModal .close').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $('body').on('submit', '#cars_add_edit', function (event) { // запит змінити авто +
        event.preventDefault();
        $('#car_edit_lic_n').val($('#car_edit_lic_n').val().toUpperCase());
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/cars/add_edit',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            if (data.comment == "car already use" && data.result =="error") {
                $("#add_change_car_err").show('slow');
                setTimeout(() => $("#add_change_car_err").hide('slow'), 3000);
            } else if (data.comment == "car added" && data.result =="ok"){
                $("#add_change_car_ok").show('slow');
                setTimeout(() => $("#add_change_car_ok").hide('slow'), 3000);
            }
            $('#submit-form-car').click();
            $('#carModal .close').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $('body').on('submit', '.car_delete', function (event) { // запит видалити авто +
        event.preventDefault();
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/cars/delete',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            $('#submit-form-car').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    // ---------------------------------------------------------------------------------------------------------
    $('body').on('click', '.assign_reg_add_car', function () {
        $('#car-name_add').val($(this).data('car-name'));
        console.log($(this).data('car-name'))
    });

    $('body').on('submit', '#cars_add_reg', function (event) { // запит поставити реєстратор +
        event.preventDefault();

        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url:  '/registrators/r_to_c',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#submit-form-reg').click();
            $('#carModal_add .close').click();
            $('.loader').hide();
            // document.location.reload(true);
        }).fail(function (data) {
        });
    });
    // ---------------------------------------------------------------------------------------------------------


    $('body').on('click', '.assign_reg_rem_car', function () {
        $('#car-name_rem').text($(this).data('car-licence_n'));
        $('#car-reg-ip').text($(this).data('reg-ip'));
        $('#reg_ip_rem').val($(this).data('reg-ip'));
        // console.log($(this).data('car-licence_n'));

    });

    $('body').on('submit', '#cars_rem_reg', function (event) { // запит зняти реєстратор +
        event.preventDefault();

        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url:  '/registrators/r_to_c',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#submit-form-reg').click();
            $('#carModal_rem .close').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });
// ---------------------------------------------------------------------------------------------------------


// search
    $("body").on('keyup', '#searchInput_car', function () {   // запит в полі пошуку +
        $('#car_quantity-per-page').val($('#select-count-car').val());
        $('#car_filter').val($('#searchInput_car').val().toUpperCase());
        $('#submit-form-car').click();
    });

    $('body').on('click', '#carTable th', function () {
        $('body,html').animate({
            scrollTop: 80
        }, 1000);
    });

// sorting table

    $('body').on('click', '#carTable .sort-table-car', function () { // сортування таблиці а-я +
        // console.log('#mainTable th');
        $('#carTable .sort-table-car').each(function (a, b) {
            $(b).removeClass('headerSortUp headerSortDown');
            $(b).css('background-color', '#5a5c69');
        });
        $(this).css('background-color', '#8dbdd8');
        $('#car_sorting-direction-car').val('A-Я');
        $('#car_sorting-field-name').val($(this).data('sort'));
        $('#car_quantity-per-page').val($('#select-count-car').val());
        $('#car_page-number').val($('.btn.active-button').data('href'));
        $(this).addClass('headerSortUp');
        $('#submit-form-car').click();
    });

    $('body').on('click', '#carTable .sort-table-car.headerSortUp', function () { // сортування таблиці я-а +
        $('#carTable .sort-table-car').each(function (a, b) {
            $(b).removeClass('headerSortUp headerSortDown');
            $(b).css('background-color', '#5a5c69');
        });
        $(this).css('background-color', '#8dbdd8');
        $('#car_sorting-direction-car').val('Я-А');
        $('#car_sorting-field-name').val($(this).data('sort'));
        $('#car_quantity-per-page').val($('#select-count-car').val());
        $('#car_page-number').val($('.btn.active-button').data('href'));
        $(this).addClass('headerSortDown');
        $('#submit-form-car').click();
    });
// end sorting table

});

// ==================================================================   END CAR    ===================================================================================

// ==================================================================    REG    ===================================================================================

$(document).ready(function () {


    $('body').on('click', '#reg_tabs', function () { // клік по вкладці з реєстраторами +
        $('#submit-form-reg').submit();
    });

    $('body').on('click', '.change_reg', function () { // клік по кнопці змінити реєстратор +
        $('#reg_edit_id').val($(this).data('id')); // id
        $('#reg_edit_car_id').val($(this).parents('.item').find('td:eq(1)').text()); // car id
        $('#reg_edit_r_ip').val($(this).parents('.item').find('td:eq(6)').text()); // ip
        $('#reg_edit_r_name').val($(this).data('r_name'));  // назва реєстратора
        $('#reg_edit_r_sn').val($(this).data('r_sn'));  // серійний номер реєстратора
        $('#reg_edit_r_ip').val($(this).data('r_ip'));  // ip реєстратора
    });

    $('body').on('change', '#select-count-reg', function () { // вибір кількості записів на сторінку +
        $('#reg_quantity-per-page').val($('#select-count-reg').val());
        $('#submit-form-reg').submit();
    });

    $("body").on('click', '.page-item.reg button', function () { // клік по кнопці вибору сторінки +
        $('#reg_page-number').val($(this).data('href'));
        $('#submit-form-reg').submit();
    });

    $("body").on('click', '.del_reg', function () { // клік по кнопці видалити реєстратор +
        $('.reg_del_id').val($(this).parents('.reg_delete').submit());
    });

    $('body').on('submit', '#form_regs', function (event) { // запит для реєстраторів +
        event.preventDefault();
        $('.loader').show();

        // console.log('open reg');
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/registrators',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            let dataReg = data;
            console.log('reg ==>', dataReg);
            let dataArrReg = data.data;
            // console.log('dataArrReg', dataArrReg);
            // console.log('dataReg.auto_list', dataReg.auto_list);
            let dataPagReg = data.pages_nav;
            $('#regTable tbody tr').html('');

            let options = '';
            $('#cars').html('');
            for (let i = 0; i < dataReg.auto_list.length; i++) {
                options += `<option value="${dataReg.auto_list[i].licence_n}">`;
            }
            $('#cars').append(options);

            let tr = "";
            for (let i = 0; i < dataArrReg.length; i++) {

                tr = '<tr class="item">';
                tr += `<td class="text-center">${i}</td>`;
                // tr += `<td class="text-center">${dataArrReg[i].car_id}</td>`; // ID авто
                tr += `<td class="text-center">${dataArrReg[i].licence_n}</td>`; // Номер авто
                // tr += `<td class="text-center">${dataArrReg[i].id}</td>`; // id
                tr += `<td class="text-center">${dataArrReg[i].r_name}</td>`; // Назва реєстратора
                tr += `<td class="text-center">${dataArrReg[i].r_sn}</td>`; // Серійний № реєстратора
                tr += `<td class="text-center">${dataArrReg[i].r_ip}</td>`; // IP реєстратора

                if ((dataArrReg[i].licence_n == null) || (dataArrReg[i].licence_n == 0) || (dataArrReg[i].licence_n == "")) {
                    // console.log('test');

                    tr += `<td class="text-center">
                            <button type="button" class="btn btn-sm  bg-secondary text-white assign_reg_add" data-toggle="modal" data-target="#regModal_add" data-reg-ip="${dataArrReg[i].r_ip}" data-car-id="${dataArrReg[i].car_id}">Поставити реєстратор</button>
                            </td>`;
                } else {
                    tr += `<td class="text-center">
                            <button type="button" class="btn btn-sm  bg-secondary text-white assign_reg_rem" data-toggle="modal" data-target="#regModal_rem" data-reg-ip="${dataArrReg[i].r_ip}" data-reg-name="${dataArrReg[i].r_name}" data-car-licence_n="${dataArrReg[i].licence_n}">Зняти реєстратор</button>
                            </td>`;
                }

                tr += `<td class="d-flex align-items-center justify-content-center">
                       <button type="button"  class="btn btn-sm  bg-secondary text-white change_reg" data-toggle="modal" data-target="#regModal" data-r_ip="${dataArrReg[i].r_ip}" data-r_sn="${dataArrReg[i].r_sn}" data-r_name="${dataArrReg[i].r_name}" data-id="${dataArrReg[i].id}">Змінити</button>
                             <span class="mx-1"> / </span>
                        <form class="reg_delete" method="post">
                           <input type="hidden" name="id" value="${dataArrReg[i].id}">
                           <button type="button" class="btn btn-sm  bg-secondary text-white del_reg" data-id="${dataArrReg[i].id}">Видалити</button>
                       </form>
                       </td>`;
                tr += '</tr>';
                $('#regTable tbody').append(tr);
            }
            $('#pagination_reg').html(`<ul class="col-md-6 justify-content-md-start pagination pag-left_reg mt-2">
                                        <li>Показано з ${dataReg.record_from} по ${dataReg.record_to} із ${dataReg.record_count}</li>
                                      </ul>`);
            let ul_reg = '';
            ul_reg = `<ul class="col-md-6 justify-content-md-end pagination mb-3 m-md-0">`;
            for (let i = 0; i < dataPagReg.length; i++) {
                ul_reg += `<li class="page-item reg"><button class="btn" data-href="${dataPagReg[i].p_number}" data-active="${dataPagReg[i].current}">${dataPagReg[i].p_name}</button></li>`;
            }
            ul_reg += '</ul>';
            $('.pag-left_reg').after(ul_reg);
            $('[data-active="true"]').addClass('active-button');
            $('body,html').animate({
                scrollTop: 80
            }, 1000);
            $("form").each(function (a, b) {
                $(b)[0].reset();
            });
            $('.loader').hide();
        }).fail(function (data) {
            console.log(data);
        });
    });

    $('body').on('submit', '#regs_add', function (event) { // запит додати реєстратор +
        event.preventDefault();
        $('#reg_addr_sn').val($('#reg_addr_sn').val().toUpperCase());
        $('#reg_addr_name').val($('#reg_addr_name').val().toUpperCase());

        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/registrators/add_edit',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log('data ok/err', data);
            console.log('data ok/err', data.comment);
            console.log('data ok/err', data.result);
            if (data.comment == "ip already use" && data.result =="error") {
                $("#add_change_reg_err").show('slow');
                setTimeout(() => $("#add_change_reg_err").hide('slow'), 3000);
            } else if (data.comment == "recorder added" && data.result =="ok"){
                $("#add_change_reg_ok").show('slow');
                setTimeout(() => $("#add_change_reg_ok").hide('slow'), 3000);
            }
            $('#submit-form-reg').click();
            $('#addRegModal .close').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $('body').on('submit', '#regs_add_edit', function (event) { // запит змінити реєстратор +
        event.preventDefault();
        $('#reg_edit_r_name').val($('#reg_edit_r_name').val().toUpperCase());
        $('#reg_edit_r_sn').val($('#reg_edit_r_sn').val().toUpperCase());

        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/registrators/add_edit',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            if (data.comment == "ip already use" && data.result =="error") {
                $("#add_change_reg_err").show('slow');
                setTimeout(() => $("#add_change_reg_err").hide('slow'), 3000);
            } else if (data.comment == "recorder added" && data.result =="ok"){
                $("#add_change_reg_ok").show('slow');
                setTimeout(() => $("#add_change_reg_ok").hide('slow'), 3000);
            }
            $('#submit-form-reg').click();
            $('#regModal .close').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $('body').on('submit', '.reg_delete', function (event) { // запит видалити реєстратор +
        event.preventDefault();
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/registrators/delete',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            $('#submit-form-reg').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });
// ---------------------------------------------------------------------------------------------------------
    $('body').on('click', '.assign_reg_add', function () {
        $('#reg_ip_add').val($(this).data('reg-ip'));
    });

    $('body').on('submit', '#registrators_add', function (event) { // запит поставити реєстратор +
        event.preventDefault();

        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url:  '/registrators/r_to_c',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#submit-form-reg').click();
            $('#regModal_add .close').click();
            $('.loader').hide();
            // document.location.reload(true);
        }).fail(function (data) {
        });
    });
    // ---------------------------------------------------------------------------------------------------------


    $('body').on('click', '.assign_reg_rem', function () {
        $('#car_id_rem').text($(this).data('car-licence_n'));
        $('#reg-name').text($(this).data('reg-name'));
        $('#reg_ip_rem').val($(this).data('reg-ip'));
        // console.log($(this).data('car-licence_n'));

    });

    $('body').on('submit', '#registrators_rem', function (event) { // запит зняти реєстратор +
        event.preventDefault();

        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url:  '/registrators/r_to_c',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $('#submit-form-reg').click();
            $('#regModal_rem .close').click();
            $('.loader').hide();
            // document.location.reload(true);
        }).fail(function (data) {
        });
    });
// ---------------------------------------------------------------------------------------------------------


//  search reg
    $("body").on('keyup', '#searchInput_reg', function () {     //  search car +
        $('#reg_quantity-per-page').val($('#select-count-reg').val());
        $('#reg_filter').val($('#searchInput_reg').val().toUpperCase());
        $('#submit-form-reg').click();
    });

// sorting table
    $('body').on('click', '#regTable .sort-table-reg', function () { // сортування таблиці а-я +
        $('#regTable .sort-table-reg').each(function (a, b) {
            $(b).removeClass('headerSortUp headerSortDown');
            $(b).css('background-color', '#5a5c69');
        });
        $(this).css('background-color', '#8dbdd8');
        $('#reg_sorting-direction-reg').val('A-Я');
        $('#reg_sorting-field-name').val($(this).data('sort'));
        $('#reg_quantity-per-page').val($('#select-count-reg').val());
        $('#reg_page-number').val($('.btn.active-button').data('href'));
        $(this).addClass('headerSortUp');
        $('#submit-form-reg').submit();
    });

    $('body').on('click', '#regTable .sort-table-reg.headerSortUp', function () {
        +
            $('#regTable .sort-table-reg').each(function (a, b) {
                $(b).removeClass('headerSortUp headerSortDown');
                $(b).css('background-color', '#5a5c69');
            });
        $(this).css('background-color', '#8dbdd8');
        $('#reg_sorting-direction-reg').val('Я-А');
        $('#reg_sorting-field-name').val($(this).data('sort'));
        $('#reg_quantity-per-page').val($('#select-count-reg').val());
        $('#reg_page-number').val($('.btn.active-button').data('href'));
        $(this).addClass('headerSortDown');
        $('#submit-form-reg').submit();
    });
// end sorting table

});
// ==================================================================   END REG    ===================================================================================


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {

    // change tabs
    $('.tab_content').each(function (a, b) {
        $(b).hide();
    });

    $('body').on('click', '#car_tabs', function (e) {
        $('.tab').each(function (a, b) {
            $(b).removeClass('active');
        });
        $('.tab_content').each(function (a, b) {
            $(b).hide();
        });
        $(this).addClass('active');
        $('#car_tab').show();
    });

    $('body').on('click', '#reg_tabs', function (e) {
        $('.tab').each(function (a, b) {
            $(b).removeClass('active');
        });
        $('.tab_content').each(function (a, b) {
            $(b).hide();
        });
        $(this).addClass('active');
        $('#reg_tab').show();
    });
    // end change tabs


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






























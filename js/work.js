var arr_id = [];
var name_file = [];
var scroll_bar;


var data1 = [];
var visits1 = 0;
var series1;
var chart1;

var data2 = [];
var visits2 = 0;
var series2;
var chart2;

$(document).ready(function () {

    //	datepicker
    let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    $('#startDate').datepicker({
        modal: true,
        format: 'yyyy-mm-dd',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        locale: "ru-ru",
        maxDate: today
    });
    $('#endDate').datepicker({
        modal: true,
        format: 'yyyy-mm-dd',
        uiLibrary: 'bootstrap4',
        iconsLibrary: 'fontawesome',
        locale: "ru-ru",
        maxDate: today
    });
    //	end datepicker

    //  view video modal
    $('body').on('click', '.close', function () {
        $('.modal-body').html('');
    });

    $('body').on('click', '.modal.fade.show', function (e) {
        e.preventDefault();
    });

    // slider
    var custom_values_left = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    var my_from_left = custom_values_left.indexOf(0);
    var my_to_left = custom_values_left.indexOf(24);

    var custom_values_right = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    var my_from_right = custom_values_right.indexOf(0);
    var my_to_right = custom_values_right.indexOf(24);

    $("#slider-left").ionRangeSlider({
        // type: "double",
        skin: "big",
        grid: true,
        from: my_from_left,
        to: my_to_left,
        values: custom_values_left
    });

    $("#slider-right").ionRangeSlider({
        // type: "double",
        skin: "big",
        grid: true,
        from: 24,
        to: my_to_right,
        values: custom_values_right
    });

    // end slider

    $.ajax({
        data: $($('#form-search-date')).serialize(),
        type: "POST",
        url: '/videos',
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: 'json'
    }).done(function (data) {
        console.log('load def data', data);

        if (data.user_can_do[5] != "view_config" || data.user_can_do[6] != 'set_config') {
            $('#get-videos').addClass('d-none');
            $('#click_link').addClass('d-none');
            $('#network_config').addClass('d-none');
            $('#header-info').addClass('d-none');
            $('#server-info').addClass('d-none');
            $('#car-info').removeClass('col-md-8 mb-4');
        }

        if (data.user_can_do[5] == 'view_config' || data.user_can_do[6] == 'set_config') {
            let config = `<a href="/config" id="click_link" class="btn w-100 hover-bg" style="border-color: #858796!important; color: #858796!important;">Конфігуратор авто<i class='ml-2 fas fa-cogs'></i></a>`;
            $('#config').append(config);

            let network = `<a href="/network" id="network_config" class="btn w-100 hover-bg" style="border-color: #858796!important; color: #858796!important;">Конфігуратор мережі<i class='ml-2 fas fa-network-wired'></i></a>`;
            $('#network').append(network);
        }
            let users = `<a href="/users" id="network_config" class="btn w-100 hover-bg" style="border-color: #858796!important; color: #858796!important;">Конфігуратор користувачів<i class='ml-2 fas fa-users'></i></a>`;
            $('#users').append(users);




    }).fail(function (data) {
    });

    // server info

    setInterval(() =>
        $.ajax({
            data: '',
            type: "POST",
            url: '/serverstat',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            // console.log('data.user_can_do', data.user_can_do);
            if (data.user_can_do[5] == 'view_config' || data.user_can_do[6] == 'set_config') {
                $('#files_on_server').text(`${data.data[0].files_on_server}`);
                $('#files_on_server_today').text(`${data.data[0].files_on_server_today}`);
                $('#processor_load').text(`${data.data[0].processor_load + ' %'}`);

                if(`${data.data[0].processor_load}` >= 85){
                    $('#processor_load').removeClass('green-color');
                    $('#processor_load').addClass('red-color');
                } else {
                    $('#processor_load').removeClass('red-color');
                    $('#processor_load').addClass('green-color');
                }

                $('#dw_speed').text(`${data.data[0].dw_speed}`);
                // console.log('speed', data.data[0].dw_speed_MB);

                if(`${data.data[0].dw_speed_MB}` <= 10){
                    $('#dw_speed').removeClass('green-color');
                    $('#dw_speed').addClass('red-color');
                } else {
                    $('#dw_speed').removeClass('red-color');
                    $('#dw_speed').addClass('green-color');
                }
            }


            // console.log('data.data[0].dw_speed_MB', data.data[0].dw_speed_MB);


            // ------------------------------------------------------------------------------------------1
            // visits1 = data.data[0].processor_load;
            visits1 = ((Math.random() * 100)/2).toFixed(0);
            var lastdataItem = series1.dataItems.getIndex(series1.dataItems.length - 1);
            chart1.addData(
                { date: new Date(lastdataItem.dateX.getTime() + 1000), value: visits1 },
                1
            );

            $('#processor_load').text(`${visits1 + ' %'}`);

            if(visits1 >= 85){
                $('#processor_load').removeClass('green-color');
                $('#processor_load').addClass('red-color');
            } else {
                $('#processor_load').removeClass('red-color');
                $('#processor_load').addClass('green-color');
            }

            // console.log('visits1', visits1);
            // ------------------------------------------------------------------------------------------1
            // ------------------------------------------------------------------------------------------2
            visits2 = data.data[0].dw_speed_MB;
            // visits2 = (Math.random() * 100).toFixed(0);
                    var lastdataItem = series2.dataItems.getIndex(series2.dataItems.length - 1);
                    chart2.addData(
                        { date: new Date(lastdataItem.dateX.getTime() + 1000), value: visits2 },
                        1
                    );

            $('#dw_speed').text(visits2 + ' Мбіт/с');


            if(visits2 <= 10){
                $('#dw_speed').removeClass('green-color');
                $('#dw_speed').addClass('red-color');
            } else {
                $('#dw_speed').removeClass('red-color');
                $('#dw_speed').addClass('green-color');
            }

            // console.log('visits2', visits2);
            // ------------------------------------------------------------------------------------------2


        }).fail(function (data) {
            // });
        }), 2000);

    $('.bar').scroll(function () {
        scroll_bar = $(".bar").scrollTop();
    });




    // ------------------------------------------------------------------------------------------1
    am4core.ready(function() {

// Themes begin
        am4core.useTheme(am4themes_animated);
// Themes end

        chart1 = am4core.create("chartdiv1", am4charts.XYChart);
        chart1.hiddenState.properties.opacity = 0;

        chart1.padding(0, 0, 0, 0);

        chart1.zoomOutButton.disabled = true;

        // var data = [];
        // var visits = 0;

        for (let i = 0; i <= 30; i++) {
            visits1 = Math.random() * 100;
            data1.push({ date: new Date().setSeconds(i - 30), value: visits1 });
        }

        chart1.data = data1;

        let dateAxis = chart1.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.dateFormats.setKey("second", "ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm");
        dateAxis.renderer.inside = true;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        let valueAxis = chart1.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        series1 = chart1.series.push(new am4charts.LineSeries());
        series1.dataFields.dateX = "date";
        series1.dataFields.valueY = "value";
        series1.interpolationDuration = 500;
        series1.defaultState.transitionDuration = 0;
        series1.tensionX = 0.8;

        chart1.events.on("datavalidated", function () {
            dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });

        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;


        series1.fillOpacity = 1;
        let gradient = new am4core.LinearGradient();
        gradient.addColor(chart1.colors.getIndex(0), 0.2);
        gradient.addColor(chart1.colors.getIndex(0), 0);
        series1.fill = gradient;

// this makes date axis labels to fade out
        dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
            let dataItem = target.dataItem;
            return dataItem.position;
        });

// need to set this, otherwise fillOpacity is not changed and not set
        dateAxis.events.on("validated", function () {
            am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
                label.fillOpacity = label.fillOpacity;
            })
        });

// this makes date axis labels which are at equal minutes to be rotated
        dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
            let dataItem = target.dataItem;
            if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
                target.verticalCenter = "bottom";
                target.horizontalCenter = "top";
                return 0;
            }
            else {
                target.verticalCenter = "bottom";
                target.horizontalCenter = "middle";
                return 0;
            }
        });

// bullet at the front of the line
        let bullet = series1.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 5;
        bullet.fillOpacity = 1;
        bullet.fill = chart1.colors.getIndex(0);
        bullet.isMeasured = false;

        series1.events.on("validated", function() {
            bullet.moveTo(series1.dataItems.last.point);
            bullet.validatePosition();
        });

    }); // end am4core.ready()
    // ------------------------------------------------------------------------------------------1
    // ------------------------------------------------------------------------------------------2

    am4core.ready(function() {

// Themes begin
        am4core.useTheme(am4themes_animated);
// Themes end

        chart2 = am4core.create("chartdiv2", am4charts.XYChart);
        chart2.hiddenState.properties.opacity = 0;

        chart2.padding(0, 0, 0, 0);

        chart2.zoomOutButton.disabled = true;

        // var data = [];
        // var visits = 0;

        for (let i = 0; i <= 30; i++) {
            visits2 = Math.random() * 100;
            data2.push({ date: new Date().setSeconds(i - 30), value: visits2 });
        }

        chart2.data = data2;

        let dateAxis = chart2.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.dateFormats.setKey("second", "ss");
        dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm");
        dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm");
        dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm");
        dateAxis.renderer.inside = true;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        let valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.interpolationDuration = 500;
        valueAxis.rangeChangeDuration = 500;
        valueAxis.renderer.inside = true;
        valueAxis.renderer.minLabelPosition = 0.05;
        valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        series2 = chart2.series.push(new am4charts.LineSeries());
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = "value";
        series2.interpolationDuration = 500;
        series2.defaultState.transitionDuration = 0;
        series2.tensionX = 0.8;

        chart2.events.on("datavalidated", function () {
            dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
        });

        dateAxis.interpolationDuration = 500;
        dateAxis.rangeChangeDuration = 500;


        series2.fillOpacity = 1;
        let gradient = new am4core.LinearGradient();
        gradient.addColor(chart2.colors.getIndex(0), 0.2);
        gradient.addColor(chart2.colors.getIndex(0), 0);
        series2.fill = gradient;

// this makes date axis labels to fade out
        dateAxis.renderer.labels.template.adapter.add("fillOpacity", function (fillOpacity, target) {
            let dataItem = target.dataItem;
            return dataItem.position;
        });

// need to set this, otherwise fillOpacity is not changed and not set
        dateAxis.events.on("validated", function () {
            am4core.iter.each(dateAxis.renderer.labels.iterator(), function (label) {
                label.fillOpacity = label.fillOpacity;
            })
        });

// this makes date axis labels which are at equal minutes to be rotated
        dateAxis.renderer.labels.template.adapter.add("rotation", function (rotation, target) {
            let dataItem = target.dataItem;
            if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
                target.verticalCenter = "bottom";
                target.horizontalCenter = "top";
                return 0;
            }
            else {
                target.verticalCenter = "bottom";
                target.horizontalCenter = "middle";
                return 0;
            }
        });

// bullet at the front of the line
        let bullet = series2.createChild(am4charts.CircleBullet);
        bullet.circle.radius = 5;
        bullet.fillOpacity = 1;
        bullet.fill = chart2.colors.getIndex(0);
        bullet.isMeasured = false;

        series2.events.on("validated", function() {
            bullet.moveTo(series2.dataItems.last.point);
            bullet.validatePosition();
        });

    }); // end am4core.ready()

    // ------------------------------------------------------------------------------------------2




    // server info bar

    function interval() {
        $('#filter-car-search').val($('#filter-car-search').val().toUpperCase());

        $.ajax({
            data: $('#filter-car').serialize(),
            type: "POST",
            url: '/registrators/show_status',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            // console.log('server info bar ok', data);

            $('.card-body.bar').html('');

            for (let i = 0; i < data.data.length; i++) {
                let bar = '';
                bar += `<div class="connected" data-connected=${data.data[i].connected}>`;
                bar += `<div class="row no-gutters font-weight-bold">`;
                bar += `<div class="col-sm-12 col-md-2 text-center text-md-left">
                        <span>${data.data[i].connected == true ? `<i class="fas fa-circle mr-2" style="color: green; font-size: 10px; margin-bottom: 5px"></i>` : `<i class="fas fa-circle mr-2" style="color: red; font-size: 10px; margin-bottom: 5px"></i>`}</span>${data.data[i].licence_n}</div>`;
                bar += `<div class="col-sm-12 col-md-4 text-center">Швидкість - ${data.data[i].dw_speed}</div>`;
                bar += `<div class="col-sm-12 col-md-4 text-center">Скачано - ${data.data[i].dw_present_files + " із " + data.data[i].dw_all_files} файлів</div>`;
                bar += `<div class="col-sm-12 col-md-2 text-right">${data.data[i].dw_files_procent}%</div>`;
                bar += `</div>`;
                bar += `<div class="progress w-0 mb-4"><div id=${i} data-id=${data.data[i].dw_files_procent} class="progress-bar el" style="width: ${data.data[i].dw_files_procent}%"></div></div>`;
                bar += `</div>`;

                $('.card-body.bar').append(bar);


            }

            $('.el').each(function (a, b) {
                let el = $(b).data('id');
                if (el <= 20) {
                    $(b).addClass('gr_20');
                } else if (el > 20 && el <= 40) {
                    $(b).addClass('gr_40');
                } else if (el > 40 && el <= 60) {
                    $(b).addClass('gr_60');
                } else if (el > 60 && el <= 80) {
                    $(b).addClass('gr_80');
                } else if (el > 80 && el <= 100) {
                    $(b).addClass('gr_100');
                }

            });

            if ($("#checkbox").attr('checked')) {
                // console.log('1');
                $('.connected').each(function (a, b) {
                    if ($(b).data('connected') == false) {
                        $(b).addClass('d-none');
                        $(b).removeClass('d-block');
                        // console.log('checked');
                    }
                });
                // $("#checkbox").removeAttr('checked');
            } else {
                $('.connected').each(function (a, b) {
                    // console.log('2');
                    if ($(b).data('connected') == false) {
                        $(b).addClass('d-block');
                        $(b).removeClass('d-none');
                        // console.log('no checked');
                    }


                });
                // $("#checkbox").attr('checked', 'checked')
            }
            $(".bar").scrollTop(scroll_bar);

        }).fail(function (data) {
            // console.log('server info bar err', data);
            // });
        });
        $('.progress').each(function (a, b) {
            $(b).animate({width: '100%'}, 1000);
        });

    }

    setInterval(interval, 3000);


    $("#checkbox").click(function () {
        if ($("#checkbox").attr('checked')) {
            $("#checkbox").removeAttr('checked');
        } else {
            $("#checkbox").attr('checked', 'checked')
        }
    });


    // server info circle
    $.ajax({
        data: '',
        type: "POST",
        url: '/serverstat',
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: 'json'
    }).done(function (data) {
        console.log('server info circle', data);

        if (data.user_can_do[5] == 'view_config' || data.user_can_do[6] == 'set_config') {
            Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
            Chart.defaults.global.defaultFontColor = '#858796';
            let disc_space = data.data[0].disk_space_db + data.data[0].disk_space_files;
            let disc_space_free = data.data[0].disk_space_free_db + data.data[0].disk_space_free_files;
            let disc_space_full = disc_space - disc_space_free;
            $('#full').text((disc_space_full / (disc_space_free + disc_space_full) * 100 ).toFixed(0));
            $('#free').text((disc_space_free / (disc_space_free + disc_space_full) * 100 ).toFixed(0));

            // console.log(disc_space, disc_space_free, disc_space_full);

            // Pie Chart Example
            var ctx = document.getElementById("myPieChart");
            var myPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["вільно", "занято"],
                    datasets: [{
                        data: [`${disc_space_free}`, `${disc_space_full}`],
                        backgroundColor: ['green', 'red'],
                        hoverBackgroundColor: ['#28a745c4', '#ff0000c7'],
                        hoverBorderColor: "rgba(234, 236, 244, 140)",
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: false
                    },
                    cutoutPercentage: 80,
                },
            });
        }
    }).fail(function (data) {
    });


    //form
    $('body').on('submit', '#form-search-date', function (event) {
        event.preventDefault();
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/videos',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log('data', data);
            let dataArr = data.data;
            console.log('dataArr', dataArr);
            let dataPag = data.pages_nav;
            $('tbody tr').html('');
            let tr = "";
            arr_id = [];
            name_file = [];
            for (let i = 0; i < dataArr.length; i++) {
                arr_id.push(`${dataArr[i].id}`);
                name_file.push(`${data.data[i].licence_n + '  ' + data.data[i].dateonly_of_recording_start_ + '  ' + data.data[i].timeonly_of_recording_start_}`);
                tr += '<tr class="item">';
                tr += `<td class="text-center">${i + 1}</td>`;
                tr += `<td class="text-center">${dataArr[i].licence_n}</td>`;
                tr += `<td class="text-center">${dataArr[i].dateonly_load_ == null ? null : dataArr[i].dateonly_load_}</td>`; // дата записи на сервер
                tr += `<td class="text-center">${dataArr[i].dateonly_of_recording_start_}</td>`; // дата записи
                tr += `<td class="text-center">${dataArr[i].timeonly_of_recording_start_}</td>`; // время записи
                tr += `<td class="text-center">${dataArr[i].file_size}</td>`; // размер файла
                if (data.user_can_do[2] == 'dw_load_video') {
                    tr += `<td class="text-center">
                                <form action="/video/attachment" method="post" id="id_${dataArr[i].id}">
                                      <input name="id" value="${dataArr[i].id}" type="hidden"/>
                                    <button type="submit" class="btn btn-user btn-block btn-sm load-file bg-secondary text-white" style="width: 175px; margin: auto">Завантажити файл<i class='ml-3 fas fa-file-download'></i></button>
                                </form>
                            </td>`;
                } else {
                    tr += `<td class="text-center">
                                    <a href="№" class="btn btn-sm bg-secondary text-white disabled">Завантажити</a>
                            </td>`;
                }
                tr += '</tr>';
            }

            $('#mainTable tbody').append(tr);
            $('#pagination').html(`<ul class="col-md-6 justify-content-md-start pagination pag-left mt-2">
								<li>Показано з ${data.record_from} по ${data.record_to} із ${data.record_count}</li>
							  </ul>`);
            let ul = `<ul class="col-md-6 justify-content-md-end pagination mb-3 m-md-0">`;
            for (let i = 0; i < dataPag.length; i++) {
                ul += `<li class="page-item"><button class="btn" style="border-color: #858796!important; color: #858796;" data-href="${dataPag[i].p_number}" data-active="${dataPag[i].current}">${dataPag[i].p_name}</button></li>`;
            }
            ul += '</ul>';
            $('.pag-left').after(ul);
            $('[data-active="true"]').addClass('active-button');

            if ((window.innerWidth) >= 1200) {
                $('body,html').animate({
                    scrollTop: 1000
                }, 1000);
            } else if ((window.innerWidth) >= 992) {
                $('body,html').animate({
                    scrollTop: 1150
                }, 1000);
            } else if ((window.innerWidth) >= 768) {
                $('body,html').animate({
                    scrollTop: 1185
                }, 1000);
            } else if ((window.innerWidth) >= 576) {
                $('body,html').animate({
                    scrollTop: 2210
                }, 1000);
            } else if ((window.innerWidth) >= 300) {
                $('body,html').animate({
                    scrollTop: 2220
                }, 1000);
            }
            $('#mainTable tr:last').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    $('body').on('submit', '#form-search-date-pag', function (event) {
        event.preventDefault();
        $('.loader').show();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            url: '/videos',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        }).done(function (data) {
            console.log('data', data);
            let dataArr = data.data;
            console.log('dataArr', dataArr);
            let dataPag = data.pages_nav;
            $('tbody tr').html('');
            let tr = "";
            arr_id = [];
            name_file = [];
            for (let i = 0; i < dataArr.length; i++) {
                arr_id.push(`${dataArr[i].id}`);
                name_file.push(`${data.data[i].licence_n + '  ' + data.data[i].dateonly_of_recording_start_ + '  ' + data.data[i].timeonly_of_recording_start_}`);
                tr += '<tr class="item">';
                tr += `<td class="text-center">${i + 1}</td>`;
                tr += `<td class="text-center">${dataArr[i].licence_n}</td>`;
                tr += `<td class="text-center">${dataArr[i].dateonly_load_ == null ? null : dataArr[i].dateonly_load_}</td>`; // дата записи на сервер
                tr += `<td class="text-center">${dataArr[i].dateonly_of_recording_start_}</td>`; // дата записи
                tr += `<td class="text-center">${dataArr[i].timeonly_of_recording_start_}</td>`; // время записи
                tr += `<td class="text-center">${dataArr[i].file_size}</td>`; // размер файла
                if (data.user_can_do[2] == 'dw_load_video') {
                    tr += `<td class="text-center">
                                <form action="/video/attachment" method="post" id="id_${dataArr[i].id}">
                                      <input name="id" value="${dataArr[i].id}" type="hidden"/>
                                    <button type="submit" class="btn btn-user btn-block btn-sm load-file bg-secondary text-white">Завантажити</button>
                                </form>
                            </td>`;
                } else {
                    tr += `<td class="text-center">
                                    <a href="№" class="btn btn-sm bg-secondary text-white disabled">Завантажити</a>
                            </td>`;
                }
                tr += '</tr>';
            }

            $('#mainTable tbody').append(tr);
            $('#pagination').html(`<ul class="col-md-6 justify-content-md-start pagination pag-left mt-2">
								<li>Показано з ${data.record_from} по ${data.record_to} із ${data.record_count}</li>
							  </ul>`);
            let ul = `<ul class="col-md-6 justify-content-md-end pagination mb-3 m-md-0">`;
            for (let i = 0; i < dataPag.length; i++) {
                ul += `<li class="page-item"><button class="btn" style="border-color: #858796!important; color: #858796;" data-href="${dataPag[i].p_number}" data-active="${dataPag[i].current}">${dataPag[i].p_name}</button></li>`;
            }
            ul += '</ul>';
            $('.pag-left').after(ul);
            $('[data-active="true"]').addClass('active-button');

            if ((window.innerWidth) >= 1200) {
                $('body,html').animate({
                    scrollTop: 1000
                }, 1000);
            } else if ((window.innerWidth) >= 992) {
                $('body,html').animate({
                    scrollTop: 1150
                }, 1000);
            } else if ((window.innerWidth) >= 768) {
                $('body,html').animate({
                    scrollTop: 1185
                }, 1000);
            } else if ((window.innerWidth) >= 576) {
                $('body,html').animate({
                    scrollTop: 2210
                }, 1000);
            } else if ((window.innerWidth) >= 300) {
                $('body,html').animate({
                    scrollTop: 2220
                }, 1000);
            }
            $('#mainTable tr:last').click();
            $('.loader').hide();
        }).fail(function (data) {
        });
    });

    // show table
    $('body').on('click', '#show-table', function () {

        $('#numberCar').val($('#numberCar').val().toUpperCase());

        var time_start = $('#slider-left').val();
        if (time_start.length == 1) {
            $('#time-start').val("0" + time_start + `${":00:00"}`);
        } else {
            $('#time-start').val(time_start + `${":00:00"}`);
            if ($('#time-start').val() == "24:00:00") {
                $('#time-start').val("23:59:59");
            }
        }
        var time_end = $('#slider-right').val();
        if (time_end.length == 1) {
            $('#time-end').val("0" + time_end + `${":00:00"}`);
        } else {
            $('#time-end').val(time_end + `${":00:00"}`);
            if ($('#time-end').val() == "24:00:00") {
                $('#time-end').val("23:59:59");
            }
        }
        $('#section-table').removeClass('d-none');
        $('#section-table').show('slow');
        $('#page-number').val('1');
    });

    // clear all filters
    $('body').on('click', '#clear-all-filters', function () {
        $('#numberCar').val('');
        $('#startDate').val('');
        $('#endDate').val('');
        $('#slider-left').data("ionRangeSlider").reset();
        $('#slider-right').data("ionRangeSlider").reset();
        $('#page-number').val('1');
        $('#sorting-direction').val('A-Я');
        $('#sorting_field_name').val('date-write');
        $('#quantity-per-page').val('10');
    });

    // count on page
    $('body').on('change', '#select-count-main', function () {
        $('#page-number').val('1');
        $('#sorting-direction').val('A-Я');
        $('#sorting_field_name').val('date-write');
        $('#quantity-per-page').val($('#select-count-main').val());
        $('#show-table').click();
    });

    // search on table
    $("body").on('keyup', '#searchInput_main', function () {
        $('#page-number').val('1');
        $('#sorting-direction').val('A-Я');
        $('#sorting_field_name').val('date-write');
        $('#quantity-per-page').val($('#select-count-main').val());
        $('#filter').val($('#searchInput_main').val());
        $('#show-table').click();
    });

    // sorting table A-Я
    $('body').on('click', '#mainTable .sort-table', function () {
        $('#page-number').val('1');
        $('#mainTable .sort-table').each(function (a, b) {
            $(b).removeClass('headerSortUp headerSortDown');
            $(b).css('background-color', '#5a5c69');
        });
        $(this).css('background-color', '#8dbdd8');
        $('#sorting-direction').val('A-Я');
        $('#sorting_field_name').val($(this).data('sort'));
        $('#quantity-per-page').val($('#select-count-main').val());
        $(this).addClass('headerSortDown');
        $('#show-table').click();
    });

    // sorting table Я-А
    $('body').on('click', '#mainTable .sort-table.headerSortDown', function () {
        $('#page-number').val('1');
        $('#mainTable .sort-table').each(function (a, b) {
            $(b).removeClass('headerSortUp headerSortDown');
            $(b).css('background-color', '#5a5c69');
        });
        $(this).css('background-color', '#8dbdd8');
        $('#sorting-direction').val('Я-А');
        $('#sorting_field_name').val($(this).data('sort'));
        $('#quantity-per-page').val($('#select-count-main').val());
        $(this).addClass('headerSortUp');
        $('#show-table').click();
    });

    // pagination
    $("body").on('click', '.page-item button', function () {
        $('#sorting-direction-pag').val('A-Я');
        $('#sorting_field_name-pag').val('date-write');
        $('#quantity-per-page-pag').val($('#select-count-main').val());
        $('#prev-next-pag').val($(this).text());
        $('#page-number-pag').val($(this).data('href'));
        $('#show-table-pag').click();
    });

    // get-all-videos
    $("body").on('submit', '#form-get-all-videos', function (event) {
        event.preventDefault();
        $('.loader').show();
        for (let i = 0; i < arr_id.length; i++) {
            // console.log('arr_id[i]1', arr_id[i]);
            $('#all-videos').val(arr_id[i]);

            $.ajax({
                data: $('#form-get-all-videos').serialize(),
                type: "POST",
                url: '/video/attachment',
                dataType: 'binary',
                xhrFields: {
                    'responseType': 'blob'
                }
            }).done(function (data) {
                // console.log('ok', data);
                let link = document.createElement('a');
                link.href = URL.createObjectURL(data);
                for (let j = 0; j < name_file.length; j++) {
                    link.download = `${name_file[j]}.h264`;
                    if(i == j) break;
                }
                // console.log('ready link', link);
                link.click();
                $('.loader').hide();
            }).fail(function (data) {
                // console.log('error', data);
            });
        }
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

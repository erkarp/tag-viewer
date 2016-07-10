/**
 * Created by ekarp on 7/7/16.
 */

$('document').ready(function() {

    var tags = $('.container').data('info'),  data,

    dataStore = {
      tags: tags.keySet(),
      nums: tags.values()
    };

/**
    $(function () {
        var num = 0;

        $('menu').children('button').each(function(btn) {

            dataStore['tags'].push($(this).children('.tag').html());
            num = $(this).children('.badge').html();
            dataStore['nums'].push(parseInt(num));

        })
        resetChart();

    })
*/

    $(function resetChart() {
        data = dataStore;
        drawBaseChart();
    });

    function drawBaseChart() {
        $('#highchart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tag Frequency'
            },
            xAxis: {
                categories: dataStore.tags,
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: 'Instances'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' instances'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Tags Used In Document',
                data: dataStore.nums
            }]
        });
    };





    function drawClassChart() {
        $('#highchart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Tag Frequency'
            },
            xAxis: {
                categories: dataStore.tags,
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: 'Instances'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' instances'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Tags Used In Document',
                data: dataStore.nums
            }]
        });
    };






    var hits, cl = {}, clT = [],
        box = $('code').html();

    $('button').bind('click',  function(e) {

        var tag = $(this).find('.tag').html(),
            reg = new RegExp('&lt;1(.*?)&gt;'.replace('1', tag), 'g');

        hits = box.match(reg);

        hits.forEach(function(i) {
            var list = i.match(/class="(.*?)"/);

            if (list) {
                clT = list[1].split(' ');

                clT.forEach(function(name) {
                    cl[name] = cl.hasOwnProperty(name) ? ++cl[name] : 0;
                });
            }

        });

        console.dir(cl);

    });
})

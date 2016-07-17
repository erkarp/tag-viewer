/**
 * Created by ekarp on 7/7/16.
 */
var temp = JSON.parse( window.tags.replace(/'/g,'"') ),
    tags = [], nums = [];

for (var tag in temp) {
    tags.push(tag);
    nums.push(temp[tag]);
}


$('document').ready(function() {
    $(function resetChart() {
        drawBaseChart();
    });

    $('tspan').on('click', function() {
        console.log('tspan');

        var cl = {}, clT = [], axis = [], data = [],

            tag = $(this).find('.tag').html(),
            reg = new RegExp('&lt;1(.*?)&gt;'.replace('1', tag), 'g'),
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

        for (var c in cl) {
            axis.push(c);
            data.push(cl[c]);
        }

        drawClassChart(axis, data);
        $('#classchart').css('display', 'block');

    });
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
            categories: tags,
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
            data: nums
        }],
        legend: {
          enabled: false
        }
    });
};





function drawClassChart(axis, data) {
    $('#classchart').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Class Frequency'
        },
        xAxis: {
            categories: axis,
            title: {
                text: null
            }
        },
        tooltip: {
            valueSuffix: ' instances'
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Classes Used With Tag',
            data: data
        }]
    });
};

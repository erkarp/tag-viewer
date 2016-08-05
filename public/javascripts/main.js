/**
 * Created by ekarp on 7/7/16.
 */

var temp = JSON.parse( window.tags.replace(/'/g,'"') ),
    tags = [], nums = [],  box = '',
    code = $('#code').children();

code.each(function(i, e) {
  if (e.innerText.length > 0 && e.innerText.search(/[^\s]/) > -1) {
    box += e.innerText
  }
});

for (var tag in temp) {
    tags.push(tag);
    nums.push(temp[tag]);
}

$('document').ready(function() {

    $(function resetChart() {
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
                categories: tags,
                formatter: function () {
                  var txt = this.value.name;
                  return '<tspan id="' + txt + '">' + txt + '</tspan>';
                },
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
});

function drawClassChart(data) {
    $('#classchart').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Class Frequency'
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
        }],
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              formatter: function() {return this.point.name}
            }
          }
        }
    });
};


$('body').on('click', 'tspan', function() {

    var cl = {}, clT = [], data = [], tag = this.innerHTML,
        reg = new RegExp('<1(.*?)>'.replace('1', tag), 'g'),
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
        data.push({
          name: c,
          y: cl[c]
        })
    }

    drawClassChart(data);
    $('#classchart').css('display', 'block');
});

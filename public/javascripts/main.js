/**
 * Created by ekarp on 7/7/16.
 */

var temp = JSON.parse( window.tags.replace(/'/g,'"') ),
    tags = [], nums = [],  box = '',
    code = $('#code').children(),
    min = window.min;

code.each(function(i, e) {
    box += e.innerText
});

for (var tag in temp) {
  if (temp[tag] > min) {
    tags.push(tag);
    nums.push(temp[tag]);
  }
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

function drawClassChart(tag, data) {
    var title = 'Classes on ' + tag.toUpperCase() + ' Tags',
      tooltip = ' instances on ' + tag;
    $('#classchart').highcharts({
        chart: {
            type: 'pie',
            width: 500
        },
        title: {
            text: title
        },
        tooltip: {
            valueSuffix: ' instances'
        },
        credits: {
            enabled: false
        },
        series: [{
            name: null,
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
  parseClass(this.innerHTML);
});


function parseClass(tag) {
  var cl = {}, clT = [], data = [],
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

  drawClassChart(tag, data);
  $('#classchart').css('display', 'block');
}

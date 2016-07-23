/**
 * Created by ekarp on 7/7/16.
 */

var temp = JSON.parse( window.tags.replace(/'/g,'"') ),
    tags = [], nums = [],  box = '',
    code = $('#code').children();

code.each(function(i, e) { box += e.innerText });

for (var tag in temp) {
  nums.push(temp[tag]);
  tags.push(tag);
}

$('document').ready(function() {

    $(function resetChart() {
      $('#highchart').highcharts({
          chart: {
              type: 'column'
          },
          title: {
              text: 'Tag Frequency'
          },
          xAxis: {
              categories: tags,
              labels: {
                  overflow: 'justify',
                  formatter: function () {
                    var txt = this.value.name;
                    return '<tspan id="' + txt + '">' + txt + '</tspan>';
                  }
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
    });

})


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


$('body').on('click', 'tspan', function() {

    var cl = {}, clT = [], axis = [], data = [], tag = this.id,
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

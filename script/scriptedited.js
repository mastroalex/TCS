var value1 = <?php echo $value1; ?>;
var value2 = <?php echo $value2; ?>;
var value3 = <?php echo $value3; ?>;
var value4 = <?php echo $value4; ?>;
var reading_time = <?php echo $reading_time; ?>;



var chartT = new Highcharts.Chart({
  chart:{ renderTo : 'chart-temperature',
        zoomType: 'x',
        panning: true,
        panKey: 'shift' },
  title: { text: 'Temperatura camera Ale' },
  series: [{
    showInLegend: false,
    data: value1
  }],
  plotOptions: {
    line: { animation: false,
      dataLabels: { enabled: true }
    },
    series: { color: '#059e8a' }
  },
  xAxis: { 
    type: 'datetime',
    categories: reading_time
  },
  yAxis: {
    title: { text: 'Temperature (Celsius)' }
    //title: { text: 'Temperature (Fahrenheit)' }
  },
  credits: { enabled: false }
});

var chartH = new Highcharts.Chart({
  chart:{ renderTo:'chart-humidity2',
           zoomType: 'x',
           panning: true,
           panKey: 'shift'},
  title: { text: 'Umidità camera Ale' },
  series: [{
    showInLegend: false,
    data: value4
  }],
  plotOptions: {
    line: { animation: false,
      dataLabels: { enabled: true }
    }
  },
  xAxis: {
    type: 'datetime',
    //dateTimeLabelFormats: { second: '%H:%M:%S' },
    categories: reading_time
  },
  yAxis: {
    title: { text: 'Humidity (%)' }
  },
  credits: { enabled: false }
});

var chartH = new Highcharts.Chart({
  chart:{ renderTo:'chart-humidity',
           zoomType: 'x',
           panning: true,
           panKey: 'shift'},
  title: { text: 'Umidità camera Ale' },
  series: [{
    showInLegend: false,
    data: value2
  }],
  plotOptions: {
    line: { animation: false,
      dataLabels: { enabled: true }
    }
  },
  xAxis: {
    type: 'datetime',
    //dateTimeLabelFormats: { second: '%H:%M:%S' },
    categories: reading_time
  },
  yAxis: {
    title: { text: 'Humidity (%)' }
  },
  credits: { enabled: false }
});


var chartT = new Highcharts.Chart({
  chart:{ renderTo : 'chart-temperature2',
        zoomType: 'x',
        panning: true,
        panKey: 'shift' },
  title: { text: 'Temperatura cucina' },
  series: [{
    showInLegend: false,
    data: value3
  }],
  plotOptions: {
    line: { animation: false,
      dataLabels: { enabled: true }
    },
    series: { color: '#059e8a' }
  },
  xAxis: { 
    type: 'datetime',
    categories: reading_time
  },
  yAxis: {
    title: { text: 'Temperature (Celsius)' }
    //title: { text: 'Temperature (Fahrenheit)' }
  },
  credits: { enabled: false }
});
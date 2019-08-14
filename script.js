const domObject = {
  chart: '.chart',
  allBars: '[class*=bar]',
  title: '#titleText',
  allPercent: '[class*=Percent]',
  allLabel: '[class*=label]',
  option: '.option'
}


const colorsCode = {
  red: '#c38d9e',
  blue: '#85adcb',
  orange: '#e27d60',
  yellow: '#e8a87c',
  green: '#41b3a3',
  grey: '#bab2b5',
  lightGrey: '#eae7dc',
  lightNavy: '#a80de6',
  lightPurple: '#d5cfda'
}


$(function () {

  //getBarNum returns the number of bar the chart should render 
  const getBarNum = (data) => {
    return data.length;
  }

  const findMax = (data) => {
    return (Math.max(...data));
  }

  const calPercent = (value, data) => {
    let percent = ((value / findMax(data)).toFixed(2)) * 100;
    percent === 100 ? percent = 2 : percent = 100 - percent;
    return percent;
  }

  //addBarTag add html tag for the bars 
  const addBarTag = (data) => {
    const barNum = getBarNum(data);
    for (let i = 0; i < barNum; i++) {
      $(domObject.chart).append(`<div class=bar${i + 1}></div>`);
    }
    return barNum + 1; //num of column,  + 1 for extra white space
  }

  //alignBar puts the bars between ticks and last white space column
  const alignBar = (charColNum) => {
    for (let i = 0; i < charColNum - 1; i++) {
      let currentBar = `.bar${i + 1}`;
      $(currentBar).css('grid-column', `${i + 1}/${i + 2}`);
      $(currentBar).hide()
    }

  }
  //makeChartCol set the number of columns for the chart
  const makeChartCol = (charColNum) => {
    $(domObject.chart).css('grid-template-columns', `repeat(${charColNum}, 1fr)`);
  }

  //addLabel add labels for each bar
  const addLabel = (data) => {
    const barNum = getBarNum(data);
    for (let i = 0; i < barNum; i++) {
      $(domObject.chart).append(`<div class=label${i + 1}>Label-${i + 1}</div>`);
    }
  }

  //alignLabel align label to each bar 
  const alignLabel = (charColNum) => {
    for (let i = 0; i < charColNum - 1; i++) {
      let currentLabel = `.label${i + 1}`;
      $(currentLabel).css({
        'grid-column': `${i + 1}/${i + 2}`,
        'grid-row': '101/102'
      })
      $(currentLabel).hide();
      $(currentLabel).show('toggle','linear',3000);
    }
  }

  //fillBar fill out the Bars accoording to the input values 
  const fillBar = (data) => {
    for (let i = 0; i < data.length; i++) {
      let fill = calPercent(data[i], data);
      let currentBar = `.bar${i + 1}`;
      $(currentBar).css('grid-row', `${fill}/100`);
      $(currentBar).show('toggle','linear',3000);
    }
  }

  //displayBarValue display the data value for the corresponding bar
  const displayBarValue = (data) => {
    for (let i = 0; i < data.length; i++) {
      let currentBar = document.querySelector(`.bar${i + 1}`);
      currentBar.innerHTML = `<p id=barValue${i + 1}>${data[i]}</p>`;
    }


  }

  //barColorOdd changes the color of bars along with the labels
  const changeBarColor = (data, color, option) => {
    let optionValue;
    option === 'even' ? optionValue = 2 : optionValue = 1;
    for (let i = optionValue; i <= data.length; i += 2) {
      let currentBar = document.querySelector(`.bar${i}`);
      let currentLabel = document.querySelector(`.label${i}`);
      $(currentBar).css('background-color', colorsCode[color]);
      $(currentLabel).css('background-color', colorsCode[color]);
    }

  }



  //changeValuePlacement changes the placement of bar's value
  const changeValuePlacement = (placement) => {
    switch (placement) {
      case 'top':
        $(domObject.allBars).css('align-items', 'flex-start');
        break;
      case 'bottom':
        $(domObject.allBars).css('align-items', 'flex-end');
        break;
      default:
        return 0;  //default is center
    }

  }

  const changeTitleColor = (color) => {
    $(domObject.title).css('background-color', colorsCode[color]);
  }

  //option controller have access to all custom functions that are included in options
  const optionController = (data) => {
    const saveData = data;
    return {
      //changeBarSpace changes space between bars
      changeBarSpace: function (space) {
        $(domObject.chart).css('grid-column-gap', space);
      },
      changeEvenBarColor: function (color) {
        changeBarColor(saveData, color, 'even');
      },
      changeOddBarColor: function (color) {
        changeBarColor(saveData, color, 'odd');
      }, changeTitleText: function (newTitle) {
        $(domObject.title).html(newTitle);
      }, changeTitleColor: function (color) {
        $(domObject.title).css('color', colorsCode[color]);
      }, changeTitleSize: function (size) {
        $(domObject.title).css('font-size', size);
      }, changeLabelColor: function (color, option) {
        let optionValue, increments;
        switch (option) {
          case 'odd':
            [optionValue, increments] = [1, 2];
            break;
          case 'even':
            [optionValue, increments] = [2, 2];
            break;
          default:
            [optionValue, increments] = [0, 1];
        }
        console.log(optionValue, increments);
        for (let i = optionValue; i <= saveData.length; i += increments) {
          let currentLabel = document.querySelector(`.label${i}`);
          $(currentLabel).css('background-color', colorsCode[color]);
        }
      }, changeChartAxes: function (format) {

      }

    }
  }

  const showTicks = () =>{
    $(domObject.allPercent).animate({opacity: 1},2000);
  }

  const showTitle = () =>{
    $(domObject.title).toggle('slide', 1400);
  }
  
  const showOption =() =>{
    $(domObject.option).toggle('slide',{direction: 'right'},1400);
  }

  //main function that draws the chart
  const drawBarChart = (data, option, element) => {
    const charColNum = addBarTag(data);
    showTitle();
    showOption();
    makeChartCol(charColNum);
    alignBar(charColNum);
    addLabel(data);
    alignLabel(charColNum);
    showTicks();
    setTimeout(()=>{
      fillBar(data);
    },1000);
    changeBarColor(data, 'red', 'odd');
    changeBarColor(data, 'blue', 'even');
    displayBarValue(data);
    const optionControl = optionController(data);
    optionControl.changeBarSpace('10px');
    optionControl.changeOddBarColor('yellow');
    optionControl.changeTitleText('Untitled Bar Chart');
  }

  drawBarChart([300, 150, 40, 10, 70, 50, 200, 80, 300, 120]);


});
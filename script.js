const domObject = {
  chart: '.chart',
  allBars: '[class*=bar]',
  title: '#titleText',
  titleString: '#titleString',
  allPercent: '[class*=Percent]',
  allLabel: '[class*=label]',
  option: '.option',
  titleButton: '#title',
  optionBar: '.optionBar',
  allButtons: '[class*=button]',
  tFontSize: '#tFontSize',
  chartAxes: '#chartAxes',
  barSpace: '#barSpace',
  tFontColor: '#tFontColor',
  barColor: '#barColor',
  labelColor: '#labelColor',
  allColorSelector: '[class*=ColorSelector]',
  oddBar: '[class*="bar"]:nth-child(odd)',
  evenBar: '[class*="bar"]:nth-child(even)',
  oddLabel: '[class*="label"]:nth-child(odd)',
  evenLabel: '[class*="label"]:nth-child(even)',
  barColorSec1: '#bcsf',
  barColorSec2: '#bcs',
  labelColorSec1: '#lcsf',
  labelColorSec2: '#lcs'

}

const colorsCode = {
  red: '#c38d9e',
  blue: '#85adcb',
  orange: '#e27d60',
  yellow: '#e8a87c',
  green: '#41b3a3',
  grey: 'rgb(121, 121, 121)',
  lightGrey: '#eae7dc',
  lightNavy: '#a80de6',
  lightPurple: '#d5cfda'
}


$(function () {

  const buildChart = (chartName) => {
    $('body').append(`<div id=${chartName}barChart></div>`);
    $(`#${chartName}barChart`).append(
    `
      <div class="title">
        <div id="titleText" style="display: none">
          <p id="titleString"></p>
        </div>
      </div>
      <div class="chartGrid">
        <div class="chartComponent">
          <div class="yAxis">
            <div class="hunPercent">100%</div>
            <div class="ninetyPercent">90%</div>
            <div class="eightyPercent">80%</div>
            <div class="seventyPercent">70%</div>
            <div class="sixtyPercent">60%</div>
            <div class="fiftyPercent">50%</div>
            <div class="fourtyPercent">40%</div>
            <div class="thirtyPercent">30%</div>
            <div class="twentyPercent">20%</div>
            <div class="tenPercent">10%</div>
          </div>
          <div class="chart">

          </div>
        </div>
        <div class="option">
          <div class="optionBar">
            <div class="button" id="title"><i class="fas fa-edit"></i> Title</div>
            <div class="button" id="tFontSize"><i class="fas fa-text-height"></i> Title Font Size</div>
            <div class="button" id="tFontColor"><i id="tFontColorButton" class="fas fa-palette"></i> Title Font Color</div>
            <div class="button" id="barColor"><i id="bcsf" class="fas fa-palette"></i> <p id="barText1">Bar</p> <p id="barText2">Color</p> <i class="fas fa-palette fa-flip-horizontal" id='bcs'></i></div>
            <div class="button" id="barSpace"><i class="fas fa-signal"></i> Bar Space</div>
            <div class="button" id="labelColor"><i id="lcsf" class="fas fa-palette"></i> <p id="labelText1">Label</Label></p> <p id="labelText2">Color</p> <i class="fas fa-palette fa-flip-horizontal" id='lcs'></i></div>
          <div class="button" id="chartAxes"><i class="fas fa-chart-line"></i> Chart Axes</div>

        </div>
      </div>
    </div >
    </div >
    `
    );
  }


const loopOption = (optionArr, current) => {
  if (current != optionArr[optionArr.length - 1]) {
    return optionArr[optionArr.indexOf(current) + 1];
  } else {
    return optionArr[0];
  }
}

const changeFontSize = (isEvent, size) => {
  const fontSize = ['16px', '24px', '32px', '40px', '48px'];
  const sizeString = ['xs', 's', 'm', 'l', 'xl'];
  if (isEvent) {
    const currentFontSize = ($(domObject.titleString).css('font-size'));
    $(domObject.titleString).css('font-size', loopOption(fontSize, currentFontSize));
  } else {
    const newSize = fontSize[sizeString.indexOf(size)];
    $(domObject.titleString).css('font-size', newSize);
  }
}


const changeBarSpace = (isEvent, size) => {
  const barSpace = ['10px', '20px', '30px', '40px', '50px', '60px', '70px'];
  const sizeString = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
  if (isEvent) {
    const currentBarSize = ($(domObject.chart).css('column-gap'));
    $(domObject.chart).css('column-gap', loopOption(barSpace, currentBarSize));
  } else {
    const newSize = barSpace[sizeString.indexOf(size)];
    $(domObject.chart).css('column-gap', newSize);
  }
}


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
    $(currentLabel).show('toggle', 'linear', 3000);
  }
}

//fillBar fill out the Bars accoording to the input values 
const fillBar = (data) => {
  for (let i = 0; i < data.length; i++) {
    let fill = calPercent(data[i], data);
    let currentBar = `.bar${i + 1}`;
    $(currentBar).css('grid-row', `${fill}/100`);
    $(currentBar).show('toggle', 'linear', 3000);
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

//addColorSelecton initiaize the color selection for certain buttons 
const addColorSelection = () => {
  $(domObject.barColor).prepend('<input type="text" class="barColorSelector">');
  $(domObject.barColor).append('<input type="text" class="barColorSelector2">');
  $(domObject.labelColor).prepend('<input type="text" class="labelColorSelector">');
  $(domObject.labelColor).append('<input type="text" class="labelColorSelector2">');
  $(domObject.tFontColor).prepend('<input type="text" class="tFontColorSelector">');

  $('.tFontColorSelector').spectrum({
    color: 'red',
    move: function (tinycolor) {
      $(domObject.titleString).css('color', tinycolor.toHexString());
      $(domObject.tFontColor).css('color', tinycolor.toHexString());
    }
  })
  $('.labelColorSelector').spectrum({
    color: 'red',
    move: function (tinycolor) {
      $(domObject.oddLabel).css('background-color', tinycolor.toHexString());
      $(domObject.labelColorSec1).css('color', tinycolor.toHexString());
      $('#labelText1').css('color', tinycolor.toHexString());
    }
  })
  $('.barColorSelector').spectrum({
    color: 'red',
    move: function (tinyColor) {
      $(domObject.oddBar).css('background-color',
        tinyColor.toHexString());
      $(domObject.barColorSec1).css('color', tinyColor.toHexString());
      $('#barText1').css('color', tinyColor.toHexString());
    }
  })
  $('.barColorSelector2').spectrum({
    color: 'red',
    move: function (tinyColor) {
      $(domObject.evenBar).css('background-color',
        tinyColor.toHexString());
      $(domObject.barColorSec2).css('color', tinyColor.toHexString());
      $('#barText2').css('color', tinyColor.toHexString());
    }
  })
  $('.labelColorSelector2').spectrum({
    color: 'red',
    move: function (tinyColor) {
      $(domObject.evenLabel).css('background-color',
        tinyColor.toHexString());
      $(domObject.labelColorSec2).css('color', tinyColor.toHexString());
      $('#labelText2').css('color', tinyColor.toHexString());
    }
  })
}

const changeTitleColor = (color) => {
  $(domObject.title).css('background-color', colorsCode[color]);
}

//option controller have access to all custom functions that are included in options
const optionController = (data) => {
  const saveData = data;
  const changeYAxisFormat = (format) => {
    let [newYAxis, newValue] = [[], 100];
    if (format === 'percent') {
      for (let i = 0; i < 10; i++) {
        newYAxis.push(`${newValue}%`);
        newValue -= 10;
      }
    } else {
      let [max, percent] = [findMax(saveData), 0.1];
      for (let i = 0; i < 10; i++) {
        let newValue = Math.round(max * percent);
        newYAxis.push(newValue);
        percent += 0.1;
      }
    }

    return newYAxis.sort((a, b) => { return b - a });
  }

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
      $(domObject.titleString).html(newTitle);
    }, changeTitleColor: function (color) {
      $(domObject.titleString).css('color', colorsCode[color]);
    }, changeTitleSize: function (size) {
      changeFontSize(false, size);
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
      for (let i = optionValue; i <= saveData.length; i += increments) {
        let currentLabel = document.querySelector(`.label${i}`);
        $(currentLabel).css('background-color', colorsCode[color]);
      }
    }, changeYAxis: function (format, isEvent = false) {
      let yAxis = document.querySelectorAll(domObject.allPercent);
      let newYAxis = changeYAxisFormat(format);
      if (isEvent) {
        $(domObject.allPercent).hide('slide', 800);
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            yAxis[i].innerHTML = newYAxis[i];
          }
          $(domObject.allPercent).show('slide', 800)
        }, 1100)
      } else {
        for (let i = 0; i < 10; i++) {
          yAxis[i].innerHTML = newYAxis[i];
        }
      }

    }, changeValuePos: function (placement) {
      changeValuePlacement(placement);
    }, changeSpacing: function (size, isEvent = false) {
      changeBarSpace(isEvent, size);
    }, makeLabels: function (labels) {
      if (labels === 'default') {
        //do nothing
      } else {
        for (let i = 0; i < labels.length; i++) {
          $(`.label${i + 1}`).html(`${labels[i]}`);
        }
      }
    }

  }
}

const showTicks = () => {
  $(domObject.allPercent).animate({ opacity: 1 }, 2000);
}

const showTitle = () => {
  $(domObject.title).toggle('slide', 1400);
}

const showOption = () => {
  $(domObject.option).toggle('slide', { direction: 'right' }, 1400);
}

const eventListener = (optionController) => {
  $(domObject.titleButton).click(function () { //changing title text
    function setEndOfContenteditable(contentEditableElement) {
      var range, selection;
      if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
      {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
      }
      else if (document.selection)//IE 8 and lower
      {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
      }
    }
    $(domObject.title).attr('contenteditable', 'true');
    $(domObject.title).focus();
    setEndOfContenteditable(document.querySelector(domObject.title));
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        $(domObject.title).attr('contenteditable', 'false');
      }
    });
  });

  $(domObject.tFontSize).click(function () { //changing title font
    changeFontSize(true);
  });

  $(domObject.chartAxes).click(function () { //changing chart axes
    const getFormat = () => {
      if ($('.tenPercent').html() === '10%') {
        return 'percent';
      } else {
        return 'value';
      }
    }
    getFormat() === 'percent' ? optionController.changeYAxis('value', true) : optionController.changeYAxis('percent', true);
  });

  $(domObject.barSpace).click(function () { //changing barSpace
    changeBarSpace(true);
  });




}


const initBarChart = (data, option, chartName) => {
  buildChart(chartName);
  const charColNum = addBarTag(data);
  showTitle();
  showOption();
  makeChartCol(charColNum);
  alignBar(charColNum);
  addLabel(data);
  alignLabel(charColNum);
  showTicks();
  setTimeout(() => {
    fillBar(data);
  }, 1000);
  changeBarColor(data, 'red', 'odd');
  changeBarColor(data, 'blue', 'even');
  displayBarValue(data);
  addColorSelection();
  const optionControl = optionController(data);
  optionControl.makeLabels(option.labelArr);
  optionControl.changeTitleText(option.title);
  optionControl.changeOddBarColor(option.barColor1);
  optionControl.changeEvenBarColor(option.barColor2);
  optionControl.changeTitleSize(option.titleFontSize);
  optionControl.changeTitleColor(option.titleFontColor);
  optionControl.changeValuePos(option.valuePos);
  optionControl.changeYAxis(option.chartAxes);
  optionControl.changeSpacing(option.barSpace);
  eventListener(optionControl);
}

//main function that draws the chart
const drawBarChart = (data, option = {
  title: 'Untitled Bar Chart',
  titleFontSize: 'm',
  titleFontColor: 'grey',
  labelArr: 'default',
  valuePos: 'mid',
  barColor1: 'yellow',
  barColor2: 'blue',
  labelColor1: 'yellow',
  labelColor2: 'blue',
  barSpace: 'xs',
  chartAxes: 'percent',

}, element="barChart") => {
  initBarChart(data, option, element);

}

drawBarChart([300, 150, 40, 10, 70, 50, 200, 80, 300, 120]);


});
const domObject = {
  chart: '.chart',
  allBars: '[class*=bar]'
}





$(function () {
  //getBarNum returns the number of bar the chart should render 
  const getBarNum = (data) => {
    return data.length;
  }

  //addBarTag add html tag for the bars 
  const addBarTag = (data) => {
    const barNum = getBarNum(data);
    for (let i = 0; i < barNum; i++) {
      $(domObject.chart).append(`<div class=bar${i + 1}></div>`);
    }
    return barNum + 2; //num of column, + 1 for ticks, + 1 for extra white space
  }

  //alignBar puts the bars between ticks and last white space column
  const alignBar = (charColNum) => {
    for (let i = 0; i < charColNum - 2; i++) {
      let currentBar = `.bar${i + 1}`;
      $(currentBar).css('grid-column', `${i + 2}/${i + 3}`);
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
      $(domObject.chart).append(`<div class=label${i + 1}>Label${i + 1}</div>`);
    }
  }

  //alignLabel align label to each bar 
  const alignLabel = (charColNum) => {
    for (let i = 0; i < charColNum - 2; i++) {
      let currentLabel = `.label${i + 1}`;
      $(currentLabel).css({
        'grid-column': `${i + 2}/${i + 3}`,
        'grid-row': '101/102'
      })
    }
  }

  //fillBar fill out the Bars accoording to the input values 
  const fillBar = (data) => {
    for (let i = 0; i < data.length; i++){
      let fill = 100 - data[i];
      let currentBar = `.bar${i+1}`;
      $(currentBar).css('grid-row', `${fill}/100`); 
    }
  }

  //displayBarValue display the data value for the corresponding bar
  const displayBarValue = (data) =>{
    for (let i = 0; i < data.length; i++){
      let currentBar = document.querySelector(`.bar${i+1}`);
      currentBar.innerHTML = `<p>${data[i]}</p>`;

    }
  } 

  //changeValuePlacement changes the placement of bar's value
  const changeValuePlacement = (placement) => {
    switch (placement){
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
    
  

  const drawBarChart = (data, option, element) => {
    const charColNum = addBarTag(data);
    makeChartCol(charColNum);
    alignBar(charColNum);
    addLabel(data);
    alignLabel(charColNum);
    fillBar(data);
    displayBarValue(data);
  }

  drawBarChart([30,50,40,10,70]);


    });
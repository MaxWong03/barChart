const domObject = {
  chart: '.chart',
}





$(function(){
  //getBarNum returns the number of bar the chart should render 
  const getBarNum = (data) => {
    return data.length;
  } 
  
  //addBarTag add html tag for the bars 
  const addBarTag = (data) => {
    const barNum = getBarNum(data);
    for (let i = 0; i < barNum; i++){
      $(domObject.chart).append(`<div class=bar${i+1}></div>`);
    } 
    return barNum+2; //num of column, + 1 for ticks, + 1 for extra white space
  }
  
  //alignBar puts the bars between ticks and last white space column
  const alignBar = (charColNum) => {
    for (let i = 0; i < charColNum - 2 ; i++){
      let currentBar = `.bar${i+1}`;
      $(currentBar).css('grid-column', `${i+2}/${i+3}`);
    } 
    
  }
  //makeChartCol set the number of columns for the chart
  const makeChartCol = (charColNum) => {
    $(domObject.chart).css('grid-template-columns', `repeat(${charColNum}, 1fr)`);
  }
  


  const drawBartChart = (data, option, element) => {
    const charColNum = addBarTag(data);
    makeChartCol(charColNum);
    alignBar(charColNum);
  }
  
  drawBartChart([1,2,3]);


});
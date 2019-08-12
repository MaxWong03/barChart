const domObject = {
  chart: '.chart'
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
    return barNum+1; //num of column 
  }
  
  const makeChartCol = (charColNum) => {
    $(domObject.chart).css('grid-template-columns', `repeat(${charColNum}, 1fr)`);
  }
  
  const drawBartChart = (data, option, element) => {
    const charColNum = addBarTag(data);
    makeChartCol(charColNum);
  }
  
  drawBartChart([1,2,3,4,5]);


});
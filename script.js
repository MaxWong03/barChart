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
  }
  
  
  
  const drawBartChart = (data, option, element) => {
    addBarTag(data);
  }
  
  drawBartChart([1,2,3,4,5]);


});
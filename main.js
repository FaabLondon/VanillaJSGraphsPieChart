const jsonObj = '{"Lancaster Ward": 32,"Oncology Ward": 30,"Cardiac Care Ward": 28,"Surgical HDU": 26,"Ada Lovelace Ward": 26}';

//transform JSON object into JS object
const jsObj = JSON.parse(jsonObj);
//define colors for each ward
const colors = {'Lancaster Ward': '#220088','Oncology Ward': '#00ff00','Cardiac Care Ward': '#6600ff','Surgical HDU': '#ff0066','Ada Lovelace Ward': '#ff9900'};

window.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');

  // get the element I wish to add the table to
  const body = document.querySelector('body');
  body.setAttribute('style', 'font:16px arial,serif; color:#809fff');

  //********** Challenge 1 ******************************
  //create div for 1st Challenge
  const div1 = document.createElement('div');
  div1.style.margin = '50px';
  body.appendChild(div1);
  // create the table element
  const table = document.createElement('table');
  //collapse, enables to set border on row element, otherwise can only do on each cell
  table.setAttribute('style', 'width:500px; border-collapse: collapse; margin: 0px auto');

  //1) Create the header of the table
  //styling on the row did not work so added to each cell
  const row = table.insertRow(0);
  row.style.borderBottom = '2px solid #809fff';
  // Insert cells (<td>) and add titles
  let cell = row.insertCell(0);
  cell.innerHTML = 'Ward';
  cell = row.insertCell(1);
  cell.style.cssFloat = 'right';
  cell.innerHTML = 'Count';


  //2) Create all the rows in the table
  Object.keys(jsObj).forEach((elt, index) => {
    // Create an empty <tr> element and add it to the index + 1 position of the table
    const row = table.insertRow(index + 1);
    row.style.backgroundColor = (index+1) % 2 === 0 ? '#eeeeee' : 'white';
    row.style.color = colors[elt];
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    // Add key and value of each element in objct to the new cells
    cell1.innerHTML = elt;
    cell2.innerHTML = jsObj[elt];
    cell2.style.cssFloat = 'right';
  });

  // append the table to div
  div1.appendChild(table);

  //********** Challenge 2 ******************************
  //create div for 2nd Challenge
  const div2 = document.createElement('div');
  body.appendChild(div2);

  //create svg element and its attributes
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS(null, 'class', 'chart');
  svg.setAttributeNS(null, 'height', '600px');
  svg.setAttributeNS(null, 'role', 'img');
  svg.setAttributeNS(null, 'style', 'margin: 0px auto; display: block;');
  //so that the labels can overflow on the left
  svg.setAttributeNS(null, 'overflow', 'visible');

  //create each vertical bar and label
  Object.keys(jsObj).forEach((elt, index) => {
    //create group element
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttributeNS(null, 'class', 'bar');
    //create rectangle/bar element
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttributeNS(null, 'width', '40');
    rect.setAttributeNS(null, 'height', jsObj[elt] * 10 );
    rect.setAttributeNS(null, 'x', 50 * index);
    rect.setAttributeNS(null, 'y', 400 - jsObj[elt] * 10);
    rect.setAttributeNS(null, 'fill', colors[elt]);
    rect.innerHTML = jsObj[elt];

    //create text element for the ward name
    const textWard = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textWard.setAttributeNS(null, 'x', -400);
    textWard.setAttributeNS(null, 'y', 315);
    textWard.setAttributeNS(null, 'transform', `translate(${50 * index}) rotate(-45)`);
    textWard.innerHTML = elt;

    //create text element for count value
    const textCount = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textCount.setAttributeNS(null, 'x', 12);
    textCount.setAttributeNS(null, 'y', 70);
    textCount.setAttributeNS(null, 'transform', `translate(${50 * index})`);
    textCount.innerHTML = jsObj[elt];

    //create text element for name of Y axis
    const textY = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textY.setAttributeNS(null, 'x', -50);
    textY.setAttributeNS(null, 'y', 70);
    textY.innerHTML = 'Count';

    //append text and bar to the g element and append it to the svg element
    g.appendChild(rect);
    g.appendChild(textWard);
    g.appendChild(textCount);
    g.appendChild(textY);
    svg.appendChild(g);
  });

  div2.appendChild(svg);

  //********** Challenge 3 ******************************
  //create div for 3rd Challenge
  //create div for 2nd Challenge
  const div3 = document.createElement('div');
  body.appendChild(div3);

  //create a svg
  const svgPie = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  //define viewbox
  //2 x 2 so that a 1px radius circle always fill the width and height of the SVG. no pixelated when scale up the chart
  //-1 -1 shifts viewport right and down by 1 so that circle is not centered on 0,0
  //rotate by -90 deg so that the pie start at 90 degrees.
  svgPie.setAttributeNS(null, 'viewBox', '-1 -1 2 2');
  svgPie.setAttributeNS(null, 'style', 'transform: rotate(-90deg)');
  svgPie.setAttributeNS(null, 'height', '400px');
  svgPie.setAttributeNS(null, 'style', 'margin: 0px auto; display: block;');

  //calc total count across all wards
  const sumWard = Object.values(jsObj).reduce((acc, elt) => elt + acc, 0);

  //kees track of cumulative %
  let cumulativePercent = 0;

  //function that gives the coordinates x and y based on the percentage
  //use circle where Pi is 180degrees, Pi/2 is 90 degrees. Sin is the Y value and Cos is the X value.
  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  Object.keys(jsObj).forEach((elt, index) => {
    // destructuring - sets start X and start Y
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

    // each slice starts where the last slice ended, so keep a cumulative percent
    cumulativePercent += (jsObj[elt]/sumWard);

    // destructuring - sets end X and end Y
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

    // if the slice is more than 50%, take the large arc (the long way around)
    const largeArcFlag = jsObj[elt]/sumWard > .5 ? 1 : 0;

    // create an array and join it just for code readability
    //M: move to start position
    //A: draws an Arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
    //L: 'line-to' command, which is L 0 0. In other words, “draw a straight line (L) to the middle (0,0) of the circle”.
    const pathData = [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      'L 0 0' // Line
    ].join(' ');

    // create a <path> and append it to the <svg> element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', colors[elt]);
    path.setAttribute('id', `id${index}`);

    //create text to go on each slice/path
    const sliceText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const sliceTextPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    // you can only set attributes in the null namespace with setAttribute otherwise need to do as below - however xlink is supposed to be deprecated....
    sliceTextPath.setAttribute('href', `#id${index}`);
    sliceTextPath.setAttribute('xtLength', '100px');
    sliceTextPath.innerHTML = elt;

    svgPie.appendChild(path);
    sliceText.appendChild(sliceTextPath);
    svgPie.appendChild(sliceText);

  });

  div3.appendChild(svgPie);

});

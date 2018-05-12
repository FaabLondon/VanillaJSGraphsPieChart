const jsonObj = '{"Lancaster Ward": 32,"Oncology Ward": 30,"Cardiac Care Ward": 28,"Surgical HDU": 26,"Ada Lovelace Ward": 26}';

const jsObj = JSON.parse(jsonObj);

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
  // svg.setAttributeNS(null, 'aria-labelledby', 'title');
  svg.setAttributeNS(null, 'role', 'img');
  svg.setAttributeNS(null, 'style', 'margin: 0px auto; display: block;');
  //so that the labels can overflow on the left
  svg.setAttributeNS(null, 'overflow', 'visible');

  //create each vertical bar and label
  Object.keys(jsObj).forEach((elt, index) => {
    //create bar element
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttributeNS(null, 'class', 'bar');
    //create rectangle element
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttributeNS(null, 'width', '40');
    rect.setAttributeNS(null, 'height', jsObj[elt] * 10 );
    rect.setAttributeNS(null, 'x', 50 * index);
    rect.setAttributeNS(null, 'y', 400 - jsObj[elt] * 10);
    rect.setAttributeNS(null, 'fill', '#809fff');
    rect.innerHTML = jsObj[elt];

    //create text element
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttributeNS(null, 'x', -400);
    text.setAttributeNS(null, 'y', 315);
    text.setAttributeNS(null, 'transform', `translate(${50 * index}) rotate(-45)`);
    text.innerHTML = elt;

    //create text element
    const textTest = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textTest.setAttributeNS(null, 'x', 15);
    textTest.setAttributeNS(null, 'y', 70);
    textTest.setAttributeNS(null, 'transform', `translate(${50 * index})`);
    textTest.innerHTML = jsObj[elt];

    //append text and bar to the g element and append it to the svg element
    g.appendChild(rect);
    g.appendChild(text);
    g.appendChild(textTest);
    svg.appendChild(g);
  });

  div2.appendChild(svg);

});

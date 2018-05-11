const jsonObj = '{"Lancaster Ward": 32,"Oncology Ward": 30,"Cardiac Care Ward": 28,"Surgical HDU": 26,"Ada Lovelace Ward": 26}';

const jsObj = JSON.parse(jsonObj);

window.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');

  // get the element I wish to add the table to
  const body = document.querySelector('body');
  body.style.font = '16px arial,serif';
  body.style.color = '#809fff';
  // create the table element
  const table = document.createElement('table');
  table.style.width = '500px';
  //enables to set border on row element, otherwise can only do on each cell
  table.style.borderCollapse = 'collapse';


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



  // append the table to the body
  body.appendChild(table);

});

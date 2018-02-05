console.log('content.js loaded!');
// Note OverLay
const addElement = () => {
  const newDiv = document.createElement('div')
  newDiv.setAttribute('id', 'candleNoteCE-App');
  document.body.appendChild(newDiv);
}

document.body.onload = addElement;


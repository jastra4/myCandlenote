import React from 'react';

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  onClick = () => {
    console.log('onClick ran');
    var doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('a4.pdf');
  };

  render = () => (
    <div>
      <h1>Main Page</h1>
      <p>Hello World :)</p>
      <button onClick={this.onClick.bind(this)}></button>
    </div>
  );
}

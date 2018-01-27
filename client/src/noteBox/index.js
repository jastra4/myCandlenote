import React from 'react';
import { Image } from 'semantic-ui-react';

const style = {
  float: 'left',
  marginLeft: '30px'
};

export default class NotePage extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render = () => (
    <div>
      <div style={{ width: '150px', height: '193px'  }}>
        <img src='/assets/notepad.png' style={{ width: '100%', height: '100%' }} />
        <h2 style={ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }>This is my text</h2>
      </div>

      <Image src='/assets/notepad.png' size='small' style={style}/>
      <Image src='/assets/notepad.png' size='small' style={style}/>
      
    </div>
  );
}
// {/* <div style={{ backgroundImage: 'url("/assets/notepad.png")'}}>This is my text</div> */}

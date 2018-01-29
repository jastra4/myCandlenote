import React from 'react';

const noteStyle = {
  position: 'relative',
  textAlign: 'center',
  width: '150px',
  height: '193px',
  float: 'left',
  marginLeft: '30px',
};

const imageStyle = {
  width: '100%',
  height: '100%',
};

const textStyle = {
  position: 'absolute',
  top: '-5%',
  left: '13%',
};

export default props => (
    <div style={ noteStyle }>
        <img src='/assets/notepad.png' style={ imageStyle } />
        <h2 style={ textStyle }>{ props.title }</h2>
    </div>
);


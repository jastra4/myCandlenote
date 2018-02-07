import React from 'react';
import { Motion, spring } from 'react-motion';
import { Image } from 'semantic-ui-react';

const fadeAnimationStart = {
  x: 0,
  height: 0,
};
const fadeAnimationEnd = {
  x: spring(1, {
    stiffness: 60,
    damping: 26,
  }),
  height: spring(50, {
    stiffness: 100,
    damping: 26,
  }),
};

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render = () => (
    <div>
      <div>
        <h1>Main Page</h1>
        <p>Hello World :)</p>
        <a href="/auth/google">Sign In with Google</a>
      </div>
      <Motion defaultStyle={fadeAnimationStart} style={fadeAnimationEnd}>
        {value => <Image
          circular
          src="/assets/CandleNote-Main-Logo-Square.png"
          style={{
            width: '30vw',
            opacity: value.x,
            position: 'relative',
            top: `${value.height}px`,
          }}
        />}
      </Motion>
    </div>
  );
}

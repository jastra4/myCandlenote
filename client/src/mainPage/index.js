import React from 'react';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import { Image, Header } from 'semantic-ui-react';

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

const staggeredComponents = [
  <Image
    circular
    src="/assets/CandleNote-Main-Logo-Square.png"
    style={{ width: '20vw' }}
  />,
  <Header as="h1">Servicing all your study needs, in one place!</Header>,
  <div>
    <Header as="h2">Login with <a href="/auth/google">Google</a></Header>
  </div>,
];

export default class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      introDone: false,
      promptDone: false,
    };
  }

  render = () => (
    <div>
      <StaggeredMotion
        defaultStyles={[fadeAnimationStart, fadeAnimationStart, fadeAnimationStart]}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
          return i === 0
            ? { height: spring(50), x: spring(1) }
            : { height: spring(prevInterpolatedStyles[i - 1].height), x: spring(prevInterpolatedStyles[i - 1].x) };
        })}>
        {interpolatingStyles =>
          <div>
            {interpolatingStyles.map((style, i) =>
              <div key={i} style={{ position: 'relative', top: `${style.height}px`, opacity: style.x }}>
                {staggeredComponents[i]}
              </div>)
            }
          </div>
        }
      </StaggeredMotion>
    </div>
  );
}

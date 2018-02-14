import React from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import { Image, Header, Container, Grid } from 'semantic-ui-react';
import './style.css';

const fadeAnimationStart = {
  x: 0,
  height: 0,
};

const staggeredComponents = [
  <Image
    circular
    bordered
    centered
    src="/assets/CandleNote-Main-Logo-Square.png"
    className="splash-image"
  />,
  <Header as="h1" className="splash-header splash-hook">All your study needs<br></br>in one place</Header>,
  <div>
    <Image src="/assets/google-signin-button.png" href="/auth/google" className="splash-google-button" rounded centered></Image>
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
    <Container textAlign="center">
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={10}>
          <StaggeredMotion
            defaultStyles={[fadeAnimationStart, fadeAnimationStart, fadeAnimationStart]}
            styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
              if (i === 0) {
                return {
                  height: spring(
                    50,
                    {
                      stiffness: 120,
                      damping: 15,
                    },
                  ),
                  x: spring(1),
                };
              }
              return {
                height: spring(
                  prevInterpolatedStyles[i - 1].height,
                  {
                    stiffness: 120,
                    damping: 15,
                  },
                ),
                x: spring(prevInterpolatedStyles[i - 1].x),
              };
            })}>
            {interpolatingStyles =>
              <div>
                {interpolatingStyles.map((style, i) =>
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      top: `${style.height}px`,
                      opacity: style.x,
                      marginTop: '1.5em',
                    }}
                  >
                    {staggeredComponents[i]}
                  </div>)
                }
              </div>
            }
          </StaggeredMotion>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  );
}

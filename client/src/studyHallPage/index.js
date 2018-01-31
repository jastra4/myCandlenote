import React from 'react';
import { Segment } from 'semantic-ui-react';

import VideoConferenceView from './VideoConferenceView';


const StudyHallPage = props => (
  <div>
    <Segment size="massive">
      <VideoConferenceView />
    </Segment>
  </div>
);

export default StudyHallPage;

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from '../reducers';


const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    createLogger()
  )
);

export default store;
/*

  demoState = {
    user: {
      username: 'Jon',
      userId: 5,
      oathId: 'whatever',
    },
    notes: {
      byId: {
        3: {
          id: 3,
          subject: 'English',
          heading: 'Predicate Nominatives',
          body: 'Lorem Ipsum...',
        },
        5: {
          id: 5,
          subject: 'Comp Sci',
          heading: 'Higher order functions',
          body: 'Lorem Ipsum...',
        }
      },
      currentNote: 5,
      allIds: [3, 5],
    },
    decks: {
      byId: {
        7: {
          id: 7,
          subject: 'Physics',
          title: 'Kinematics',
        },
        10: {
          id: 10,
          subject: 'Math',
          title: 'Derivatives',
        },
      },
      currentDeck: 10,
      allIds: [7, 10],
    },
    flashcards: {
      byId: {
        11: {
          id: 11,
          deckId: 7,
          front: 'Sciency Question',
          back: 'Sciency Answer',
        },
        13: {
          id: 13,
          deckId: 7,
          front: 'Another Sciency Question',
          back: 'Another Sciency Answer',
        },
        17: {
          id: 17,
          deckId: 10,
          front: 'Math Question',
          back: 'Math Answer',
        },
        20: {
          id: 20,
          deckId: 10,
          front: 'Another Math Question',
          back: 'Another Math Answer',
        },
      },
      currentFlashcard: 17,
      allIds[11, 13, 17, 20],
    }
    videos: {
      byId: {
        10: {
          id: 10,
          title: 'Video Title',
          url: 'https://www.youtube.com/somethingfromyoutube,
          starred: true,
        }
      },
      currentVideo: 10,
      allIds: [10],
    },
    messages: {
      byId: {
        8: {
          id: 8,
          userId: 5,
          sendFrom: 'Some Name',
          timeSent: 2131244325,
          messageBody: 'Lorem Ipsum...',
          hasBeenRead: false,
        }
      },
      currentMessage: 8,
      allIds: [8],
    },
  }

*/
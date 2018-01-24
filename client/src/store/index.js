import { createStore } from 'redux';

import reducers from '../reducers';


/*

  demoState = {
    user: {
      username: 'Jon',
      userId: 5,
      oathId: 'whatever',
    },
    resources: {
      notes: {
        noteList: [
          3: {
            subject: 'English',
            heading: 'Predicate Nominatives',
            body: 'Lorem Ipsum...',
          },
          5: {
            subject: 'Comp Sci',
            heading: 'Higher order functions',
            body: 'Lorem Ipsum...',
          }
        ],
        selectedNote: 5,
      },
      decks: {
        deckList: [
          7: {
            subject: 'Physics',
            title: 'Kinematics',
            cards: [
              {
                front: 'Sciency Question',
                back: 'Sciency Answer',
              },
              {
                front: 'Another Sciency Question',
                back: 'Another Sciency Answer',
              }
            ],
          },
          10: {
            subject: 'Math',
            title: 'Derivatives',
            cards: [
              {
                front: 'Math Question',
                back: 'Math Answer',
              },
              {
                front: 'Another Math Question',
                back: 'Another Math Answer',
              },
            ],
          },
        ],
        selectedDeck: 10,
      },
      videos: {
        videoList: [
          10: {
            title: 'Video Title',
            url: 'https://www.youtube.com/somethingfromyoutube,
            starred: true,
          }
        ],
        selectedVideo: 10,
      },
    },
    privateMessages: {
      messages: [
        8: {
          sendFrom: 'Some Name',
          timeSent: 2131244325,
          messageBody: 'Lorem Ipsum...',
          hasBeenRead: false,
        }
      ],
      selectedMessage: 8,
    },
  }

*/
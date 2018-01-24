import { createStore } from 'redux';

import reducers from '../reducers';


/*

  demoState = {
    user: {
      username: 'Jon',
      userId: 5,
      oathId: 'whatever'
    },
    resources: {
      notes: [
        {
          id: 3,
          subject: 'English',
          heading: 'Predicate Nominatives',
          body: 'Lorem Ipsum...',
        },
        {
          id: 5,
          subject: 'Comp Sci',
          heading: 'Higher order functions',
          body: 'Lorem Ipsum...',
        }
      ],
      flashcards: [
        decks: 
          {
            id: 7
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
          {
            id: 10,
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
        currentDeck: 10,
      ],
      videos: [
        {
          title: 'Video Title',
          url: 'https://www.youtube.com/somethingfromyoutube,
          starred: true,
        }
      ],
    },
    privateMessages: [
      {
        sendFrom: 'Some Name',
        timeSent: 2131244325,
        messageBody: 'Lorem Ipsum...',
        hasBeenRead: false
      }
    ],
    selectedNote: 3,
    selectedDeck: 5,
    selectedFlashcard: 2,
    selectedVideo: 1,
  }

*/
import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Wedding Ringer']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Wedding Ringer']
    }));
  });

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: ['Wedding Ringer'] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Wedding Ringer']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Wedding Ringer', 'Billions']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Wedding Ringer', 'Billions']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Wedding Ringer', 'Billions']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Wedding Ringer'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Wedding Ringer', 'Billions'],
        tally: {'Wedding Ringer': 1}
      },
      entries: []
    }));
  });

  it('can be used to reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Wedding Ringer', 'Billions']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Wedding Ringer'},
      {type: 'VOTE', entry: 'Billions'},
      {type: 'VOTE', entry: 'Wedding Ringer'},
      {type: 'NEXT'}
    ]

    const finalState = actions.reduce(reducer, Map());
    expect(finalState).to.equal(fromJS({
      winner: 'Wedding Ringer'
    }));
  });
});

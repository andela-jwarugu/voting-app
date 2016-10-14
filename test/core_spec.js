import { expect } from 'chai';
import { List, Map } from 'immutable';
import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = ['Wedding Ringer', 'Legend of Tarzan'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Wedding Ringer', 'Legend of Tarzan')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Wedding Ringer', 'Legend of Tarzan', 'Rich Kids')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Wedding Ringer', 'Legend of Tarzan')
        }),
        entries: List.of('Rich Kids')
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Wedding Ringer', 'Legend of Tarzan')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Wedding Ringer');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Wedding Ringer', 'Legend of Tarzan'),
          tally: Map({
            'Wedding Ringer': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to an existing tally', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Wedding Ringer', 'Legend of Tarzan'),
          tally: Map({
            'Wedding Ringer': 2,
            'Legend of Tarzan': 1
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Wedding Ringer');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Wedding Ringer', 'Legend of Tarzan'),
          tally: Map({
            'Wedding Ringer': 3,
            'Legend of Tarzan': 1
          })
        }),
        entries: List()
      }));
    });
  });
});

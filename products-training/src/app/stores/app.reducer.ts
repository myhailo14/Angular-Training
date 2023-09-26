import { AppState } from './app.state';
import { Action } from 'redux';
import { CLEAR_CHANGE, SET_CHANGE, SetChangeAction } from './change.actions';
import { CHANGE_TERM, CLEAR_TERM, ChangeTermAction } from './rentTerm.actions';

const initialState: AppState = { currentChange: 0, currentRentTerm: null};

export const appReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case SET_CHANGE:
      return {
        ...state,
        currentChange: (action as SetChangeAction).payload
      };
    case CLEAR_CHANGE:
      return {
        ...state,
        currentChange: null,
      };
    case CHANGE_TERM:
      let payload = (action as ChangeTermAction).payload!;

      return {
        ...state,
        currentRentTerm: payload,
      };
    case CLEAR_TERM:
      return {
        ...state,
        currentRentTerm: null,
      };
    default:
      return state;
  }
};

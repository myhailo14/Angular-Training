// Action type constants
export const SET_CHANGE = 'SET_CHANGE';
export const CLEAR_CHANGE = 'CLEAR_CHANGE';

// Action creators
export type SetChangeAction = { type: typeof SET_CHANGE; payload: number };
export type ClearAction = { type: typeof CLEAR_CHANGE };

export const change = (value: number): SetChangeAction => ({
  type: SET_CHANGE,
  payload: value,
});

export const clear = (): ClearAction => ({
  type: CLEAR_CHANGE,
});
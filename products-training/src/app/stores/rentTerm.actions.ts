// Action type constants
export const CHANGE_TERM = 'CHANGE_TERM';
export const CLEAR_TERM = 'CLEAR_TERM';

// Action creators
export type ChangeTermAction = { type: typeof CHANGE_TERM; payload: number | null };
export type ClearAction = { type: typeof CLEAR_TERM };

export const change = (value: number | null): ChangeTermAction => ({
  type: CHANGE_TERM,
  payload: value,
});

export const clear = (): ClearAction => ({
  type: CLEAR_TERM,
});
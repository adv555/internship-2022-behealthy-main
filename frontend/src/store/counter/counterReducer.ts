import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName } from '../../common/enums/app/reducer-name.enum';

interface IActions {
  type: string
  payload?: InitialState
}

interface InitialState {
  counter: number;
}

const initialState: InitialState = {
  counter: 0
}

const asyncIncrement = ():IActions => ({ type: 'ASYNC_INCREMENT' });
const asyncDecrement = ():IActions => ({ type: 'ASYNC_DECREMENT' });

const { reducer, actions } = createSlice({
  name: ReducerName.COUNTER,
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      ++state.counter;
      return state;
    },
    decrement: (state, action: PayloadAction<number>) => {
      --state.counter;
      return state;
    }
  }
})

const CounterActionCreator = {
  ...actions,
  asyncIncrement,
  asyncDecrement
}

export { CounterActionCreator, reducer }
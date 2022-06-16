import { put, takeEvery } from 'redux-saga/effects'
import { CounterActionCreator } from './counterReducer'

function* incrementWorker() {
  try {
    yield put(CounterActionCreator.increment(0));
  } catch (e) {
    yield console.log(e)
  }
}


function* decrementWorker() {
  try {
    yield put(CounterActionCreator.decrement(0));
  } catch (e) {
    yield console.log(e)
  }
}

function* counterWatcher() {
  yield takeEvery(CounterActionCreator.asyncIncrement().type, incrementWorker);
  yield takeEvery(CounterActionCreator.asyncDecrement().type, decrementWorker)
}

export { counterWatcher }
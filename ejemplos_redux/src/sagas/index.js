import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchRetrieveOwners } from './petOwners';


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRetrieveOwners),
  ]);
}


export default mainSaga;

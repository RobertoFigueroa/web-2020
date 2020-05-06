import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchRetrieveOwners } from './petOwners';
import { watchDeleteOwners } from './petOwners';



function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRetrieveOwners),
    fork(watchDeleteOwners),

  ]);
}


export default mainSaga;

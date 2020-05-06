import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchRetrieveOwners } from './petOwners';
import { watchDeleteOwners } from './petOwners';
import { watchAddOwners } from './petOwners';



function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRetrieveOwners),
    fork(watchDeleteOwners),
    fork(watchAddOwners),

  ]);
}


export default mainSaga;

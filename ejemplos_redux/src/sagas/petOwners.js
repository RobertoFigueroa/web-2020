import {
  call,
  takeEvery,
  select,
  put,
} from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';

import * as selectors from '../reducers';
import * as actions from '../actions/petOwners';
import * as types from '../types/petOwners';


const API_BASE_URL = 'http://localhost:8000/api/v1';

function* retrieveOwner(action) {
  try {

    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);

      const response = yield call(
        fetch,
        `${API_BASE_URL}/owner/`,
        {
          method: 'GET',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const res = yield response.json();

        let entities = {}
        let order = []

        res.forEach(owner => {
          const newId = uuid()
          entities = { ...entities, [newId]: owner }
          order = [...order, newId]
        });

        console.log("estas son las entities", entities);

        yield put(actions.completeFetchingPetOwners(entities, order))
      } else {
        console.log("Erro en el response");
      }
    } else {
      console.log("Error en la autenticación");
    }
  } catch (error) {
    yield put(actions.failFetchingPetOwners(error));
  }
}



function* deleteOwner(action){
  const { id } = action.payload;
  try{
    const isAuth = yield select(selectors.isAuthenticated);
    
    if(isAuth){

      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/owner/${id}`,
        {
          method: 'DELETE',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      ); 
      if(response.status === 204){
        yield put(actions.completeRemovingPetOwner());
      } 
      else {
        console.log("Error en la respuesta");
      } 

    } else {
      console.log("Error en la autenticacion");
    }

  } catch(error) {
    yield put(actions.failRemovingPetOwner(id, error));
  }

}




export function* watchRetrieveOwners() {
  yield takeEvery(
    types.PET_OWNERS_FETCH_STARTED,
    retrieveOwner,
  );
}


export function* watchDeleteOwners() {
  yield takeEvery(
    types.PET_OWNER_REMOVE_STARTED,
    deleteOwner,
  );
}


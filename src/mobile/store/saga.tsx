import { all, fork, take } from "redux-saga/effects";
import { REHYDRATE } from "redux-persist";
import commonSaga from "./reducers/commonSaga";

export default function* rootSaga() {
  yield take(REHYDRATE);
  yield all([fork(commonSaga)]);
}

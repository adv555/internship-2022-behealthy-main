import { AxiosError } from 'axios';
import { UserRole } from 'common/types/user.types';
import { call, put, takeEvery } from 'redux-saga/effects';
import { signUp } from 'services/signUp.service';
import { UserActionCreator } from 'store/user/getUser.reducer';
import { SignUpActionCreator } from './SignUp.reducer';

const signUpUser = async (email: string, password: string, role: UserRole) => {
  await signUp(email, password, role);
  localStorage.setItem('userEmail', email);
};

function* signUpWorker(action: ReturnType<typeof SignUpActionCreator.signUp>) {
  try {
    const { email, password, role } = action.payload;

    yield call(signUpUser, email, password, role);
    yield put(UserActionCreator.getUserData({ email }));
    yield put(SignUpActionCreator.successSignUp());
  } catch (err: any) {
    const error: AxiosError<{ message: string }> = err;
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;

    yield put(SignUpActionCreator.errorSignUp({ error: message }));
  }
}

function* SignUpWatcher() {
  yield takeEvery(SignUpActionCreator.signUp, signUpWorker);
}

export { SignUpWatcher };

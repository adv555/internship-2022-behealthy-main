import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { login } from 'services/login.service';
import { LoginActionCreator } from './login.reducer';

const loginUser = async (email: string, password: string) => {
  await login(email, password);
};

const google = async () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const token = params.get('t');
  const refresh = params.get('r');

  token && localStorage.setItem('token', token);
  document.cookie = `refresh_token=${refresh}; max-age=604800; path=/`;

  return email;
};

function* loginWorker(action: ReturnType<typeof LoginActionCreator.login>) {
  try {
    const { email, password } = action.payload;

    yield call(loginUser, email, password);
    yield put(
      LoginActionCreator.successLogin({
        email,
      }),
    );
  } catch (err: any) {
    const error: AxiosError<{ message: string }> = err;
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;

    yield put(LoginActionCreator.errorLogin({ error: message }));
  }
}

function* loginByGoogleWorker() {
  try {
    const googleEmail: string = yield call(google);
    yield put(
      LoginActionCreator.successLogin({
        email: googleEmail,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(LoginActionCreator.errorLogin({ error: error.message }));
  }
}

function* logout() {
  try {
    yield put(LoginActionCreator.logoutSuccess());
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(LoginActionCreator.errorLogin({ error: error.message }));
  }
}

function* signUpLogin(
  action: ReturnType<typeof LoginActionCreator.signUpLogin>,
) {
  try {
    yield put(
      LoginActionCreator.successLogin({
        email: action.payload.email,
      }),
    );
  } catch (err: any) {
    const error: AxiosError = err;
    yield put(LoginActionCreator.errorLogin({ error: error.message }));
  }
}

function* LoginWatcher() {
  yield takeEvery(LoginActionCreator.login, loginWorker);
  yield takeEvery(LoginActionCreator.googleLogin, loginByGoogleWorker);
  yield takeEvery(LoginActionCreator.logout, logout);
  yield takeEvery(LoginActionCreator.signUpLogin, signUpLogin);
}

export { LoginWatcher };

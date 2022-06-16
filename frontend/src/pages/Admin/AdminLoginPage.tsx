import { Button } from 'components/common/Button/Button';
import { SignInput } from 'components/common/SignIn/SignInput';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { ReactComponent as Logo } from 'assets/images/logo/logo.svg';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPswd, setIsShowPswd] = useState<boolean>(true);
  const [passwordType, setPasswodType] = useState('password');

  const login = useLogin();
  const notify = useNotify();

  const handlePress = () => {
    setIsShowPswd((prev) => !prev);
    setPasswodType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({ email, password }).catch(() => notify('Invalid email or password'));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen flex-col">
      <div className="w-60 mb-4">
        <Logo />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-450 flex flex-col gap-4 bg-white rounded-md drop-shadow-xl p-5"
      >
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-5 py-3 rounded-md border-2 border-gray"
        />
        <div className="relative">
          <input
            name="password"
            type={passwordType}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-5 py-3 rounded-md w-full border-2 border-gray"
          />
          <i
            className={`p-3 absolute right-3.5  ${
              isShowPswd
                ? `bg-[url('assets/img/signIn/eye.svg')] `
                : `bg-[url('assets/img/signIn/eyeHide.svg')]`
            } bg-no-repeat cursor-pointer absolute top-3 right-4`}
            onClick={handlePress}
          ></i>
        </div>
        <Button type="submit" size="sm" label="Sign In" />
      </form>
    </div>
  );
};

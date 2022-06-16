import { FC, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/images/logo/logo.svg';
import { MenuItem } from '../MenuItem/MenuItem';
import './menu.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useDispatch } from 'react-redux';
import { UserActionCreator } from 'store/user/getUser.reducer';
import { AppRoute } from 'common/enums/app/app-route.enum';
import { persistor } from 'store/store';
import { LoginActionCreator } from 'store/login/login.reducer';

interface MenuStructureItem {
  title: string;
  link: string;
  icon: ReactNode;
}

interface MenuProps {
  logoLink: string;
  structure: MenuStructureItem[];
}

export const Menu: FC<MenuProps> = ({ logoLink, structure }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(UserActionCreator.logOut());
    dispatch(LoginActionCreator.logout());
    persistor.flush();
    navigate(AppRoute.SIGN_IN, { replace: true });
  };

  return (
    <div className="menu">
      <Link to={logoLink} className="block w-[145px] h-[42px] mb-10">
        <Logo />
      </Link>
      <nav>
        <div>
          {structure.map(({ title, link, icon }) => (
            <MenuItem
              key={link}
              link={link}
              label={title}
              icon={icon}
              linkClassName="mb-8 last:mb-0"
            />
          ))}
        </div>
        <div className=" absolute bottom-9">
          <LogoutButton onClick={handleLogout} />
        </div>
      </nav>
    </div>
  );
};

// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import { AppstoreFilled, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreFilled,
  SettingOutlined,
  LogoutOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
  type: 'group',
  url: 'setting',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      icon: icons.SettingOutlined,
      type: 'item',
      url: '/settings'
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: icons.LogoutOutlined,
      type: 'item',
      url: '/logout'
    }
  ]
};

export default other;

// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import {
  DollarOutlined,
  LoginOutlined,
  UserOutlined,
  TeamOutlined,
  PhoneOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  FundOutlined,
  CalendarOutlined,
  PictureOutlined,
  MenuUnfoldOutlined,
  GroupOutlined,
  HeatMapOutlined
} from '@ant-design/icons';
// type

// icons
const icons = {
  DollarOutlined,
  FundOutlined,
  UserOutlined,
  TeamOutlined,
  LoginOutlined,
  PhoneOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  CalendarOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  GroupOutlined,
  HeatMapOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const main = {
  id: 'Main',
  title: 'Main',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.AppstoreAddOutlined
    },
    {
      id: 'Group',
      title: 'Groups',
      type: 'item',
      url: '/groups',
      icon: icons.GroupOutlined
    },
    {
      id: 'Community',
      title: 'Community',
      type: 'item',
      url: '/community',
      icon: icons.TeamOutlined
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.UserOutlined
    },
    {
      id: 'updates',
      title: 'Updates',
      type: 'item',
      url: '/updates',
      icon: icons.PictureOutlined
    },
    {
      id: 'events',
      title: 'Events',
      type: 'item',
      url: '/events',
      icon: icons.CalendarOutlined
    },
    {
      id: 'job',
      title: 'Job Listings',
      type: 'item',
      url: '/jobs',
      icon: icons.MenuUnfoldOutlined
    }
  ]
};

export default main;

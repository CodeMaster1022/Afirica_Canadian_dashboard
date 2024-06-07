// third-party
// import { FormattedMessage } from 'react-intl';

// assets
import {
  AppstoreAddOutlined,
  BankOutlined,
  BookOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  FundOutlined,
  InboxOutlined,
  LoginOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  RocketOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

// type

// icons
const icons = {
  FileDoneOutlined,
  FundOutlined,
  UserOutlined,
  TeamOutlined,
  LoginOutlined,
  PhoneOutlined,
  RocketOutlined,
  AppstoreAddOutlined,
  CalendarOutlined,
  MenuUnfoldOutlined,
  InboxOutlined,
  BankOutlined,
  BookOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const secondary = {
  id: 'Seconday',
  title: 'Seconday',
  type: 'group',
  children: [
    {
      id: 'survey',
      title: <FormattedMessage id="Surveys" />,
      type: 'item',
      url: '/surveys',
      icon: icons.FileDoneOutlined
    },
    {
      id: 'education',
      title: 'Education Materials',
      type: 'item',
      url: '/education',
      icon: icons.InboxOutlined
    },
    {
      id: 'service',
      title: 'Legal Services',
      type: 'item',
      url: '/services',
      icon: icons.BankOutlined
    },
    {
      id: 'report',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.BookOutlined,
      target: true
    }
  ]
};

export default secondary;

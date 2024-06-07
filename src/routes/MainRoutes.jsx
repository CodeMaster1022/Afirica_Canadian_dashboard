import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
// import PagesLayout from 'layout/Pages';
// import SimpleLayout from 'layout/Simple';
const Dashboard = Loadable(lazy(() => import('pages/main/dashboard')));
const Group = Loadable(lazy(() => import('pages/main/group')));
// const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
const Surveys = Loadable(lazy(() => import('pages/main/surveys')));
const Users = Loadable(lazy(() => import('pages/main/users')));
const Updates = Loadable(lazy(() => import('pages/main/updates')));
const Logout = Loadable(lazy(() => import('pages/logout')));
const Community = Loadable(lazy(() => import('pages/main/community')));
const Events = Loadable(lazy(() => import('pages/main/events')));
const Jobs = Loadable(lazy(() => import('pages/main/jobs')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'groups',
          element: <Group />
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'community',
          element: <Community />
        },
        {
          path: 'surveys',
          element: <Surveys />
        },
        {
          path: 'updates',
          element: <Updates />
        },
        {
          path: 'events',
          element: <Events />
        },
        {
          path: 'jobs',
          element: <Jobs />
        },
        {
          path: 'logout',
          element: <Logout />
        }
      ]
    }
  ]
};

export default MainRoutes;

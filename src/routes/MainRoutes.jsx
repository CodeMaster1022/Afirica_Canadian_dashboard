import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
// import PagesLayout from 'layout/Pages';
// import SimpleLayout from 'layout/Simple';
const Dashboard = Loadable(lazy(() => import('pages/main/dashboard')));
const Group = Loadable(lazy(() => import('pages/main/group/group')));
// const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
const Surveys = Loadable(lazy(() => import('pages/secondary/survey/surveys')));
const Users = Loadable(lazy(() => import('pages/main/user/users')));
const Updates = Loadable(lazy(() => import('pages/main/updates/updates')));
const Logout = Loadable(lazy(() => import('pages/logout')));
const Community = Loadable(lazy(() => import('pages/main/community/community')));
const Events = Loadable(lazy(() => import('pages/main/event/events')));
const Jobs = Loadable(lazy(() => import('pages/main/job/jobs')));
const Education = Loadable(lazy(() => import('pages/secondary/education/education')));
const Error404 = Loadable(lazy(() => import('pages/maintenance/404')));

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
          path: 'education',
          element: <Education />
        },
        {
          path: 'logout',
          element: <Logout />
        },
        {
          path: 'services',
          element: <Error404 />
        },
        {
          path: 'settings',
          element: <Error404 />
        }
      ]
    }
  ]
};

export default MainRoutes;

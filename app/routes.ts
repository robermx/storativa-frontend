import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/Home.tsx'),
  route('about', 'routes/About.tsx'),
  route('login', 'routes/Login.tsx'),
  route('register', 'routes/Register.tsx'),
  route('/', 'layouts/AuthLayout.tsx', [
    route('dashboard', 'routes/Dashboard.tsx'),
    route('create', 'routes/Create.tsx'),
    route('edition/:storativaId', 'routes/Edition.tsx'),
  ]),
  route('*', 'routes/NotFound.tsx'),
] satisfies RouteConfig;

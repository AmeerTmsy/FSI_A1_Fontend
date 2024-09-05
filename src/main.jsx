import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import ErrorPage from "./error-page";
import Root from "./routes/root";
import './index.css'
import Library, { loader as libraryHomeLoader } from "./routes/library";
import Books, { loader as booksLoeder} from "./routes/books"
import Authers, { loader as authersLoader } from "./routes/authers"
import Auther, { loader as autherLoader} from './routes/auther';
import Book, { loader as bookLoader} from './routes/book';
import LogIn from './routes/login';
import SignUp from './routes/signup';
import store from './app/store'
import { Provider } from 'react-redux'
import Logout from './routes/logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Library />,
        loader: libraryHomeLoader,
      },
      {
        path: "/books",
        element: <Books />,
        loader: booksLoeder,
      },
      {
        path: "/authers",
        element: <Authers />,
        loader: authersLoader,
      },
      {
        path: "/authers/:autherId",
        element: <Auther />,
        loader: autherLoader,
      },
      {
        path: "/books/:bookId",
        element: <Book />,
        loader: bookLoader,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

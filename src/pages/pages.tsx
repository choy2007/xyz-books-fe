import { routerType } from "../types/router.types";
import Home from "./home";
import Book from "./book";

const pagesData: routerType[] = [
  {
    path: "",
    element: <Home />,
    title: "home"
  },
  {
    path:"/books/:isbn",
    element: <Book />,
    title: "book"
  },
];

export default pagesData;

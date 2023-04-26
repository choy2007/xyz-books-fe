import { IBookData } from "../types/book.types";

interface BookProps{
  books: IBookData[];
}

export async function showBook(isbn: string) {
  const BASE_BOOK_API = `http://localhost:3001/api/v1/books/${isbn}`;
  let book = await fetch(BASE_BOOK_API);
  let data: Array<BookProps> = await book.json();

  console.log(data)
}

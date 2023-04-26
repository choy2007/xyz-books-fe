export interface IBookData {
  id: number,
  title: String,
  author: String,
  isbn13: String,
  isbn10: String,
  publicationYear: number,
  publisher: String,
  edition: String,
  price: number
}

export interface Book {
  title: string;
  isbn: string;
  publication_year: string;
  edition: string | null;
  price: string;
  author: string;
  publisher: string;
  image_url: String,
}

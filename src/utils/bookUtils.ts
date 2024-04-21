export interface IBook {
  barcode: string;
  cover: string;
  title: string;
  authors: string[];
  description: string;
  subjects: string[];
  publicationDate: Date;
  publisher: string;
  pages: number;
  genre: string;
  records: [];
}

export function mapAuthorsToString(book: IBook) {
  let authors = "";
  for (let author of book.authors) {
    authors = author;
    authors += ", ";
  }

  return authors.slice(0, authors.length -2)
}

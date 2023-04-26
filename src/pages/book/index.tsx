import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Scroll from "../../components/Scroll";
import { BookCard } from "../../components/BookCard";

const Book = () => {
  const location = useLocation();
  const [book, setBook] = useState()
  const { isbn } = useParams<{ isbn?: string }>();

  useEffect(() => {
    async function fetchBook() {
      const response = await fetch(`http://localhost:3001/api/v1/books/${isbn}`);
      const data = await response.json();

      const { attributes } = data.data;
      const bookAttributes = { ...attributes };

      setBook(bookAttributes);
    }
    fetchBook();
  }, [isbn, location.search]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box mx={10}>
        <Scroll>
          { book && <BookCard book={book} /> }
        </Scroll>
      </Box>
    </div>
  );
};

export default Book;

import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Scroll from "../../components/Scroll";
import { BookCard } from "../../components/BookCard";

const Book = () => {
  const location = useLocation();
  const [book, setBook] = useState();
  const { isbn } = useParams<{ isbn?: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async() => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/books/${isbn}`);
        if (!response.ok) {
          throw new Error('Book not found');
        }
        const data = await response.json();
        const { attributes } = data.data;
        const bookAttributes = { ...attributes };

        setBook(bookAttributes);
        setError(null);
      } catch (error) {
        setError('Book not found')
      };
    }
    fetchBook();
  }, [isbn, location.search]);

  return (
    <div>
      <Box mx={10}>
        <Scroll>
          { error && <Heading> {error} </Heading>}
          { !error && book && <BookCard book={book} /> }
        </Scroll>
      </Box>
    </div>
  );
};

export default Book;

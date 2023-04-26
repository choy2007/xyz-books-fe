import { FC, Key, ReactNode } from 'react';
import Card from './Card';
import { IBookData, Book } from '../types/book.types';
import { Container, Heading, Image, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';

interface BookCardProps {
  book: Book;
}

export const BookCard = (props: BookCardProps) => {
  const { book } = props;
  let imageUrl = book.image_url.toString();

  console.log(book)
  return (
    <Container maxW={'7xl'}>
      <Stack align={'center'}
        pt={{ base: 10, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Heading>
          Search Result
        </Heading>
      </Stack>

      <Stack align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack>
          <Image boxSize='500px' src={ imageUrl }/>
        </Stack>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Stack>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}>
                { book.title }
              </Text>
            </Heading>
            <Spacer />
            <Heading
              lineHeight={1}
              fontWeight={500}
              fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}>
                by { book.author }
              </Text>
            </Heading>
            <Spacer />
            { book.edition && <Text fontSize={{ base: '3xl' }} >Edition: <Text fontSize={{ base: '3xl' }} as='span' color='blue.500'>{ book.edition }</Text></Text> }
            <Text fontSize={{ base: '3xl' }}>Price: <Text fontSize={{ base: '3xl' }} as='span' color='blue.500'>{ book.price }</Text></Text>
            <Text fontSize={{ base: '3xl' }}>ISBN:  <Text fontSize={{ base: '3xl' }} as='span' color='blue.500'>{ book.isbn }</Text></Text>
            <Text fontSize={{ base: '3xl' }}>Publication Year: <Text fontSize={{ base: '3xl' }} as='span' color='blue.500'>{ book.publication_year }</Text></Text>
            <Text fontSize={{ base: '3xl' }}>Publisher: <Text fontSize={{ base: '3xl' }} as='span' color='blue.500'>{ book.publisher }</Text></Text>
          </Stack> 
        </Stack>
      </Stack>
    </Container>
  );
}

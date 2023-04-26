import { ReactNode } from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';


const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithAppLinksAndSocial() {
  return (
    <Box>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>XYZ Books</ListHeader>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Menu</ListHeader>
            <Link href={'#'}>Shop All</Link>
            <Link href={'#'}>About Us</Link>
            <Link href={'#'}>Community</Link>
            <Link href={'#'}>FAQs</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Shipping & Returns</Link>
            <Link href={'#'}>Help & FAQ</Link>
            <Link href={'#'}>Terms & Conditions</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Contact</Link>
            <Link href={'#'}>Login</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Resources</ListHeader>
            <Link href={'#'}>Shipping & Returns</Link>
            <Link href={'#'}>Help & FAQ</Link>
            <Link href={'#'}>Terms & Conditions</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Contact</Link>
            <Link href={'#'}>Login</Link>
          </Stack> 
        </SimpleGrid>
      </Container>
    </Box>
  );
}

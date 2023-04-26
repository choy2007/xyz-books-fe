// navigate(`/books/${target.isbnValue.value}?search=${Date.now()}`, { replace: true });

import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      isbnValue: { value: string };
    };

    const inputIsbn = target.isbnValue.value;
    const isbn13Regex = /^[9][7][8][0-9]{10}$/;
    const isbn10Regex = /^[0-9]{9}[0-9X]$/;

    function convertISBN(isbn: string) {
      isbn = isbn.replace(/-/g, '');

      if (validateISBN10(isbn)) {
        var prefix = '978';
        var checkDigit = calculateCheckDigit(prefix + isbn.substring(0, 9));

        return prefix + isbn.substring(0, 9) + checkDigit;
      } else if (validateISBN13(isbn)) {
        if (isbn.substring(0, 3) !== '978' && isbn.substring(0, 3) !== '979') {
          alert('Invalid ISBN');
          return false;
        }
        const choppedIsbn = isbn.substring(3, 12);
        let checkDigit: number | string = 0;
  
        for (var i = 0; i < 9; i++) {
          checkDigit += (i + 1) * parseInt(choppedIsbn.charAt(i));
        }
  
        checkDigit = (11 - (checkDigit % 11)) % 11;
  
        if (checkDigit === 10) {
          checkDigit = 'X';
        }
  
        return choppedIsbn + checkDigit;
      } else {
        alert('Invalid ISBN');
        return false;
      }
    }
  
    function calculateCheckDigit(isbn: string) {
      var sum = 0;
      var multiplier = [1, 3];

      isbn = isbn.replace(/-/g, '');

      for (var i = 0; i < isbn.length; i++) {
        sum += parseInt(isbn.charAt(i)) * multiplier[i % 2];
      }
      var checkDigit = (10 - (sum % 10)) % 10;

      return checkDigit;
    }

    function validateISBN13(isbn13: string): boolean{
      isbn13 = isbn13.replace(/-/g, '');
  
      if (isbn13Regex.test(isbn13)) {
        let checkDigit = 0;
        for (var i = 0; i < 12; i++) {
          checkDigit += (i % 2 === 0 ? 1 : 3) * parseInt(isbn13.charAt(i));
        }
        checkDigit = (10 - (checkDigit % 10)) % 10;
  
        if (checkDigit !== parseInt(isbn13.charAt(12))) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }

    function validateISBN10(isbn10: string): boolean {
      isbn10 = isbn10.replace(/-/g, '');
  
      if (isbn10Regex.test(isbn10)) {
        let checkDigit = 0;
        for (let i = 0; i < 9; i++) {
          checkDigit += (i + 1) * parseInt(isbn10.charAt(i));
        }
        checkDigit = checkDigit % 11;
  
        if (isbn10.charAt(9) === 'X') {
          checkDigit = 10;
        } else if (isNaN(parseInt(isbn10.charAt(9)))) {
          alert('Invalid check digit');
          return false;
        } else {
          checkDigit = parseInt(isbn10.charAt(9));
        }
        return true;
      } else {
        alert('Invalid ISBN');
        return false;
      }
    };

    if (validateISBN13(inputIsbn)) {
      navigate(`/books/${inputIsbn}?search=${Date.now()}`, { replace: true });
    } else if (validateISBN10(inputIsbn)) {
      const isbn13 = convertISBN(inputIsbn);
      navigate(`/books/${isbn13}?search=${Date.now()}`, { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex align="center">
        <InputGroup>
          <InputLeftElement 
            pointerEvents='none'
            children={<SearchIcon />}
          />
          <Input
            type="text"
            name="isbnValue"
            placeholder="Search"
            size="md"
          />
        </InputGroup>
      </Flex>
    </form>
  )
}

export default SearchForm;

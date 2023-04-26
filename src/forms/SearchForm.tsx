import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { showBook } from "../services/showBook";

interface Book {
  title: string;
  isbn: string;
  publication_year: string;
  edition: string | null;
  price: string;
  author: string;
  publisher: string;
  image_url: string;
}

function SearchForm() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      isbnValue: { value: string };
    };

    const validateIsbn = /^((\d{10})|(\d{13}))$/;
    const inputIsbn = target.isbnValue.value.replace(/-/g, "");

    if (validateIsbn.test(inputIsbn)) {
      const isbn10Checksum = (digits: number[]) => {
        const sum = digits.reduce((acc, val, idx) => {
          return acc + val * (10 - idx);
        }, 0);
        return (11 - (sum % 11)) % 11;
      };
      const isbn13Checksum = (digits: number[]) => {
        const sum = digits.reduce((acc, val, idx) => {
          const weight = idx % 2 === 0 ? 1 : 3;
          return acc + val * weight;
        }, 0);
        return (10 - (sum % 10)) % 10;
      };
      const isbn = inputIsbn.split("");
      const isbn10 = isbn.slice(0, 9).map((digit) => parseInt(digit, 10));
      const isbn10CheckDigit =
        isbn[9].toLowerCase() === "x" ? 10 : parseInt(isbn[9], 10);
      const isbn13 = isbn.map((digit) => parseInt(digit, 10));
      const isbn10IsValid = isbn10Checksum(isbn10) === isbn10CheckDigit;
      const isbn13IsValid = isbn13Checksum(isbn13.slice(0, 12)) === isbn13[12];
      if (isbn10IsValid || isbn13IsValid) {
        navigate(`/books/${target.isbnValue.value}?search=${Date.now()}`, { replace: true });
      } else {
        alert("Invalid ISBN number");
      }
    } else {
      alert("Invalid ISBN number");
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

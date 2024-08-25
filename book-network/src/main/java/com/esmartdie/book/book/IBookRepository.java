package com.esmartdie.book.book;

import org.springframework.data.jpa.repository.JpaRepository;
public interface IBookRepository extends JpaRepository<Book, Integer> {
}

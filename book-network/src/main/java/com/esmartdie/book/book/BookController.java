package com.esmartdie.book.book;

import com.esmartdie.book.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.naming.ldap.PagedResultsControl;
import java.util.List;

@RestController
@RequestMapping("books")
@RequiredArgsConstructor
@Tag(name="Book")
public class BookController {

    private final BookService service;

    @PostMapping
    public ResponseEntity<Integer> saveBook(
            @Valid @RequestBody BookRequest request,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping
    public ResponseEntity<BookResponse> findBookById(
            @PathVariable("book-id") Integer bookId
    ){
        return ResponseEntity.ok(service.findById(bookId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> findAllBooks(
            @RequestParam (name = "page", defaultValue="0", required = false) int page,
            @RequestParam (name = "page", defaultValue="0", required = false) int size,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllBooks(page, size, connectedUser));
    }
}

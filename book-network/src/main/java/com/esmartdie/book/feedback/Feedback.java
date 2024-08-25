package com.esmartdie.book.feedback;

import com.esmartdie.book.book.Book;
import com.esmartdie.book.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Feedback extends BaseEntity {

    private Double note;
    private String comment;
    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;

}

package com.esmartdie.book.book;

import com.esmartdie.book.common.BaseEntity;
import com.esmartdie.book.feedback.Feedback;
import com.esmartdie.book.history.BookTransactionHistory;
import com.esmartdie.book.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;


@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book extends BaseEntity {

    private String title;
    private String authorName;
    private String isbn;
    private String synopsis;
    private String bookCover;
    private boolean archived;
    private boolean shareable;
    @ManyToOne
    @JoinColumn(name="owner_id")
    private User owner;
    @OneToMany(mappedBy = "book")
    private List<Feedback> feedbacks;
    @OneToMany(mappedBy = "book")
    private List<BookTransactionHistory> histories;

}

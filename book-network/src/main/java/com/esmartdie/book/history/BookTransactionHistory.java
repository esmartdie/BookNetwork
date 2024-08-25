package com.esmartdie.book.history;

import com.esmartdie.book.book.Book;
import com.esmartdie.book.common.BaseEntity;
import com.esmartdie.book.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BookTransactionHistory extends BaseEntity {

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;
    private boolean returned;
    private boolean returnApproved;
}

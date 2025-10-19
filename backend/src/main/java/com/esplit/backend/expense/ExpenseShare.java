package com.esplit.backend.expense;

import com.esplit.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "expense_shares")
@Getter @Setter @NoArgsConstructor
public class ExpenseShare {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "expense_id")
    private Expense expense;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id")
    private User user;

    private BigDecimal shareAmount;
}
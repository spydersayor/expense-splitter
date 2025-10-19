package com.esplit.backend.expense;

import com.esplit.backend.group.GroupEntity;
import com.esplit.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "expenses")
@Getter @Setter @NoArgsConstructor
public class Expense {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "group_id")
    private GroupEntity group;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "paid_by")
    private User paidBy;

    private BigDecimal amount;
    private String description;
    private LocalDate spentAt;
    private Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "expense", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExpenseShare> shares = new ArrayList<>();
}
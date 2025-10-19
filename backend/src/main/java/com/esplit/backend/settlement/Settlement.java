package com.esplit.backend.settlement;

import com.esplit.backend.group.GroupEntity;
import com.esplit.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "settlements")
@Getter @Setter @NoArgsConstructor
public class Settlement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "group_id")
    private GroupEntity group;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "from_user")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "to_user")
    private User toUser;

    private BigDecimal amount;
    private Instant settledAt = Instant.now();
    private String note;
}
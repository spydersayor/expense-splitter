package com.esplit.backend.expense;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
public class ExpenseDto {
    private Long id;
    private Long groupId;
    private String groupName;
    private Long paidById;
    private String paidByName;
    private String paidByEmail;
    private BigDecimal amount;
    private String description;
    private LocalDate spentAt;
    private Instant createdAt;
    private List<ExpenseShareDto> shares;

    @Data
    public static class ExpenseShareDto {
        private Long id;
        private Long userId;
        private String userName;
        private String userEmail;
        private BigDecimal shareAmount;
    }
}
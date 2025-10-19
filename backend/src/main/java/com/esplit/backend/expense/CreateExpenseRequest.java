package com.esplit.backend.expense;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class CreateExpenseRequest {
    private Long groupId;
    private Long paidById;
    private BigDecimal amount;
    private String description;
    private LocalDate spentAt;
    private List<ShareDto> shares;

    @Data
    public static class ShareDto {
        private Long userId;
        private BigDecimal shareAmount;
    }
}
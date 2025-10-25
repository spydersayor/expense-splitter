package com.esplit.backend.settlement;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateSettlementRequest {
    private Long groupId;
    private Long fromUserId;
    private Long toUserId;
    private BigDecimal amount;
    private String note;
}
package com.esplit.backend.settlement;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;

@Data
public class SettlementDto {
    private Long id;
    private Long groupId;
    private String groupName;
    private Long fromUserId;
    private String fromUserName;
    private String fromUserEmail;
    private Long toUserId;
    private String toUserName;
    private String toUserEmail;
    private BigDecimal amount;
    private Instant settledAt;
    private String note;
}
package com.esplit.backend.group;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/balances")
@RequiredArgsConstructor
public class BalanceController {
    private final BalanceService balanceService;

    @GetMapping("/{groupId}")
    public Map<Long, BigDecimal> getBalances(@PathVariable Long groupId) {
        return balanceService.calculateBalances(groupId);
    }
}
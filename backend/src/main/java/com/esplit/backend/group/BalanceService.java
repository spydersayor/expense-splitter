package com.esplit.backend.group;

import com.esplit.backend.expense.Expense;
import com.esplit.backend.expense.ExpenseRepo;
import com.esplit.backend.expense.ExpenseShare;
import com.esplit.backend.settlement.Settlement;
import com.esplit.backend.settlement.SettlementRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class BalanceService {
    private final ExpenseRepo expenseRepo;
    private final SettlementRepo settlementRepo;

    public Map<Long, BigDecimal> calculateBalances(Long groupId) {
        log.info("Calculating balances for group: {}", groupId);
        Map<Long, BigDecimal> balances = new HashMap<>();

        try {
            // 1) Expenses
            List<Expense> expenses = expenseRepo.findByGroupId(groupId);
            log.info("Found {} expenses for group {}", expenses.size(), groupId);
            
            for (Expense e : expenses) {
                if (e.getPaidBy() != null && e.getAmount() != null) {
                    balances.merge(e.getPaidBy().getId(), e.getAmount(), BigDecimal::add);
                    if (e.getShares() != null) {
                        for (ExpenseShare s : e.getShares()) {
                            if (s.getUser() != null && s.getShareAmount() != null) {
                                balances.merge(s.getUser().getId(), s.getShareAmount().negate(), BigDecimal::add);
                            }
                        }
                    }
                }
            }

            // 2) Settlements
            List<Settlement> settlements = settlementRepo.findByGroupId(groupId);
            log.info("Found {} settlements for group {}", settlements.size(), groupId);
            
            for (Settlement st : settlements) {
                if (st.getFromUser() != null && st.getToUser() != null && st.getAmount() != null) {
                    balances.merge(st.getFromUser().getId(), st.getAmount(), BigDecimal::add);
                    balances.merge(st.getToUser().getId(), st.getAmount().negate(), BigDecimal::add);
                }
            }

            log.info("Calculated balances: {}", balances);
            return balances;
        } catch (Exception e) {
            log.error("Error calculating balances for group {}: {}", groupId, e.getMessage(), e);
            throw new RuntimeException("Failed to calculate balances: " + e.getMessage(), e);
        }
    }
}
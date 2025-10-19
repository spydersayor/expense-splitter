package com.esplit.backend.group;

import com.esplit.backend.expense.Expense;
import com.esplit.backend.expense.ExpenseRepo;
import com.esplit.backend.expense.ExpenseShare;
import com.esplit.backend.settlement.Settlement;
import com.esplit.backend.settlement.SettlementRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BalanceService {
    private final ExpenseRepo expenseRepo;
    private final SettlementRepo settlementRepo;

    public Map<Long, BigDecimal> calculateBalances(Long groupId) {
        Map<Long, BigDecimal> balances = new HashMap<>();

        // 1) Expenses
        List<Expense> expenses = expenseRepo.findByGroupId(groupId);
        for (Expense e : expenses) {
            balances.merge(e.getPaidBy().getId(), e.getAmount(), BigDecimal::add);
            for (ExpenseShare s : e.getShares()) {
                balances.merge(s.getUser().getId(), s.getShareAmount().negate(), BigDecimal::add);
            }
        }

        // 2) Settlements
        for (Settlement st : settlementRepo.findByGroupId(groupId)) {
            balances.merge(st.getFromUser().getId(), st.getAmount(), BigDecimal::add);
            balances.merge(st.getToUser().getId(), st.getAmount().negate(), BigDecimal::add);
        }

        return balances;
    }
}
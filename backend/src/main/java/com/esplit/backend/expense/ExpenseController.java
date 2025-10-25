package com.esplit.backend.expense;

import com.esplit.backend.group.GroupEntity;
import com.esplit.backend.group.GroupRepo;
import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseRepo expenseRepo;
    private final GroupRepo groupRepo;
    private final UserRepo userRepo;

    @GetMapping("/{groupId}")
    public List<Expense> getGroupExpenses(@PathVariable Long groupId) {
        return expenseRepo.findByGroupId(groupId);
    }

    @PostMapping
    public Expense createExpense(@RequestBody CreateExpenseRequest req) {
    GroupEntity group = groupRepo.findById(req.getGroupId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found"));
    User paidBy = userRepo.findById(req.getPaidById())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Expense e = new Expense();
        e.setGroup(group);
        e.setPaidBy(paidBy);
        e.setAmount(req.getAmount());
        e.setDescription(req.getDescription());
        e.setSpentAt(req.getSpentAt());

        BigDecimal totalShares = BigDecimal.ZERO;
        for (CreateExpenseRequest.ShareDto s : req.getShares()) {
            User u = userRepo.findById(s.getUserId()).orElseThrow();
            ExpenseShare share = new ExpenseShare();
            share.setExpense(e);
            share.setUser(u);
            share.setShareAmount(s.getShareAmount());
            e.getShares().add(share);
            totalShares = totalShares.add(s.getShareAmount());
        }

        if (totalShares.compareTo(req.getAmount()) != 0)
            throw new RuntimeException("Shares must equal total amount!");

        return expenseRepo.save(e);
    }
}
package com.esplit.backend.expense;

import com.esplit.backend.group.GroupEntity;
import com.esplit.backend.group.GroupRepo;
import com.esplit.backend.user.User;
import com.esplit.backend.user.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseRepo expenseRepo;
    private final GroupRepo groupRepo;
    private final UserRepo userRepo;

    private ExpenseDto toExpenseDto(Expense expense) {
        ExpenseDto dto = new ExpenseDto();
        dto.setId(expense.getId());
        dto.setGroupId(expense.getGroup().getId());
        dto.setGroupName(expense.getGroup().getName());
        dto.setPaidById(expense.getPaidBy().getId());
        dto.setPaidByName(expense.getPaidBy().getName());
        dto.setPaidByEmail(expense.getPaidBy().getEmail());
        dto.setAmount(expense.getAmount());
        dto.setDescription(expense.getDescription());
        dto.setSpentAt(expense.getSpentAt());
        dto.setCreatedAt(expense.getCreatedAt());
        dto.setShares(expense.getShares().stream().map(this::toExpenseShareDto).toList());
        return dto;
    }

    private ExpenseDto.ExpenseShareDto toExpenseShareDto(ExpenseShare share) {
        ExpenseDto.ExpenseShareDto dto = new ExpenseDto.ExpenseShareDto();
        dto.setId(share.getId());
        dto.setUserId(share.getUser().getId());
        dto.setUserName(share.getUser().getName());
        dto.setUserEmail(share.getUser().getEmail());
        dto.setShareAmount(share.getShareAmount());
        return dto;
    }

    @GetMapping("/{groupId}")
    @Transactional(readOnly = true)
    public List<ExpenseDto> getGroupExpenses(@PathVariable Long groupId) {
        return expenseRepo.findByGroupId(groupId).stream()
                .map(this::toExpenseDto)
                .toList();
    }

    @PostMapping
    @Transactional
    public ExpenseDto createExpense(@RequestBody CreateExpenseRequest req) {
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
            // Skip shares with zero amount
            if (s.getShareAmount().compareTo(BigDecimal.ZERO) == 0) {
                continue;
            }
            User u = userRepo.findById(s.getUserId()).orElseThrow();
            ExpenseShare share = new ExpenseShare();
            share.setExpense(e);
            share.setUser(u);
            share.setShareAmount(s.getShareAmount());
            e.getShares().add(share);
            totalShares = totalShares.add(s.getShareAmount());
        }

        // Use tolerance-based comparison for BigDecimal (0.01)
        BigDecimal tolerance = new BigDecimal("0.01");
        if (totalShares.subtract(req.getAmount()).abs().compareTo(tolerance) > 0) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, 
                "Shares must sum to total amount. Total shares: " + totalShares + ", Amount: " + req.getAmount()
            );
        }

        Expense saved = expenseRepo.save(e);
        return toExpenseDto(saved);
    }
}
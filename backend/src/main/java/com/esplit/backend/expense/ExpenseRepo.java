package com.esplit.backend.expense;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    List<Expense> findByGroupId(Long groupId);
}
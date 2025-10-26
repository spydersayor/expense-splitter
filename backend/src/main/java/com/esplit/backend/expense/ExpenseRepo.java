package com.esplit.backend.expense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    @Query("SELECT DISTINCT e FROM Expense e LEFT JOIN FETCH e.shares LEFT JOIN FETCH e.paidBy WHERE e.group.id = :groupId")
    List<Expense> findByGroupId(@Param("groupId") Long groupId);
}

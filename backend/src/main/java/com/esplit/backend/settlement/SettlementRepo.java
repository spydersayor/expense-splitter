package com.esplit.backend.settlement;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettlementRepo extends JpaRepository<Settlement, Long> {
    List<Settlement> findByGroupId(Long groupId);
}
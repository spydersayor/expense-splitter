package com.esplit.backend.settlement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SettlementRepo extends JpaRepository<Settlement, Long> {
    @Query("SELECT s FROM Settlement s LEFT JOIN FETCH s.fromUser LEFT JOIN FETCH s.toUser WHERE s.group.id = :groupId")
    List<Settlement> findByGroupId(@Param("groupId") Long groupId);
}

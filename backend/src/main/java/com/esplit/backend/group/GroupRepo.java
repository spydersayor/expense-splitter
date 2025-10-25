package com.esplit.backend.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GroupRepo extends JpaRepository<GroupEntity, Long> {
	@Query("select distinct g from GroupEntity g left join fetch g.members left join fetch g.createdBy")
	List<GroupEntity> findAllWithMembers();

	@Query("select g from GroupEntity g left join fetch g.members left join fetch g.createdBy where g.id = :id")
	Optional<GroupEntity> findByIdWithMembers(@Param("id") Long id);
}
package com.ptit.backend.repository;

import com.ptit.backend.entity.SalaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface SalaryRepository extends JpaRepository<SalaryEntity, Long> {
    @Query("select s from SalaryEntity s where s.staff.id = ?1 and s.createdAt >= ?2 and s.createdAt <= ?3")
    public List<SalaryEntity> findSalary(Long staffId, Date start, Date end);

    public List<SalaryEntity> findSalaryEntityByStaff_IdAndCreatedAtBetween(Long id, Date s, Date e);
}

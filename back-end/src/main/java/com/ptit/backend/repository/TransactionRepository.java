package com.ptit.backend.repository;

import com.ptit.backend.entity.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
    @Query("SELECT t from TransactionEntity t where t.account_in.id = ?1 or t.account_out.id = ?1")
    public Page<TransactionEntity> findAllByAccount(Long accountId, Pageable pageable);

    @Query("SELECT t from TransactionEntity t where t.account_in = ?1 or t.account_out = ?1")
    public Page<TransactionEntity> findAllByCustomer(Long accountId, Pageable pageable);

}

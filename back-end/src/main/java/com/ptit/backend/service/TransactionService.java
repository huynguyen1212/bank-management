package com.ptit.backend.service;


import com.ptit.backend.entity.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.lang.annotation.Target;

public interface TransactionService {
    public Page<TransactionEntity> findAll(Pageable pageable);
    public TransactionEntity findById(Long id);
    public Page<TransactionEntity> findByAccount(Long accountId, Pageable pageable);
    public Page<TransactionEntity> findByCustomer(Long customerId, Pageable pageable);
}

package com.ptit.backend.service;

import com.ptit.backend.entity.CustomerEntity;
import com.ptit.backend.entity.TransactionEntity;
import com.ptit.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Page<TransactionEntity> findAll(Pageable pageable) {
        return transactionRepository.findAll(pageable);
    }

    @Override
    public TransactionEntity findById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    @Override
    public Page<TransactionEntity> findByAccount(Long accountId, Pageable pageable) {
        return transactionRepository.findAllByAccount(accountId, pageable);
    }

    @Override
    public Page<TransactionEntity> findByCustomer(Long customerId, Pageable pageable) {
        return null;
    }
}

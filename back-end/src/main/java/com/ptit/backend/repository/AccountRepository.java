package com.ptit.backend.repository;

import com.ptit.backend.entity.AccountEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    public AccountEntity findByCode(String code);

    //@Query("select a from AccountEntity a where a.code like %:code%")
    public Page<AccountEntity> findAllByCodeContaining(String code, Pageable pageable);

    @Query("select a from AccountEntity a where a.customer.id = ?1")
    public Page<AccountEntity> findAllByCustomer(Long customerId, Pageable pageable);


}

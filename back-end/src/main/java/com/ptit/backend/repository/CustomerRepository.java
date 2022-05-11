package com.ptit.backend.repository;

import com.ptit.backend.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    public CustomerEntity findCustomerEntityByUser_Id(Long id);

    @Query("select c from CustomerEntity c where c.staff.id = ?1")
    public Page<CustomerEntity> findCustomerByStaff(Long staffId, Pageable pageable);
}

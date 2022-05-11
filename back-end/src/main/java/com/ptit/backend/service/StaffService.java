package com.ptit.backend.service;

import com.ptit.backend.dto.GetSalaryDto;
import com.ptit.backend.dto.ResSalaryDto;
import com.ptit.backend.entity.CustomerEntity;
import com.ptit.backend.entity.SalaryEntity;
import com.ptit.backend.entity.StaffEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface StaffService {
    public  StaffEntity findByUsername(String username);

    public StaffEntity create(StaffEntity s);

    public StaffEntity update(StaffEntity s);

    public StaffEntity findById(Long id);

    public Page<StaffEntity> findAll(Pageable pageable);

    public Page<CustomerEntity> findCustomerCreated(Long staffId, Pageable pageable);

    // return list item of salary
    public ResSalaryDto findSalary(Long staffId, Date start, Date end);
}

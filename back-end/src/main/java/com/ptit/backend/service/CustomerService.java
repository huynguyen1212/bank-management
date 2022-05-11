package com.ptit.backend.service;

import com.ptit.backend.entity.CustomerEntity;
import com.ptit.backend.repository.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

public interface CustomerService {
    public CustomerEntity createCustomer(CustomerEntity user);
    public CustomerEntity updateCustomer(CustomerEntity user);
    public CustomerEntity getCustomerById(long id);
    public Page<CustomerEntity> getCustomerList(Pageable pageable);
}

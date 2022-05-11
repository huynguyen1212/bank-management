package com.ptit.backend.service;

import com.ptit.backend.dto.GetSalaryDto;
import com.ptit.backend.dto.ResSalaryDto;
import com.ptit.backend.entity.*;
import com.ptit.backend.repository.CustomerRepository;
import com.ptit.backend.repository.SalaryRepository;
import com.ptit.backend.repository.StaffRepository;
import com.ptit.backend.repository.UserRepository;
import com.ptit.backend.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class StaffServiceImpl implements StaffService{
    @Autowired
    StaffRepository staffRepository;

    @Autowired
    SalaryRepository salaryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public StaffEntity findByUsername(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if(user != null){
            StaffEntity staffEntity = staffRepository.findByUser(user);
            return staffEntity;
        }
        return null;
    }

    @Override
    public StaffEntity create(StaffEntity s) {
        return staffRepository.save(s);
    }

    @Override
    public StaffEntity update(StaffEntity s) {
        return staffRepository.save(s);
    }

    @Override
    public StaffEntity findById(Long id) {
        return staffRepository.findById(id).orElse(null);
    }

    @Override
    public Page<StaffEntity> findAll(Pageable pageable) {
        return staffRepository.findAll(pageable);
    }

    @Override
    public Page<CustomerEntity> findCustomerCreated(Long staffId, Pageable pageable) {
        StaffEntity staff = staffRepository.findById(staffId).orElse(null);

        if(staff == null){
            throw ApiResponse.builder().status(HttpStatus.NOT_FOUND).message("Không tìm thấy Staff.").build();
        }

        Page<CustomerEntity> c = customerRepository.findCustomerByStaff(staffId, pageable);
        return c;
    }

    @Override
    public ResSalaryDto findSalary(Long staffId, Date start, Date end) {
        StaffEntity s = staffRepository.findById(staffId).orElse(null);
        if(s == null){
            throw ApiResponse.builder().status(HttpStatus.NOT_FOUND).message("Không tìm thấy nhân viên.").build();
        }
        List<SalaryEntity> list = salaryRepository.findSalary(staffId, start, end);
        float salary = 0;
        for(SalaryEntity item: list){
            salary = salary + item.getAmount();
        }
        ResSalaryDto res = new ResSalaryDto();
        res.setSalary(salary);
        res.setList(list);
        res.setStaff(s);

        return res;
    }

}

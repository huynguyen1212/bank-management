package com.ptit.backend.service;

import com.ptit.backend.entity.AccountEntity;
import com.ptit.backend.entity.SalaryEntity;
import com.ptit.backend.entity.StaffEntity;

public interface SalaryService {
    // for first time staff create customer
    public SalaryEntity createFirstTime(StaffEntity s, AccountEntity a);

    // for +2% when account saving money in first time
    public SalaryEntity createExtra(StaffEntity s, float amount, AccountEntity a);
}

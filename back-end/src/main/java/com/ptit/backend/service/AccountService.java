package com.ptit.backend.service;

import com.ptit.backend.dto.*;
import com.ptit.backend.entity.AccountEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;

public interface AccountService {
    public AccountEntity create(CreateAccountDto data);

    public AccountEntity update(AccountEntity accountEntity);

    // detail information of an account
    public AccountEntity findById(Long id);

    // get list account
    public Page<AccountEntity> getList(String code, Pageable pageable);

    // get list account of an Customer
    public Page<AccountEntity> getCustomerAccount(Long customerId, Pageable pageable);

    // recharge
    public boolean recharge(RechargeDto data);

    public boolean registerPackage(RegisterPackageDto data);

    public boolean rechargePackage(RechargePackageDto data);

    public boolean pay(PayDto data);

    public boolean withdrawSavingInterest(AccountEntity account);

    public boolean cancelSaving(AccountEntity account);
}

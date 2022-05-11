package com.ptit.backend.service;

import com.ptit.backend.dto.*;
import com.ptit.backend.entity.*;
import com.ptit.backend.repository.*;
import com.ptit.backend.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    StaffService staffService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    PackageRepository packageRepository;

    @Autowired
    TransactionService transactionService;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    SalaryService salaryService;

    @Override
    public AccountEntity create(CreateAccountDto data) {
        // check exist id
        CustomerEntity customer = customerRepository.findById(data.getId_customer()).orElse(null);

        // get staff
        MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserEntity user = myUserDetails.getUser();

        // check code is duplicate
        AccountEntity a = accountRepository.findByCode(data.getCode());
        if (a != null) {
            throw ApiResponse.builder().status(HttpStatus.CONFLICT).message("Mã tài khoản không hợp lệ").build();
        }

        if (customer != null && user != null) {
            StaffEntity staffEntity = staffService.findByUsername(user.getUsername());

            AccountEntity accountEntity = new AccountEntity();
            accountEntity.setCustomer(customer);
            accountEntity.setStaff(staffEntity);
            accountEntity.setStatus(true);
            accountEntity.setCode(data.getCode());

            return accountRepository.save(accountEntity);
        }

        return null;
    }

    @Override
    public AccountEntity update(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }

    @Override
    public AccountEntity findById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public Page<AccountEntity> getList(String code, Pageable pageable) {
        if(code != null){
            return accountRepository.findAllByCodeContaining(code, pageable);
        }
        return accountRepository.findAll(pageable);
    }

    @Override
    public Page<AccountEntity> getCustomerAccount(Long customerId, Pageable pageable) {
        return accountRepository.findAllByCustomer(customerId, pageable);
    }

    @Override
    @Transactional
    public boolean recharge(RechargeDto data) {
        AccountEntity account = accountRepository.findById(data.getAccount().getId()).orElse(null);
        if (account != null) {
            float ban = account.getBalance() + data.getAmount();
            account.setBalance(ban);
            accountRepository.save(account);

            // insert transaction
            TransactionEntity transactionEntity = new TransactionEntity();
            transactionEntity.setAccount_in(account);
            transactionEntity.setAmount(data.getAmount());
            transactionEntity.setType(TransactionEntity.type.IN);
            transactionEntity.setNote("Nạp tiền " + String.valueOf(data.getAmount()));

            transactionRepository.save(transactionEntity);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean registerPackage(RegisterPackageDto data) {
        AccountEntity account = accountRepository.findById(data.getId_account()).orElse(null);
        PackageEntity packageEntity = packageRepository.findById(data.getId_package()).orElse(null);

        if (account != null && packageEntity != null) {
            PackageEntity oldPackage = account.getAPackage();

            if (oldPackage != null) {
                throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Đã có gói tài khoản.").build();
            }

            float balance = account.getBalance();
            float require_balance = packageEntity.getMinBalance();
            float nBalance = account.getBalance() - data.getAmount();

            if (balance >= require_balance && nBalance > 0) {
                account.setAPackage(packageEntity);
                // tru
                account.setBalance(account.getBalance() - data.getAmount());
                // + saving
                account.setBalance_saving(data.getAmount());
                account.setStart_package(new Date());
                accountRepository.save(account);

                // luong cho staff, +2%
                salaryService.createExtra(account.getStaff(), data.getAmount(), account);

                // insert transaction
                TransactionEntity transactionEntity = new TransactionEntity();
                transactionEntity.setAccount_out(account);
                transactionEntity.setAmount(data.getAmount());
                transactionEntity.setType(TransactionEntity.type.OUT);
                transactionEntity.setNote("Gửi tiết kiệm " + data.getAmount());

                transactionRepository.save(transactionEntity);
                return true;
            } else {
                throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Số dư không đủ.").build();
            }
        }

        return false;
    }

    @Override
    @Transactional
    public boolean rechargePackage(RechargePackageDto data) {
        AccountEntity account = accountRepository.findById(data.getAccount().getId()).orElse(null);

        if (account == null) {
            throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Không tìm thấy tài khoản.").build();
        }

        PackageEntity oldPackage = account.getAPackage();

        if (oldPackage == null) {
            throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Chưa có gói tài khoản.").build();
        }

        float balance = account.getBalance();
        float balance_saving = account.getBalance_saving();
        float require_balance = account.getAPackage().getMinBalance();

        if (balance_saving >= require_balance && balance - data.getAmount() > 0) {
            // tru
            account.setBalance(balance - data.getAmount());
            // + saving
            account.setBalance_saving(balance_saving + data.getAmount());
            accountRepository.save(account);

            // insert transaction
            TransactionEntity transactionEntity = new TransactionEntity();
            transactionEntity.setAccount_out(account);
            transactionEntity.setAmount(data.getAmount());
            transactionEntity.setType(TransactionEntity.type.OUT);
            transactionEntity.setNote("Nạp tiền tiết kiệm " + data.getAmount());

            transactionRepository.save(transactionEntity);
            return true;
        } else {
            throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Số dư không đủ.").build();
        }
    }

    @Override
    @Transactional
    public boolean pay(PayDto data) {
        String typePay = data.getType();
        AccountEntity accountOut = accountRepository.findById(data.getAccountOut().getId()).orElse(null);
        AccountEntity accountIn = accountRepository.findById(data.getAccountIn().getId()).orElse(null);

        if (accountOut != null && accountIn != null && data.getAmount() > 0) {
            if (Objects.equals(typePay, PayDto.typePay.saving)) {
                // chuyen tien trong tk gui tien
                float balance = accountOut.getBalance_saving();
                // check balance account out
                if (balance >= data.getAmount() &&
                        ((balance - data.getAmount()) > accountOut.getAPackage().getMinBalance())) {
                    accountIn.setBalance(accountIn.getBalance() + data.getAmount());
                    accountOut.setBalance_saving(balance - data.getAmount());

                } else {
                    throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Số dư không đủ.").build();
                }
            } else {
                // chuyen tien tk money
                float balance = accountOut.getBalance();
                if (balance >= data.getAmount()) {
                    accountIn.setBalance(accountIn.getBalance() + data.getAmount());
                    accountOut.setBalance(balance - data.getAmount());
                } else {
                    throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Số dư không đủ.").build();
                }
            }
            accountRepository.save(accountIn);
            accountRepository.save(accountOut);

            // insert transaction out
            TransactionEntity transactionOut = new TransactionEntity();
            transactionOut.setAccount_out(accountOut);
            transactionOut.setAccount_in(accountIn);
            transactionOut.setAmount(data.getAmount());
            transactionOut.setType(TransactionEntity.type.PAY);
            transactionOut.setNote("Chuyển tiền " + data.getAmount());

            transactionRepository.save(transactionOut);
            return true;
        } else {
            throw ApiResponse.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Tài khoản không hợp lệ.").build();
        }
    }

    @Override
    @Transactional
    public boolean withdrawSavingInterest(AccountEntity account) {
        AccountEntity a = accountRepository.findById(account.getId()).orElse(null);

        if(a == null){
            throw ApiResponse.builder().status(HttpStatus.NOT_FOUND).message("Không tìm thấy tài khoản.").build();
        }

        a.setBalance(a.getBalance() + a.getBalance_interest());
        a.setBalance_interest(0);
        accountRepository.save(a);

        // insert transaction out
        TransactionEntity transactionOut = new TransactionEntity();
        transactionOut.setAccount_in(a);
        transactionOut.setAmount(a.getBalance_interest());
        transactionOut.setType(TransactionEntity.type.IN);
        transactionOut.setNote("Rút tiền lãi tiết kiệm " + a.getBalance_interest());
        transactionRepository.save(transactionOut);

        return true;
    }

    @Override
    @Transactional
    public boolean cancelSaving(AccountEntity account) {
        AccountEntity a = accountRepository.findById(account.getId()).orElse(null);

        if(a == null){
            throw ApiResponse.builder().status(HttpStatus.NOT_FOUND).message("Không tìm thấy tài khoản.").build();
        }

        a.setBalance(a.getBalance() + a.getBalance_saving() + a.getBalance_interest());
        a.setBalance_interest(0);
        a.setBalance_saving(0);
        a.setAPackage(null);
        a.setStart_package(null);

        accountRepository.save(a);

        // insert transaction out
        TransactionEntity transactionOut = new TransactionEntity();
        transactionOut.setAccount_in(a);
        transactionOut.setAmount(a.getBalance_interest());
        transactionOut.setType(TransactionEntity.type.IN);
        transactionOut.setNote("Huỷ gói tiết kiệm và rút lãi " + a.getBalance_interest());
        transactionRepository.save(transactionOut);

        return true;
    }
}

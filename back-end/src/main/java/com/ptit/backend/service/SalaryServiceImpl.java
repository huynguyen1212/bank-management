package com.ptit.backend.service;

import com.ptit.backend.entity.AccountEntity;
import com.ptit.backend.entity.SalaryEntity;
import com.ptit.backend.entity.StaffEntity;
import com.ptit.backend.repository.SalaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalaryServiceImpl implements SalaryService{
    @Autowired
    SalaryRepository salaryRepository;

    @Override
    public SalaryEntity createFirstTime(StaffEntity s, AccountEntity a) {
        SalaryEntity salaryEntity = new SalaryEntity();
        salaryEntity.setAmount(500000);
        salaryEntity.setStaff(s);
        salaryEntity.setNote("Tạo Account mới.");
        salaryEntity.setAccount(a);

        SalaryEntity salary = salaryRepository.save(salaryEntity);
        if(salaryEntity != null){
            return salary;
        }
        return null;
    }

    @Override
    public SalaryEntity createExtra(StaffEntity s, float amount, AccountEntity a) {
        SalaryEntity salary = new SalaryEntity();
        salary.setAmount((float) (amount*0.02));
        salary.setStaff(s);
        salary.setNote("Khách hàng gửi tiền tiết kiệm lần đầu.");
        salary.setAccount(a);

        SalaryEntity salaryNew = salaryRepository.save(salary);
        if(salaryNew != null){
            return salary;
        }
        return null;
    }
}

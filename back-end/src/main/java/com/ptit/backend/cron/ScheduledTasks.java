package com.ptit.backend.cron;

import com.ptit.backend.entity.AccountEntity;
import com.ptit.backend.entity.PackageEntity;
import com.ptit.backend.repository.AccountRepository;
import com.ptit.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Component
public class ScheduledTasks {
    @Autowired
    AccountService accountService;

    @Autowired
    AccountRepository accountRepository;

    @Scheduled(cron = "0 0 0 ? * *")
    public void scheduleTaskWithCronExpression() {
        // get all account
        List<AccountEntity> accountEntityList = accountRepository.findAll();

        // loop list
        for (AccountEntity account: accountEntityList){
            // check account has package
            if(account.getAPackage() != null){
                PackageEntity packageEntity = account.getAPackage();
                Date today = new Date();
                Date start_package = account.getStart_package();
                int diffInDays = (int)( (today.getTime() - start_package.getTime())/ (1000 * 60 * 60 * 24) );
                if(diffInDays % 30 == 0 ){ // if time accept
                    float balance_interest = packageEntity.getApr() * account.getBalance_saving() / 100;
                    account.setBalance_interest(account.getBalance_interest() + balance_interest);
                    System.out.println("Tính lãi cho Account Code " + account.getCode() + ". Amount " + balance_interest);
                    accountRepository.save(account);
                }
            }
        }
    }
}

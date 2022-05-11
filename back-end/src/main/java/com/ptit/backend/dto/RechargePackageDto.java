package com.ptit.backend.dto;

import com.ptit.backend.entity.AccountEntity;
import lombok.Data;

@Data
public class RechargePackageDto {
    private AccountEntity account;
    private float amount;
}

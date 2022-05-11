package com.ptit.backend.dto;

import com.ptit.backend.entity.AccountEntity;
import lombok.Data;

@Data
public class RechargeDto {
    private float amount;
    private AccountEntity account;
}

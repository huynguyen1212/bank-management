package com.ptit.backend.dto;

import lombok.Data;

@Data
public class RegisterPackageDto {
    private Long id_account;
    private Long id_package;
    private float amount;
}

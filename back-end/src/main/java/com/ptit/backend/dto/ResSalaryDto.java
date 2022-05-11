package com.ptit.backend.dto;

import com.ptit.backend.entity.SalaryEntity;
import com.ptit.backend.entity.StaffEntity;
import lombok.Data;

import java.util.List;

@Data
public class ResSalaryDto {
    private List<SalaryEntity> list;
    private StaffEntity staff;
    private float salary;
}

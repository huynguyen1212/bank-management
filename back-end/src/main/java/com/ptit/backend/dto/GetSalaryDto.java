package com.ptit.backend.dto;

import com.ptit.backend.entity.StaffEntity;
import lombok.Data;

import java.util.Date;

@Data
public class GetSalaryDto {
    private StaffEntity staff;
    private Date start;
    private Date end;
}

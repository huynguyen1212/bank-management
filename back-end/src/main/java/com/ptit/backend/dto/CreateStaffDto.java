package com.ptit.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateStaffDto {
    private String address;
    private String birthday;
    private String card_id;
    private Integer exp_year;
    private String name;
    private String position;
    private String rate;

    // user
    private String username;
    private String password;
}

package com.ptit.backend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCustomerDto {
    private String address;
    private String birthday;
    private String card_id;
    private String name;
    //private Boolean status;

    // user
    private String username;
    private String password;
}

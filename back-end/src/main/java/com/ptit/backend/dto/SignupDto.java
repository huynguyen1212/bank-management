package com.ptit.backend.dto;

import com.ptit.backend.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignupDto {
    private String username;
    private String password1;
    private String password2;
    private String roles;
}

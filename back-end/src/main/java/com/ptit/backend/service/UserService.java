package com.ptit.backend.service;

import com.ptit.backend.entity.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    public UserEntity create(UserEntity user);
    public UserEntity update(UserEntity user);
    public UserEntity findUser(String username);

    public Object getProfile(UserEntity user);
}

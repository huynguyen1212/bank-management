package com.ptit.backend.service;

import com.ptit.backend.dto.MyUserDetails;
import com.ptit.backend.entity.UserEntity;
import com.ptit.backend.repository.AdminRepository;
import com.ptit.backend.repository.CustomerRepository;
import com.ptit.backend.repository.StaffRepository;
import com.ptit.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final StaffRepository staffRepository;
    private final CustomerRepository customerRepository;
    private final AdminRepository adminRepository;

    @Override
    public MyUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null)
            throw new UsernameNotFoundException("Không tìm thấy tài khoản : " + username);
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (user.getRole() != null){
            authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        }
        return new MyUserDetails(user.getUsername(), user.getPassword(), true, true,
                true, true , authorities, user);
    }

    @Override
    public UserEntity create(UserEntity user) {
        user = userRepository.save(user);
        user.setPassword(null);
        return user;
    }

    @Override
    public UserEntity update(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public UserEntity findUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Object getProfile(UserEntity user) {
        String role = user.getRole();
        if(role.equals(UserEntity.Roles.ADMIN)){
            return adminRepository.findAdminEntityByUser_Id(user.getId());
        }
        if(role.equals(UserEntity.Roles.CUSTOMER)){
            return customerRepository.findCustomerEntityByUser_Id(user.getId());
        }
        if(role.equals(UserEntity.Roles.STAFF)){
            return staffRepository.findStaffEntityByUser_Id(user.getId());
        }
        return null;
    }
}

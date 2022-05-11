package com.ptit.backend.controller;

import com.ptit.backend.dto.LoginDto;
import com.ptit.backend.dto.MyUserDetails;
import com.ptit.backend.dto.SignupDto;
import com.ptit.backend.entity.AdminEntity;
import com.ptit.backend.repository.AdminRepository;
import com.ptit.backend.utils.ResponseObject;
import com.ptit.backend.entity.UserEntity;
import com.ptit.backend.service.UserService;
import com.ptit.backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "/login")
    public ResponseObject login(@RequestBody LoginDto request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseObject.builder().message("Thông tin tài khoản không chính xác.").status(HttpStatus.OK).build();
        }

        MyUserDetails myUserDetails = (MyUserDetails) userService.loadUserByUsername(request.getUsername());
        String jwt = JwtUtils.generateToken(myUserDetails);

        return ResponseObject.builder().message("Đăng nhập thành công.").status(HttpStatus.OK).data(jwt).build();
    }

    @PostMapping(value = "/register")
    public ResponseObject signup(@RequestBody SignupDto signup) {
        // check mapping pass
        if (!signup.getPassword1().equals(signup.getPassword2())) {
            return ResponseObject.builder().message("Mật khẩu không khớp.").status(HttpStatus.NOT_IMPLEMENTED).build();
        }

        // check username exist
        UserEntity checkExist = userService.findUser(signup.getUsername());

        if (checkExist != null) {
            return ResponseObject.builder().message("Username đã tồn tại.").status(HttpStatus.CONFLICT).build();
        }

        // save on db
        UserEntity newUser = new UserEntity();
        newUser.setUsername(signup.getUsername());
        newUser.setPassword(bCryptPasswordEncoder.encode(signup.getPassword1()));
        newUser.setRole(signup.getRoles());

        UserEntity res = userService.create(newUser);

        // check roles type
        if(signup.getRoles().equals(UserEntity.Roles.ADMIN)){
            AdminEntity admin = new AdminEntity();
            admin.setUser(res);
            adminRepository.save(admin);
        }

        if (res.getId() != null) {
            return ResponseObject.builder().message("Đăng ký tài khoản Admin thành công.").status(HttpStatus.OK).build();
        }

        return ResponseObject.builder().message("Có lỗi xảy ra.").status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping(value = "/profile")
    public ResponseObject getProfile() {
        try {
            MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserEntity user = myUserDetails.getUser();
            return ResponseObject.builder().status(HttpStatus.OK).message("Thành công.").data(userService.getProfile(user)).build();

        } catch (Exception exception) {

        }
        return ResponseObject.builder().status(HttpStatus.BAD_REQUEST).message("Thất bại.").build();
    }
}

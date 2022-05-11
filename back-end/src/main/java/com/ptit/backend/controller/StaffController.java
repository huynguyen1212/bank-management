package com.ptit.backend.controller;

import com.ptit.backend.dto.CreateStaffDto;
import com.ptit.backend.dto.MyUserDetails;
import com.ptit.backend.dto.ResSalaryDto;
import com.ptit.backend.entity.AdminEntity;
import com.ptit.backend.entity.CustomerEntity;
import com.ptit.backend.entity.StaffEntity;
import com.ptit.backend.entity.UserEntity;
import com.ptit.backend.repository.StaffRepository;
import com.ptit.backend.service.StaffService;
import com.ptit.backend.service.UserService;
import com.ptit.backend.utils.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    StaffService staffService;

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    UserService userService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "")
    public ResponseObject createStaff(@RequestBody CreateStaffDto createStaffDto){
        // validate
        UserEntity oldStaff = userService.findUser(createStaffDto.getUsername());
        if(oldStaff != null){
            return ResponseObject.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Username đã được sử sụng.").build();
        }

        // check who create
        MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        StaffEntity staffEntity = new StaffEntity();
        staffEntity.setAddress(createStaffDto.getAddress());
        staffEntity.setStatus(true);
        staffEntity.setBirthday(createStaffDto.getBirthday());
        staffEntity.setCard_id(createStaffDto.getCard_id());
        staffEntity.setName(createStaffDto.getName());
        staffEntity.setExpYear(createStaffDto.getExp_year());
        staffEntity.setRate(createStaffDto.getRate());
        staffEntity.setPosition(createStaffDto.getPosition());

        // check admin
        AdminEntity adminEntity = (AdminEntity) userService.getProfile(myUserDetails.getUser());

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(createStaffDto.getUsername());
        userEntity.setPassword(bCryptPasswordEncoder.encode(createStaffDto.getPassword()));
        userEntity.setRole(UserEntity.Roles.STAFF);

        staffEntity.setAdmin(adminEntity);
        staffEntity.setUser(userEntity);
        StaffEntity newStaff = staffService.create(staffEntity);

        if(newStaff != null){
            return ResponseObject.builder().status(HttpStatus.CREATED).message("Tạo nhân viên thành công.").data(newStaff).build();
        }
        return ResponseObject.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Tạo nhân viên thất bại.").build();
    }

    @PutMapping(value = "")
    public ResponseObject updateStaff(@RequestBody StaffEntity staffEntity){
        StaffEntity s = staffService.findById(staffEntity.getId());
        // can update only field below
        s.setPosition(staffEntity.getPosition());
        s.setName(staffEntity.getName());
        s.setRate(staffEntity.getRate());
        s.setBirthday(staffEntity.getBirthday());
        s.setStatus(staffEntity.getStatus());
        s.setAddress(staffEntity.getAddress());
        s.setCard_id(staffEntity.getCard_id());
        s.setExpYear(staffEntity.getExpYear());

        StaffEntity staff = staffService.update(s);
        return ResponseObject.builder().status(HttpStatus.OK).message("Cập nhật thông tin thành công.").data(staff).build();
    }

    @GetMapping(value = "")
    public ResponseObject getDetail(@RequestParam Long id){
        StaffEntity staff = staffService.findById(id);
        return ResponseObject.builder().status(HttpStatus.OK).message("Lấy thông tin Staff thành công.").data(staff).build();
    }

    @GetMapping(value = "/list")
    public ResponseObject getList(@RequestParam(required = false) String name, Pageable pageable){
        Page<StaffEntity> staff = null;
        if(name != null){
             staff = staffRepository.findStaffEntityByNameContaining(name, pageable);
        }
        else{
            staff = staffRepository.findAll(pageable);
        }
        return ResponseObject.builder().status(HttpStatus.OK).message("Lấy danh sách Staff thành công.").data(staff).build();
    }

    @GetMapping(value = "/customer")
    public ResponseObject getListCustomer(Long staffId, Pageable pageable){
        Page<CustomerEntity> c = staffService.findCustomerCreated(staffId, pageable);
        return ResponseObject.builder().status(HttpStatus.OK).message("Lấy danh sách Customer tạo bởi Staff thành công.").data(c).build();
    }

    @GetMapping(value = "/salary")
    public ResponseObject getSalary(@RequestParam Long staffId,
                                    @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date start,
                                    @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date end){
        ResSalaryDto c = staffService.findSalary(staffId, start, end);
        return ResponseObject.builder().status(HttpStatus.OK).message("Danh sách lương thành công").data(c).build();
    }

}

package com.ptit.backend.controller;

import com.ptit.backend.dto.CreateCustomerDto;
import com.ptit.backend.dto.MyUserDetails;
import com.ptit.backend.entity.AccountEntity;
import com.ptit.backend.entity.CustomerEntity;
import com.ptit.backend.service.AccountService;
import com.ptit.backend.utils.ResponseObject;
import com.ptit.backend.entity.StaffEntity;
import com.ptit.backend.entity.UserEntity;
import com.ptit.backend.repository.StaffRepository;
import com.ptit.backend.service.CustomerService;
import com.ptit.backend.service.StaffService;
import com.ptit.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    StaffRepository staffRepository;

    @Autowired
    UserService userService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    StaffService staffService;

    @Autowired
    AccountService accountService;

    @PostMapping(value = "")
    public ResponseObject createCustomer(@RequestBody CreateCustomerDto createCustomerDto){

        // validate
        UserEntity oldStaff = userService.findUser(createCustomerDto.getUsername());
        if(oldStaff != null){
            return ResponseObject.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Username đã được sử sụng.").build();
        }

        // check who create
        MyUserDetails myUserDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        CustomerEntity customerEntity = new CustomerEntity();
        customerEntity.setAddress(createCustomerDto.getAddress());
        customerEntity.setBirthday(createCustomerDto.getBirthday());
        customerEntity.setCard_id(createCustomerDto.getCard_id());
        customerEntity.setName(createCustomerDto.getName());
        customerEntity.setStatus(true);

        UserEntity user = myUserDetails.getUser();
        UserEntity userEntityStaff = userService.findUser(user.getUsername());

        if(userEntityStaff != null){
            StaffEntity staffEntity = staffService.findByUsername(userEntityStaff.getUsername());
            customerEntity.setStaff(staffEntity);
            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(createCustomerDto.getUsername());
            userEntity.setPassword(bCryptPasswordEncoder.encode(createCustomerDto.getPassword()));
            userEntity.setRole(UserEntity.Roles.CUSTOMER);

            customerEntity.setUser(userEntity);
            CustomerEntity newCustomer = customerService.createCustomer(customerEntity);
            if(newCustomer != null){
                return ResponseObject.builder().status(HttpStatus.CREATED).message("Tạo Khách hàng thành công.").data(newCustomer).build();
            }
        }

        return ResponseObject.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Tạo Khách hàng thất bại.").build();


    }
    @GetMapping(value = "/list")
    public ResponseObject getCustomerList(Pageable pageable){
        Page<CustomerEntity> list = customerService.getCustomerList(pageable);
        return ResponseObject.builder().status(HttpStatus.OK).message("Lấy danh sách khách hàng thành công").data(list).build();
    }

    @PutMapping()
    public ResponseObject updateCustomer(@RequestBody CustomerEntity customer) {
        // user can update only field below
        CustomerEntity c = customerService.getCustomerById(customer.getId());
        c.setAddress(customer.getAddress());
        c.setBirthday(customer.getBirthday());
        c.setName(customer.getName());
        c.setCard_id(customer.getCard_id());
        c.setStatus(customer.getStatus());

        return ResponseObject.builder().status(HttpStatus.OK).message("Cập nhật thông tin thành công.").data(customerService.updateCustomer(c)).build();
    }

    @GetMapping(params = "id")
    public ResponseObject getCustomer(@RequestParam Long id) {
        return ResponseObject.builder().status(HttpStatus.OK).message("Lấy thông tin Khách hàng thành công.").data(customerService.getCustomerById(id)).build();
    }

    @GetMapping(value = "/account")
    public ResponseObject getCustomerAccount(@RequestParam Long customerId, Pageable pageable) {
        Page<AccountEntity> a = accountService.getCustomerAccount(customerId, pageable);

        return ResponseObject.builder().status(HttpStatus.OK).message("Danh sách Account của Customer thành công.").data(a).build();
    }

}

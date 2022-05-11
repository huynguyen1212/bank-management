package com.ptit.backend.controller;

import com.ptit.backend.entity.PackageEntity;
import com.ptit.backend.utils.ResponseObject;
import com.ptit.backend.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/package")
public class PackageController {
    @Autowired
    PackageService packageService;

    @PostMapping(name = "")
    public ResponseObject create(@RequestBody PackageEntity packageEntity){
        if(packageEntity.getType().equals(PackageEntity.typePackage.payment) ||
                packageEntity.getType().equals(PackageEntity.typePackage.saving)){

            PackageEntity a = packageService.create(packageEntity);
            if(a != null){
                return ResponseObject.builder().status(HttpStatus.OK).message("Tạo thành công.").data(a).build();
            }
        }
        return ResponseObject.builder().status(HttpStatus.NOT_IMPLEMENTED).message("Loại tài khoản k đúng.").build();
    }

    @GetMapping(name = "")
    public ResponseObject get(){
        List<PackageEntity> list = packageService.findAll();
        return ResponseObject.builder().status(HttpStatus.OK).message("").data(list).build();
    }

    @PutMapping(value = "")
    public ResponseObject update(@RequestBody PackageEntity packageEntity){
        PackageEntity p = packageService.findById(packageEntity.getId());
        // can update only field below
        p.setName(packageEntity.getName());
        p.setApr(packageEntity.getApr());

        return ResponseObject.builder().status(HttpStatus.OK).message("Cập nhật gói thành công.").data(packageService.update(p)).build();
    }

    @DeleteMapping(value = "")
    public ResponseObject delete(@RequestBody PackageEntity packageEntity){
        return ResponseObject.builder().status(HttpStatus.OK).message("Xoá thành công.").data(packageService.delete(packageEntity.getId())).build();
    }

}

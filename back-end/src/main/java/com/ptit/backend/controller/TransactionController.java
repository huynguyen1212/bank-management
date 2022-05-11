package com.ptit.backend.controller;

import com.ptit.backend.entity.TransactionEntity;
import com.ptit.backend.service.TransactionService;
import com.ptit.backend.utils.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping(value = "")
    public ResponseObject getAll(Pageable pageable){
        Page<TransactionEntity> t = transactionService.findAll(pageable);
        return ResponseObject.builder().status(HttpStatus.OK).data(t).message("Lấy danh sách thành công.").build();
    }

    @GetMapping(value = "/account")
    public ResponseObject getByAccount(Long accountId, Pageable pageable){
        Page<TransactionEntity> t = transactionService.findByAccount(accountId, pageable);
        return ResponseObject.builder().status(HttpStatus.OK).data(t).message("Lấy danh sách thành công.").build();
    }

}

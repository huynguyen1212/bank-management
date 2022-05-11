package com.ptit.backend.dto;

import com.ptit.backend.entity.AccountEntity;
import lombok.Data;

@Data
public class PayDto {

    public final class typePay {
        public static final String money = "MONEY";
        public static final String saving = "SAVING";
    };

    private AccountEntity accountOut;
    private AccountEntity accountIn;
    private float amount;
    private String type;
}

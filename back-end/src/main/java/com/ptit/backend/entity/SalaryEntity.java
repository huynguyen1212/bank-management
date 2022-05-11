package com.ptit.backend.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "salaries")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SalaryEntity extends BaseEntity{

    @Column(name = "amount")
    private float amount;

    @Column(name = "note")
    private String note;

    @OneToOne
    @JoinColumn(name = "id_account")
    private AccountEntity account;

    @ManyToOne
    @JoinColumn(name = "id_staff")
    private StaffEntity staff;
}

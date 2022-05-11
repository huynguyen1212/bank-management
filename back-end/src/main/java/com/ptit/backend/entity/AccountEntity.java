package com.ptit.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "accounts")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountEntity extends BaseEntity{

    @Column(name = "code")
    private String code; // auto gen

    @Column(name="balance")
    private float balance;

    @Column(name="balance_saving")
    private float balance_saving; // tien gui

    @Column(name="balance_interest")
    private float balance_interest; // lai hang thang

    @Column(name = "status") // when lock cannot: saving, transfer,.....
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "id_staff")
    private StaffEntity staff;

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private CustomerEntity customer;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_package", referencedColumnName = "id")
    private PackageEntity aPackage;

    @Column(name = "start_package")
    private Date start_package;
}

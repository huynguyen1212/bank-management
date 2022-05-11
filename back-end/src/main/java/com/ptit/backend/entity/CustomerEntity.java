package com.ptit.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "customers")
@NoArgsConstructor
@Data
public class CustomerEntity extends BaseEntity{
    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "card_id")
    private String card_id;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "status")
    private Boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user")
    private UserEntity user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_staff")
    private StaffEntity staff;
}

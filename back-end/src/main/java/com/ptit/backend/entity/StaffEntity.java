package com.ptit.backend.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "staffs")
@NoArgsConstructor
@Getter
@Setter
public class StaffEntity extends BaseEntity{
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_admin")
    private AdminEntity admin;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user")
    private UserEntity user;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "card_id")
    private String card_id;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "rate")
    private String rate;

    @Column(name = "exp_years")
    private int expYear;

    @Column(name = "position")
    private String position;

    @Column(name = "status")
    private Boolean status;
}

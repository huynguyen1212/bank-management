package com.ptit.backend.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "admins")
@NoArgsConstructor
@Getter
@Setter
public class AdminEntity extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "card_id")
    private String card_id;

    @Column(name = "birthday")
    private String birthday;

    @OneToOne
    @JoinColumn(name = "id_user")
    private UserEntity user;
}

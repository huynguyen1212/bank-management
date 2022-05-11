package com.ptit.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jdk.nashorn.internal.ir.annotations.Ignore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserEntity extends BaseEntity{

    public final class Roles {
        public static final String ADMIN = "ADMIN";
        public static final String STAFF = "STAFF";
        public static final String CUSTOMER = "CUSTOMER";

    };

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "role")
    private String role;
}

package com.ptit.backend.repository;

import com.ptit.backend.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminEntity, Long> {
    public AdminEntity findAdminEntityByUser_Id(Long id);
}

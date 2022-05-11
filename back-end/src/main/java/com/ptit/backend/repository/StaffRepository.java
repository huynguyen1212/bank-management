package com.ptit.backend.repository;

import com.ptit.backend.entity.StaffEntity;
import com.ptit.backend.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<StaffEntity, Long> {
    public StaffEntity findByUser(UserEntity u);
    public StaffEntity findStaffEntityByUser_Id(Long id);
    public Page<StaffEntity> findStaffEntityByNameContaining(String name, Pageable pageable);
}

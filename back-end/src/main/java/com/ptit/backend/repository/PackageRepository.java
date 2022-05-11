package com.ptit.backend.repository;

import com.ptit.backend.entity.PackageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<PackageEntity, Long> {
}

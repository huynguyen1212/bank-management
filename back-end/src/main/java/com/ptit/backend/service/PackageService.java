package com.ptit.backend.service;

import com.ptit.backend.entity.PackageEntity;

import java.util.List;

public interface PackageService {
    public List<PackageEntity> findAll();

    public PackageEntity findById(Long id);

    public PackageEntity create(PackageEntity packageEntity);

    public PackageEntity update(PackageEntity packageEntity);

    public boolean delete(Long id);
}

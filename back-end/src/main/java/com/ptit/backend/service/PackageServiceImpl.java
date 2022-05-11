package com.ptit.backend.service;

import com.ptit.backend.entity.PackageEntity;
import com.ptit.backend.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {
    @Autowired
    PackageRepository packageRepository;

    @Override
    public List<PackageEntity> findAll() {
        return packageRepository.findAll();
    }

    @Override
    public PackageEntity findById(Long id) {
        return packageRepository.findById(id).orElse(null);
    }

    @Override
    public PackageEntity create(PackageEntity packageEntity) {
        return packageRepository.save(packageEntity);
    }

    @Override
    public PackageEntity update(PackageEntity packageEntity) {
        PackageEntity a = packageRepository.getById(packageEntity.getId());
        if(a != null){
            packageRepository.save(packageEntity);
        }
        return null;
    }

    @Override
    public boolean delete(Long id) {
        PackageEntity a = packageRepository.getById(id);
        if(a != null){
            packageRepository.delete(a);
            return true;
        }
        return false;
    }
}

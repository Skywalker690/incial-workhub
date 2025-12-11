package com.incial.crm.repository;

import com.incial.crm.entity.CrmEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrmEntryRepository extends JpaRepository<CrmEntry, Long> {
}

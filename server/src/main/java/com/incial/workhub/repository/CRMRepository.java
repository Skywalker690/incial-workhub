package com.incial.workhub.repository;

import com.incial.workhub.model.CRM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CRMRepository extends JpaRepository<CRM, Long> {

    // -------------------------------
    // BASIC FILTERING
    // -------------------------------
    List<CRM> findByStatus(String status);

    List<CRM> findByAssignedTo(String assignedTo);

    // Multi-select fields (ElementCollection)
    List<CRM> findByTagsContaining(String tag);

    List<CRM> findByLeadSourcesContaining(String source);

    // -------------------------------
    // DEAL VALUE FILTER
    // -------------------------------
    List<CRM> findByDealValueGreaterThanEqual(BigDecimal minValue);

    // -------------------------------
    // FOLLOW-UP DATE FILTERS
    // -------------------------------
    List<CRM> findByNextFollowUpAfterOrderByNextFollowUpAsc(LocalDate date);

    List<CRM> findByNextFollowUp(LocalDate date);
}

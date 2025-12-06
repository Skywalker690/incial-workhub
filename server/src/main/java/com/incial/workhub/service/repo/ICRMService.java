package com.incial.workhub.service.repo;

import com.incial.workhub.dto.Response;
import com.incial.workhub.model.CRM;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface ICRMService {
    Response createCRM(CRM crm);

    Response getAllCRMs();
    Response getCRM(Long id);

    Response updateCRM(Long id, CRM crm);
    Response deleteCRM(Long id);

    Response getByStatus(String status);
    Response getByAssignedTo(String assignedTo);
    Response getByTag(String tag);
    Response getByLeadSource(String source);

    Response getHighValueDeals(BigDecimal minValue);

    Response getUpcomingFollowUps();
    Response getFollowUpsOnDate(LocalDate date);
}

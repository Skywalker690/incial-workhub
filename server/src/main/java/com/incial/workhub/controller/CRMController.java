package com.incial.workhub.controller;

import com.incial.workhub.dto.Response;
import com.incial.workhub.model.CRM;
import com.incial.workhub.service.repo.ICRMService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/crm")
@RequiredArgsConstructor
public class CRMController {

    private final ICRMService crmService;

    // ----------------------------
    // CREATE
    // ----------------------------
    @PostMapping
    public Response createCRM(@RequestBody CRM request) {
        return crmService.createCRM(request);
    }

    // ----------------------------
    // FETCH ALL
    // ----------------------------
    @GetMapping
    public Response getAllCRMs() {
        return crmService.getAllCRMs();
    }

    // ----------------------------
    // FETCH SINGLE
    // ----------------------------
    @GetMapping("/{id}")
    public Response getCRM(@PathVariable Long id) {
        return crmService.getCRM(id);
    }

    // ----------------------------
    // UPDATE
    // ----------------------------
    @PutMapping("/{id}")
    public Response updateCRM(@PathVariable Long id, @RequestBody CRM request) {
        return crmService.updateCRM(id, request);
    }

    // ----------------------------
    // DELETE
    // ----------------------------
    @DeleteMapping("/{id}")
    public Response deleteCRM(@PathVariable Long id) {
        return crmService.deleteCRM(id);
    }

    // -----------------------------------------------------
    // FILTER: STATUS (Notion "By Status" View)
    // -----------------------------------------------------
    @GetMapping("/status/{status}")
    public Response getByStatus(@PathVariable String status) {
        return crmService.getByStatus(status);
    }

    // -----------------------------------------------------
    // FILTER: ASSIGNED TO
    // -----------------------------------------------------
    @GetMapping("/assigned/{user}")
    public Response getByAssigned(@PathVariable String user) {
        return crmService.getByAssignedTo(user);
    }

    // -----------------------------------------------------
    // FILTER: TAGS
    // -----------------------------------------------------
    @GetMapping("/tag/{tag}")
    public Response getByTag(@PathVariable String tag) {
        return crmService.getByTag(tag);
    }

    // -----------------------------------------------------
    // FILTER: LEAD SOURCE
    // -----------------------------------------------------
    @GetMapping("/lead-source/{source}")
    public Response getByLeadSource(@PathVariable String source) {
        return crmService.getByLeadSource(source);
    }

    // -----------------------------------------------------
    // HIGH VALUE DEALS
    // -----------------------------------------------------
    @GetMapping("/high-value")
    public Response getHighValueDeals(@RequestParam BigDecimal minValue) {
        return crmService.getHighValueDeals(minValue);
    }

    // -----------------------------------------------------
    // FOLLOW-UP CALENDAR (Next Follow-up > today)
    // -----------------------------------------------------
    @GetMapping("/followups/upcoming")
    public Response getUpcomingFollowUps() {
        return crmService.getUpcomingFollowUps();
    }

    // -----------------------------------------------------
    // FOLLOW-UP ON SPECIFIC DATE
    // -----------------------------------------------------
    @GetMapping("/followups/on")
    public Response getFollowUpsOnDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        return crmService.getFollowUpsOnDate(date);
    }

}

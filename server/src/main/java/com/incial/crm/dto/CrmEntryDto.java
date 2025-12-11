package com.incial.crm.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrmEntryDto {
    private Long id;
    private String company;
    private String phone;
    private String email;
    private String contactName;
    private String address;
    private String companyImageUrl;
    private String assignedTo;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastContact;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate nextFollowUp;
    
    private String referenceId;
    private BigDecimal dealValue;
    private String notes;
    private String status;
    private List<String> tags;
    private List<String> work;
    private List<String> leadSources;
    private String driveLink;
    private Map<String, String> socials;
    private String lastUpdatedBy;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private LocalDateTime lastUpdatedAt;
}

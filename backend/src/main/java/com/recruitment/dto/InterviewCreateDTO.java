package com.recruitment.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewCreateDTO {
    private Long candidateId;
    private Long jobId;
    private LocalDateTime interviewTime;
    private String interviewer;
    private String interviewMethod;
    private String locationOrLink;
    private String notes;
}

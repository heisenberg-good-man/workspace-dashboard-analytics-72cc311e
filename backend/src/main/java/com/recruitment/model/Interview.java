package com.recruitment.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Interview {
    private Long id;
    private Long candidateId;
    private String candidateName;
    private Long jobId;
    private String jobTitle;
    private LocalDateTime interviewTime;
    private String interviewer;
    private InterviewMethod interviewMethod;
    private String locationOrLink;
    private String notes;

    public enum InterviewMethod {
        ONSITE, ONLINE, PHONE
    }
}

package com.recruitment.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateQueryDTO {
    private String jobId;
    private String resumeStatus;
    private String keyword;
    private Integer page = 1;
    private Integer pageSize = 10;
}

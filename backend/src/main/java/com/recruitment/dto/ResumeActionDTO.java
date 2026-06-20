package com.recruitment.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeActionDTO {
    private Long candidateId;
    private String action;
    private String remark;
}

package com.recruitment.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Job {
    private Long id;
    private String title;
    private String department;
    private String location;
    private Integer headcount;
    private JobStatus status;
    private String owner;
    private Integer receivedResumes;

    public enum JobStatus {
        OPEN, PAUSED, CLOSED
    }
}

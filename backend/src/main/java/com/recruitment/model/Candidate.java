package com.recruitment.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Candidate {
    private Long id;
    private String name;
    private String gender;
    private Integer age;
    private String phone;
    private String email;
    private String education;
    private String workExperience;
    private String appliedJobId;
    private String appliedJobTitle;
    private ResumeStatus resumeStatus;
    private Integer rating;
    private String resumeUrl;
    private LocalDate applyDate;
    private List<FollowRecord> followRecords = new ArrayList<>();

    public enum ResumeStatus {
        PENDING, PASSED, REJECTED, INTERVIEW_SCHEDULED, INTERVIEWED, OFFERED, HIRED
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FollowRecord {
        private LocalDate date;
        private String operator;
        private String content;
    }
}

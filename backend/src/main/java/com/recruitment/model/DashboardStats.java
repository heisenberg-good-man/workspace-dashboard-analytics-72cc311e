package com.recruitment.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Map;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStats {
    private Long openJobs;
    private Long pendingResumes;
    private Long scheduledInterviews;
    private Long newCandidatesThisWeek;
    private Long totalCandidates;
    private Map<String, Long> resumeStatusDistribution;
    private List<JobResumeCount> jobResumeCounts;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class JobResumeCount {
        private Long jobId;
        private String jobTitle;
        private Long count;
    }
}

package com.recruitment.service;

import com.recruitment.model.Candidate;
import com.recruitment.model.DashboardStats;
import com.recruitment.model.Job;
import com.recruitment.storage.InMemoryStorage;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final InMemoryStorage storage;

    public DashboardService(InMemoryStorage storage) {
        this.storage = storage;
    }

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();

        long openJobs = storage.jobs.values().stream()
                .filter(j -> j.getStatus() == Job.JobStatus.OPEN)
                .count();
        stats.setOpenJobs(openJobs);

        long pendingResumes = storage.candidates.values().stream()
                .filter(c -> c.getResumeStatus() == Candidate.ResumeStatus.PENDING)
                .count();
        stats.setPendingResumes(pendingResumes);

        long scheduledInterviews = storage.interviewList.stream()
                .filter(i -> i.getInterviewTime() != null)
                .count();
        stats.setScheduledInterviews(scheduledInterviews);

        LocalDate monday = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        long newThisWeek = storage.candidates.values().stream()
                .filter(c -> c.getApplyDate() != null && !c.getApplyDate().isBefore(monday))
                .count();
        stats.setNewCandidatesThisWeek(newThisWeek);

        stats.setTotalCandidates((long) storage.candidates.size());

        Map<String, Long> distribution = new LinkedHashMap<>();
        for (Candidate.ResumeStatus s : Candidate.ResumeStatus.values()) {
            String key = s.name();
            long count = storage.candidates.values().stream()
                    .filter(c -> c.getResumeStatus() == s)
                    .count();
            distribution.put(key, count);
        }
        stats.setResumeStatusDistribution(distribution);

        List<DashboardStats.JobResumeCount> jobResumeCounts = storage.jobs.values().stream()
                .map(job -> {
                    long cnt = storage.candidates.values().stream()
                            .filter(c -> job.getId().toString().equals(c.getAppliedJobId()))
                            .count();
                    DashboardStats.JobResumeCount item = new DashboardStats.JobResumeCount();
                    item.setJobId(job.getId());
                    item.setJobTitle(job.getTitle());
                    item.setCount(cnt);
                    return item;
                })
                .sorted((a, b) -> Long.compare(b.getCount(), a.getCount()))
                .collect(Collectors.toList());
        stats.setJobResumeCounts(jobResumeCounts);

        return stats;
    }
}

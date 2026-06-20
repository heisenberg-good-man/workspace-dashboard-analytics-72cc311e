package com.recruitment.service;

import com.recruitment.model.Job;
import com.recruitment.storage.InMemoryStorage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final InMemoryStorage storage;

    public JobService(InMemoryStorage storage) {
        this.storage = storage;
    }

    public List<Job> listJobs() {
        return storage.jobs.values().stream()
                .sorted(Comparator.comparing(Job::getId).reversed())
                .collect(Collectors.toList());
    }

    public Job getJob(Long id) {
        return storage.jobs.get(id);
    }

    public Job toggleJobStatus(Long id) {
        Job job = storage.jobs.get(id);
        if (job == null) {
            return null;
        }
        if (job.getStatus() == Job.JobStatus.OPEN) {
            job.setStatus(Job.JobStatus.PAUSED);
        } else if (job.getStatus() == Job.JobStatus.PAUSED) {
            job.setStatus(Job.JobStatus.OPEN);
        }
        return job;
    }

    public List<Job> listOpenJobs() {
        return storage.jobs.values().stream()
                .filter(j -> j.getStatus() == Job.JobStatus.OPEN)
                .sorted(Comparator.comparing(Job::getId))
                .collect(Collectors.toList());
    }
}

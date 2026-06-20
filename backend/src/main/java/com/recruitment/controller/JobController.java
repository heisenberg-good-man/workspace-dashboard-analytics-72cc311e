package com.recruitment.controller;

import com.recruitment.common.Result;
import com.recruitment.model.Job;
import com.recruitment.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public Result<List<Job>> listJobs() {
        return Result.success(jobService.listJobs());
    }

    @GetMapping("/{id}")
    public Result<Job> getJob(@PathVariable Long id) {
        Job job = jobService.getJob(id);
        if (job == null) {
            return Result.error(404, "职位不存在");
        }
        return Result.success(job);
    }

    @PostMapping("/{id}/toggle-status")
    public Result<Job> toggleJobStatus(@PathVariable Long id) {
        Job job = jobService.toggleJobStatus(id);
        if (job == null) {
            return Result.error(404, "职位不存在");
        }
        String statusText = job.getStatus() == Job.JobStatus.OPEN ? "已发布" : "已暂停";
        return Result.success("状态更新成功：" + statusText, job);
    }

    @GetMapping("/open")
    public Result<List<Job>> listOpenJobs() {
        return Result.success(jobService.listOpenJobs());
    }
}

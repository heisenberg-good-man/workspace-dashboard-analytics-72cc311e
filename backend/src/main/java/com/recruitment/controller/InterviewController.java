package com.recruitment.controller;

import com.recruitment.common.Result;
import com.recruitment.dto.InterviewCreateDTO;
import com.recruitment.model.Interview;
import com.recruitment.service.InterviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @GetMapping
    public Result<List<Interview>> listInterviews() {
        return Result.success(interviewService.listInterviews());
    }

    @GetMapping("/{id}")
    public Result<Interview> getInterview(@PathVariable Long id) {
        Interview interview = interviewService.getInterview(id);
        if (interview == null) {
            return Result.error(404, "面试安排不存在");
        }
        return Result.success(interview);
    }

    @PostMapping
    public Result<Interview> createInterview(@RequestBody InterviewCreateDTO dto) {
        if (dto.getCandidateId() == null) {
            return Result.error(400, "候选人ID不能为空");
        }
        if (dto.getJobId() == null) {
            return Result.error(400, "职位ID不能为空");
        }
        if (dto.getInterviewTime() == null) {
            return Result.error(400, "面试时间不能为空");
        }
        if (dto.getInterviewer() == null || dto.getInterviewer().trim().isEmpty()) {
            return Result.error(400, "面试官不能为空");
        }
        try {
            Interview interview = interviewService.createInterview(dto);
            return Result.success("面试安排已保存", interview);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return Result.error(400, e.getMessage());
        }
    }

    @GetMapping("/candidate/{candidateId}")
    public Result<List<Interview>> listByCandidate(@PathVariable Long candidateId) {
        return Result.success(interviewService.listInterviewsByCandidate(candidateId));
    }
}

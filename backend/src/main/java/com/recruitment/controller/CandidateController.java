package com.recruitment.controller;

import com.recruitment.common.Result;
import com.recruitment.dto.CandidateQueryDTO;
import com.recruitment.dto.PageResult;
import com.recruitment.dto.ResumeActionDTO;
import com.recruitment.model.Candidate;
import com.recruitment.service.CandidateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @PostMapping("/query")
    public Result<PageResult<Candidate>> queryCandidates(@RequestBody(required = false) CandidateQueryDTO dto) {
        if (dto == null) {
            dto = new CandidateQueryDTO();
        }
        return Result.success(candidateService.queryCandidates(dto));
    }

    @GetMapping
    public Result<List<Candidate>> listCandidates() {
        return Result.success(candidateService.listAllCandidates());
    }

    @GetMapping("/{id}")
    public Result<Candidate> getCandidate(@PathVariable Long id) {
        Candidate c = candidateService.getCandidate(id);
        if (c == null) {
            return Result.error(404, "候选人不存在");
        }
        return Result.success(c);
    }

    @PostMapping("/pass")
    public Result<Candidate> passScreening(@RequestBody ResumeActionDTO dto) {
        if (dto.getCandidateId() == null) {
            return Result.error(400, "候选人ID不能为空");
        }
        try {
            Candidate c = candidateService.passScreening(dto);
            if (c == null) {
                return Result.error(404, "候选人不存在");
            }
            return Result.success("已通过初筛", c);
        } catch (IllegalStateException e) {
            return Result.error(400, e.getMessage());
        }
    }

    @PostMapping("/reject")
    public Result<Candidate> rejectCandidate(@RequestBody ResumeActionDTO dto) {
        if (dto.getCandidateId() == null) {
            return Result.error(400, "候选人ID不能为空");
        }
        Candidate c = candidateService.rejectCandidate(dto);
        if (c == null) {
            return Result.error(404, "候选人不存在");
        }
        return Result.success("已标记不合适", c);
    }
}

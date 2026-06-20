package com.recruitment.service;

import com.recruitment.dto.CandidateQueryDTO;
import com.recruitment.dto.PageResult;
import com.recruitment.dto.ResumeActionDTO;
import com.recruitment.model.Candidate;
import com.recruitment.model.Job;
import com.recruitment.storage.InMemoryStorage;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    private final InMemoryStorage storage;

    public CandidateService(InMemoryStorage storage) {
        this.storage = storage;
    }

    public PageResult<Candidate> queryCandidates(CandidateQueryDTO dto) {
        List<Candidate> all = new ArrayList<>(storage.candidates.values());

        if (dto.getJobId() != null && !dto.getJobId().isEmpty()) {
            all = all.stream()
                    .filter(c -> dto.getJobId().equals(c.getAppliedJobId()))
                    .collect(Collectors.toList());
        }

        if (dto.getResumeStatus() != null && !dto.getResumeStatus().isEmpty()) {
            try {
                Candidate.ResumeStatus status = Candidate.ResumeStatus.valueOf(dto.getResumeStatus());
                all = all.stream()
                        .filter(c -> c.getResumeStatus() == status)
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException ignored) {
            }
        }

        if (dto.getKeyword() != null && !dto.getKeyword().isEmpty()) {
            String kw = dto.getKeyword().toLowerCase();
            all = all.stream()
                    .filter(c ->
                            (c.getName() != null && c.getName().toLowerCase().contains(kw)) ||
                            (c.getPhone() != null && c.getPhone().contains(kw)) ||
                            (c.getEmail() != null && c.getEmail().toLowerCase().contains(kw)) ||
                            (c.getAppliedJobTitle() != null && c.getAppliedJobTitle().toLowerCase().contains(kw)) ||
                            (c.getWorkExperience() != null && c.getWorkExperience().toLowerCase().contains(kw))
                    )
                    .collect(Collectors.toList());
        }

        all.sort(Comparator.comparing(Candidate::getId).reversed());

        long total = all.size();
        int page = dto.getPage() != null ? dto.getPage() : 1;
        int pageSize = dto.getPageSize() != null ? dto.getPageSize() : 10;
        int from = (page - 1) * pageSize;
        int to = Math.min(from + pageSize, all.size());

        PageResult<Candidate> result = new PageResult<>();
        result.setTotal(total);
        result.setPage(page);
        result.setPageSize(pageSize);
        result.setList(from < to ? all.subList(from, to) : List.of());
        return result;
    }

    public Candidate getCandidate(Long id) {
        return storage.candidates.get(id);
    }

    public Candidate passScreening(ResumeActionDTO dto) {
        Candidate c = storage.candidates.get(dto.getCandidateId());
        if (c == null) {
            return null;
        }
        if (c.getResumeStatus() != Candidate.ResumeStatus.PENDING) {
            throw new IllegalStateException("当前状态不允许通过初筛");
        }
        c.setResumeStatus(Candidate.ResumeStatus.PASSED);
        addFollowRecord(c, "系统", dto.getRemark() != null ? "通过初筛：" + dto.getRemark() : "通过初筛");
        return c;
    }

    public Candidate rejectCandidate(ResumeActionDTO dto) {
        Candidate c = storage.candidates.get(dto.getCandidateId());
        if (c == null) {
            return null;
        }
        if (c.getResumeStatus() == Candidate.ResumeStatus.REJECTED) {
            return c;
        }
        c.setResumeStatus(Candidate.ResumeStatus.REJECTED);
        addFollowRecord(c, "系统", dto.getRemark() != null ? "标记不合适：" + dto.getRemark() : "标记不合适");
        return c;
    }

    public Candidate markInterviewScheduled(Long candidateId, String interviewer) {
        Candidate c = storage.candidates.get(candidateId);
        if (c == null) {
            return null;
        }
        c.setResumeStatus(Candidate.ResumeStatus.INTERVIEW_SCHEDULED);
        addFollowRecord(c, interviewer != null ? interviewer : "系统", "安排面试");
        return c;
    }

    private void addFollowRecord(Candidate c, String operator, String content) {
        Candidate.FollowRecord record = new Candidate.FollowRecord();
        record.setDate(LocalDate.now());
        record.setOperator(operator);
        record.setContent(content);
        c.getFollowRecords().add(record);
    }

    public List<Candidate> listAllCandidates() {
        return storage.candidates.values().stream()
                .sorted(Comparator.comparing(Candidate::getId).reversed())
                .collect(Collectors.toList());
    }

    public Long countByJobId(Long jobId) {
        String jid = jobId.toString();
        return storage.candidates.values().stream()
                .filter(c -> jid.equals(c.getAppliedJobId()))
                .count();
    }
}

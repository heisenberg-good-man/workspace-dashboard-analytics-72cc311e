package com.recruitment.service;

import com.recruitment.dto.InterviewCreateDTO;
import com.recruitment.model.Candidate;
import com.recruitment.model.Interview;
import com.recruitment.model.Job;
import com.recruitment.storage.InMemoryStorage;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewService {

    private final InMemoryStorage storage;
    private final CandidateService candidateService;

    public InterviewService(InMemoryStorage storage, CandidateService candidateService) {
        this.storage = storage;
        this.candidateService = candidateService;
    }

    public Interview createInterview(InterviewCreateDTO dto) {
        Candidate c = storage.candidates.get(dto.getCandidateId());
        if (c == null) {
            throw new IllegalArgumentException("候选人不存在");
        }
        if (c.getResumeStatus() != Candidate.ResumeStatus.PASSED &&
                c.getResumeStatus() != Candidate.ResumeStatus.PENDING) {
            if (c.getResumeStatus() == Candidate.ResumeStatus.INTERVIEW_SCHEDULED ||
                    c.getResumeStatus() == Candidate.ResumeStatus.INTERVIEWED ||
                    c.getResumeStatus() == Candidate.ResumeStatus.OFFERED ||
                    c.getResumeStatus() == Candidate.ResumeStatus.HIRED) {
                throw new IllegalStateException("当前状态不允许安排面试");
            }
        }

        Job j = storage.jobs.get(dto.getJobId());
        String jobTitle = j != null ? j.getTitle() : "";

        Interview interview = new Interview();
        long id = storage.interviewIdSeq.incrementAndGet();
        interview.setId(id);
        interview.setCandidateId(dto.getCandidateId());
        interview.setCandidateName(c.getName());
        interview.setJobId(dto.getJobId());
        interview.setJobTitle(jobTitle);
        interview.setInterviewTime(dto.getInterviewTime());
        interview.setInterviewer(dto.getInterviewer());
        interview.setStatus(Interview.InterviewStatus.SCHEDULED);

        if (dto.getInterviewMethod() != null) {
            try {
                interview.setInterviewMethod(Interview.InterviewMethod.valueOf(dto.getInterviewMethod()));
            } catch (IllegalArgumentException ignored) {
                interview.setInterviewMethod(Interview.InterviewMethod.ONLINE);
            }
        } else {
            interview.setInterviewMethod(Interview.InterviewMethod.ONLINE);
        }

        interview.setLocationOrLink(dto.getLocationOrLink());
        interview.setNotes(dto.getNotes());

        storage.interviews.put(id, interview);
        storage.interviewList.add(interview);

        candidateService.markInterviewScheduled(dto.getCandidateId(), dto.getInterviewer());
        return interview;
    }

    public Interview completeInterview(Long id) {
        Interview interview = storage.interviews.get(id);
        if (interview == null) {
            return null;
        }
        if (interview.getStatus() != Interview.InterviewStatus.SCHEDULED) {
            throw new IllegalStateException("当前状态不允许完成面试");
        }
        interview.setStatus(Interview.InterviewStatus.COMPLETED);

        Candidate c = storage.candidates.get(interview.getCandidateId());
        if (c != null && c.getResumeStatus() == Candidate.ResumeStatus.INTERVIEW_SCHEDULED) {
            c.setResumeStatus(Candidate.ResumeStatus.INTERVIEWED);
            Candidate.FollowRecord record = new Candidate.FollowRecord();
            record.setDate(java.time.LocalDate.now());
            record.setOperator(interview.getInterviewer() != null ? interview.getInterviewer() : "系统");
            record.setContent("已完成面试");
            c.getFollowRecords().add(record);
        }

        return interview;
    }

    public Interview cancelInterview(Long id) {
        Interview interview = storage.interviews.get(id);
        if (interview == null) {
            return null;
        }
        if (interview.getStatus() != Interview.InterviewStatus.SCHEDULED) {
            throw new IllegalStateException("当前状态不允许取消面试");
        }
        interview.setStatus(Interview.InterviewStatus.CANCELLED);

        Candidate c = storage.candidates.get(interview.getCandidateId());
        if (c != null && c.getResumeStatus() == Candidate.ResumeStatus.INTERVIEW_SCHEDULED) {
            c.setResumeStatus(Candidate.ResumeStatus.PASSED);
            Candidate.FollowRecord record = new Candidate.FollowRecord();
            record.setDate(java.time.LocalDate.now());
            record.setOperator("系统");
            record.setContent("面试已取消，状态回退至初筛通过");
            c.getFollowRecords().add(record);
        }

        return interview;
    }

    public List<Interview> listInterviews() {
        return storage.interviewList.stream()
                .sorted(Comparator.comparing(Interview::getInterviewTime,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }

    public Interview getInterview(Long id) {
        return storage.interviews.get(id);
    }

    public List<Interview> listInterviewsByCandidate(Long candidateId) {
        return storage.interviewList.stream()
                .filter(i -> candidateId.equals(i.getCandidateId()))
                .sorted(Comparator.comparing(Interview::getInterviewTime).reversed())
                .collect(Collectors.toList());
    }
}

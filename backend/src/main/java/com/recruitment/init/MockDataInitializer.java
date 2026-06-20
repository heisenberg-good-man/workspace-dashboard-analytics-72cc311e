package com.recruitment.init;

import com.recruitment.model.Job;
import com.recruitment.model.Candidate;
import com.recruitment.storage.InMemoryStorage;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class MockDataInitializer {

    private final InMemoryStorage storage;

    public MockDataInitializer(InMemoryStorage storage) {
        this.storage = storage;
    }

    @PostConstruct
    public void init() {
        initJobs();
        initCandidates();
    }

    private void initJobs() {
        Job job1 = createJob(1L, "高级Java开发工程师", "技术部", "北京", 3, Job.JobStatus.OPEN, "张三", 8);
        Job job2 = createJob(2L, "前端开发工程师", "技术部", "上海", 2, Job.JobStatus.OPEN, "李四", 12);
        Job job3 = createJob(3L, "产品经理", "产品部", "北京", 1, Job.JobStatus.OPEN, "王五", 6);
        Job job4 = createJob(4L, "UI设计师", "设计部", "深圳", 2, Job.JobStatus.PAUSED, "赵六", 4);
        Job job5 = createJob(5L, "数据分析师", "数据部", "北京", 2, Job.JobStatus.OPEN, "钱七", 5);
        Job job6 = createJob(6L, "测试工程师", "质量部", "杭州", 1, Job.JobStatus.CLOSED, "孙八", 10);

        Arrays.asList(job1, job2, job3, job4, job5, job6).forEach(j -> {
            storage.jobs.put(j.getId(), j);
            if (j.getId() > storage.jobIdSeq.get()) {
                storage.jobIdSeq.set(j.getId());
            }
        });
    }

    private Job createJob(Long id, String title, String department, String location,
                          Integer headcount, Job.JobStatus status, String owner, Integer receivedResumes) {
        Job job = new Job();
        job.setId(id);
        job.setTitle(title);
        job.setDepartment(department);
        job.setLocation(location);
        job.setHeadcount(headcount);
        job.setStatus(status);
        job.setOwner(owner);
        job.setReceivedResumes(receivedResumes);
        return job;
    }

    private void initCandidates() {
        Candidate c1 = createCandidate(1L, "陈晓明", "男", 28, "13800138001", "chenxm@email.com",
                "本科", "5年Java开发经验，熟悉Spring全家桶", "1", "高级Java开发工程师",
                Candidate.ResumeStatus.PENDING, 3, null, LocalDate.now().minusDays(2),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now().minusDays(2), "系统", "投递简历")));

        Candidate c2 = createCandidate(2L, "王芳", "女", 26, "13800138002", "wangfang@email.com",
                "硕士", "3年前端开发，精通Vue/React", "2", "前端开发工程师",
                Candidate.ResumeStatus.PASSED, 4, null, LocalDate.now().minusDays(5),
                Arrays.asList(
                        new Candidate.FollowRecord(LocalDate.now().minusDays(5), "系统", "投递简历"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(3), "李四", "通过初筛")
                ));

        Candidate c3 = createCandidate(3L, "刘强", "男", 30, "13800138003", "liuqiang@email.com",
                "本科", "8年产品经理经验，擅长B端产品", "3", "产品经理",
                Candidate.ResumeStatus.INTERVIEW_SCHEDULED, 5, null, LocalDate.now().minusDays(7),
                Arrays.asList(
                        new Candidate.FollowRecord(LocalDate.now().minusDays(7), "系统", "投递简历"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(5), "王五", "通过初筛"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(2), "王五", "安排面试")
                ));

        Candidate c4 = createCandidate(4L, "李娜", "女", 24, "13800138004", "lina@email.com",
                "本科", "2年UI设计经验，有作品集", "4", "UI设计师",
                Candidate.ResumeStatus.REJECTED, 2, null, LocalDate.now().minusDays(4),
                Arrays.asList(
                        new Candidate.FollowRecord(LocalDate.now().minusDays(4), "系统", "投递简历"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(2), "赵六", "经验不足，标记不合适")
                ));

        Candidate c5 = createCandidate(5L, "张伟", "男", 27, "13800138005", "zhangwei@email.com",
                "硕士", "4年数据分析经验，精通SQL/Python", "5", "数据分析师",
                Candidate.ResumeStatus.PENDING, 4, null, LocalDate.now().minusDays(1),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now().minusDays(1), "系统", "投递简历")));

        Candidate c6 = createCandidate(6L, "赵敏", "女", 25, "13800138006", "zhaomin@email.com",
                "本科", "2年前端开发经验", "2", "前端开发工程师",
                Candidate.ResumeStatus.PENDING, 3, null, LocalDate.now().minusDays(3),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now().minusDays(3), "系统", "投递简历")));

        Candidate c7 = createCandidate(7L, "孙浩", "男", 29, "13800138007", "sunhao@email.com",
                "本科", "6年Java开发经验，微服务架构", "1", "高级Java开发工程师",
                Candidate.ResumeStatus.INTERVIEWED, 5, null, LocalDate.now().minusDays(10),
                Arrays.asList(
                        new Candidate.FollowRecord(LocalDate.now().minusDays(10), "系统", "投递简历"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(8), "张三", "通过初筛"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(5), "张三", "安排面试"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(3), "张三", "已面试，评价优秀")
                ));

        Candidate c8 = createCandidate(8L, "周婷", "女", 23, "13800138008", "zhouting@email.com",
                "本科", "应届生，软件工程专业", "2", "前端开发工程师",
                Candidate.ResumeStatus.PENDING, 2, null, LocalDate.now(),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now(), "系统", "投递简历")));

        Candidate c9 = createCandidate(9L, "吴迪", "男", 31, "13800138009", "wudi@email.com",
                "硕士", "7年Java开发，有团队管理经验", "1", "高级Java开发工程师",
                Candidate.ResumeStatus.OFFERED, 5, null, LocalDate.now().minusDays(14),
                Arrays.asList(
                        new Candidate.FollowRecord(LocalDate.now().minusDays(14), "系统", "投递简历"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(12), "张三", "通过初筛"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(9), "张三", "安排面试"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(7), "张三", "已面试"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(2), "张三", "发出Offer")
                ));

        Candidate c10 = createCandidate(10L, "郑雪", "女", 26, "13800138010", "zhengxue@email.com",
                "硕士", "3年产品经理经验，C端产品背景", "3", "产品经理",
                Candidate.ResumeStatus.PENDING, 4, null, LocalDate.now().minusDays(1).plusHours(0).toLocalDate(),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now().minusDays(1), "系统", "投递简历")));

        Candidate c11 = createCandidate(11L, "黄磊", "男", 28, "13800138011", "huanglei@email.com",
                "本科", "5年测试经验，自动化测试", "6", "测试工程师",
                Candidate.ResumeStatus.HIRED, 4, null, LocalDate.now().minusDays(30),
                Arrays.asList(
                        new Candidate.FollowRecord(LocalDate.now().minusDays(30), "系统", "投递简历"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(28), "孙八", "通过初筛"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(25), "孙八", "安排面试"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(22), "孙八", "已面试"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(18), "孙八", "发出Offer"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(5), "系统", "候选人已入职")
                ));

        Candidate c12 = createCandidate(12L, "林静", "女", 27, "13800138012", "linjing@email.com",
                "本科", "4年数据分析经验，用户增长分析", "5", "数据分析师",
                Candidate.ResumeStatus.PASSED, 4, null, LocalDate.now().minusDays(2),
                Arrays.asList(
                        new Candidate.FollowRecord(LocalDate.now().minusDays(2), "系统", "投递简历"),
                        new Candidate.FollowRecord(LocalDate.now().minusDays(1), "钱七", "通过初筛")
                ));

        Candidate c13 = createCandidate(13L, "马超", "男", 26, "13800138013", "machao@email.com",
                "本科", "3年前端开发经验", "2", "前端开发工程师",
                Candidate.ResumeStatus.PENDING, 3, null, LocalDate.now().minusDays(1),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now().minusDays(1), "系统", "投递简历")));

        Candidate c14 = createCandidate(14L, "杨洋", "男", 29, "13800138014", "yangyang@email.com",
                "硕士", "6年Java开发经验，高并发系统", "1", "高级Java开发工程师",
                Candidate.ResumeStatus.PENDING, 5, null, LocalDate.now(),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now(), "系统", "投递简历")));

        Candidate c15 = createCandidate(15L, "朱琳", "女", 24, "13800138015", "zhulin@email.com",
                "本科", "应届，设计专业", "4", "UI设计师",
                Candidate.ResumeStatus.PENDING, 2, null, LocalDate.now(),
                Arrays.asList(new Candidate.FollowRecord(LocalDate.now(), "系统", "投递简历")));

        Arrays.asList(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15).forEach(c -> {
            storage.candidates.put(c.getId(), c);
            if (c.getId() > storage.candidateIdSeq.get()) {
                storage.candidateIdSeq.set(c.getId());
            }
        });
    }

    private Candidate createCandidate(Long id, String name, String gender, Integer age, String phone,
                                      String email, String education, String workExperience,
                                      String appliedJobId, String appliedJobTitle,
                                      Candidate.ResumeStatus status, Integer rating, String resumeUrl,
                                      LocalDate applyDate, java.util.List<Candidate.FollowRecord> records) {
        Candidate c = new Candidate();
        c.setId(id);
        c.setName(name);
        c.setGender(gender);
        c.setAge(age);
        c.setPhone(phone);
        c.setEmail(email);
        c.setEducation(education);
        c.setWorkExperience(workExperience);
        c.setAppliedJobId(appliedJobId);
        c.setAppliedJobTitle(appliedJobTitle);
        c.setResumeStatus(status);
        c.setRating(rating);
        c.setResumeUrl(resumeUrl);
        c.setApplyDate(applyDate);
        c.setFollowRecords(new java.util.ArrayList<>(records));
        return c;
    }
}

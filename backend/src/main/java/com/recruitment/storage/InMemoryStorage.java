package com.recruitment.storage;

import com.recruitment.model.Job;
import com.recruitment.model.Candidate;
import com.recruitment.model.Interview;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class InMemoryStorage {
    public final Map<Long, Job> jobs = new ConcurrentHashMap<>();
    public final Map<Long, Candidate> candidates = new ConcurrentHashMap<>();
    public final Map<Long, Interview> interviews = new ConcurrentHashMap<>();
    public final List<Interview> interviewList = new CopyOnWriteArrayList<>();

    public final AtomicLong jobIdSeq = new AtomicLong(0);
    public final AtomicLong candidateIdSeq = new AtomicLong(0);
    public final AtomicLong interviewIdSeq = new AtomicLong(0);
}

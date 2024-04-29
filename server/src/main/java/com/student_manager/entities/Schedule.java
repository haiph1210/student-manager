package com.student_manager.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.student_manager.core.BaseEntities;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "TBL_SCHEDULE",
        uniqueConstraints = {
                @UniqueConstraint(name = "UNQ_START_END_TIME", columnNames = {"startTime", "endTime"})
        })
public class Schedule extends BaseEntities {
    private Date startTime;

    private Date endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    @JsonIgnoreProperties("schedules")
    private Class aClass;

    @OneToOne
    @JoinColumn(name = "subject_id", unique = true, nullable = false)
    private Subject subject;


}

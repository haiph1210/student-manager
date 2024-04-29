package com.student_manager.entities;

import com.student_manager.core.BaseEntities;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "TBL_CLASS")
public class Class extends BaseEntities {
    private String name;
    private Long totalPeople;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "major_id", nullable = false)
    private Major major;

    @OneToMany(mappedBy = "aClass", cascade = CascadeType.ALL)
    private List<Student> students;

    @OneToMany(mappedBy = "aClass", cascade = CascadeType.ALL)
    private List<Schedule> schedules;
}

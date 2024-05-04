package com.student_manager.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "major_id", nullable = false)
    @JsonIgnoreProperties("classes")
    private Major major;

    @OneToMany(mappedBy = "aClass", cascade = CascadeType.ALL)
    private List<User> users;

    @OneToMany(mappedBy = "aClass", cascade = CascadeType.ALL)
    private List<Schedule> schedules;
}

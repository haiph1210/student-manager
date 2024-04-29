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
@Table(name = "TBL_FACULTY")
public class Faculty extends BaseEntities {
    @Column(name = "faculty_name", length = 255)
    private String facultyName;

    private Float totalYearLearn = 2f;

    @OneToMany(mappedBy = "faculty", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Major> majors;
}

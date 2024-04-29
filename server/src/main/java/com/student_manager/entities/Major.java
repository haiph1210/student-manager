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
@Table(name = "TBL_MAJOR")
public class Major extends BaseEntities {
    private String majorName;

    @ManyToOne()
    @JoinColumn(name = "faculty_id", nullable = false)
    @JsonIgnoreProperties("majors")
    private Faculty faculty;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<Class> classes;

}

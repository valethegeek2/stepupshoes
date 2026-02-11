package com.teamstep.stepup.repository;

import com.teamstep.stepup.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {


    /*
    Supported keywords inside method names - see https://docs.spring.io/spring-data/jpa/docs/current-SNAPSHOT/reference/html/#reference
     */
}

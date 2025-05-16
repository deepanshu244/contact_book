package com.deepanshu.contactbook.backend.repositiory;

import com.deepanshu.contactbook.backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepositiory extends JpaRepository<Contact,Long> {
}

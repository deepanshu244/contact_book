package com.deepanshu.contactbook.backend.service;

import com.deepanshu.contactbook.backend.model.Contact;
import com.deepanshu.contactbook.backend.repositiory.ContactRepositiory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    private final ContactRepositiory contactRepositiory;


    public ContactService(ContactRepositiory contactRepositiory) {
        this.contactRepositiory = contactRepositiory;
    }

    public List<Contact> getAllContact() {
        return contactRepositiory.findAll();
    }

    public Contact addContact(Contact contact) {
        return contactRepositiory.save(contact);
    }

    public void deleteContact(Long id) {
        contactRepositiory.deleteById(id);
    }

    public Contact updateContact(Long id, Contact contact) {
        Optional<Contact> contact1=contactRepositiory.findById(id);
        if(contact1.isPresent()){
            Contact uContact =contact1.get();
            if(contact.getAddress()!=null){
                uContact.setAddress(contact.getAddress());
            }
            if(contact.getName()!=null){
                uContact.setName(contact.getName());
            }
            if(contact.getNumber()!=null){
                uContact.setNumber(contact.getNumber());
            }

          return   contactRepositiory.save(uContact);
        }
        else return null;
    }
}

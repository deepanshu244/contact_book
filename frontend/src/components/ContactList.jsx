import React, { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import axios from "axios";
import { toast } from "react-toastify";

function ContactList({ refreshFlag, onEditContact }) {
  const [contact, setContact] = useState([]);

  const fetchContact = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/contact");
      setContact(res.data);
    } catch (error) {
      toast.error("Failed to fetch Contacts");
      setContact([]);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/contact/${id}`);
      toast.success("Contact deleted");
      fetchContact();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  useEffect(() => {
    fetchContact();
  }, [refreshFlag]); // re-fetch when refreshFlag toggles

  return (
    <div className="flex justify-center bg-gray-100 pb-12">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md mt-6">
        <div className="text-3xl font-bold text-center mb-6">Contact List</div>
        {contact.length === 0 ? (
          <p className="text-center text-gray-500">No contacts found.</p>
        ) : (
          contact.map((item) => (
            <ContactCard
              key={item.id}
              id={item.id}
              name={item.name}
              number={item.number}
              address={item.address}
              onDelete={deleteContact}
              onEdit={() => onEditContact(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ContactList;

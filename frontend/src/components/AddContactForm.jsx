import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddContactForm({ refreshList, contactToEdit, clearEdit }) {
  const [form, setForm] = useState({
    name: "",
    number: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contactToEdit) {
      setForm({
        name: contactToEdit.name,
        number: contactToEdit.number,
        address: contactToEdit.address,
      });
    } else {
      setForm({ name: "", number: "", address: "" });
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.name || !form.number || !form.address) {
      toast.warning("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      let response;
      if (contactToEdit) {
        // Edit existing contact
        console.log("Updating contact with ID:", contactToEdit.id);
        response = await axios.put(
          `http://localhost:8080/api/contact/update/${contactToEdit.id}`,
          form,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Contact updated successfully!");
        clearEdit();
      } else {
        // Add new contact
        response = await axios.post("http://localhost:8080/api/contact", form, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Contact added successfully!");
      }

      console.log("API Response:", response.data);
      setForm({ name: "", number: "", address: "" });
      refreshList();
    } catch (error) {
      console.error("API Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";

      toast.error(`Operation failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    clearEdit();
    setForm({ name: "", number: "", address: "" });
  };

  return (
    <div className="flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {contactToEdit ? "Edit Contact" : "Add Contact"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="number"
              value={form.number}
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              name="address"
              placeholder="Address"
              rows={4}
              value={form.address}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center flex justify-center space-x-4">
            <button
              type="submit"
              className={`bg-blue-500 rounded-md text-white py-2 px-6 hover:bg-blue-600 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : contactToEdit ? (
                "Update Contact"
              ) : (
                "Add Contact"
              )}
            </button>

            {contactToEdit && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 rounded-md text-black py-2 px-4 hover:bg-gray-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactForm;

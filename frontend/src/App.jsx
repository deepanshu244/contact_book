import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AddContactForm from "./components/AddContactForm";
import ContactList from "./components/ContactList";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const refreshList = () => {
    setRefreshFlag((prev) => !prev); 
  };
 
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AddContactForm
        refreshList={refreshList}
        contactToEdit={selectedContact}
        clearEdit={() => setSelectedContact(null)}
      />
      <ContactList
        refreshFlag={refreshFlag}
        onEditContact={(contact) => setSelectedContact(contact)}
      />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;

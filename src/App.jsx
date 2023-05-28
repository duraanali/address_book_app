import React, { useEffect, useState } from "react";
import AddContact from "./components/AddContact";
import Contacts from "./components/Contacts";

import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:9000/contacts")
      .then((res) => {
        console.log(res);
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createContact = (contactData) => {
    axios
      .post("http://localhost:9000/create_contact", contactData)
      .then((response) => {
        setContacts((prevContacts) => [...prevContacts, response.data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:9000/delete_contact/${id}`)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div className="min-h-screen flex bg-slate-600">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">My Address Book</h3>
            <AddContact createContact={createContact} />
            <Contacts contacts={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    </div>
  );
}

export default App;
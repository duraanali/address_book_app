/* eslint-disable react/prop-types */

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Contacts(props) {
  return (
    <div className="flex flex-wrap justify-center text-center mt-5">
      {props.contacts.map((contact) => (
        <div
          className=" bg-white m-5 shadow-2xl p-10"
          key={contact.id}
        >
          <div className="p-5">
            <h3 className="font-bold text-2xl mb-4 ">Name: {contact.name}</h3>
            <p>Phone: {contact.phone}</p>
            <p>Address: {contact.address}</p>
          </div>
          <div className="relative bottom-0 left-0 right-0 flex justify-center p-4">
            <button className="mr-2">
              <FaEdit size={20} onClick={() => props.handleEdit(contact.id, contact)} />
            </button>
            <button>
              <FaTrash size={20} onClick={() => props.deleteContact(contact.id)} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
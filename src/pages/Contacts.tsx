import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeContact } from "../Redux/action";
import { RootState } from "../Redux/store";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumb";
import ContactModal from "../components/ContactModal";
import EditContactModal from "../components/EditContactModal";
import Logo from "../images/logo/user.png";

// Define the Contact type
type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
};

const Contacts = () => {
  // Define state variables
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [singleContact, setSingleContact] = useState<Contact | null>(null);
  const [clickedContact, setClickedContact] = useState<Contact | any>(null);
  const AllContacts = useSelector((store: RootState) => store.contacts);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);

  const dispatch = useDispatch();

  // Function to toggle the contact modal
  const togglePopup = (contact: Contact) => {
    setSingleContact(contact);
    setIsOpen(!isOpen);
  };

  // Function to handle the close event of the contact modal
  const onClose = () => {
    setShowModal(false);
  };

  // Function to handle the close event of the edit contact modal
  const onEditClose = () => {
    setEditShowModal(false);
  };

  // Function to handle editing a contact's details
  const onEditContactDetail = (contact: Contact) => {
    setClickedContact(contact);
    setEditShowModal(true);
  };

  // Render the component
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Contacts" />
      <div className="justify-center pt-16 text-gray-50 p-4 w-full">
        <div className="m-4 text-center">
          <button
            className="text-4xl font-bold mb-4 mx-auto text-center text-white border-4 border-purple-500 bg-black bg-opacity-75 py-3 px-6 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Create Contact
          </button>
        </div>
        {AllContacts.length === 0 && (
          <div className="m-auto w-fit p-4 align-middle text-blue-500 justify-center">
            <svg
              className="m-auto"
              width="280"
              height="280"
              viewBox="0 0 280 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG paths */}
            </svg>

            <h1 className="text-3xl">
              No Contact Found. Please add a contact from the Create Contact
              button.
            </h1>
          </div>
        )}
        <div
          id="contact_list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Iterate over each contact and render a figure */}
          {AllContacts?.map((contact, index) => (
            <figure
              className="bg-white text-white h-80 rounded-lg shadow-md"
              key={index}
            >
              <img
                alt="user"
                className="w-32 h-32 rounded-full mx-auto mt-7"
                src={Logo}
              />

              <figcaption className="text-center mt-5">
                <p
                  className="text-blue font-semibold text-xl mb-2"
                  style={{
                    color: "#1C2434",
                    textDecoration: "bold",
                    fontSize: "15",
                  }}
                >
                  {contact.firstName} {contact.lastName}
                </p>
                <span>
                  <p className="text-gray-500">
                    <span className="font-medium" style={{ color: "#1C2434" }}>
                      Status:{" "}
                    </span>
                    <span style={{ color: "gray" }}>{contact.status}</span>
                  </p>
                </span>
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    className="inline-block rounded bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
                    onClick={() => onEditContactDetail(contact)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                    onClick={() => dispatch(removeContact(contact.id))}
                  >
                    Delete
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <ContactModal showModal={showModal} onClose={onClose} />
      <EditContactModal
        showEditModal={showEditModal}
        onClose={onEditClose}
        contactDetail={clickedContact}
      />
    </DefaultLayout>
  );
};

export default Contacts;

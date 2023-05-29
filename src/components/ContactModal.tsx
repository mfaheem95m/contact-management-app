import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";

interface FormValues {
  firstName: string;
  lastName: string;
  status: string;
}

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  status: Yup.string().required("Status is required"),
});

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  status: "active",
};

interface MyFormProps {
  onClose: () => void;
  showModal: boolean;
}

const ContactModal: React.FC<MyFormProps> = ({ onClose, showModal }) => {
  const dispatch = useDispatch();
  const AllContacts = useSelector((store: RootState) => store.contacts);

  const handleSubmit = (values: FormValues) => {
    const { firstName, lastName } = values;

    // Check if first and last names are the same as an existing contact
    const existingContact = AllContacts.find((contact: Contact) => {
      contact.firstName === firstName && contact.lastName === lastName;
    });

    if (existingContact) {
      alert("Name Already Exists In Contacts");
      return;
    }

    // Dispatch the addContact action
    dispatch(addContact(values));
    onClose();
  };

  return showModal ? (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 m-5 pt-5 bg-black bg-opacity-70">
      <div className="w-full max-w-3xl mx-auto">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-lg mt-20">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Create Contact</h3>
          </div>
          {/* Body */}
          <div className="p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-4">
                  {/* First Name */}
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-md mt-1"
                  />
                </div>
                <div className="mb-4">
                  {/* Last Name */}
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  {/* Status */}
                  <label className="block text-gray-700 font-semibold mb-1">
                    Status
                  </label>
                  <div className="flex items-center">
                    {/* Active */}
                    <label className="flex items-center mr-4">
                      <Field
                        type="radio"
                        name="status"
                        value="active"
                        className="mr-2 leading-tight"
                      />
                      <span className="text-gray-700 font-semibold">
                        Active
                      </span>
                    </label>
                    {/* Inactive */}
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="status"
                        value="inactive"
                        className="mr-2 leading-tight"
                      />
                      <span className="text-gray-700 font-semibold">
                        Inactive
                      </span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                  {/* Close Button */}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {/* Add Button */}
                  <button
                    className="bg-emerald-500 text-blue active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          {/* Footer */}
        </div>
      </div>
    </div>
  ) : null;
};

export default ContactModal;

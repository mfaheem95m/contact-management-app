import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editContact } from "../Redux/action";
import { useDispatch } from "react-redux";

// Define the form values interface
interface FormValues {
  firstName: string;
  lastName: string;
  status: string;
}

// Define the validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  status: Yup.string().required("Status must be checked"),
});

interface MyFormProps {
  onClose: () => void;
  showEditModal: boolean;
  contactDetail: any;
}

const EditContactModal: React.FC<MyFormProps> = ({
  onClose,
  showEditModal,
  contactDetail,
}) => {
  const dispatch = useDispatch();

  // Set initial form values based on contact details or empty values
  const initialValues: FormValues = contactDetail
    ? {
        firstName: contactDetail.firstName,
        lastName: contactDetail.lastName,
        status: contactDetail.status,
      }
    : {
        firstName: "",
        lastName: "",
        status: "Active",
      };

  const handleSubmit = (values: FormValues) => {
    // Dispatch the editContact action with updated values
    dispatch(editContact({ ...values, id: contactDetail.id }));
    onClose();
  };

  return showEditModal ? (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 m-5 pt-5 ">
      <div className="w-full max-w-3xl mx-auto">
        {/* Modal content */}
        <div className="bg-white rounded-lg  shadow-lg mt-20">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Edit Contact</h3>
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
                  <label className="block text-gray-700 font-semibold mb-1">
                    Status
                  </label>
                  <div className="flex items-center">
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

                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-blue active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save
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

export default EditContactModal;

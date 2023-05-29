import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from "./actionTypes";

// Define the type for the payload in the addContact action
interface AddContactPayload {
  firstName: string;
  lastName: string;
  status: string;
  // Define the properties for the payload
}

// Define the type for the payload in the removeContact action
interface RemoveContactPayload {
  id: number;
}

// Define the type for the payload in the editContact action
interface EditContactPayload {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  // Define the properties for the payload
}

// Define the action type for the addContact action
interface AddContactAction {
  type: typeof ADD_CONTACT;
  payload: AddContactPayload;
}

// Define the action type for the removeContact action
interface RemoveContactAction {
  type: typeof REMOVE_CONTACT;
  payload: RemoveContactPayload;
}

// Define the action type for the editContact action
interface EditContactAction {
  type: typeof EDIT_CONTACT;
  payload: EditContactPayload;
}

// Define and export the action creators
export const addContact = (payload: AddContactPayload): AddContactAction => {
  console.log(payload);
  return {
    type: ADD_CONTACT,
    payload,
  };
};

export const removeContact = (id: number): RemoveContactAction => {
  return {
    type: REMOVE_CONTACT,
    payload: {
      id,
    },
  };
};

export const editContact = (payload: EditContactPayload): EditContactAction => {
  console.log(payload);
  return {
    type: EDIT_CONTACT,
    payload,
  };
};

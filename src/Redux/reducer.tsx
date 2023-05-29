import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from "./actionTypes";
import { Action } from "redux";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface State {
  contacts: Contact[];
}
interface ContactAction extends Action {
  payload: any;
}

const initialState: State = {
  contacts: JSON.parse(localStorage.getItem("contacts") || "[]") as Contact[],
};

const reducer = (state = initialState, action: ContactAction): State => {
  switch (action.type) {
    case ADD_CONTACT: {
      console.log("run");

      const { firstName, lastName } = action.payload;
      console.log("first", firstName);

      const existingContact = state.contacts.find(
        (contact) =>
          contact.firstName === firstName && contact.lastName === lastName
      );

      if (existingContact) {
        alert("Name Already Exists In Contacts");
        return state;
      }

      const newContact: Contact = {
        id: state.contacts.length + 1,
        ...action.payload,
      };

      const updatedContacts = [...state.contacts, newContact];
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      alert("Contact Saved Successfully!!!");

      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    case REMOVE_CONTACT: {
      const { id } = action.payload;

      const updatedContacts = state.contacts.filter(
        (contact) => contact.id !== id
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    case EDIT_CONTACT: {
      const { firstName, lastName, id } = action.payload;

      if (firstName === "" || lastName === "") {
        alert("Input Fields Cannot Be Left Empty");
        return state;
      }

      const existingContact = state.contacts.find(
        (contact) =>
          contact.id !== id &&
          contact.firstName === firstName &&
          contact.lastName === lastName
      );

      if (existingContact) {
        alert("Name Already Exists!!");
        return state;
      }

      const updatedContacts = state.contacts.map((contact) =>
        contact.id === id ? { ...action.payload } : contact
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      alert("Contact has been Updated");

      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    default:
      return state;
  }
};

export default reducer;

import PropTypes from "prop-types";
import scss from "./Phonebook.module.scss";
import { ContactForm } from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import { ContactList } from "../ContactList/ContactList";
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "Phonebook-local-storage";

export const Phonebook = () => {
    const [contacts, setContacts] = useState(() => loadLocalStorage(LOCAL_STORAGE_KEY) || []);
    const [filter, setFilter] = useState("");

    // Zapisuj stan `contacts` w localStorage za każdym razem, gdy `contacts` się zmienia
    useEffect(() => {
        saveLocalStorage(LOCAL_STORAGE_KEY, contacts);
    }, [contacts]);

    // Dodaje kontakt
    const addContact = (contact) => {
        setContacts((prevContacts) => [...prevContacts, contact]);
    };

    // Usuwa kontakt
    const handleDelete = (contactId) => {
        setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== contactId));
    };

    // Obsługuje zmiany w filtrze
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className={scss.phonebookContainer}>
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact} contacts={contacts} />

            <h2>Contacts</h2>
            <Filter filter={filter} onFilterChange={handleFilterChange} />
            <ContactList contacts={contacts} filter={filter} onDelete={handleDelete} />
        </div>
    );
};

// PropTypes dla komponentu Phonebook
Phonebook.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    filter: PropTypes.string,
    addContact: PropTypes.func,
    handleDelete: PropTypes.func,
};

// Funkcja zapisująca dane do localStorage
const saveLocalStorage = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

// Funkcja ładująca dane z localStorage
const loadLocalStorage = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
        return undefined;
    }
};
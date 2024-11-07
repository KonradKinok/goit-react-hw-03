import PropTypes from "prop-types";
import { SeparateContact } from "../SeparateContact/SeparateContact";
import scss from "./ContactList.module.scss";

export const ContactList = ({ contacts, filter, onDelete }) => {

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
        <div>
            <ul className={scss["list-contact"]}>
                {filteredContacts.map((contact) => (
                    <SeparateContact
                        key={contact.id}
                        contact={contact}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </div>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    filter: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};
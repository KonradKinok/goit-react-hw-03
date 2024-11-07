import PropTypes from "prop-types";
import scss from "./SeparateContact.module.scss"
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
export const SeparateContact = ({ contact, onDelete }) => {

    // Funkcja obsługująca usunięcie kontaktu
    const handleDelete = () => {
        const confirmMessage = "Are you sure you want to delete the contact";
        const isConfirmed = window.confirm(confirmMessage);
        if (isConfirmed) {
            onDelete(contact.id);
        }


    };

    return (
        <li className={scss["container-contact"]} key={contact.id} >
            <div className={scss["container-data-contact"]}>
                <p><FaUser className={scss["icon-data-contact"]} />{contact.name}</p>
                <p><FaPhone className={scss["icon-data-contact"]} />{contact.number}</p>
            </div>
            <div>
                <button className={scss["button-delete-contact"]} type="button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </li>
    );
}

SeparateContact.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};
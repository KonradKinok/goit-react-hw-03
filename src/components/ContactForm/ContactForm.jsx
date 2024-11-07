import PropTypes from "prop-types";
import { nanoid } from 'nanoid'
import { Formik } from 'formik';
import * as Yup from 'yup';
import scss from "./ContactForm.module.scss";

export const ContactForm = ({ contacts, addContact }) => {

    const handleFormikSubmit = (values, { setSubmitting, resetForm }) => {
        const newContact = {
            id: nanoid(),
            name: values.name,
            number: values.number,
        };

        const contactExists = contacts.some(
            (contact) =>
                contact.name === newContact.name ||
                contact.number === newContact.number
        );

        if (contactExists) {
            window.alert(`${newContact.name} or ${newContact.number} is already in contacts`);
        } else {
            addContact(newContact);
            resetForm();
        }

        setSubmitting(false);
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, "Name must be at least 3 characters long")
            .max(30, "Name must not exceed 30 characters")
            .required("Name is required"),
        number: Yup.string()
            .matches(
                /^\d{3}-\d{3}-\d{3}$/,
                "Phone number must be in the format 123-456-789"
            )
            .required("Phone number is required")
    });

    return (
        <Formik
            initialValues={{ name: "", number: "" }}
            validationSchema={validationSchema} // Przekazanie schematu walidacji
            onSubmit={handleFormikSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                /* and other goodies */
            }) => (
                <form className={scss.form} onSubmit={handleSubmit}>
                    <div className={scss["input-container"]}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder="Contact name"
                        />
                        {errors.name && touched.name && (
                            <div className={scss["input-error"]}>{errors.name}</div>
                        )}
                    </div>

                    <div className={scss["input-container"]}>
                        <label htmlFor="number">Phone Number</label>
                        <input
                            id="number"
                            type="text"
                            name="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.number}
                            placeholder="567-215-453"
                            title="Phone number must be digits with dashes. Example: 567-321-345"
                        />
                        {errors.number && touched.number && (
                            <div className={scss["input-error"]}>{errors.number}</div>
                        )}
                    </div>

                    <button type="submit">Add contact</button>
                </form>
            )}
        </Formik>
    );
};

ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
    addContact: PropTypes.func.isRequired,
};

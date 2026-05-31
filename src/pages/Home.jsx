import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard";
import useAppContext from "../hooks/useGlobalReducer"; 

export const Home = () => {
  
    const { store: { store, actions } } = useAppContext(); 

    useEffect(() => {
        if (actions && actions.loadContacts) {
            actions.loadContacts();
        }
    }, []);

    console.log("🎨 Dibujando Home. Contactos en store:", store?.contacts);

    return (
        <div className="container mt-5" style={{ maxWidth: "800px" }}>
            <div className="d-flex justify-content-end mb-4">
                <Link to="/add-contact" className="btn btn-success">
                    Add new contact
                </Link>
            </div>

            <div className="list-group">
                {store && store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <div className="text-center p-5 border rounded bg-light">
                        <i className="fas fa-user-slash fa-3x mb-3 text-muted"></i>
                        <p className="text-muted mb-0">No hay contactos en la agenda. ¡Agrega el primero!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
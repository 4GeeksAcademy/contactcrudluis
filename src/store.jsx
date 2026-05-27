import React from "react";

export const getState = ({ getStore = () => { }, getActions = () => { }, setStore = () => { } } = {}) => {

    const initialStoreState = {
        contacts: [],
        agendaSlug: "luis_timaure_agenda"
    };

    const actionsObj = {
        loadContacts: async () => {
            const currentStore = typeof getStore === "function" ? getStore() : null;
            const slug = currentStore?.agendaSlug || initialStoreState.agendaSlug;

            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);

                if (response.status === 404) {
                    console.log(`La agenda '${slug}' no existe. Creándola automáticamente...`);
                    await actionsObj.createAgenda();
                    return;
                }

                if (response.ok) {
                    const data = await response.json();


                    let contactsArray = [];
                    if (data && Array.isArray(data.contacts)) {
                        contactsArray = data.contacts;
                    } else if (Array.isArray(data)) {
                        contactsArray = data;
                    }

                    console.log("Contactos listos para guardar:", contactsArray);

                    setStore({
                        ...currentStore,
                        contacts: contactsArray
                    });
                }
            } catch (error) {
                console.error("Error cargando contactos:", error);
            }
        }, createAgenda: async () => {
            const currentStore = typeof getStore === "function" ? getStore() : null;
            const slug = currentStore?.agendaSlug || initialStoreState.agendaSlug;

            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                });
                if (response.ok) {
                    console.log(`Agenda '${slug}' creada con éxito.`);

                    await actionsObj.loadContacts();
                }
            } catch (error) {
                console.error("Error creando agenda:", error);
            }
        },

        addContact: async (contact) => {
            const currentStore = typeof getStore === "function" ? getStore() : null;
            const slug = currentStore?.agendaSlug || initialStoreState.agendaSlug;

            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contact)
                });
                if (response.ok) {
                    await actionsObj.loadContacts();
                    return true;
                }
            } catch (error) {
                console.error("Error agregando contacto:", error);
                return false;
            }
        },

        editContact: async (id, updatedContact) => {
            const currentStore = typeof getStore === "function" ? getStore() : null;
            const slug = currentStore?.agendaSlug || initialStoreState.agendaSlug;

            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedContact)
                });
                if (response.ok) {
                    await actionsObj.loadContacts();
                    return true;
                }
            } catch (error) {
                console.error("Error editando contacto:", error);
                return false;
            }
        },

        deleteContact: async (id) => {
            const currentStore = typeof getStore === "function" ? getStore() : null;
            const slug = currentStore?.agendaSlug || initialStoreState.agendaSlug;

            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    await actionsObj.loadContacts();
                }
            } catch (error) {
                console.error("Error eliminando contacto:", error);
            }
        }
    };

    return {
        store: initialStoreState,
        actions: actionsObj
    };
};

export const initialStore = getState;
export const Context = React.createContext(null);
export default getState;
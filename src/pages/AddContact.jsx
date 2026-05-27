import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useAppContext from "../hooks/useGlobalReducer"; 

export const AddContact = () => {
    const { store: { store, actions } } = useAppContext();
    const navigate = useNavigate();
    const { id } = useParams();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	});

		useEffect(() => {
		if (id && store.contacts.length > 0) {
			const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
			if (contactToEdit) {
				setFormData({
					name: contactToEdit.name,
					email: contactToEdit.email,
					phone: contactToEdit.phone,
					address: contactToEdit.address
				});
			}
		}
	}, [id, store.contacts]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let success = false;

		if (id) {

			success = await actions.editContact(id, formData);
		} else {

			success = await actions.addContact(formData);
		}

		if (success) {
			navigate("/");
		}
	};

	return (
		<div className="container mt-5" style={{ maxWidth: "700px" }}>

			<h1 className="text-center mb-4">{id ? "Edit contact" : "Add a new contact"}</h1>
			
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label fw-bold">Full Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						placeholder="Full Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label fw-bold">Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						placeholder="Enter email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label fw-bold">Phone</label>
					<input
						type="text"
						className="form-control"
						name="phone"
						placeholder="Enter phone"
						value={formData.phone}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label fw-bold">Address</label>
					<input
						type="text"
						className="form-control"
						name="address"
						placeholder="Enter address"
						value={formData.address}
						onChange={handleChange}
						required
					/>
				</div>
				
				<button type="submit" className="btn btn-primary w-100 mb-3">
					save
				</button>
				
				<Link to="/" className="d-block text-center text-decoration-none">
					or get back to contacts
				</Link>
			</form>
		</div>
	);
};
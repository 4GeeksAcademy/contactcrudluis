import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useGlobalReducer"; 

export const ContactCard = ({ contact }) => {
	const { store: { actions } } = useAppContext();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	const handleDelete = async () => {
		await actions.deleteContact(contact.id);
		setShowModal(false);
	};

	return (
		<>
			<div className="list-group-item d-flex align-items-center p-4">
				<img src="https://img.magnific.com/foto-gratis/joven-hombre-barbudo-camisa-rayas_273609-5677.jpg?semt=ais_hybrid&w=740&q=80" alt={contact.name} className="rounded-circle me-4" style={{ width: "90px", height: "90px", objectFit: "cover" }} />
				
				<div className="flex-grow-1">
					<h5 className="mb-2">{contact.name}</h5>
					<p className="mb-1 text-muted"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
					<p className="mb-1 text-muted"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
					<p className="mb-0 text-muted"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
				</div>
				
				<div className="d-flex gap-3">
					<button className="btn btn-link text-dark p-0" onClick={() => navigate(`/edit-contact/${contact.id}`)}>
						<i className="fas fa-pencil-alt"></i>
					</button>
					<button className="btn btn-link text-dark p-0" onClick={() => setShowModal(true)}>
						<i className="fas fa-trash-alt"></i>
					</button>
				</div>
			</div>

			{showModal && (
				<div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Are you sure?</h5>
								<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
							</div>
							<div className="modal-body">
								<p>If you delete this the entire universe will go down!</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Oh no!</button>
								<button type="button" className="btn btn-secondary" onClick={handleDelete}>Yes baby!</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
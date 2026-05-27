import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useAppContext from "../hooks/useGlobalReducer"; 


export const ContactCard = ({ contact }) => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="list-group-item d-flex align-items-center p-4">
		
			<img
				src="https://picsum.photos/id/1025/150/150" 
				alt={contact.name}
				className="rounded-circle me-4"
				style={{ width: "90px", height: "90px", objectFit: "cover" }}
			/>
			
			
			<div className="flex-grow-1">
				<h5 className="mb-2">{contact.name}</h5>
				<p className="mb-1 text-muted">
					<i className="fas fa-map-marker-alt me-2"></i>{contact.address}
				</p>
				<p className="mb-1 text-muted">
					<i className="fas fa-phone me-2"></i>{contact.phone}
				</p>
				<p className="mb-0 text-muted">
					<i className="fas fa-envelope me-2"></i>{contact.email}
				</p>
			</div>

			
			<div className="d-flex gap-3">
			
				<button 
					className="btn btn-link text-dark p-0" 
					onClick={() => navigate(`/edit-contact/${contact.id}`)}
				>
					<i className="fas fa-pencil-alt"></i>
				</button>
				
				<button 
					className="btn btn-link text-dark p-0" 
					onClick={() => actions.deleteContact(contact.id)}
				>
					<i className="fas fa-trash-alt"></i>
				</button>
			</div>
		</div>
	);
};
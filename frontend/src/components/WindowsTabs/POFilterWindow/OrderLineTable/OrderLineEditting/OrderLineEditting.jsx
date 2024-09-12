import PropTypes from "prop-types";
import { FormControl, Select, MenuItem, Button, TextField, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderLine } from "../../../../../redux/orderLinesSlice";

const OrderLineEditting = ({ data }) => {
	const [formData, setFormData] = useState({ ...data });
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Save handler to update the order line
	const handleSave = (updatedData) => {
		dispatch(updateOrderLine(updatedData));
	};

	return (
		<TableRow>
			<TableCell>{formData.customer_id}</TableCell>
			<TableCell>{formData.customer_po}</TableCell>
			<TableCell>{formData.order_date}</TableCell>
			<TableCell>
				<TextField value={formData.line_number} name="line_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.part_number} name="part_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.description} name="description" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.quantity || ""} name="quantity" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="ship_via" value={formData.ship_via} onChange={handleChange}>
						<MenuItem value="Exp">Exp</MenuItem>
						<MenuItem value="Air">Air</MenuItem>
						<MenuItem value="Sea">Sea</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<TextField value={formData.balance || ""} name="balance" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField name="required_date" type="date" value={formData.required_date} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField name="confirmed_date" type="date" value={formData.confirmed_date} onChange={handleChange} variant="outlined" />
			</TableCell>
			<TableCell>
				<TextField value={formData.dwg_number} name="dwg_number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.revision} name="revision" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.unit_price} name="dwg_number" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.material} name="material" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.weight} name="weight" type="number" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<TextField value={formData.factory} name="factory" variant="outlined" onChange={handleChange} />
			</TableCell>
			<TableCell>
				<FormControl variant="outlined">
					<Select name="status" value={formData.status} onChange={handleChange}>
						<MenuItem value="OPEN">OPEN</MenuItem>
						<MenuItem value="DELIVERED">DELIVERED</MenuItem>
						<MenuItem value="SHIPPED">SHIPPED</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
			<TableCell>
				<Button onClick={() => handleSave(formData)} variant="text">
					Save
				</Button>
			</TableCell>
		</TableRow>
	);
};

OrderLineEditting.propTypes = {
	data: PropTypes.shape({
		order_id: PropTypes.number.isRequired,
		customer_id: PropTypes.string.isRequired,
		customer_PO: PropTypes.string.isRequired,
		order_date: PropTypes.string.isRequired,
		orderline_id: PropTypes.number,
		line_number: PropTypes.string,
		part_number: PropTypes.string,
		description: PropTypes.string,
		quantity: PropTypes.number,
		ship_via: PropTypes.string,
		balance: PropTypes.number,
		required_date: PropTypes.string,
		original_confirm_date: PropTypes.string,
		updated_confirm_date: PropTypes.string,
		status: PropTypes.string,
	}).isRequired,
	onSave: PropTypes.func.isRequired,
};

export default OrderLineEditting;

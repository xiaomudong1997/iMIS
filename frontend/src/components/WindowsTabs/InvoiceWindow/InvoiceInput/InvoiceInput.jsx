import { Grid, Paper, Typography, Button, Divider, FormControl, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const InvoiceInput = ({ setData, setInvoiceTableStaticArr }) => {
	const [formData, setFormData] = useState({
		customerMapSub: {},
		selectedCustomerId: "",
		selectedSubId: "",
		customerPOMapOrderLines: {},
		selectedCustomerPO: "",
		selectedLineNumber: "",
	});

	const handleCustomerChange = (event) => {
		const newCustomerId = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedCustomerId: newCustomerId,
			selectedSubId: "",
			selectedCustomerPO: "",
			selectedLineNumber: "",
		}));
	};

	const handleSubIdChange = (event) => {
		const newSubId = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedSubId: newSubId,
			selectedCustomerPO: "",
			selectedLineNumber: "",
		}));
	};

	const handleCustomerPOChange = (event) => {
		const newCustomerPO = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedCustomerPO: newCustomerPO,
			selectedLineNumber: "",
		}));
	};

	const handleLineNumberChange = (event) => {
		const newLineNumber = event.target.value;
		setFormData((prev) => ({
			...prev,
			selectedLineNumber: newLineNumber,
		}));
	};

	const handleAddInvoiceLine = async () => {
		let customerId = formData.selectedCustomerId;
		if (formData.selectedSubId !== "None") {
			customerId += formData.selectedSubId;
		}

		const queryParams = new URLSearchParams({
			customer_id: customerId,
			customer_po: formData.selectedCustomerPO,
			line_number: formData.selectedLineNumber,
		}).toString();

		let orderLine;
		try {
			const response = await axios.get(`http://localhost:8000/order_lines/get/?${queryParams}`);
			orderLine = response.data[0];
			orderLine.total_price = orderLine.price * orderLine.quantity;
			setData((prev) => ({
				...prev,
				invoiceData: [...prev.invoiceData, orderLine],
			}));
		} catch (error) {
			console.error("Failed to fetch invoice line data:", error);
		}
		setInvoiceTableStaticArr((prev) => [...prev, true]);
	};

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await axios.get("http://localhost:8000/customers/");
				const customers = response.data;
				const map = {};
				for (let customer of customers) {
					const customerName = customer.name;
					if (customerName.length === 2 || customerName.length === 3) {
						map[customerName] = [];
					} else if (customerName.length === 5) {
						const customerId = customerName.slice(0, 2);
						const subId = customerName.slice(2, 5);
						if (!map[customerId]) {
							map[customerId] = [];
						}
						map[customerId].push(subId);
					} else if (customerName.length === 6) {
						const customerId = customerName.slice(0, 3);
						const subId = customerName.slice(3, 6);
						if (!map[customerId]) {
							map[customerId] = [];
						}
						map[customerId].push(subId);
					}
				}
				setFormData((prev) => ({
					...prev,
					customerMapSub: map,
				}));
			} catch (err) {
				console.error("Failed to fetch customers:", err);
			}
		};

		fetchCustomers();
	}, []);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				let fullCustomerId = formData.selectedCustomerId;
				if (formData.selectedSubId !== "None") {
					fullCustomerId += formData.selectedSubId;
				}

				const response = await axios.get(`http://localhost:8000/orders/?customer_id=${fullCustomerId}`);
				const orderLines = response.data;
				const map = {};
				for (let orderLine of orderLines) {
					if (!map[orderLine.customer_po]) {
						map[orderLine.customer_po] = [];
					}
					map[orderLine.customer_po].push(orderLine.line_number);
				}
				setFormData((prev) => ({
					...prev,
					customerPOMapOrderLines: map,
				}));
			} catch (err) {
				console.error("Failed to fetch orders:", err);
			}
		};

		fetchOrders();
	}, [formData.selectedSubId]);

	return (
		<Paper sx={{ padding: "16px" }}>
			<Box component="form" noValidate autoComplete="off">
				<Grid container spacing={2}>
					{/* Title for Invoice Info */}
					<Grid item xs={12}>
						<Typography variant="h6">Invoice Info</Typography>
						<Divider />
					</Grid>
					{/* Invoice Info Row */}
					<Grid container item spacing={2}>
						{/* Customer ID Dropdown */}
						<Grid item xs={3}>
							<FormControl fullWidth>
								<InputLabel id="customer-id-select-label">Customer ID</InputLabel>
								<Select
									labelId="customer-id-select-label"
									id="customer-id-select"
									value={formData.selectedCustomerId}
									label="Customer ID"
									onChange={handleCustomerChange}
								>
									{Object.keys(formData.customerMapSub).map((key) => (
										<MenuItem key={key} value={key}>
											{key}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						{/* Sub ID Dropdown */}
						{formData.selectedCustomerId && (
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id="sub-id-select-label">Sub ID</InputLabel>
									<Select labelId="sub-id-select-label" id="sub-id-select" value={formData.selectedSubId} label="Sub ID" onChange={handleSubIdChange}>
										{formData.customerMapSub[formData.selectedCustomerId].length === 0 && <MenuItem value="None">None</MenuItem>}
										{formData.customerMapSub[formData.selectedCustomerId] &&
											formData.customerMapSub[formData.selectedCustomerId].map((subId) => (
												<MenuItem key={subId} value={subId}>
													{subId}
												</MenuItem>
											))}
									</Select>
								</FormControl>
							</Grid>
						)}

						{/* PO Number Dropdown */}
						{formData.selectedSubId && (
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id="customer-po-select-label">PO Number</InputLabel>
									<Select
										labelId="customer-po-select-label"
										id="customer-po-select"
										value={formData.selectedCustomerPO}
										label="Customer PO"
										onChange={handleCustomerPOChange}
									>
										{Object.keys(formData.customerPOMapOrderLines).map((key) => (
											<MenuItem key={key} value={key}>
												{key}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						)}

						{/* Line Number Dropdown */}
						{formData.selectedCustomerPO && (
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id="line-number-select-label">Line Number</InputLabel>
									<Select
										labelId="line-number-select-label"
										id="line-number-select"
										value={formData.selectedLineNumber}
										label="Line Number"
										onChange={handleLineNumberChange}
									>
										{formData.customerPOMapOrderLines[formData.selectedCustomerPO].map((lineNumber) => (
											<MenuItem key={lineNumber} value={lineNumber}>
												{lineNumber}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						)}
						<Grid container item spacing={2}>
							<Grid item xs={3}>
								<Button disabled={!formData.selectedLineNumber} variant="contained" color="primary" onClick={handleAddInvoiceLine} fullWidth>
									Add Invoice Line
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
};

InvoiceInput.propTypes = {
	setData: PropTypes.func.isRequired,
	setInvoiceTableStaticArr: PropTypes.func.isRequired,
};

export default InvoiceInput;

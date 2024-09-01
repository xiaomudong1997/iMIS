import { Grid, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";

const ExtraChargeRow = ({ extraExpenseRow, setExtraExpenseRow, handleAddExtraExpense }) => {
	const handleExtraChargeEntryChange = (event) => {
		const newExtraChargeRow = {
			...extraExpenseRow,
			extraChargeEntry: event.target.value,
		};
		setExtraExpenseRow(newExtraChargeRow);
	};

	const handleCountChange = (event) => {
		const newExtraChargeRow = {
			...extraExpenseRow,
			count: event.target.value,
		};
		setExtraExpenseRow(newExtraChargeRow);
	};

	const handleChargeChange = (event) => {
		const newExtraChargeRow = {
			...extraExpenseRow,
			charge: event.target.value,
		};
		setExtraExpenseRow(newExtraChargeRow);
	};

	const handleExpenseChange = (event) => {
		const newExtraChargeRow = {
			...extraExpenseRow,
			expense: event.target.value,
		};
		setExtraExpenseRow(newExtraChargeRow);
	};

	return (
		<Grid container item spacing={2} alignItems="center">
			{/* Extra Charge Entry */}
			<Grid item xs={3}>
				{" "}
				{/* Adjust size as needed */}
				<TextField
					label="Extra Charge Entry"
					variant="outlined"
					fullWidth
					value={extraExpenseRow.extraChargeEntry}
					onChange={handleExtraChargeEntryChange}
				/>
			</Grid>

			{/* Count */}
			<Grid item xs={2}>
				{" "}
				{/* Adjust size as needed */}
				<TextField label="Count" variant="outlined" type="number" fullWidth value={extraExpenseRow.count} onChange={handleCountChange} />
			</Grid>

			{/* Charge */}
			<Grid item xs={2}>
				{" "}
				{/* Adjust size as needed */}
				<TextField label="Charge" variant="outlined" type="number" fullWidth value={extraExpenseRow.charge} onChange={handleChargeChange} />
			</Grid>

			{/* Expense */}
			<Grid item xs={3}>
				{" "}
				{/* Adjust size as needed */}
				<TextField label="Expense" variant="outlined" type="number" fullWidth value={extraExpenseRow.expense} onChange={handleExpenseChange} />
			</Grid>

			{/* Add Button */}
			<Grid item xs={2}>
				{" "}
				{/* Adjust size as needed */}
				<Button variant="contained" color="primary" fullWidth onClick={() => handleAddExtraExpense(extraExpenseRow)}>
					Add Extra Expense
				</Button>
			</Grid>
		</Grid>
	);
};

ExtraChargeRow.propTypes = {
	handleAddExtraExpense: PropTypes.func.isRequired,
	setExtraExpenseRow: PropTypes.func.isRequired,
	extraExpenseRow: PropTypes.shape({
		extraChargeEntry: PropTypes.string,
		count: PropTypes.string,
		charge: PropTypes.string,
		expense: PropTypes.string,
	}).isRequired,
};

export default ExtraChargeRow;

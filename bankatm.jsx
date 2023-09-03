import React from "react";
import ReactDOM from "react-dom";

const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        width="200"
        value="Submit"
        id="submit-input"
        disabled={!isValid}
      ></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    const inputValue = Number(event.target.value);

    // Check if the input is less than or equal to 0
    if (inputValue <= 0) {
      setValidTransaction(false);
      return;
    }

    // Check if the atmMode is Cash Back and input exceeds totalState
    if (atmMode === "Cash Back" && inputValue > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }

    setDeposit(inputValue);
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === "Deposit") {
      setIsDeposit(true);
    } else if (event.target.value === "Cash Back") {
      setIsDeposit(false);
    } else {
      setIsDeposit(true); // Default to Deposit mode if no option is selected
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select
          onChange={(e) => handleModeSelect(e)}
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
      </>
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById("root"));

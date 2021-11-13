export default function BuildSelectFormFromAnArray({
  optionsArray = [],
  selectLabel = "Please Select:",
  stateVariable,
  setStateVariable
}) {
  return (
    <label htmlFor="selectForm">
      {selectLabel}
      <select
        name="selectForm"
        title="Select Best Player in this Team:"
        value={stateVariable}
        onChange={(e) => setStateVariable(e.target.value)}
      >
        <option></option>
        {optionsArray.map((player) => (
          <option key={player} vlaue={player}>
            {player}
          </option>
        ))}
      </select>
    </label>
  );
}

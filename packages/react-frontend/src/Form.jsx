import React, { useState } from "react";

function Form(props) {
  //Use empty strings for initial text boxes
	const [person, setPerson] = useState({
		name: "",
		job: ""
	});

  //
	function handleChange(event) {
    //Handles change to data (text)
		const { name,value } = event.target;
		if (name === "job")
			setPerson({ name: person["name"], job: value });
		else setPerson( { name: value, job: person["job"] });
	}

	function submitForm() {
    //When button is clicked handle it and set person back to empty
		props.handleSubmit(person);
		setPerson({ name: "", job: "" });
	}

  //Return format for form
	return (
  <form>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      name="name"
      id="name"
      value={person.name}
      onChange={handleChange}
    />
    <label htmlFor="job">Job</label>
    <input
      type="text"
      name="job"
      id="job"
      value={person.job}
      onChange={handleChange}
    />
	<input type="button" value="Submit" onClick={submitForm} />
  </form>
);

}



export default Form;

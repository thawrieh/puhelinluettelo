const baseUrl = "http://localhost:3001/persons";

const getAllPersons = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch persons");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getAllPersons: ${error.message}`);
  }
};

const addPerson = async (newPerson) => {
  try {
    debugger;
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });

    if (!response.ok) {
      throw new Error("Failed to add person");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in addPerson: ${error.message}`);
  }
};

const deletePerson = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete person");
    }
  } catch (error) {
    throw new Error(`Error in deletePerson: ${error.message}`);
  }
};

const personService = {
  getAllPersons,
  addPerson,
  deletePerson,
};

export default personService;

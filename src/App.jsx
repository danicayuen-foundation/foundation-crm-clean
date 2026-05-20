import { useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState([
    {
      name: "Andrew Mickus",
      company: "BorgWarner",
      title: "Director Shared Services",
      status: "Connected",
      date: "2026-05-19"
    }
  ]);

  function addContact() {
    setContacts([
      ...contacts,
      {
        name: "New Contact",
        company: "New Company",
        title: "Title",
        status: "Researching",
        date: new Date().toISOString().slice(0, 10)
      }
    ]);
  }

  function updateContact(index, field, value) {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  }

  function deleteContact(index) {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  }

  return (
    <div className="page">
      <div className="topBar">
        <div>
          <h1>Foundation GTM Command Center</h1>
          <p>Humanoid robotics outreach CRM</p>
        </div>

        <button onClick={addContact}>
          Add Contact
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date Added</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={contact.name}
                    onChange={(e) =>
                      updateContact(index, "name", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={contact.company}
                    onChange={(e) =>
                      updateContact(index, "company", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={contact.title}
                    onChange={(e) =>
                      updateContact(index, "title", e.target.value)
                    }
                  />
                </td>

                <td>
                  <select
                    value={contact.status}
                    onChange={(e) =>
                      updateContact(index, "status", e.target.value)
                    }
                  >
                    <option>Researching</option>
                    <option>LinkedIn Sent</option>
                    <option>Connected</option>
                    <option>Meeting Booked</option>
                  </select>
                </td>

                <td>{contact.date}</td>

                <td>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteContact(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

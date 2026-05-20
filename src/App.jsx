import { useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState([
    {
      name: "Andrew Mickus",
      company: "BorgWarner",
      title: "Director Shared Services and Facilities",
      status: "LinkedIn Sent",
      nextAction: "Follow up in 5 days",
      dateAdded: "2026-05-19",
      linkedin: ""
    },
    {
      name: "Neil Boehm",
      company: "Gentex",
      title: "COO & CTO",
      status: "Connected",
      nextAction: "Send pilot use case",
      dateAdded: "2026-05-19",
      linkedin: ""
    }
  ]);

  const [companies, setCompanies] = useState([
    {
      company: "BorgWarner",
      plants: "80+",
      locations: "US, Germany, Italy",
      priority: "A"
    },
    {
      company: "Gentex",
      plants: "10+",
      locations: "Michigan, US",
      priority: "A"
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
        nextAction: "Find LinkedIn",
        dateAdded: new Date().toISOString().slice(0, 10),
        linkedin: ""
      }
    ]);
  }

  function addCompany() {
    setCompanies([
      ...companies,
      {
        company: "New Company",
        plants: "",
        locations: "",
        priority: "B"
      }
    ]);
  }

  function updateContact(index, field, value) {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  }

  function updateCompany(index, field, value) {
    const updated = [...companies];
    updated[index][field] = value;
    setCompanies(updated);
  }

  function deleteContact(index) {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  }

  function deleteCompany(index) {
    const updated = companies.filter((_, i) => i !== index);
    setCompanies(updated);
  }

  function exportCSV() {
    const rows = [
      [
        "Name",
        "Company",
        "Title",
        "Status",
        "Next Action",
        "Date Added"
      ],
      ...contacts.map((c) => [
        c.name,
        c.company,
        c.title,
        c.status,
        c.nextAction,
        c.dateAdded
      ])
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "foundation_crm.csv");

    document.body.appendChild(link);
    link.click();
  }
function handleScreenshotUpload(event) {
  const file = event.target.files[0];

  if (!file) return;

  const fakeAIContact = {
    name: "AI Parsed Contact",
    company: "Detected Company",
    title: "Detected Title",
    status: "Researching",
    date: new Date().toISOString().slice(0, 10)
  };

  setContacts((prev) => [...prev, fakeAIContact]);

  alert(
    "Screenshot uploaded. AI parsing simulation complete."
  );
}
  
  
  
  return (
    <div className="page">
      <div className="topBar">
        <div>
          <h1>Foundation GTM Command Center</h1>

          <p>
            LinkedIn outreach tracker for humanoid robotics sales into auto
            manufacturers.
          </p>
        </div>

        <div className="buttonRow">
          <button onClick={exportCSV}>
            Export Excel
          </button>

          <div>
  <input
    type="file"
    id="aiUpload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleScreenshotUpload}
  />

  <button onClick={() => document.getElementById("aiUpload").click()}>
    AI Screenshot Upload
  </button>
</div>

          <button onClick={addContact}>
            Add Contact
          </button>

          <button onClick={addCompany}>
            Add Company
          </button>
        </div>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <h3>Accounts</h3>
          <h1>{companies.length}</h1>
        </div>

        <div className="statCard">
          <h3>Contacts</h3>
          <h1>{contacts.length}</h1>
        </div>

        <div className="statCard">
          <h3>Outreach Sent</h3>
          <h1>
            {
              contacts.filter(
                (c) =>
                  c.status === "LinkedIn Sent" ||
                  c.status === "Connected"
              ).length
            }
          </h1>
        </div>

        <div className="statCard">
          <h3>Meetings</h3>
          <h1>
            {
              contacts.filter(
                (c) => c.status === "Meeting Booked"
              ).length
            }
          </h1>
        </div>
      </div>

      <div className="card">
        <div className="sectionHeader">
          <h2>Contacts Workflow</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Title</th>
              <th>Status</th>
              <th>Next Action</th>
              <th>Date Added</th>
              <th>LinkedIn</th>
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
                    <option>Pilot Discussion</option>
                  </select>
                </td>

                <td>
                  <input
                    value={contact.nextAction}
                    onChange={(e) =>
                      updateContact(index, "nextAction", e.target.value)
                    }
                  />
                </td>

                <td>{contact.dateAdded}</td>

                <td>
                  <input
                    value={contact.linkedin}
                    placeholder="Paste URL"
                    onChange={(e) =>
                      updateContact(index, "linkedin", e.target.value)
                    }
                  />
                </td>

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

      <div className="card">
        <div className="sectionHeader">
          <h2>Target Companies</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th># Plants</th>
              <th>Locations</th>
              <th>Priority</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={company.company}
                    onChange={(e) =>
                      updateCompany(index, "company", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={company.plants}
                    onChange={(e) =>
                      updateCompany(index, "plants", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={company.locations}
                    onChange={(e) =>
                      updateCompany(index, "locations", e.target.value)
                    }
                  />
                </td>

                <td>
                  <select
                    value={company.priority}
                    onChange={(e) =>
                      updateCompany(index, "priority", e.target.value)
                    }
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </td>

                <td>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteCompany(index)}
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

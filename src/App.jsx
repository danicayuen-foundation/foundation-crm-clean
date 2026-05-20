import { useState } from "react";
import Tesseract from "tesseract.js";

export default function App() {
  const [contacts, setContacts] = useState([
    {
      name: "Andrew Mickus",
      company: "BorgWarner",
      title: "Director Shared Services",
      status: "Connected",
      date: "2026-05-19"
    },
    {
      name: "Neil Boehm",
      company: "Gentex",
      title: "COO & CTO",
      status: "LinkedIn Sent",
      date: "2026-05-19"
    }
  ]);

  const [companies, setCompanies] = useState([
    {
      company: "BorgWarner",
      stage: "Outreach",
      owner: "Danica"
    },
    {
      company: "Gentex",
      stage: "Connected",
      owner: "Danica"
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

  function addCompany() {
    setCompanies([
      ...companies,
      {
        company: "New Company",
        stage: "Researching",
        owner: "Danica"
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

  function exportExcel() {
    const data = JSON.stringify(contacts, null, 2);

    const blob = new Blob([data], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "foundation-crm.json";

    a.click();
  }

  function handleScreenshotUpload(event) {
    async function handleScreenshotUpload(event) {
  const file = event.target.files[0];

  if (!file) return;

  alert("AI is analyzing screenshot...");

  const result = await Tesseract.recognize(
    file,
    "eng"
  );

  const text = result.data.text;

  console.log(text);

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 2);

  const detectedName = lines[0] || "Unknown Name";

  const detectedTitle =
    lines[1] || "Unknown Title";

  const detectedCompany =
    lines[2] || "Unknown Company";

  const aiContact = {
    name: detectedName,
    company: detectedCompany,
    title: detectedTitle,
    status: "Researching",
    nextAction: "AI imported",
    dateAdded: new Date()
      .toISOString()
      .slice(0, 10),
    linkedin: ""
  };

  setContacts((prev) => [
    ...prev,
    aiContact
  ]);

  alert("AI contact added successfully.");
}
  }

  return (
    <div className="page">

      <div className="topBar">

        <div>
          <h1>Foundation GTM Command Center</h1>

          <p>
            LinkedIn outreach tracker for humanoid robotics
            sales into auto manufacturers.
          </p>
        </div>

        <div className="topButtons">

          <button onClick={exportExcel}>
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

            <button
              onClick={() =>
                document.getElementById("aiUpload").click()
              }
            >
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
          <p>Accounts</p>
          <h2>{companies.length}</h2>
        </div>

        <div className="statCard">
          <p>Contacts</p>
          <h2>{contacts.length}</h2>
        </div>

        <div className="statCard">
          <p>Outreach Sent</p>
          <h2>
            {
              contacts.filter(
                (c) =>
                  c.status === "LinkedIn Sent" ||
                  c.status === "Connected"
              ).length
            }
          </h2>
        </div>

        <div className="statCard">
          <p>Meetings</p>
          <h2>
            {
              contacts.filter(
                (c) =>
                  c.status === "Meeting Booked"
              ).length
            }
          </h2>
        </div>

      </div>

      <div className="card">

        <h2>Contacts Workflow</h2>

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
                      updateContact(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    value={contact.company}
                    onChange={(e) =>
                      updateContact(
                        index,
                        "company",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    value={contact.title}
                    onChange={(e) =>
                      updateContact(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td>
                  <select
                    value={contact.status}
                    onChange={(e) =>
                      updateContact(
                        index,
                        "status",
                        e.target.value
                      )
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
                    onClick={() =>
                      deleteContact(index)
                    }
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

        <h2>Company Pipeline</h2>

        <div className="companyGrid">

          {companies.map((company, index) => (

            <div
              className="companyCard"
              key={index}
            >

              <input
                value={company.company}
                onChange={(e) =>
                  updateCompany(
                    index,
                    "company",
                    e.target.value
                  )
                }
              />

              <br />
              <br />

              <select
                value={company.stage}
                onChange={(e) =>
                  updateCompany(
                    index,
                    "stage",
                    e.target.value
                  )
                }
              >
                <option>Researching</option>
                <option>Outreach</option>
                <option>Connected</option>
                <option>Pilot Discussion</option>
                <option>Deployment</option>
              </select>

              <br />
              <br />

              <input
                value={company.owner}
                onChange={(e) =>
                  updateCompany(
                    index,
                    "owner",
                    e.target.value
                  )
                }
              />

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

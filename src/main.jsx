import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Plus } from "lucide-react";
import "./style.css";

function App() {
  const [contacts, setContacts] = useState([
    {
      name: "Andrew Mickus",
      company: "BorgWarner",
      title: "Director Shared Services and Facilities",
      status: "LinkedIn Sent",
      next: "Follow up in 5 days"
    },
    {
      name: "Neil Boehm",
      company: "Gentex",
      title: "COO & CTO",
      status: "Connected",
      next: "Send pilot use case"
    }
  ]);

  function addContact() {
    setContacts([
      {
        name: "New Contact",
        company: "New Company",
        title: "Title",
        status: "Researching",
        next: "Find LinkedIn"
      },
      ...contacts
    ]);
  }

  return (
    <div className="page">
      <header>
        <h1>Foundation GTM Command Center</h1>
        <p>LinkedIn outreach tracker for humanoid robotics sales into auto manufacturers.</p>
      </header>

      <section className="stats">
        <div><span>Accounts</span><b>3</b></div>
        <div><span>Contacts</span><b>{contacts.length}</b></div>
        <div><span>Outreach Sent</span><b>{contacts.filter(c => c.status !== "Researching").length}</b></div>
        <div><span>Meetings</span><b>0</b></div>
      </section>

      <section className="panel">
        <div className="panelTop">
          <h2>Contacts Workflow</h2>
          <button onClick={addContact}><Plus size={16} /> Add Contact</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Title</th>
              <th>Status</th>
              <th>Next Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.company}</td>
                <td>{c.title}</td>
                <td>
                  <select
                    value={c.status}
                    onChange={(e) => {
                      const copy = [...contacts];
                      copy[i].status = e.target.value;
                      setContacts(copy);
                    }}
                  >
                    <option>Researching</option>
                    <option>LinkedIn Sent</option>
                    <option>Connected</option>
                    <option>Follow-Up Sent</option>
                    <option>Replied</option>
                    <option>Meeting Booked</option>
                  </select>
                </td>
                <td>{c.next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>Suggested Outreach Angle</h2>
        <p>
          Lead with labor constraints, flexible humanoid deployment, line-side logistics,
          material handling, and pilot-friendly use cases.
        </p>
      </section>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

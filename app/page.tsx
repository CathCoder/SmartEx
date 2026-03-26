'use client';

import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type User = {
  id: number;
  name: string;
};

export default function Home() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  // 🔹 Fetch users from API
  const fetchUsers = async () => {
    const res = await fetch('/api/user');
    const data = await res.json();
    setUsers(data);
  };

  // 🔹 Add user (POST API)
  const addUser = async () => {
    if (!name) return;

    await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    setName('');
    fetchUsers(); // refresh table
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2>Next.js + PrimeReact + SQLite</h2>

      {/* 🔹 Add User Section */}
      <div className="flex gap-2 mb-4">
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <Button
          label="Add User"
          icon="pi pi-plus"
          onClick={addUser}
        />
      </div>

      {/* 🔹 Data Table */}
      <DataTable value={users} paginator rows={5}>
        <Column field="id" header="ID" />
        <Column field="name" header="Name" />
      </DataTable>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

type User = { id: number; name: string };

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home', key: 'dashboard' },
  { label: 'Budget', icon: 'pi pi-dollar', key: 'budget' },
  { label: 'Expense', icon: 'pi pi-wallet', key: 'expense' },
  { label: 'Reports', icon: 'pi pi-chart-line', key: 'reports' },
  { label: 'User', icon: 'pi pi-user', key: 'user' },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const activeItem = menuItems[activeIndex];

  const fetchUsers = async () => {
    const res = await fetch('/api/user');
    setUsers(await res.json());
  };

  const addUser = async () => {
    if (!name) return;
    await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Navigation */}
      <div className="   p-4 flex  ">
        <div className="mb-8 text-center">
        
          <h1 className="text-2xl font-bold text-amber-50"> <i className="pi pi-wallet  "></i> Smartex  </h1>
        </div>
        {/* Additional nav items can go here if needed */}
      </div>

      {/* Main Content */}
      <div className="flex-1 ">
        <div className="relative mb-6 flex justify-center">
          <TabMenu
            model={menuItems}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
            className="bg-transparent border-none"
          />

          <div className="pointer-events-none absolute inset-0 rounded-lg"
               style={{
                  
                 animation: 'fadePulse 4s ease-in-out infinite',
                 zIndex: -1,
               }}
          />
        </div>

        <style jsx>{`
          @keyframes fadePulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
        `}</style>

        <div className="mb-4 text-center">
          <p className="font-semibold text-amber-50">Active Tab: {activeItem.label}</p>
        </div>

        {activeItem.key === 'user' && (
          <>
            <div className="flex gap-2 mb-4 justify-center">
              <InputText
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
              <Button label="Add User" icon="pi pi-plus" onClick={addUser} />
            </div>

            <DataTable value={users} paginator rows={5} className="mx-auto" style={{ maxWidth: '800px' }}>
              <Column field="id" header="ID" />
              <Column field="name" header="Name" />
            </DataTable>
          </>
        )}
      </div>
    </div>
  );
}
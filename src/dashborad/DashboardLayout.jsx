import { useState } from "react";
import AddItem from "../admin/AddItem";
import ContactList from "./ContactList";
import FeedbackList from "./FeedbackList";
import Event from "./Event";
import MenuList from "../admin/MenuList";

const SidebarMenu = [
  { id: 1, name: "Add Item" },
  { id: 2, name: "Manage Menu" },
  { id: 3, name: "Contact Data" },
  { id: 4, name: "Feedback Data" },
  { id: 5, name: "Event" },
];

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState(1);

  const renderTab = () => {
    switch (activeTab) {
      case 1:
        return <AddItem />;
      case 2:
        return <MenuList />;
      case 3:
        return <ContactList />;
      case 4:
        return <FeedbackList />;
        case 5:
          return <Event/>
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-6 hidden md:block">
        <h2 className="text-3xl font-bold mb-10">🍽️ Dashboard</h2>
        <ul className="space-y-4">
          {SidebarMenu.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`cursor-pointer hover:text-pink-400 transition font-medium ${
                activeTab === item.id ? "text-pink-500" : ""
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 z-50 bg-[#2c5364] w-full text-white flex justify-between items-center px-6 py-4 shadow">
        <h2 className="text-xl font-bold">🍽️ Dashboard</h2>
        <select
          onChange={(e) => setActiveTab(Number(e.target.value))}
          value={activeTab}
          className="bg-[#1a2a36] text-white p-2 rounded-md"
        >
          {SidebarMenu.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 mt-16 md:mt-0 bg-gray-100 dark:bg-[#1f2937]">
        {renderTab()}
      </div>
    </div>
  );
}

export default DashboardLayout;

import React from 'react';

function Navbar({ menuCategories, activeTab, handleTabClick }) {
  return (
    <nav className="navbar">
      <ul className="nav nav-pills">
        {menuCategories.map((category) => (
          <li key={category.menu_category_id} className="nav-item">
            <div
              className={`nav-link ${activeTab === category.menu_category_id ? 'active' : ''}`}
              onClick={() => handleTabClick(category.menu_category_id)}
            >
              {category.menu_category}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

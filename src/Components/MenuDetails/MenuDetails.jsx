import React from 'react';

function MenuDetails({ menuCategories, activeTab, cart, handleAddToCart, handleRemoveFromCart }) {
  return (
    <div className="menu-details-container">
      {menuCategories.map((category) => (
        <div key={category.menu_category_id} className={`category ${category.menu_category_id === activeTab ? 'active' : ''}`}>
          <ul className="list-group">
            {category.category_dishes.map((dish) => (
              <li key={dish.dish_id} className="list-group-item">
                <div className="dish">
                  <div className="dish-details">
                    <h3>{dish.dish_name}</h3>
                    <p className="dish-price">{dish.dish_currency} {dish.dish_price.toFixed(2)}</p>
                    <p className="dish-description">{dish.dish_description}</p>
                    <div className="action-container">
                      <div className="count-btn">
                        <button onClick={() => handleRemoveFromCart(dish)}>-</button>
                        <div className="count">{cart[dish.dish_id] || 0}</div>
                        <button onClick={() => handleAddToCart(dish)}>+</button>
                      </div>
                    </div>
                    {dish.addonCat && <p className="customizations">Customizations available</p>}
                  </div>
                  <p className="dish-calories">{dish.dish_calories} Calories</p>
                  <img src={dish.dish_image} alt={dish.dish_name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MenuDetails;

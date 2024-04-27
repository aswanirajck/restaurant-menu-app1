import React, { useState, useEffect } from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { fetchData } from './utils/api';
import MenuDetails from './Components/MenuDetails/MenuDetails';
import Navbar from './Components/NavBar/NavBar';

function App() {
  const [dishes, setDishes] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (dishes && dishes.data.length > 0) {
      setActiveTab(dishes.data[0]?.table_menu_list[0]?.menu_category_id || '');
    }
  }, [dishes]);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    const category = document.getElementById(categoryId);
    if (category) {
      const navbarHeight = document.querySelector('.restaurant-info').offsetHeight;
      window.scrollTo({
        top: category.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (dish) => {
    const count = cart[dish.dish_id] || 0;
    setCart({ ...cart, [dish.dish_id]: count + 1 });
  };

  const handleRemoveFromCart = (dish) => {
    const count = cart[dish.dish_id] || 0;
    if (count > 0) {
      setCart({ ...cart, [dish.dish_id]: count - 1 });
    }
  };

  return (
    <div>
      <Provider store={store}>
        <div className="restaurant-info">
          <ul>
            <li><strong>{dishes?.data?.[0]?.restaurant_name}</strong></li>
            <li className="cart">
              My Orders <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-count">
                {Object.values(cart).reduce((acc, curr) => acc + curr, 0)}
              </span>
            </li>
          </ul>
        </div>

        <Navbar
          menuCategories={dishes?.data?.[0]?.table_menu_list || []}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />

        <div className="menu-details-container">
          <MenuDetails
            menuCategories={dishes?.data?.[0]?.table_menu_list || []}
            activeTab={activeTab}
            cart={cart}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      </Provider>
    </div>
  );
}

export default App;

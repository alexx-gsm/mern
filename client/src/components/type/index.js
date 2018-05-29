import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="page page--type">
      <h2>Choose</h2>
      <ul>
        <li>
          <Link to="/dishes" className="btn btn-lg btn-info mr-2">
            Блюда
          </Link>
        </li>
        <li>
          <Link to="/delivery" className="btn btn-lg btn-info mr-2">
            Доставка
          </Link>
        </li>
        <li>
          <Link to="/delivery" className="btn btn-lg btn-info mr-2">
            Столовая
          </Link>
        </li>
      </ul>
    </div>
  );
};

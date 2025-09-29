import React from "react";
import './ListingCard.css'
import {Link} from "react-router-dom"

export default function ListingCard({ item }) {
  return (
    <div className="card">
      <img src={item.img} alt={item.title} />
      <div className="card-body">
        <div>
          <div id={`title-${item.id}`} className="card-title">
            {item.title}
          </div>
          <div className="card-meta">{item.location}</div>
        </div>
        <div className="price">
          {item.price}
        </div>
      </div>
      <div className="card-footer">
        <div>2 часа назад</div>
        {/*{<Link to={"../pages/ProductOne.jsx"}><b>Подробнее →</b></Link>}*/}
        <Link to={`/pages/${item.id}`} target="_blank">Узнать больше...</Link>
      </div>
    </div>
  );
}

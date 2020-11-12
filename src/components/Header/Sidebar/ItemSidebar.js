import React from 'react';

function ItemSidebar({ truePic, user_name, viewer_count, gameName }) {
  return (
    <li className="item-sidebar">
      <img src={truePic} alt="logo user" className="item-sidebar-img" />
      <div className="item-sidebar-user">{user_name}</div>
      <div className="item-sidebar-viewer">
        <div className="item-sidebar-redpoint" />
        <div>{viewer_count}</div>
      </div>
      <div className="item-sidebar-game">{gameName}</div>
    </li>
  );
}

export default ItemSidebar;

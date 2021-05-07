import React, { useState, useEffect } from 'react';
import './styles.css';
import json from "../data/faculty.json"


function pageData({ data, per = 50, page = 1 }) {
  return data.slice(per * (page - 1), per * page);
}


export default function App() {
  // page:
  const [state, setState] = useState({
    data: pageData({ data: json }),
    loading: false,
    page: 1,
    sortedBy: { first_name: 'ascending' },
  });

  return (
    <div>
      Hello
    </div>
  )

}

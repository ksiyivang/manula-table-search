import React, { useState, useEffect } from 'react';
import Tr from './tr';


// 
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
    sortedBy: { faculty_name: 'ascending' },
  });

  return (
    <div>
      Hello



      <>
        <Tr label='ລະຫັດ' />
        <Tr
          label='ຊື່່'
          sortedBy={state.sortedBy}
          sort={{ key: 'first_name', changer: setState }}
        />
        <Tr
          label='ນາມສະກຸນ'
          sortedBy={state.sortedBy}
          sort={{ key: 'last_name', changer: setState }}
        />
        <Tr
          label='ອີເມວ'
          sortedBy={state.sortedBy}
          sort={{ key: 'email', changer: setState }}
        />
        <Tr label='ເພດ' />
      </>



    </div>
  )

}

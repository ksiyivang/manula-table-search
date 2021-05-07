import React, { useState, useEffect } from 'react';

import Tr from './tr';
import TextField from '../ui/text-field';

// 
import './styles.css';
import json from "../data/faculty.json"


const searchableColumns = ['faculty_name'];



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

  // useState
  const [query, setQuery] = useState('');

  // useEffect

  useEffect(() => {
    if (!state.sortedBy) return;
    const sortKey = Object.keys(state.sortedBy)[0];
    const direction = state.sortedBy[sortKey];

    setState((prev) => ({
      ...prev,
      data: prev.data.sort((a, b) => {
        return direction === 'ascending'
          ? a[sortKey] > b[sortKey]
          : a[sortKey] < b[sortKey];
      }),
    }));
  }, [state.sortedBy]);


  useEffect(() => {
    setState((prev) => ({
      ...prev,
      data: search(json),
    }));
  }, [query]);

  // function
  function search(data) {
    return data.filter((row) =>
      searchableColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1,
      ),
    );
  }

  return (
    <div>
      Hello

      <TextField
        placeholder='ກະລຸນາປ້ອນຊື່ຄະນະ'
        value={query}
        onChange={(val) => setQuery(val)}
      />

      <>
        <Tr label='ລະຫັດ' />
        <Tr
          label='ຊື່່ຄະນະ'
          sortedBy={state.sortedBy}
          sort={{ key: 'faculty_name', changer: setState }}
        />
      </>



    </div>
  )

}

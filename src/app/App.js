import React, { useState, useEffect } from 'react';

import Tr from './tr';
import TextField from '../ui/text-field';
import DataTable from '../ui/data-table';

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
  const [additionalData, setAdditionalData] = useState([]);

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

  function loadMore() {
    if (state.loading) return;
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    setState((prev) => ({
      data: [
        ...prev.data,
        ...pageData({ data: json, page: prev.page + 1 }),
      ],
      loading: false,
      page: prev.page + 1,
    }));
  }

  function toggleAdditionalData(row) {
    setAdditionalData((prev) =>
      additionalData.includes(row.id)
        ? prev.filter((id) => row.id !== id)
        : [...prev, row.id],
    );
  }
  function _onClickDetail(e) {
    e.preventDefault();
    console.log("id: ")
  }

  return (
    <div>
      Hello

      <TextField
        placeholder='ກະລຸນາປ້ອນຊື່ຄະນະ'
        value={query}
        onChange={(val) => setQuery(val)}
      />
      <DataTable
        loadMore={loadMore}
        items={state.data}
        renderHead={() => (
          <>
            <Tr label='ລະຫັດ' />
            <Tr
              label='ຊື່່ຄະນະ'
              sortedBy={state.sortedBy}
              sort={{ key: 'faculty_name', changer: setState }}
            />
          </>
        )}
        renderRow={(row) => (
          <>
            <tr onClick={(e) => { _onClickDetail(e) }}>
              <td
              // onClick={() => toggleAdditionalData(row)}
              >
                {row.faculty_id}
              </td>
              <td
              // onClick={() => toggleAdditionalData(row)}
              >
                {row.faculty_name}
              </td>
            </tr>
            {/* {additionalData.includes(row.id) ? (
              <tr>
                <td colSpan={6}>{row.ip_address}</td>
              </tr>
            ) : null} */}
          </>
        )}
      />

    </div >
  )

}

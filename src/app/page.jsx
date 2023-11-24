"use client"
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Link from 'next/link'

// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// import {InputText} from 'primereact/inputtext';

import 'primeicons/primeicons.css';
        
export default function Home() {
  const [dataForTable, setDataForTable] = useState([]);
useEffect(() => {
try {
  const endpoint = '//localhost:4000/graphql';
  axios.post(endpoint, {
    query:`query GetAllStudents {
      getAllStudents {
        roll_no
        first_name
        last_name
        email
      }
    }
    `
  })
  .then((res) => {
    const data = res.data.data.getAllStudents;
    setDataForTable(data);
  }
  );
} catch (error) {
  console.log(error);
}
},[]);


const deleteStudent = (id) => {
  const idForQuery = id.toString();
  try {
    const endpoint = '//localhost:4000/graphql';
    axios.post(endpoint, {
      query:`mutation DeleteStudent($deleteStudentRollNo: ID!) {
        deleteStudent(roll_no: $deleteStudentRollNo) {
          roll_no
        }
      }
      `,
      variables: {
        deleteStudentRollNo : idForQuery
      }
    })
    .then(() => {
     const newData = dataForTable.filter((item) => item.roll_no !== idForQuery);
      setDataForTable(newData);
    }
    );
  } catch (error) {
    console.log(error);
  }
}


const actionButtons=(record) =>{
  return (
    <div>
      <Link href="/updatepage">
        <button className="p-button p-button-rounded p-button-success">Edit</button>
      </Link>
      <button className="p-button p-button-rounded p-button-danger" onClick={() => deleteStudent(record.roll_no)}>Delete</button>
    </div>
  )
}
  return (
    <>
    <div>
      <h1>Home</h1>
    </div>
    
      <div>
      <DataTable value={dataForTable} tableStyle={{ minWidth: '50rem' }}>
        <Column field="roll_no" header="Roll No"></Column>
        <Column field="first_name" header="First Name"></Column>
        <Column field="last_name" header="Last Name"></Column>
        <Column field="email" header="EMAIL"></Column>
        <Column header="ACTION" body={actionButtons}></Column>
      </DataTable>
      </div>
      <div>
        <Link href="/createpage">
          <button className="p-button p-button-rounded p-button-success">Add Student</button>
        </Link>
      </div>
    </>
  )
}

"use client"
import React from 'react'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import axios from 'axios';


const Update = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      try {
        const endpoint = '//localhost:4000/graphql';
    axios.post(endpoint, {
      query:`mutation CreateStudent($StudentFirstName: String!, $StudentLastName: String!, $StudentEmail: String!) {
        createStudent(first_name: $StudentFirstName, last_name: $StudentLastName, email: $StudentEmail) {
          roll_no
        }
      }
      `,
      variables: {
        StudentFirstName : data.firstname,
        StudentLastName : data.lastname,
        StudentEmail : data.email
        
      }
    })
    .then(() => {
      router.push('/');
    }
    );
      } catch (error) {
        console.log(error);
      }
        
    }


    return (
        <>
            <div>
                <form className='flex flex-col py-5 mx-5 ' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="firstname">First Name</label>
                    <input className='' type="firstname" id="firstname" name="firstname" {...register("firstname" ,{ required: true })} />
                    <label htmlFor="lastname">Last Name</label>
                    <input className='' type="lastname" id="lastname" name="lastname" {...register("lastname", { required: true })} />
                    <label htmlFor="email">Email</label>
                    <input className='' type="email" id="email" name="email" {...register("email", { required: true })} />
                    <button type="submit">Create Record</button>
                </form>
            </div>
            <br />
            <Link className='' href='/'>HOME</Link>
        </>
    )
}

export default Update
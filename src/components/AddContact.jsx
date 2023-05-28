import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddContact = (props) => {
  const initialValues = {
    name: '',
    phone: '',
    address: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
 
      props.createContact({
        name: values.name,
        phone: values.phone,
        address: values.address,
      });

    // Reset the form after submission
    resetForm();
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="address" component="div" className="text-red-500" />
          </div>
          <button
            type="submit"
            className="block w-full bg-green-400 text-black font-bold p-4 rounded-lg hover:bg-green-500"
          >
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddContact;

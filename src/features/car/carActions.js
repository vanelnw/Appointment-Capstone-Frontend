/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toast } from 'react-toastify';

const backendURL = 'http://127.0.0.1:4000';

const token = localStorage.getItem('userToken');

export const fetchItems = createAsyncThunk('cardata/fetchItems', async (_, { rejectWithValue }) => {
  try {
    const jwtToken = localStorage.getItem('userToken'); // assuming your JWT token is stored in your Redux store
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    const response = await fetch('http://127.0.0.1:4000/api/v1/cars', {
      headers,
    });
    const cardata = await response.json();

    return cardata;
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });

    return rejectWithValue(message);
  }
});

export const deleteCar = createAsyncThunk(
  'car/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${backendURL}/api/v1/cars/${id}`, config,
      );

      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      const message = error.response ? error.response.data.message : error.message;
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return rejectWithValue(message);
    }
  },
);

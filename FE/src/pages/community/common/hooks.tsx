import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../..";

export function useFetchPage(url: string, page: number, size: number) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: BASE_URL + url,
      params: { page, size },
    })
      .then((res) => {
        setData(res.data.object.content ?? res.data.object);
      })
      // .catch((err) => console.log(err));
  }, [url, page, size]);
  return [data, setData];
}

export function useFetchItem(url: string, initialState: any) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
      // .catch((err) => console.log(err));
  }, [url]);
  return [data, setData];
}

export function useFetchAndUpdate(url: string, dep: any) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
      // .catch((err) => console.log(err));
  }, [url, dep]);
  return data;
}

export function useFetchListAndUpdate(url: string, dep: any) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
      // .catch((err) => console.log(err));
  }, [url, dep]);
  return [data, setData];
}

export function useFetchList(url: string) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
      // .catch((err) => console.log(err));
  }, [url]);
  return data;
}

interface MyEventTarget {
  name: string;
  value: string;
}
export function useInputs(initialForm: object) {
  const [form, setForm] = useState<object>(initialForm);

  const handleChange = useCallback((e: { target: MyEventTarget }) => {
    if (!e.target) return;
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  return [form, handleChange];
}

export function useFetchHit(url: string) {
  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      method: "put",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
  }, [url]);
  return data;
}

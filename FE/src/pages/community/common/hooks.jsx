import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../..";

export function useFetchPage(url, page, size) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: BASE_URL + url,
      params: { page, size },
    })
      .then((res) => {
        setData(res.data.object);
      })
      .catch((err) => console.log(err));
  }, [url, page, size]);
  return [data, setData];
}

export function useFetchItem(url, initialState) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
      .catch((err) => console.log(err));
  }, [url]);
  return [data, setData];
}

export function useFetchAndUpdate(url, dep) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
      .catch((err) => console.log(err));
  }, [url, dep]);
  return data;
}

export function useFetchList(url) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url,
    })
      .then((res) => {
        setData(res.data.object);
      })
      .catch((err) => console.log(err));
  }, [url]);
  return data;
}

export function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    if (!e.target) {
      setForm(e);
      return;
    }
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  return [form, onChange];
}

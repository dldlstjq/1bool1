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
  return data;
}

export function useFetchItem(url) {
  const [data, setData] = useState({});

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

export function useFetchListAndUpdate(url, extra) {
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
  }, [url, extra]);
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

// export function useFetchIfUpdate(url, isUpdate) {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     if (!isUpdate) return;
//     axios({
//       method: "get",
//       url: BASE_URL + url,
//     })
//       .then((res) => {
//         setData(res.data.object);
//       })
//       .catch((err) => console.log(err));
//   }, [url, isUpdate]);
//   return data;
// }

// export function usePost() {}

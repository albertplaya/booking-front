import { Criteria } from "./../types/Criteria";
import { FilterCriteria } from "./../use/FilterCriteria";
import { ErrorResponse } from "@/types/Form/ErrorResponse";

export async function postData(url: string = "", data = {}) {
  const domain: string = import.meta.env.VITE_API_URL;
  const response = await fetch(domain + url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });

  if (response.status === 400) {
    const result = await response.json();
    return Promise.reject(ErrorResponse(result.errors));
  }

  if (response.status !== 200) {
    return Promise.reject("Server error");
  }

  return response.json();
}

export async function putData(url: string = "", data = {}) {
  const domain: string = import.meta.env.VITE_API_URL;
  const response = await fetch(domain + url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });

  if (response.status === 400) {
    const result = await response.json();
    return Promise.reject(ErrorResponse(result.errors));
  }

  if (response.status !== 200) {
    return Promise.reject("Server error");
  }

  return response.json();
}

export async function getData(
  url: string = "",
  filterCriteria: FilterCriteria
): Promise<any> {
  const domain: string = import.meta.env.VITE_API_URL;

  let payload = "";
  const searchParams = filterCriteria.criterias.map(
    (criteria: Criteria, index) => {
      payload += index == 0 ? "?" : "&";
      payload += `${criteria.parameter}=${criteria.value}`;
    }
  );

  const response = await fetch(domain + url + payload, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  });

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
  }

  return response.json();
}

export async function deleteData(url: string = ""): Promise<any> {
  const domain: string = import.meta.env.VITE_API_URL;
  const response = await fetch(domain + url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  });

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
  }

  return response.json();
}

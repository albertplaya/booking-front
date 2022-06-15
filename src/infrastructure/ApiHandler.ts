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

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
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

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
  }

  return response.json();
}

export async function getData(
  url: string = "",
  payload: any = {}
): Promise<any> {
  const domain: string = import.meta.env.VITE_API_URL;

  const searchParams =
    Object.keys(payload).length != 0 ? "?" + new URLSearchParams(payload) : "";

  const response = await fetch(domain + url + searchParams, {
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

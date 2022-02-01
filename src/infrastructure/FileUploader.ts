export async function upload(url: string, file: any): Promise<any> {
  const formData = new FormData();
  formData.append("activity_photo", file);

  const domain = "http://localhost:3000";
  const response = await fetch(domain + url, {
    method: "POST",
    mode: "cors",
    body: formData,
  });

  if (response.status !== 200) {
    const result = await response.json();
    return Promise.reject(result.errors[0].msg);
  }

  return response.json();
}

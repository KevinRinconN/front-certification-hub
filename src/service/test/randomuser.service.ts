export const getStudents = async () => {
  const res = await fetch("https://randomuser.me/api?results=10");
  if (!res.ok) throw new Error("Error en la peticion");
  return await res.json();
};

export async function fetchData() {
  try {
    const res = await fetch("https://73aeca9ea1583338.mokky.dev/items");
    if (!res.ok) {
      throw new Error("Ошибка HTTP: " + res.status);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

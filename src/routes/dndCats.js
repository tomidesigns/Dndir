import { Response } from 'miragejs';

export default async () => {
  const url = `https://www.dnd5eapi.co/api`;

  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    const message = 'Error loading existing infrastructure layer';
    return new Response(response.status, response.headers, { message });
  }
  const dndData = await response.json();

  console.log(dndData);
  return dndData;
};

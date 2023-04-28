import { Response } from 'miragejs';

export default async (schema, request) => {
  const categoryParam = request.params.category;
  const termParam = request.params.formattedTerm;

  console.log(request.params);
  const url = `https://www.dnd5eapi.co/api/${categoryParam}/${termParam}`;

  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    const message = `You roll a Wisdom check... What you are looking for can't be found.`;
    return new Response(response.status, response.headers, { message });
  }
  const dndData = await response.json();

  console.log(dndData);
  return dndData;
};


const root = 'http://localhost:3001';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const getCategories = () => (
  fetch(`${root}/categories`, { headers })
    .then(res => res.json())
)

export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
        if(!response.ok){
          return 'Sorry, server error please try again later'
        }
        return response.json()
      })
}

export const postUrls = (data) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if(!response.ok){
      return 'Sorry, server error please try again later'
    }
    return response.json()
  })
}

  export const deleteUrls = (id) => {
    return fetch(`http://localhost:3001/api/v1/urls/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
      })
  }

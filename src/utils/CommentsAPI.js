const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'authorized',
}

export function editPostScore(operation, id) {
  let op = {
    option: operation
  }
  return fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(op),
  })
  .then(resp => {
    return resp;
  })
}

export function editCommentScore(operation, id) {
  let op = {
    option: operation
  }
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(op),
  })
  .then(resp => {
    return resp;
  })
}



export function addComment(comment) {
  return fetch(`${api}/comments`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(comment)
  })
  .then(resp => {
    return resp;
  })
  .catch(
    erro => console.log('erro', erro)
  )
}

export function removePost(id) {
  return fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers: headers,
  })
  .then(resp => {
    return resp;
  })
}



export function editPost(post) {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(post),
  })
}

export function editComment(comment) {
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(comment),
  })
  .then(resp => {
    return resp;
  })
}

export function addPost(post) {
  return fetch(`${api}/posts`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(post)
  })
  .then(resp => {
    return resp;
  })
  .catch(
    erro => console.log('erro', erro)
  )
}


export function removeComment(id) { // único acesso ao back, fazendo atualização, que funcionou.
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(resp => {
    return resp;
  })
}


export function getPost(id) { 
  return fetch(`${api}/posts/${id}`, { headers })
    .then(posts => posts.json())
    .then(resp => {
      return resp;
    })
    .catch(
      console.log('Erro ao buscar o post')
    )
}


export function getPosts() {  // ok
  return fetch(`${api}/posts`, { headers })
    .then(posts => posts.json())
    .then(resp => {
      return resp;
    })
}


export function getComments(id) {
  return fetch(`${api}/posts/${id}/comments`, { headers })
    .then(comments => comments.json())
    .then(resp => {
      return resp; 
    })
    .catch(error => { console.log('eeor>', error) })
}

export function getCategories() { // OK
  return fetch(`${api}/categories`, { headers })
    .then(categories => categories.json())
}











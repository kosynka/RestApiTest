let id = null;

async function getPosts() {
  let response = await fetch('http://restapitest/posts');
  let posts = await response.json();

  document.querySelector(".card-columns").innerHTML = ''

  posts.forEach((post) => {
    document.querySelector(".card-columns").innerHTML += `

      <div class="card bg-light">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          
          <p class="card-text">
            ${post.body}
          </p>

          <a href="#" class="btn btn-success">See</a>

          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editPost" onclick="selectPost('${post.id}', '${post.title}', '${post.body}')">Edit</button>

          <a href="#" class="btn btn-danger" onclick="removePost(${post.id})">Delete</a>
        </div>
      </div>

      `
  })
}

async function addPost() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;

  let formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);

  const response = await fetch('http://restapitest/posts', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();

  if (data.status === true) {
    await getPosts();
  }
}

async function removePost(id) {
  const response = await fetch(`http://restapitest/posts/${id}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (data.status === true) {
    await getPosts();
  }
}

async function selectPost(identifier, title, body) {
  id = identifier;
  document.getElementById('edit-post-title').value = title;
  document.getElementById('edit-post-body').value = body;
}

async function updatePost() {
  const title = document.getElementById('edit-post-title').value,
    body = document.getElementById('edit-post-body').value;

  const data = {
    title: title,
    body: body
  };

  const response = await fetch(`http://restapitest/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  let resData = response.json();

  console.log(resData);

  if (resData === true) {
    await getPosts();
  }
}

getPosts();
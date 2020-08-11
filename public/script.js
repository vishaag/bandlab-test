let data = null;
let showingData = null;
let uniqueUserIds = [];
const url = 'https://jsonplaceholder.typicode.com/posts';

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json()
  return data;
}

function insertPosts(posts) {
  posts.map(function(post) {
    const grid = document.getElementById('grid');
    const groupBy = document.getElementById('groupBy');
    let div = createNode('div'),
        h1 = createNode('h3'),
        desc = createNode('p'),
        userId = createNode('p');
        
    div.className = "card";
    h1.innerHTML = `${post.title}`;
    desc.innerHTML = `${post.body}`;
    userId.innerHTML = `👤 🆔 ${post.userId}`;
    userId.className = "userId"
  
    append(grid, div);
    append(div, h1);
    append(div, desc);
    append(div, userId);
        
    if(!uniqueUserIds.includes(post.userId)) {
      uniqueUserIds.push(post.userId)
      let selectUserId = createNode('option');
      selectUserId.innerHTML = `${post.userId}`;
      selectUserId.value = `${post.userId}`;
      append(groupBy, selectUserId)
    }
  })
}

function replacePosts(posts) {
  const grid = document.getElementById('grid');
  grid.querySelectorAll('div').forEach((element, index) => {
    let h3 = element.querySelector('h3')
    let [desc, userId] = element.querySelectorAll('p')
    h3.innerHTML = posts[index].title
    desc.innerHTML = posts[index].body
    userId.innerHTML = `👤 🆔 ${posts[index].userId}`     
  });
}

const sortBtn = document.getElementById('sortBtn');

sortBtn.onclick = function () {
  const grid = document.getElementById('grid');
  if(sortBtn.innerHTML == "Sort Title ▲") {
    sortBtn.innerHTML = "Sort Title ▼"
    showingData.sort(function(a,b) {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    replacePosts(showingData)
  } else {
    sortBtn.innerHTML = "Sort Title ▲"
    showingData.sort(function(a,b) {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      return x > y ? -1 : x < y ? 1 : 0;
    });
    replacePosts(showingData)
  }
}

const groupBySelect = document.getElementById('groupBy');

groupBySelect.onchange = function(e) {
  const selectedValue = e.target.value;
  const grid = document.getElementById('grid');
  if(selectedValue) {
    showingData = data.filter(post => {
      return post.userId === Number(selectedValue)
    });
    grid.querySelectorAll('div').forEach(n => n.remove());
    insertPosts(showingData)
  } else {
    grid.querySelectorAll('div').forEach(n => n.remove());
    showingData = data.slice(0);
    insertPosts(showingData)
  }

}

async function main() {
  data = await getData(url)
  showingData = data.slice(0);
  insertPosts(showingData);
}

main();




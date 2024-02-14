const users = [];

export function createUser(user) {
  users.push(user);
  return user;
}

export function getUser(id) {
  return users.find((user) => user.id === id);
}

export function getUsers() {
  return users;
}

export function updateUser(id, user) {
  const index = users.findIndex((user) => user.id === id);
  users[index] = user;
  return user;
}

export function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return id;
}

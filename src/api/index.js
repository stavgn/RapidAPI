export function saveDragCoordinates(username, top, left) {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem(username, JSON.stringify({top, left}));
      resolve();
    }
    catch (err) {
      reject(err);
    }
  });
}

export function loginUserAndGetDragCoordinates(username, password) {
  return new Promise((resolve, reject) => {
    try {
      const savedState = window.localStorage.getItem(username);
        if (savedState == null) {
          resolve({ username, thumbnail: JSON.parse(savedState) });
        }
        resolve({ username, thumbnail: JSON.parse(savedState) });
      }
      catch(err) {
        resolve({ username });
      }
  });
}


const PENDING = "PENDING";
const REJECTED = "REJECTED";
const RESOLVED = "RESOLVED";

class myPromise {
  constructor(func) {
    this.state = PENDING;
    this.value = undefined;
    this.error = undefined;

    // array of callbacks to be called when promise is resolved
    this.onResolveCallback = [];

    // array of callbacks to be called when promise is rejected
    this.onRejectCallback = [];

    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);

    try {
      func(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  resolve(value) {
    if (this.state !== PENDING) return;

    this.state = RESOLVED;
    this.value = value;

    // will go through the callback stack and call all the callback in stack with value
    this.onResolveCallback.forEach((callback) => callback(value));
  }

  reject(error) {
    if (this.state !== PENDING) return;

    this.state = REJECTED;
    this.error = error;

    // will go through the callback stack and call all the callback in stack with value
    this.onRejectCallback.forEach((callback) => callback(error));
  }

  //initialising the then method. this will create new promise
  // registers a callback to be called when the promise is resolved
  then(onResolve, onReject) {
    onResolve = onResolve || ((value) => value); // Default resolve callback
    onReject =
      onReject ||
      ((error) => {
        throw error;
      }); // Default reject callback

    const promise = new myPromise((resolve, reject) => {
      if (this.state === RESOLVED) {
        try {
          const result = onResolve(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === REJECTED) {
        try {
          const result = onReject(this.error);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else {
        this.onResolveCallback.push((value) => {
          try {
            const result = onResolve(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectCallback.push((error) => {
          try {
            const result = onReject(error);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return promise;
  }

  // this will register a callback if the promise is rejected. also returns a new promise
  catch(onReject) {
    return this.then(null, onReject);
  }
}

// Example Case:

const jPromise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    const res = Math.random() * 10;

    if (res > 5) {
      resolve(res);
    } else {
      reject(new Error("Random number was too low"));
    }
  }, 2000);
});

jPromise
  .then((res) => {
    console.log("Successful Random Number: ", res);
  })
  .catch((error) => {
    console.log("error: ", error.message);
  });

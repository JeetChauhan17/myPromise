# myPromise - A Custom Promise Implementation

This project is a custom implementation of JavaScript Promises, designed to mimic the behavior of native Promises and provide a deeper understanding of how Promises work under the hood.

## Features

- **Promise States**: Handles `PENDING`, `RESOLVED`, and `REJECTED` states.
- **Chaining**: Supports chaining with `.then()` and `.catch()` methods.
- **Error Handling**: Catches errors within the executor function and `.then()` callbacks.
- **Callbacks Queue**: Manages queues of callbacks to be executed when the Promise is resolved or rejected.

## Usage

To use this custom Promise implementation, you can create a new instance of `myPromise` by passing an executor function that receives `resolve` and `reject` as parameters. Here's an example:

```javascript
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

```

### Key Sections:
1. **Project Title and Description**: A brief overview of the project.
2. **Features**: Highlights of what the custom Promise implementation can do.
3. **Usage**: Example code demonstrating how to use the custom Promise.
4. **Getting Started**: Instructions on how to clone the repository, navigate to the directory, and run the example.
5. **Contributing**: Information for potential contributors on how to contribute to the project.


## Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/JeetChauhan17/muPromise.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd myPromise
    ```

3. **Run the example**:
    ```bash
    node custom_promise.js
    ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the existing style and passes all tests.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


export async function wait(timeout = 1000) {
  await new Promise((res) =>
    setTimeout(() => {
      res(timeout);
    }, timeout)
  );
}

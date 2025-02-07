// Problem 1: Three ways to sum to n

// using the for loop
const sum_to_n_a = function (n: number): number {
  if (n <= 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};
console.log(sum_to_n_a(5));

// using the formula
const sum_to_n_b = function (n: number): number {
  if (n <= 0) return 0;
  return ((1 + n) * n) / 2;
};
console.log(sum_to_n_b(5));

// using recursion
const sum_to_n_c = function (n: number): number {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};
console.log(sum_to_n_c(5));

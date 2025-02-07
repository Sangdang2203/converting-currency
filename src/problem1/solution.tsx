// // Problem 1: Three ways to sum to n

// // using the for loop
// const sum_to_n_a = function (n) {
//   if (n < 0) return 0;
//   let sum = 0;
//   for (let i = 0; i < n.length; i++) {
//     sum += i;
//   }
//   return sum;
// };

// // using the formula
// const sum_to_n_b = function (n) {
//   if (n <= 0) return 0;
//   return ((1 + n) * n) / 2;
// };

// // using recursion
// const sum_to_n_c = function (n) {
//   if (n <= 0) return 0;
//   return n + sum_to_n_c(n - 1);
// };

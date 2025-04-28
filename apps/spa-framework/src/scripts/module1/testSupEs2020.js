// 测试 可选链操作符号
const user = { profile: { name: 'Alice' } };
console.log(user.profile?.name);
console.log(user.settings?.theme);

// 测试 BigInt
const bigNumber = 9007199254740991n;
console.log(bigNumber + 1n); // 应该打印 9007199254740992n

// 测试 Promise.allSettled
Promise.allSettled([Promise.resolve('ok'), Promise.reject('fail')]).then(
  (results) => console.log(results)
);

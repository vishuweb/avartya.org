const bcrypt = require("bcryptjs");

async function hashPassword() {

  const password = "123456";

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  console.log(hash);
}

hashPassword();
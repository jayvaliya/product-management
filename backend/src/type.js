const z = require('zod');

const login = z.object({
  email: z.string().email(),
  password: z.string(),
});

module.exports = { login };

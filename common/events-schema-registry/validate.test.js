const test = require("ava");

const validate = require("./validate");

test("foo", (t) => {
  const message = {
    eventId: "fd19a7df-ade1-4854-be1e-6d1881111d73",
    eventVersion: 1,
    eventName: "users/create",
    eventTime: Date.now(),
    producer: "oauth-server",
    data: {
      publicId: "user.id",
      name: "user.name",
      email: "user.email",
      role: "user.role",
      createdAt: "user.createdAt",
      updatedAt: "user.updatedAt",
    },
  };

  t.pass(validate("users/create/v1", message), true);
});

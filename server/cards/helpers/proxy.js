import rp from "request-promise";
const AUTH_MICROSERVICE_URI =
  process.env.AUTH_MICROSERVICE_URI || "http://localhost:3001";

export const saveCustomer = (userId, customer) => {
  return rp({
    url: `${AUTH_MICROSERVICE_URI}/users/${userId}`,
    method: "POST",
    body: { customerId: customer.id },
    json: true // Automatically stringifies the body to JSON
  });
};

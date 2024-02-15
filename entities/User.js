module.exports = class User {
  constructor(uid, email, isSeller) {
    this.uid = uid; // User ID
    this.email = email; // Email address
    this.isSeller = isSeller;
    this.createdAt = new Date(); // Timestamp of when the user account was created
  }
};

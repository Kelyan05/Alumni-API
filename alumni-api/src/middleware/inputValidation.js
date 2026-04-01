module.exports.validateEmailDomain = (email) => {
  const domain = process.env.EMAIL_DOMAIN;
  return email.toLowerCase().endsWith(domain.toLowerCase());
}
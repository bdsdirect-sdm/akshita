import Joi from 'joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of Birth is required',
  }),
  number: Joi.string()
  .pattern(/^\d{10}$/)
  .required()
  .messages({
    'string.empty': 'Phone number is required',
    'string.pattern.base': 'Phone number must be exactly 10 digits',
  }),
  profilePhoto: Joi.object({
    url: Joi.string().uri().required().messages({
      'string.empty': 'Picture URL is required',
      'string.uri': 'Invalid URL',
    }),
  }).required().messages({
    'object.base': 'Profile image must be an object with a valid URL',
  }),
  roleId: Joi.string().required().messages({
    'string.empty': 'Role ID is required',
  }),
  status: Joi.string()
    .valid('ACTIVE', 'DELETED', 'BLOCKED')
    .required()
    .messages({
      'any.only': 'Status must be one of ACTIVE, DELETED, or BLOCKED',
    }),
});

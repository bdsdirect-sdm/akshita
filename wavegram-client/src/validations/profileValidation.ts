import * as Yup from "yup"

export const BasicDetailsValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .min(2, 'First Name must be at least 2 characters')
      .max(50, 'First Name must be less than 50 characters'),
    
    lastName: Yup.string()
      .required('Last Name is required')
      .min(2, 'Last Name must be at least 2 characters')
      .max(50, 'Last Name must be less than 50 characters'),
    
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    
    address: Yup.string()
      .required('Address is required')
      .min(10, 'Address must be at least 10 characters'),
    
    city: Yup.string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters'),
    
    state: Yup.string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters'),
    
    zip: Yup.string()
      .required('Zip code is required')
      .matches(/^\d{5}$/, 'Zip code must be exactly 5 digits')
  });

  export const PersonalDetailsValidationSchema = Yup.object().shape({
    dob: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),
    
    gender: Yup.string()
      .required('Gender is required')
      .oneOf(['Male', 'Female', 'Other'], 'Gender must be one of "Male", "Female", or "Other"'),
    
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address')
  });
  
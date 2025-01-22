import * as Yup from 'yup';

export const PreferencesValidationSchema = Yup.object().shape({
  language: Yup.string().required('Language is required'),
  breakfast: Yup.string().matches(
    /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    'Breakfast time must be in the format HH:MM'
  ).required('Breakfast time is required'),
  lunch: Yup.string().matches(
    /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    'Lunch time must be in the format HH:MM'
  ).required('Lunch time is required'),
  dinner: Yup.string().matches(
    /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    'Dinner time must be in the format HH:MM'
  ).required('Dinner time is required'),
  wakeTime: Yup.string().matches(
    /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    'Wake time must be in the format HH:MM'
  ).required('Wake time is required'),
  bedTime: Yup.string().matches(
    /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    'Bed time must be in the format HH:MM'
  ).required('Bed time is required'),
  weight: Yup.string().oneOf(['kg', 'lbs'], 'Weight unit must be either "kg" or "lbs"').required('Weight is required'),
  height: Yup.string().oneOf(['inches', 'cms'], 'Height unit must be either "inches" or "cms"').required('Height is required'),
  sms: Yup.boolean().required('SMS preference is required'),
  post: Yup.boolean().required('Post preference is required'),
});

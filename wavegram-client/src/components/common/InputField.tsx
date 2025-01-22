import { Field, ErrorMessage } from "formik";

interface Option {
  label: string;
  value: string;
}

interface inputField {
  labelName: string;
  fieldName: string;
  type: string;
  placeholder: string;
  isRequired: boolean;
  options?: Array<Option>;
}

const InputField = ({
  fieldName,
  placeholder,
  type,
  labelName,
  options = [],
  isRequired,
}: inputField) => {
  return (
    <div className="flex flex-col gap-1 text-start w-[100%] my-3">
      {/* Label */}
      <label htmlFor={fieldName} className=" text-base">
        {labelName}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      {/* Conditional Field Rendering */}
      {type === "select" ? (
        <Field
          as="select"
          name={fieldName}
          className="p-4 border focus:ring-0 focus:border-black rounded-sm bg-white "
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          name={fieldName}
          placeholder={placeholder}
          className=" p-4 border focus:ring-0 hover:border-black rounded-sm transition-all duration-200"
        />
      )}

      {/* Error Message */}
      <ErrorMessage
        className="text-red-500 text-sm"
        name={fieldName}
        component="div"
      />
    </div>
  );
};

export default InputField;

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const Input = ({ label, error, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="outline-brand-primary placeholder:text-brand-text-gray border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        {...rest}
      />
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </div>
  );
};

export default Input;

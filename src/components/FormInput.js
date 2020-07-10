import React from 'react';
import { Label, Input } from './StyledComponents';

function FormInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        disabled={disabled ? 'disabled' : ''}
      />
    </div>
  );
}

export default FormInput;

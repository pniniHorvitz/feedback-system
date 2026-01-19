import React from 'react';
import PropTypes from 'prop-types';
import './ValidationInput.css';

const ValidationInput = ({
  label,
  value,
  onChange,
  placeholder,
  minLength = 0,
  maxLength = 500,
  required = false,
  type = 'text',
  error = null
}) => {
  const isValid = !error && (!required || value.trim().length > 0);
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.8;

  return (
    <div className="validation-input-wrapper">
      <label className="validation-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`validation-input ${error ? 'error' : isValid ? 'valid' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`validation-input ${error ? 'error' : isValid ? 'valid' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />
      )}
      
      <div className="validation-info">
        {error && (
          <span className="error-message" id={`${label}-error`} role="alert">
            {error}
          </span>
        )}
        {maxLength > 0 && (
          <span className={`char-count ${isNearLimit ? 'near-limit' : ''}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

ValidationInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'number', 'password', 'textarea']),
  error: PropTypes.string
};

export default ValidationInput;

import { useId, type ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  error?: string;
};

export function Input({ label, error, required, id, ...rest }: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  return (
    <div>
      <label htmlFor={fieldId} className="field-label">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <input
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field"
        {...rest}
      />
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

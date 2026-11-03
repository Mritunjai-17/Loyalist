import { useId, type ComponentPropsWithoutRef } from "react";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, required, id, rows = 6, ...rest }: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  return (
    <div>
      <label htmlFor={fieldId} className="field-label">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field resize-y"
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

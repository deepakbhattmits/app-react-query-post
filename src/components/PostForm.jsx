import { useState, useEffect, useCallback } from 'react';
import Button from '../components/reusable/Button';

const defaultFormValues = {
  title: '',
  body: '',
};

const PostForm = ({
  onSubmit,
  initialValues = defaultFormValues,
  submitText,
  clearOnSubmit,
  children,
}) => {
  const [values, setValues] = useState(initialValues);

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (clearOnSubmit) {
        setValues(defaultFormValues);
      }
      onSubmit(values);
    },
    [values]
  );

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setValues(initialValues);
    }
    return () => {
      unmounted = true;
    };
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit} className="ui form">
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="body">body</label>
        <textarea
          type="text"
          name="body"
          value={values.body}
          onChange={(e) => setValue('body', e.target.value)}
          required
          rows="4"
        />
      </div>
      <div className="ui grid field">
        <Button
          className={`three wide column ui button ${
            submitText.match('Save Post')
              ? 'brown'
              : submitText.match('Saved!')
              ? 'green'
              : submitText.match('Saving...')
              ? 'olive'
              : submitText.match('Create Post')
              ? 'violet'
              : ''
          }`}
          type="submit"
        >
          {submitText}
        </Button>
        {children}
      </div>
      <style jsx>{`
        .ui.form .field > label {
          color: var(--color-primary);
        }
      `}</style>
    </form>
  );
};
export default PostForm;

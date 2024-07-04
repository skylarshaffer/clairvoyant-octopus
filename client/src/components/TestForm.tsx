import { FormEvent } from 'react';

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function TestForm({ onSubmit }: Props) {
  return (
    <section>
      <form id="test-form" onSubmit={onSubmit}>
        <input name="domain" placeholder="URL" type="text"></input>
        <button>TEST</button>
      </form>
    </section>
  );
}

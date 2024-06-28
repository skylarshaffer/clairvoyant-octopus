import { FormEvent } from "react";

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function TestForm({onSubmit}: Props) {
  return (
    <section>
      <form id='test-form' onSubmit={onSubmit}>
        <label>URL<input name='domain' type='text'></input></label>
        <button>TEST</button>
      </form>
    </section>
  );
}

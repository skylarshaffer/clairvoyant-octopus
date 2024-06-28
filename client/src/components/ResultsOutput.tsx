type Props = {
  results: string[]
}

export function ResultsOutputs({results}: Props) {
  return (
    <section>
      <div>
        {results.map((result) => (<p>{result}</p>))}
      </div>
    </section>
  );
}

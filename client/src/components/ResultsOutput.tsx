type Props = {
  results: string[];
};

export function ResultsOutputs({ results }: Props) {
  return (
    <section>
      <h2>Endpoint Scan</h2>
      <div>
        {results.map((result) => (
          <p>{result}</p>
        ))}
      </div>
    </section>
  );
}
